const express = require("express");
const app = express();
const crypto = require('crypto');
const bodyParser = require('body-parser');
const request = require('request');
// body-parser 설정 추가
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const path = require("path");
const https = require('https');
const fs = require('fs');
const PORT = 443;

// SSL 인증서 파일 경로 설정
const privateKey = fs.readFileSync('/etc/letsencrypt/live/music-informatics.kr/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/music-informatics.kr/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/music-informatics.kr/chain.pem', 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca
};

// EJS 뷰 엔진 설정
app.set("views" , __dirname+"/payment/views");
app.set('view engine', 'ejs');
app.engine("html", require("ejs").renderFile);

app.use(express.static(path.join(__dirname, "payment")));
const getUrl = require('./payment/properties');

app.use(express.static(path.join(__dirname, "build")));
app.get(["/", "/about", "/officers", "/schedule"], function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});


const INICIS_MID='#'
const INICIS_PW='#'
const INICIS_SIGN_KEY='#'
const INICIS_MKEY='#'

// const INICIS_MID='INIpayTest'
// const INICIS_SIGN_KEY='SU5JTElURV9UUklQTEVERVNfS0VZU1RS'

// 결제 모듈 라우트 추가
app.get("/payment", (req, res) => {
    const mid = INICIS_MID;                                              // 상점아이디
    const signKey = INICIS_SIGN_KEY;
    const mKey = crypto.createHash("sha256").update(signKey).digest('hex'); // SHA256 Hash값 [대상: mid와 매칭되는 signkey]
    const oid = `${INICIS_MID}_${new Date().getTime()}`;                  // 주문번호
    const price = req.query.price;
    const timestamp = new Date().getTime();                               // 타임스템프 [TimeInMillis(Long형)]
    const use_chkfake = "Y";                             
    const signature  = crypto.createHash("sha256").update("oid="+oid+"&price="+price+"&timestamp="+timestamp).digest('hex'); //SHA256 Hash값 [대상: oid, price, timestamp]
    const verification = crypto.createHash("sha256").update("oid="+oid+"&price="+price+"&signKey="+signKey+"&timestamp="+timestamp).digest('hex');
    
    // 사용자 정보 쿼리 파라미터에서 읽기
    const name = req.query.name || '';
    const tel = req.query.tel || '';
    const email = req.query.email || '';
    // query 디렉토리가 없으면 생성
    const queryDir = path.join(__dirname, 'query');
    if (!fs.existsSync(queryDir)) {
        fs.mkdirSync(queryDir, { recursive: true });
    }
    // 결제 정보를 JSON 파일로 저장
    const queryData = {
        timestamp: timestamp,
        oid: oid,
        price: price,
        name: name,
        tel: tel,
        email: email
    };
    const queryFilePath = path.join(queryDir, `${timestamp}.json`);
    fs.writeFileSync(queryFilePath, JSON.stringify(queryData, null, 2), 'utf8');
    console.log(`Payment query data saved to: ${queryFilePath}`);

    res.render("INIstdpay_pc_req.html", {
        mid: mid,
        oid: oid,
        price: price,
        timestamp: timestamp,
        mKey: mKey,
        use_chkfake: use_chkfake,
        signature: signature,
        verification: verification,
        name: name,           // 추가: 이름
        tel: tel,             // 추가: 전화번호
        email: email          // 추가: 이메일
    });
});

app.post("/INIstdpay_pc_return.ejs", (req, res) => {
    if(req.body.resultCode === "0000"){
        //############################################
        //1.전문 필드 값 설정(***가맹점 개발수정***)
        //############################################
        const mid = req.body.mid;                       // 상점아이디
        const signKey = INICIS_SIGN_KEY;
        const authToken = req.body.authToken;           // 승인요청 검증 토큰
        const netCancelUrl = req.body.netCancelUrl;     // 망취소요청 Url 
        const merchantData = req.body.merchantData;
        const timestamp = new Date().getTime();         // 타임스템프 [TimeInMillis(Long형)]
        const charset = "UTF-8";                        // 리턴형식[UTF-8,EUC-KR](가맹점 수정후 고정)
        const format = "JSON";                          // 리턴형식[XML,JSON,NVP](가맹점 수정후 고정)
        //##########################################################################
        // 승인요청 API url (authUrl) 승인 요청
        //##########################################################################   
        const idc_name = req.body.idc_name;             
        const authUrl = req.body.authUrl;               // 승인요청 Url
        const authUrl2 = getUrl.getAuthUrl(idc_name);    // properties.js에서 가져오는 authUrl
        const signature  = crypto.createHash("sha256").update("authToken="+authToken+"&timestamp="+timestamp).digest('hex');
        const verification  = crypto.createHash("sha256").update("authToken="+authToken+"&signKey="+signKey+"&timestamp="+timestamp).digest('hex');
    
        //결제 승인 요청 
        let options = { 
            mid: mid,
            authToken: authToken, 
            timestamp: timestamp,
            signature: signature,
            verification: verification,
            charset: charset,
            format: format
        };

        if(authUrl == authUrl2) {
            request.post({method: 'POST', uri: authUrl2, form: options, json: true}, (err,httpResponse,body) =>{ 
                try{
                    let jsoncode = (err) ? err : JSON.stringify(body);
                    let result = JSON.parse(jsoncode)
                    res.render('INIstdpay_pc_return.ejs',{
                        resultCode : result.resultCode,
                        resultMsg : result.resultMsg,
                        tid : result.tid,
                        MOID : result.MOID,
                        TotPrice : result.TotPrice,
                        goodName : result.goodName,
                        applDate : result.applDate,
                        applTime : result.applTime

                    })
                }catch(e){
                    /*
                        가맹점에서 승인결과 전문 처리 중 예외발생 시 망취소 요청할 수 있습니다.
                        승인요청 전문과 동일한 스펙으로 진행되며, 인증결과 수신 시 전달받은 "netCancelUrl" 로 망취소요청합니다.

                        ** 망취소를 일반 결제취소 용도로 사용하지 마십시오.
                        일반 결제취소는 INIAPI 취소/환불 서비스를 통해 진행해주시기 바랍니다.
                    */
                    console.log(e);
                    const netCancelUrl2 = getUrl.getNetCancel(idc_name)
                    if(netCancelUrl == netCancelUrl2) {
                        request.post({method: 'POST', uri: netCancelUrl2, form: options, json: true}, (err,httpResponse,body) =>{
                            let result = (err) ? err : JSON.stringify(body);
                    
                            console.log("<p>"+result+"</p>");
                        });
                    }
                }
             });
        }
        
    }else{
        res.render('INIstdpay_pc_return.ejs',{
            resultCode : req.body.resultCode,
            resultMsg :req.body.resultMsg,
            tid : req.body.tid,
            MOID : req.body.MOID,
            TotPrice: req.body.TotPrice,
            goodName : req.body.goodName,
            applDate : req.body.applDate,
            applTime : req.body.applTime
           })
    }
});

app.get('/close', (req, res) => {
    res.send('<script language="javascript" type="text/javascript" src="https://stdpay.inicis.com/stdjs/INIStdPay_close.js" charset="UTF-8"></script>');
});

// HTTPS 서버 생성 및 시작
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(PORT, () => {
  console.log(`HTTPS server started on PORT ${PORT}`);
});

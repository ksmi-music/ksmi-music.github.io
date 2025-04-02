const REGISTRATION_TYPES = {
    student: {
        id: 'student',
        label: '학생',
        price: 30000
    },
    regular: {
        id: 'regular',
        label: '일반',
        price: 50000
    }
};

// API URL 설정
const API_URL = 'https://mac-beatles3.kaist.ac.kr/api';
const FRONTEND_URL = window.location.origin;

class PaymentHandler {
    constructor() {
        this.form = document.getElementById('paymentForm');
        this.inicisForm = document.getElementById('SendPayForm_id');
        this.initializeForm();
    }

    initializeForm() {
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleSubmit(e);
        });
    }

    async handleSubmit(e) {
        try {
            const formData = this.getFormData();
            if (!this.validateForm(formData)) {
                alert("모든 필수 정보를 입력해주세요");
                return;
            }

            // 선택한 등록 유형 가져오기
            const selectedType = REGISTRATION_TYPES[formData.registrationType];
            if (!selectedType) {
                throw new Error("유효하지 않은 등록 유형입니다");
            }

            // 백엔드에서 결제 설정 정보 가져오기
            const configResponse = await this.getPaymentConfig({
                email: formData.email,
                registrationType: formData.registrationType,
                amount: selectedType.price
            });

            if (!configResponse.success) {
                throw new Error("결제 준비 중 오류가 발생했습니다");
            }

            // 결제 정보를 sessionStorage에 저장
            sessionStorage.setItem('paymentUserData', JSON.stringify({
                ...formData,
                amount: selectedType.price,
                productName: "KSMI 심포지엄 등록비"
            }));

            // 결제 진행
            await this.initializePayment(formData, selectedType.price, configResponse.config);

        } catch (error) {
            console.error("Payment error:", error);
            alert(error.message || "결제 처리 중 오류가 발생했습니다");
        }
    }

    async getPaymentConfig(data) {
        try {
            const response = await fetch(`${API_URL}/payment/config`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            throw new Error("결제 설정을 가져오는데 실패했습니다");
        }
    }

    getFormData() {
        return {
            lastName: document.getElementById('lastName').value,
            firstName: document.getElementById('firstName').value,
            affiliation: document.getElementById('affiliation').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            registrationType: document.querySelector('input[name="registrationType"]:checked')?.id
        };
    }

    validateForm(formData) {
        return Object.values(formData).every(value => value && value.trim() !== '');
    }

    async initializePayment(formData, amount, config) {
        const body = document.querySelector("body");
        const isPC = body.offsetWidth > 1024;
        const isTest = window.location.hostname === 'localhost' || 
                      window.location.hostname === '127.0.0.1' ||
                      window.location.hostname.includes('test');
        
        // Generate timestamp and order ID
        const timestamp = config.timestamp;
        const oid = timestamp + generateRandomString(7);
        
        if (isPC) {
            // PC용 이니시스 폼 데이터 설정
            this.inicisForm.querySelector('#goodname').value = "KSMI 심포지엄 등록비";
            this.inicisForm.querySelector('#buyername').value = `${formData.lastName}${formData.firstName}`;
            this.inicisForm.querySelector('#buyertel').value = formData.phone;
            this.inicisForm.querySelector('#buyeremail').value = formData.email;
            this.inicisForm.querySelector('#price').value = amount;
            this.inicisForm.querySelector('#mid').value = isTest ? "INIpayTest" : config.mid;
            this.inicisForm.querySelector('#oid').value = oid;
            this.inicisForm.querySelector('#timestamp').value = timestamp;
            this.inicisForm.querySelector('#gopaymethod').value = "Card"; // 기본값으로 카드 결제
            
            // mKey 설정 (테스트/운영 구분)
            const mKey = isTest 
                ? "3a9503069192f207491d4b19bd743fc249a761ed94246c8c42fed06c3cd15a33"
                : await sha256(config.mKey);
            this.inicisForm.querySelector('#mKey').value = mKey;
            
            // signature 생성
            const signatureInput = `oid=${oid}&price=${amount}&timestamp=${timestamp}`;
            const signature = await sha256(signatureInput);
            this.inicisForm.querySelector('#signature').value = signature;

            // returnUrl과 closeUrl 설정
            this.inicisForm.querySelector('#returnUrl').value = `${FRONTEND_URL}/payment`;
            this.inicisForm.querySelector('#closeUrl').value = `${FRONTEND_URL}/payment`;

            // PC용 이니시스 스크립트 로드 및 실행
            const scriptUrl = isTest 
                ? "https://stgstdpay.inicis.com/stdjs/INIStdPay.js"
                : "https://stdpay.inicis.com/stdjs/INIStdPay.js";
            
            const script = document.createElement("script");
            script.src = scriptUrl;
            document.head.appendChild(script);
            
            script.onload = () => {
                const agt = navigator.userAgent.toLowerCase();
                if ((navigator.appName === 'Netscape' && agt.indexOf('trident') !== -1) || 
                    agt.indexOf("msie") !== -1 || 
                    agt.indexOf('edge')) {
                    script.ownerDocument.defaultView.INIStdPay.pay('SendPayForm_id');
                } else {
                    window.INIStdPay.pay('SendPayForm_id');
                }
            };
        } else {
            // 모바일용 이니시스 폼 데이터 설정
            const mobileForm = document.createElement('form');
            mobileForm.method = 'post';
            mobileForm.acceptCharset = 'euc-kr';
            mobileForm.action = 'https://mobile.inicis.com/smart/payment/';
            mobileForm.target = '_self';

            const mobileInputs = {
                P_NEXT_URL: `${FRONTEND_URL}/payment`,
                P_INI_PAYMENT: 'CARD',
                P_MID: isTest ? "INIpayTest" : config.mid,
                P_OID: oid,
                P_GOODS: "KSMI 심포지엄 등록비",
                P_AMT: amount,
                P_UNAME: `${formData.lastName}${formData.firstName}`
            };

            Object.entries(mobileInputs).forEach(([name, value]) => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = name;
                input.value = value;
                mobileForm.appendChild(input);
            });

            document.body.appendChild(mobileForm);
            mobileForm.submit();
        }
    }
}

// Utility functions
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// 페이지 로드 시 PaymentHandler 초기화
document.addEventListener('DOMContentLoaded', () => {
    new PaymentHandler();
}); 
#!/bin/bash
# 패키지 설치 및 빌드
npm install
npm run build

# certbot 설치
sudo apt-get update
sudo apt-get install -y certbot

# SSL 인증서 발급 (웹서버를 잠시 중지하고 진행합니다)
echo "SSL 인증서를 발급받습니다..."
sudo certbot certonly --standalone -d music-informatics.kr

# 인증서 경로 설정 - web.js 파일 수정
CERT_PATH="/etc/letsencrypt/live/music-informatics.kr"
sed -i "s|/path/to/privkey.pem|$CERT_PATH/privkey.pem|g" web.js
sed -i "s|/path/to/cert.pem|$CERT_PATH/cert.pem|g" web.js
sed -i "s|/path/to/chain.pem|$CERT_PATH/chain.pem|g" web.js

# 인증서 자동갱신 설정
echo "0 3 * * * root certbot renew --quiet" | sudo tee -a /etc/crontab > /dev/null

# 서버 시작
echo "HTTPS 서버를 시작합니다 (포트 433)..."
node web.js
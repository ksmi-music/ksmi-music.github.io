from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
from datetime import datetime

app = Flask(__name__)
CORS(app)  # React 프론트엔드와의 CORS 이슈 해결

# 이니시스 설정 (실제 값들은 환경변수나 설정 파일에서 가져와야 합니다)
INICIS_CONFIG = {
    "mid": "your_merchant_id",
    "signKey": "your_sign_key",
    "apiKey": "your_api_key",
    "paymentUrl": "https://api.inicis.com/v1/payment",  # 실제 이니시스 API URL로 변경 필요
}

@app.route('/api/payment/prepare', methods=['POST'])
def prepare_payment():
    try:
        data = request.json
        
        # 결제 준비 데이터 생성
        merchant_uid = f"ORDER_{datetime.now().strftime('%Y%m%d%H%M%S')}"
        amount = data.get('amount')
        
        payment_data = {
            "merchant_uid": merchant_uid,
            "amount": amount,
            "buyer_name": f"{data.get('lastName')} {data.get('firstName')}",
            "buyer_email": data.get('email'),
            "buyer_tel": data.get('phone'),
        }

        # 이니시스 API 호출하여 결제 준비
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {INICIS_CONFIG['apiKey']}"
        }
        
        response = requests.post(
            INICIS_CONFIG['paymentUrl'],
            headers=headers,
            json=payment_data
        )
        
        if response.status_code == 200:
            return jsonify(response.json())
        else:
            return jsonify({"error": "Payment preparation failed"}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/payment/complete', methods=['POST'])
def complete_payment():
    try:
        data = request.json
        
        # 결제 완료 처리 로직
        # 이니시스로부터의 응답 검증
        # 데이터베이스에 결제 정보 저장
        
        return jsonify({
            "success": True,
            "message": "Payment completed successfully"
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True) 
import { useState } from 'react';
import axios from 'axios';
import { INICIS_CONFIG } from '../constants/properties';
import { REGISTRATION_TYPES } from '../constants/payment';
import SHA256 from 'crypto-js/sha256';
import Hex from 'crypto-js/enc-hex';

export const usePayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createPaymentForm = (paymentData) => {
    const form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', 'https://stdpay.inicis.com/stdjs/INIStdPay.js');

    Object.entries(paymentData).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', key);
      input.setAttribute('value', value);
      form.appendChild(input);
    });

    return form;
  };

  const handlePayment = async (formData) => {
    setLoading(true);
    setError(null);
    
    try {
      const price = REGISTRATION_TYPES[formData.registrationType].price;
      const timestamp = new Date().getTime();
      const mid = INICIS_CONFIG.MID;
      const signKey = INICIS_CONFIG.SIGN_KEY;
      const oid = `${mid}_${timestamp}`; // 고유한 주문번호 생성
      // 서명 생성 수정
      const signature = SHA256(`oid=${oid}&price=${price}&timestamp=${timestamp}`).toString(Hex);
      // mKey 생성 수정
      const mKey = SHA256(signKey).toString(Hex);
      const paymentData = {
        version: "1.0",
        mid: mid,
        goodname: "KSMI 심포지엄 등록",
        price,
        currency: "WON",
        buyername: `${formData.lastName}${formData.firstName}`,
        buyertel: formData.phone,
        buyeremail: formData.email,
        timestamp: timestamp,
        signature: signature,
        mKey: mKey,
        oid: oid,
        returnUrl: INICIS_CONFIG.RETURN_URL,
        closeUrl: INICIS_CONFIG.CLOSE_URL,
        acceptmethod: "HPP(1):below1000:va_receipt:vbank(20230330)",
      };

      const form = createPaymentForm(paymentData);
      document.body.appendChild(form);
      
      // 결제 완료 후 처리를 위한 이벤트 리스너
      window.addEventListener('message', async (e) => {
        if (e.data.success) {
          // 여기서 필요한 경우 결제 완료 후 처리를 구현
          console.log('Payment successful:', e.data);
        }
      });

      form.submit();
    } catch (error) {
      setError('결제 처리 중 오류가 발생했습니다.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    handlePayment,
    loading,
    error
  };
}; 
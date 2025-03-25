import { useState } from 'react';
import axios from 'axios';
import { INICIS_CONFIG } from '../properties';
import { REGISTRATION_TYPES } from '../constants/payment';

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

      // Flask 백엔드로 결제 준비 요청
      const { data } = await axios.post('http://localhost:5000/api/payment/prepare', {
        amount: price,
        lastName: formData.lastName,
        firstName: formData.firstName,
        email: formData.email,
        phone: formData.phone,
        registrationType: formData.registrationType
      });

      if (!data.merchant_uid) {
        throw new Error('결제 준비 실패');
      }

      const paymentData = {
        version: "1.0",
        mid: INICIS_CONFIG.MID,
        goodname: "KSMI 심포지엄 등록",
        price,
        currency: "WON",
        buyername: `${formData.lastName}${formData.firstName}`,
        buyertel: formData.phone,
        buyeremail: formData.email,
        timestamp: Date.now().toString(),
        signature: data.signature,
        mKey: data.mKey,
        oid: data.merchant_uid,
        returnUrl: INICIS_CONFIG.RETURN_URL,
        closeUrl: INICIS_CONFIG.CLOSE_URL,
        acceptmethod: "HPP(1):below1000:va_receipt:vbank(20230330)",
      };

      const form = createPaymentForm(paymentData);
      document.body.appendChild(form);
      
      // 결제 완료 후 처리를 위한 이벤트 리스너 추가
      window.addEventListener('message', async (e) => {
        if (e.data.success) {
          try {
            // 결제 완료 처리
            await axios.post('http://localhost:5000/api/payment/complete', {
              merchant_uid: data.merchant_uid,
              ...e.data
            });
          } catch (error) {
            setError('결제 완료 처리 중 오류가 발생했습니다.');
          }
        }
      });

      form.submit();
    } catch (error) {
      setError(error.message || '결제 처리 중 오류가 발생했습니다.');
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
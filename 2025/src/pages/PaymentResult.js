import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function PaymentResult() {
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handlePaymentResult = async () => {
      try {
        const params = new URLSearchParams(location.search);
        
        // 백엔드에 결제 결과 전송
        const { data } = await axios.post('http://localhost:4000/api/payment/complete', {
          resultCode: params.get('resultCode'),
          resultMsg: params.get('resultMsg'),
          tid: params.get('tid'),
          MOID: params.get('MOID'),
          amt: params.get('amt'),
          payMethod: params.get('payMethod')
        });

        if (data.success) {
          alert('결제가 완료되었습니다.');
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error('Payment result handling error:', error);
        alert('결제 결과 처리 중 오류가 발생했습니다.');
      } finally {
        navigate('/');
      }
    };

    handlePaymentResult();
  }, [location, navigate]);

  return <div>결제 처리중...</div>;
}

export default PaymentResult; 
import { useState, useEffect } from 'react';
import './Home.css';
import { usePayment } from '../hooks/usePayment';
import { REGISTRATION_TYPES } from '../constants/payment';

function Home() {
  const [homeData, setHomeData] = useState(null);
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    affiliation: '',
    email: '',
    phone: '',
    registrationType: ''
  });

  const { handlePayment, loading, error } = usePayment();

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const response = await import('../data/home.json');
        setHomeData(response.default);
      } catch (error) {
        console.error('Error loading home data:', error);
      }
    };

    loadHomeData();
  }, []);

  // Form input handler
  const handleInputChange = (e) => {
    const value = e.target.type === 'radio' ? e.target.id : e.target.value;
    setFormData({
      ...formData,
      [e.target.type === 'radio' ? 'registrationType' : e.target.id]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handlePayment(formData);
    } catch (error) {
      alert(error.message);
    }
  };

  if (!homeData) return <div>Loading...</div>;
  if (loading) return <div>결제 처리중...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="home">
      {/* 메인 배너 */}
      <section className="main-banner">
        <div className="banner-content">
          <img src="/img/background.png" alt="Banner" className="banner-image" />
        </div>
      </section>

      <section className="registration-form">
        <h2>제 1차 KSMI-한국 음악정보학회 심포지엄 사전등록</h2>
        <div className="registration-info">
          <p><strong>등록 기간:</strong> 2025년 4월 6일 일요일 오후 11시 59분까지</p>
          <p><strong>행사 일시:</strong> 2025년 4월 18일 금요일</p>
          <p><strong>행사 장소:</strong> 한국과학기술원 (KAIST) 학술문화관 5F (정근모 컨퍼런스홀 + 존 해너홀)</p>
          <p><strong>결제 방식:</strong> 현재 결제 시스템이 구축 준비중에 있습니다. 사전 등록 후, 추후에 결제를 진행할 예정입니다.</p>
          <p><strong>기타 문의:</strong> ksmi2025@gmail.com</p>
        </div>

        <div className="pre-registration-container">
          <p className="pre-registration-text">
            아래 버튼을 클릭하여 제 1차 KSMI-한국 음악정보학회 심포지엄 사전등록을 진행해 주세요.
          </p>
          
          <button 
            className="submit-button"
            onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSepsvQgfwQe28m_tI4RtVje824hDLKfP8dnF66635GEVJ2k0Q/viewform?usp=sharing', '_blank')}
          >
            사전 등록하러가기
          </button>
        </div>

        {/* <form className="registration-form-fields" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="lastName">성</label>
            <input 
              type="text" 
              id="lastName" 
              placeholder="예: 홍"
              value={formData.lastName}
              onChange={handleInputChange}
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="firstName">이름</label>
            <input 
              type="text" 
              id="firstName" 
              placeholder="예: 길동"
              value={formData.firstName}
              onChange={handleInputChange}
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="affiliation">소속</label>
            <input 
              type="text" 
              id="affiliation" 
              placeholder="예: 카이스트 Mac 랩"
              value={formData.affiliation}
              onChange={handleInputChange}
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input 
              type="email" 
              id="email" 
              placeholder="예: example@mail.com"
              value={formData.email}
              onChange={handleInputChange}
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">전화번호</label>
            <input 
              type="tel" 
              id="phone" 
              placeholder="예: 010-1234-5678"
              value={formData.phone}
              onChange={handleInputChange}
              required 
            />
          </div>

          <div className="form-group">
            <label>구분 선택 *</label>
            <div className="radio-group">
              {Object.values(REGISTRATION_TYPES).map(type => (
                <div className="radio-option" key={type.id}>
                  <input 
                    type="radio" 
                    id={type.id} 
                    name="registrationType" 
                    value={type.id}
                    checked={formData.registrationType === type.id}
                    onChange={handleInputChange}
                    required 
                  />
                  <label htmlFor={type.id}>{type.label} - {type.price.toLocaleString()}₩</label>
                </div>
              ))}
            </div>
          </div>

          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? '처리중...' : '결제하기'}
          </button>
        </form> */}

      </section>

    </div>
  );
}

export default Home; 
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const [homeData, setHomeData] = useState(null);

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

  if (!homeData) return <div>Loading...</div>;

  return (
    <div className="home">
      {/* 메인 배너 */}
      <section className="main-banner">
        <div className="banner-content">
          <img src="/img/background.png" alt="Banner" className="banner-image" />
        </div>
      </section>

      {/* 빠른 링크 배너 */}
      {/* <section className="quick-banners">
        <a href="https://www.manuscriptlink.com/society/ksmi" target="_blank" rel="noopener noreferrer" className="quick-banner paper-submission">
          <div className="banner-text">
            <h3>논문 투고</h3>
            <p>음악정보연구 논문 투고 바로가기</p>
          </div>
          <span className="arrow">→</span>
        </a>
        <a href="https://forms.gle/example" target="_blank" rel="noopener noreferrer" className="quick-banner membership">
          <div className="banner-text">
            <h3>회원 가입</h3>
            <p>한국음악정보학회 회원 가입 안내</p>
          </div>
          <span className="arrow">→</span>
        </a>
      </section> */}

      <section className="registration-form">
        <h2>제 1차 KSMI-한국 음악정보학회 심포지엄 사전등록</h2>
        <div className="registration-info">
          <p><strong>등록 기간:</strong> 2025년 4월 7일 일요일 오후 11시 59분까지</p>
          <p><strong>행사 일시:</strong> 2025년 4월 18일 목요일</p>
          <p><strong>행사 장소:</strong> 한국과학기술원 (KAIST) 학술문화관 양승택 오디토리움</p>
          <p><strong>결제 방식:</strong> 하단부 결제 버튼 이용</p>
          <p><strong>기타 문의:</strong> ksmi2025@gmail.com</p>
          <p>등록이 완료 된 후 비용 환불은 불가합니다.</p>
        </div>

        <form className="registration-form-fields">
          <div className="form-group">
            <label htmlFor="lastName">성</label>
            <input type="text" id="lastName" placeholder="예: 홍" />
          </div>

          <div className="form-group">
            <label htmlFor="firstName">이름</label>
            <input type="text" id="firstName" placeholder="예: 길동" />
          </div>

          <div className="form-group">
            <label htmlFor="affiliation">소속</label>
            <input type="text" id="affiliation" placeholder="예: 카이스트 Mac 랩" />
          </div>

          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input type="email" id="email" placeholder="예: example@mail.com" />
          </div>

          <div className="form-group">
            <label htmlFor="phone">전화번호</label>
            <input type="tel" id="phone" placeholder="예: 010-1234-5678" />
          </div>

          <div className="form-group">
            <label>구분 선택 *</label>
            <div className="radio-group">
              <div className="radio-option">
                <input type="radio" id="student" name="registrationType" value="student" />
                <label htmlFor="student">학생 - 20000₩</label>
              </div>
              <div className="radio-option">
                <input type="radio" id="regular" name="registrationType" value="regular" />
                <label htmlFor="regular">일반 - 50000₩</label>
              </div>
            </div>
          </div>

          <button type="submit" className="submit-button" onClick={() => window.location.href ="#"}>결제</button>
        </form>
      </section>

      {/* <div className="content-grid">
        <section className="announcements">
          <div className="section-header">
            <h2>공지사항</h2>
            <Link to="/notice" className="more-link">더보기</Link>
          </div>
          <ul className="announcement-list">
            {homeData.announcements.map(announcement => (
              <li key={announcement.id} className={announcement.important ? 'important' : ''}>
                <span className="date">{announcement.date}</span>
                <span className="title">{announcement.title}</span>
              </li>
            ))}
          </ul>
        </section>

        
        <section className="upcoming-events">
          <div className="section-header">
            <h2>다가오는 행사</h2>
            <Link to="/seminars" className="more-link">더보기</Link>
          </div>
          <ul className="event-list">
            {homeData.upcomingEvents.map(event => (
              <li key={event.id}>
                <span className="date">{event.date}</span>
                <span className="title">{event.title}</span>
                <span className="location">{event.location}</span>
              </li>
            ))}
          </ul>
        </section>

        
        <section className="news">
          <div className="section-header">
            <h2>학회 소식</h2>
            <Link to="/notice" className="more-link">더보기</Link>
          </div>
          <ul className="news-list">
            {homeData.news.map(item => (
              <li key={item.id}>
                <span className="date">{item.date}</span>
                <div className="news-content">
                  <span className="title">{item.title}</span>
                  <p className="summary">{item.summary}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div> */}
      
    </div>
  );
}

export default Home; 
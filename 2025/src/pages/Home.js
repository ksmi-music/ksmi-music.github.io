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
      <section className="main-banner" style={{backgroundImage: "url('/img/background.png')", backgroundSize: "cover", backgroundPosition: "center"}}>
      </section>

      {/* 빠른 링크 배너 */}
      <section className="quick-banners">
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
      </section>

      <div className="content-grid">
        {/* 공지사항 */}
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

        {/* 다가오는 행사 */}
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

        {/* 학회 소식 */}
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
      </div>
    </div>
  );
}

export default Home; 
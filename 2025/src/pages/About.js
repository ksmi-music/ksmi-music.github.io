import './About.css';

function About() {
  // 하드코딩된 데이터
  const aboutData = {
    "greeting": {
      "presidentName": "남주한",
      "presidentImage": "/img/juhan_nam.jpg",
      "message": [
        "한국음악정보학회(Korean Society for Music Informatics) 홈페이지를 방문해 주셔서 감사합니다.",
        "한국음악정보학회는 음악 관련 데이터를 처리, 분석, 검색하는 음악정보검색(Music Information Retrieval, MIR) 분야부터 음악 생성에 이르기까지, 컴퓨터 기반으로 음악을 다루는 음악 정보 연구의 발전을 위해서 설립된 비영리 학술단체입니다. 음악 정보 연구는 음악 서비스의 고도화와 인공지능 기술의 확산에 힘입어 최근 큰 주목을 받고 있습니다. 본 학회는 음악 정보 연구에 관심있는 회원 간의 활발한 아이디어 교류와 연구 활동을 촉진하고, 연구 및 교육을 장려하며, 다양한 전공과 배경을 가진 분들이 함께 참여할 수 있도록 지원하고 있습니다. 또한, 매년 정기 학술대회를 개최하여 연구 성과를 공유하고 학문적 교류의 장을 마련하고자 합니다."
      ]
    },
    "history": [
      {
        "year": "Future",
        "event": "정기 학술대회 개최"
      },
      {
        "year": "2025",
        "event": "창립 심포지엄 개최"
      },
      {
        "year": "2024",
        "event": "한국음악정보학회 설립"
      }
    ],
    "activities": [
      {
        "title": "학술연구",
        "description": "정기 학술대회 및 세미나 개최"
      },
      {
        "title": "출판",
        "description": "학회지 및 연구자료집 발간"
      },
      {
        "title": "교류협력",
        "description": "국내외 유관기관과의 학술교류"
      }
    ]
  };

  return (
    <div className="about">
      {/* 인사말 */}
      <section className="greeting">
        <h2>인사말</h2>
        <div className="president-message">
          <div className="president-info">
            <img src={aboutData.greeting.presidentImage} alt="학회장" className="president-photo" />
            <h3>학회장 {aboutData.greeting.presidentName}</h3>
          </div>
          <div className="message-content">
            {aboutData.greeting.message.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* 학회 연혁 */}
      <section className="history">
        <h2>학회 연혁</h2>
        <div className="timeline">
          {aboutData.history.map((item, index) => (
            <div key={index} className="timeline-item">
              <div className="year">{item.year}</div>
              <div className="event">{item.event}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 학회 활동 소개 */}
      <section className="activities">
        <h2>학회 활동 소개</h2>
        <div className="activities-grid">
          {aboutData.activities.map((activity, index) => (
            <div key={index} className="activity-card">
              <h3>{activity.title}</h3>
              <p>{activity.description}</p>
            </div>
          ))}
        </div>
      </section>
{/* 
      <section className="organization">
        <h2>조직도</h2>
        <div className="org-chart">
        </div>
      </section> */}
    </div>
  );
}

export default About; 
import './Officers.css';

function Officers() {
  // 하드코딩된 데이터
  const officersData = {
    "executives": [
      {
        "position": "학회장",
        "name": "남주한",
        "affiliation": "한국과학기술원"
      },
      {
        "position": "부회장",
        "name": "정다샘",
        "affiliation": "서강대학교"
      }
    ],
    "directors": [
      {
        "title": "국내이사",
        "members": [
          {
            "name": "이교구",
            "affiliation": "서울대학교"
          },
          {
            "name": "이경면",
            "affiliation": "한국과학기술원"
          },
          {
            "name": "김성영",
            "affiliation": "한국과학기술원"
          },
          {
            "name": "신종원",
            "affiliation": "광주과학기술원"
          },
          {
            "name": "안창욱",
            "affiliation": "광주과학기술원"
          },
          {
            "name": "이석진",
            "affiliation": "경북대학교"
          }
        ]
      },
      {
        "title": "국외이사",
        "members": [
          {
            "name": "이진하",
            "affiliation": "Unversity of Washington"
          },
          {
            "name": "최가현",
            "affiliation": "University of Illinois Urbana-Champaign"
          },
          {
            "name": "전성희",
            "affiliation": "Belmont University"
          }
        ]
      },
      {
        "title": "산업계 이사",
        "members": [
          {
            "name": "최근우",
            "affiliation": "Genentech"
          },
          {
            "name": "원상희",
            "affiliation": "Suno"
          },
          {
            "name": "김재훈",
            "affiliation": "SiriusXM/Pandora"
          }
        ]
      }
    ],
    "committees": [
      {
        "name": "학생 간사",
        "members": [
          {
            "name": "도승헌",
            "affiliation": "한국과학기술원"
          },
          {
            "name": "한단비내린",
            "affiliation": "한국과학기술원"
          },
          {
            "name": "정해선",
            "affiliation": "서울대학교"
          },
          {
            "name": "이준원",
            "affiliation": "한국과학기술원"
          },
          {
            "name": "박윤정",
            "affiliation": "한국과학기술원"
          },
          {
            "name": "손호열",
            "affiliation": "한국과학기술원"
          },
          {
            "name": "방하연",
            "affiliation": "한국과학기술원"
          },
          {
            "name": "권대용",
            "affiliation": "한국과학기술원"
          }
        ]
      }
    ]
  };

  return (
    <div className="officers">
      {/* 학회장 및 부회장 */}
      <section className="executive-officers">
        <h2>학회장 및 부회장</h2>
        <div className="officers-grid">
          {officersData.executives.map((executive, index) => (
            <div key={index} className="officer-card">
              <h3>{executive.position}</h3>
              <p className="name">{executive.name}</p>
              <p className="affiliation">{executive.affiliation}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 이사회 */}
      <section className="board-directors">
        <h2>이사회</h2>
        <div className="directors-list">
          {officersData.directors.map((director, index) => (
            <div key={index} className="director">
              <h3>{director.title}</h3>
              <ul>
                {director.members.map((member, mIndex) => (
                  <li key={mIndex}>{member.name} ({member.affiliation})</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 운영위원회 */}
      <section className="committees">
        <h2>운영위원회</h2>
        <div className="committee-list">
          {officersData.committees.map((committee, index) => (
            <div key={index} className="committee">
              <h3>{committee.name}</h3>
              <ul>
                {committee.members.map((member, mIndex) => (
                  <li key={mIndex}>{member.name} ({member.affiliation})</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 자문위원회 */}
      {officersData.advisors && officersData.advisors.length > 0 && (
        <section className="advisory-board">
          <h2>자문위원회</h2>
          <div className="advisors-list">
            <ul>
              {officersData.advisors.map((advisor, index) => (
                <li key={index}>
                  <span className="name">{advisor.name}</span>
                  <span className="title">{advisor.title}</span>
                  <span className="affiliation">{advisor.affiliation}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}

export default Officers; 
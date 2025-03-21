import { useState, useEffect } from 'react';
import './Officers.css';

function Officers() {
  const [officersData, setOfficersData] = useState(null);

  useEffect(() => {
    const loadOfficersData = async () => {
      try {
        const response = await import('../data/officers.json');
        setOfficersData(response.default);
      } catch (error) {
        console.error('Error loading officers data:', error);
      }
    };

    loadOfficersData();
  }, []);

  if (!officersData) return <div>Loading...</div>;

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
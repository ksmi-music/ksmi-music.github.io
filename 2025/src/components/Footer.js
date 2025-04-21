import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>한국음악정보학회</h3>
          <p>대표자: 남주한</p>
          <p>고유번호: 207-82-72979</p>
          <p>이메일: ksmi2025@gmail.com</p>
          <p>주소: 대전광역시 유성구 어은로 57</p>

        </div>
        <div className="footer-section">
          <h3>빠른 링크</h3>
          <ul>
            <li><a href="/about">학회소개</a></li>
            <li><a href="/notice">공지사항</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 한국음악정보학회. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer; 
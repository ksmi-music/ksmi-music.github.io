import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/img/logo_ksmi.png" alt="한국음악정보학회 로고" />
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">홈</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">소개</Link>
          </li>
          <li className="nav-item">
            <Link to="/officers" className="nav-link">임원진</Link>
          </li>
          {/* <li className="nav-item">
            <Link to="/payment" className="nav-link">결제</Link>
          </li> */}
          {/* <li className="nav-item">
            <Link to="/seminars" className="nav-link">학술세미나</Link>
          </li>
          <li className="nav-item">
            <Link to="/rules" className="nav-link">회칙</Link>
          </li>
          <li className="nav-item">
            <Link to="/related-sites" className="nav-link">관련사이트</Link>
          </li>
          <li className="nav-item">
            <Link to="/notice" className="nav-link">공지사항</Link>
          </li> */}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar; 
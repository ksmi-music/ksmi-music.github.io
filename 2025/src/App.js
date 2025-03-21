import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Officers from './pages/Officers';
// import Seminars from './pages/Seminars';
import Rules from './pages/Rules';
import RelatedSites from './pages/RelatedSites';
import Notice from './pages/Notice';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/officers" element={<Officers />} />
            {/* <Route path="/seminars" element={<Seminars />} /> */}
            {/* <Route path="/rules" element={<Rules />} /> */}
            {/* <Route path="/related-sites" element={<RelatedSites />} /> */}
            {/* <Route path="/notice" element={<Notice />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

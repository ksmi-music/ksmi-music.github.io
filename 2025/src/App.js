import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Officers from './pages/Officers';
import Schedule from './pages/Schedule';
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
            <Route path="/schedule" element={<Schedule />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

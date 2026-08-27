import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Category from './pages/Category';
import Article from './pages/Article';
import Premium from './pages/Premium';
import StaticPage from './pages/StaticPage';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:category" element={<Category />} />
              <Route path="/article/:slug" element={<Article />} />
              <Route path="/premium" element={<Premium />} />
              <Route path="/about" element={<StaticPage title="About Us" />} />
              <Route path="/imprint" element={<StaticPage title="Imprint" />} />
              <Route path="/privacy" element={<StaticPage title="Privacy Policy" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;

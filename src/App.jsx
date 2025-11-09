import './App.css'
import Footer from './components/Footer';

import Header from './components/Header';
import Home from './pages/Home';
import Artisans from './pages/Artisans';
import NotFound from './pages/NotFound';
import ArtisanDetail from './pages/ArtisanDetail';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
    <Router>
        <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artisans" element={<Artisans />} />
        <Route path="/artisans/:id" element={<ArtisanDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
    </>
  )
}

export default App

import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import './components/FestivalPage.css';

export default function FestivalLayout() {
  useEffect(() => {
    const originalBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#111217';
    return () => {
      document.body.style.backgroundColor = originalBg;
    };
  }, []);

  return (
    <div className="festival-page">
      <Header />
      <main className="festival-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
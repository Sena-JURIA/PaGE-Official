
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import HeroCarousel from "./components/HeroCarousel";
import BlogList from './components/BlogList';
import BlogPostPage from './pages/blog/BlogPostPage';
import BlogLayout from './pages/blog/BlogLayout'; // Import the new BlogLayout

function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isMenuOpen]);

  return (
    <>
      <div className={`splash-overlay${showSplash ? "" : " hide"}`}>
        <h1 className="splash-title">PaGE</h1>
      </div>
      <div className={`main-content${showSplash ? " hidden" : ""}`}>
        <header className="site-header">
          <a href="/"><h1>PaGE</h1></a>
          <button 
            className="menu-toggle" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="main-nav"
          >
            <span className="sr-only">メニューを開閉</span>
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
          </button>
          <nav id="main-nav" className={`desktop-nav`}>
            <ul>
              <li><a href="/" className="active">ホーム</a></li>
              <li><a href="#activities">活動内容</a></li>
              <li><a href="/blog">ブログ</a></li>
              <li><a href="#links">リンク</a></li>
              <li><a href="#">その他</a></li>
            </ul>
          </nav>
          <nav id="main-nav-mobile" className={`mobile-nav ${isMenuOpen ? 'is-open' : ''}`}>
            <ul>
              <li><a href="/" className="active">ホーム</a></li>
              <li><a href="#activities">活動内容</a></li>
              <li><a href="/blog">ブログ</a></li>
              <li><a href="#links">リンク</a></li>
              <li><a href="#">その他</a></li>
            </ul>
          </nav>
          <div className={`menu-overlay ${isMenuOpen ? 'is-open' : ''}`} onClick={() => setIsMenuOpen(false)}></div>
        </header>

        <main>
          <section
            id="hero"
            className="hero-section content-section"
          >
            <HeroCarousel />
          </section>

          <section id="activities" className="content-section activities-list">
            <h2 className="section-title">主な活動</h2>
            <div className="cards-container">
              <div className="activity-card">
                <img src="https://placehold.co/400x250/FFDC00/333?text= アルゴリズム" alt="アルゴリズム" />
                <div className="activity-card-content">
                  <h3>アルゴリズム系の取り組み</h3>
                  <p>AtCoderへの参加や、頻出アルゴリズムについて学ぶ機会を設ける予定です。</p>
                  <a href="#" className="card-link">もっと見る &rarr;</a>
                </div>
              </div>
              <div className="activity-card">
                <img src="https://placehold.co/400x250/0074D9/FFF?text=Webサイト開発" alt="Webサイト開発" />
                <div className="activity-card-content">
                  <h3>Webサイト開発</h3>
                  <p>React + TypeScriptを用いてサイトを制作しております。</p>
                  <a href="#" className="card-link">もっと見る &rarr;</a>
                </div>
              </div>
              <div className="activity-card">
                <img src="https://placehold.co/400x250/F012BE/FFF?text=ゲーム制作" alt="ゲーム制作" />
                <div className="activity-card-content">
                  <h3>ゲーム制作</h3>
                  <p>ゲーム</p>
                  <a href="#" className="card-link">もっと見る &rarr;</a>
                </div>
              </div>
              <div className="activity-card">
                <img src="https://placehold.co/400x250/2ECC40/FFF?text=資格勉強" alt="資格勉強" />
                <div className="activity-card-content">
                  <h3>資格勉強の取り組み</h3>
                  <p>基本情報技術者試験に向けて頑張っています。</p>
                  <a href="#" className="card-link">もっと見る &rarr;</a>
                </div>
              </div>
            </div>
          </section>

          <section id="join-us" className="content-section join-us-section">
            <div className="container">
              <h2 className="section-title">仲間を募集中！</h2>
              <p className="join-us-message">
                PaGEでは、新しいプロジェクトやアイデアに共に挑戦してくれる仲間をいつでも歓迎しています。
                未経験者、他大学生の方も大歓迎です！
                あなたのスキルや情熱を活かして、一緒に面白いものを作りませんか？
              </p>
              <div className="join-us-details">
                <p><strong>こんな方におすすめ！</strong></p>
                <ul>
                  <li>新しい技術を学ぶのが好きな方</li>
                  <li>チームでの開発に興味がある方</li>
                  <li>自分のアイデアを形にしたい方</li>
                  <li>ゲームやWebサービスが好きな方</li>
                </ul>
              </div>
              <a href="#contact" className="cta-button">参加申請フォームへ</a>
            </div>
          </section>

          <section id="links" className="content-section links-section">
            <h2 className="section-title">関連リンク</h2>
            <a href="#">GitHub</a>
            <a href="/blog">ブログ記事</a>
            <a href="https://x.com/WearePaGE0125">X (旧Twitter)</a>
            <a href="#">作品ポートフォリオ</a>
          </section>
        </main>

        <footer className="site-footer">
          <section>
            <h4>リンク</h4>
            <a href="#" className="footer-link">About Us</a>
            <a href="/blog" className="footer-link">ブログ記事</a>
            <a href="https://x.com/WearePaGE0125" className="footer-link">X (旧Twitter)</a>
            <a href="#" className="footer-link">作品ポートフォリオ</a>
          </section>
          <section>
            <h4>仮</h4>
            <a href="#" className="footer-link">あ</a>
            <a href="#" className="footer-link">ああ</a>
            <a href="#" className="footer-link">あああ</a>
            <a href="#" className="footer-link">��あああ</a>
          </section>
          <section>
            <h4>仮2</h4>
            <a href="#" className="footer-link">あ</a>
            <a href="#" className="footer-link">ああ</a>
            <a href="#" className="footer-link">あああ</a>
            <a href="#" className="footer-link">ああああ</a>
          </section>
          <p>&copy; 2025 PaGE. All Rights Reserved.</p>
        </footer>
      </div>
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogLayout />}>
          <Route index element={<BlogList />} />
          <Route path=":postId" element={<BlogPostPage />} />
          <Route path="tags/:tagName" element={<BlogList />} />
          <Route path="authors/:authorId" element={<BlogList />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>,
);


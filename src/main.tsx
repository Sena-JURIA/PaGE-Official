import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import HeroCarousel from "./components/HeroCarousel";
import BlogList from './components/BlogList';
import BlogPostPage from './pages/blog/BlogPostPage';
import BlogLayout from './pages/blog/BlogLayout'; // Import the new BlogLayout
import QandA from './components/QandA';
import Layout from './components/Layout';
import gameImageUrl from './assets/images/game_image.png';

function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className={`splash-overlay${showSplash ? "" : " hide"}`}>
        <h1 className="splash-title">PaGE</h1>
      </div>
      <div className={`main-content${showSplash ? " hidden" : ""}`}>
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
                <img src="https://placehold.co/400x250/FFDC00/333?text=Algorithm" alt="アルゴリズム" />
                <div className="activity-card-content">
                  <h3>アルゴリズム系の取り組み</h3>
                  <p>AtCoderへの参加や、頻出アルゴリズムについて学ぶ機会を設ける予定です。</p>
                  <a href="#" className="card-link">Coming Soon...</a>
                </div>
              </div>
              <div className="activity-card">
                <img src="https://placehold.co/400x250/0074D9/FFF?text=Web" alt="Webサイト開発" />
                <div className="activity-card-content">
                  <h3>Webサイト開発</h3>
                  <p>React + TypeScriptを用いてサイトを制作しております。</p>
                  <a href="#" className="card-link">Coming Soon...</a>
                </div>
              </div>
              <div className="activity-card">
                <img src={gameImageUrl} alt="ゲーム制作" />
                <div className="activity-card-content">
                  <h3>ゲーム制作</h3>
                  <p>「ゔぃおーら・るなてぃっく！」をはじめ、様々なゲームを制作しています。</p>
                  <a href="#" className="card-link">Coming Soon...</a>
                </div>
              </div>
              <div className="activity-card">
                <img src="https://placehold.co/400x250/2ECC40/FFF?text=???" alt="資格勉強" />
                <div className="activity-card-content">
                  <h3>その他</h3>
                  <p>色々準備してます</p>
                  <a href="#" className="card-link">Coming Soon...</a>
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
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSdP_kxvYST2-IFc7e1RF7_OQ1A-JOQbURd275pC5UM6CdRg8A/viewform" className="cta-button">参加申請フォームへ</a>
            </div>
          </section>

          <section id="links" className="content-section links-section">
            <h2 className="section-title">関連リンク</h2>
            <a href="#">GitHub</a>
            <a href="/blog">ブログ記事</a>
            <a href="https://x.com/WearePaGE0125">X (旧Twitter)</a>
            <a href="/qanda">Q&A</a>
          </section>
      </div>
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="qanda" element={<QandA />} />
    </Route>
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
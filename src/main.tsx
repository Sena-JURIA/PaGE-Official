import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import HeroCarousel from "./components/HeroCarousel";
import BlogPostPage from './pages/blog/BlogPostPage'; // Import the new BlogPostPage
import BlogList from './components/BlogList'; // BlogListは一覧表示で使うので残します
import BlogLayout from './pages/blog/BlogLayout'; // Import the new BlogLayout
import QandA from './components/QandA';
import Layout from './components/Layout';
import uFesImageUrl from './assets/images/400.png';
import AtcoderimageUrl from './assets/images/logo_transparent.png';
import FestivalLayout from './festival-page/FestivalLayout';
import FestivalPage from './festival-page/page';
import GameDetailPage from './festival-page/GameDetailPage';
import SenaIcon from './assets/author_icon/sena.jpg';
import HAKKUNIcon from './assets/author_icon/HAKKUN.webp';
import YesIcon from './assets/author_icon/yes_antikiss.png';
import hakuIcon from './assets/author_icon/haku.png';
import SatoruIcon from './assets/author_icon/スクリーンショット 2025-09-24 173128.png';
import TsannIcon from './assets/author_icon/tsann.png';
import NeyadoraIcon from './assets/author_icon/thumbnail-default.png';

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
                <img src={AtcoderimageUrl} alt="アルゴリズム" />
                <div className="activity-card-content">
                  <h3>アルゴリズム系の取り組み</h3>
                  <p>AtCoderへの参加や、頻出アルゴリズムについて学ぶ機会を設ける予定です。</p>
                  <a href="#" className="card-link">Coming Soon...</a>
                </div>
              </div>
              <div className="activity-card">
                <img src="https://placehold.co/400x250/0074D9/FFF?text=Game" alt="イベント関係" />
                <div className="activity-card-content">
                  <h3>イベント関係</h3>
                  <p>大学祭などの出展イベントに向けていろいろなゲームを作ってます</p>
                  <a href="#" className="card-link">Coming Soon...</a>
                </div>
              </div>
              <div className="activity-card">
                <img src={uFesImageUrl} alt="大学祭" />
                <div className="activity-card-content">
                  <h3>大学祭特設ページ</h3>
                  <p>今年の大学祭の最新情報やイベントスケジュールはこちらでチェック！</p>
                <Link to="/festival-page" className="card-link">詳しくはこちら</Link>
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
                  <li>ゲーム制作が好きな方</li>
                </ul>
              </div>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSdP_kxvYST2-IFc7e1RF7_OQ1A-JOQbURd275pC5UM6CdRg8A/viewform" className="cta-button">参加申請フォームへ</a>
            </div>
          </section>

          <section id="team" className="content-section">
            <h2 className="section-title">代表挨拶</h2>
            <div className="cards-container">
              <div className="activity-card activity-card--horizontal">
                <img src={SenaIcon} alt="代表" />
                <div className="activity-card-content">
                  <h3>代表 猪上 勝(Sena)</h3>
                  <p>PaGEの代表です。この団体はゲームという魅力的な媒体を通して、新たな創作活動に挑戦しています。
                    メンバー同士が互いに切磋琢磨し、それぞれの個性とスキルを高め合える環境を目指しています。
                    皆さんと一緒に楽しい活動ができることを楽しみにしています！
                    <br />
                    【経歴】<br />
                    大阪電気通信大学情報通信工学部通信工学科4年。<br />
                    高校時代は生徒会役員を務め、大学一回生の時には大学祭実行委員会で管理部を担当。<br />
                    高校と大学で培った企業渉外などの経験を活かし、ゲーム制作コミュニティ「PaGE」を共同創立。<br />
                    2025年1月より、ゲーム制作を始め、企画・開発の両方を経験し、ゲーム制作開始から5ヶ月という短期間で学科内で初めて、「BitSummit XIII」に出展。<br />
                    金融×AI領域のスタートアップにて実践的な開発業務にも従事し、技術力と事業推進力の双方を磨く。
                  </p>
                </div>
              </div>
              <div className="activity-card activity-card--horizontal">
                <img src={HAKKUNIcon} alt="副代表" />
                <div className="activity-card-content">
                  <h3>副代表 横山 蒼太(HAKKUN)</h3>
                  <p>PaGE副代表です。
                    プログラム初心者なのでこの活動を通して成長できればいいなと思っています。
                    みんなで楽しくやるのが一番だと思うので、失敗しても、それを笑い飛ばせるくらいの気持ちでいきましょう！</p>
                  <br />
                    【経歴】<br />
                    大阪電気通信大学総合情報学部情報学科1年。<br />
                    代表の猪上と、ゲーム制作コミュニティ「PaGE」を共同創立。< br />
                    2025年7月より、ゲーム制作を始め、ゲーム制作開始から1ヶ月でNEXTA展にて出展したゲーム「消えた音色と七不思議」のメインプログラマーを務める。<br />
                </div>
              </div>
              <h3 className="sub-section-title">主要メンバー紹介</h3>
              <div className="activity-card">
                <img src={YesIcon} alt="会計" />
                <div className="activity-card-content">
                  <h3>会計 yes</h3>
                  <p>
                    Atcoder緑色です。精進してます<br/>
                    大学に入学して僅か3ヶ月程度でITパスポートと情報セキュリティマネジメント試験に合格しており、知識面・技術面の両面でメンバーをサポート <br/>
                  </p>
                </div>
              </div>
              <div className="activity-card">
                <img src={hakuIcon} alt="広報・SNS担当" />
                <div className="activity-card-content">
                  <h3>広報・SNS担当 haku</h3>
                  <p>大学2回生の学生クリエイター。<br/>
                  イラスト、デザイン。プログラム、アニメーション等も学習中であり、幅広いスキルでプロジェクト活動に貢献。</p>
                </div>
              </div>
              <div className="activity-card">
                <img src={SatoruIcon} alt="イラストレーター" />
                <div className="activity-card-content">
                  <h3>惺</h3>
                  <p>主に女性のイラストをメインに担当。<br />
                  ロゴ制作、キービジュアルデザインもしており、現在プランナーとしても活動中。</p>
                </div>
              </div>
              <div className="activity-card">
                <img src={TsannIcon} alt="デザイナー" />
                <div className="activity-card-content">
                  <h3>Tさん</h3>
                  <p>ゆるめの絵を主に書いて、｢どんなときも丁寧かつポジティブ｣をモットーに作品を制作中！！<br />
                    #絵描きのたまご。<br />
                    #有名クリエイター志望</p>
                </div>
              </div>
            </div>
          </section>

          <section id="partners" className="content-section">
            <h2 className="section-title">提携団体・企業様紹介</h2>
            <div className="cards-container">
              <div className="activity-card">
                <img src={NeyadoraIcon} alt="寝屋川ドライビングスクール" />
                <div className="activity-card-content">
                  <h3>寝屋川ドライビングスクール</h3>
                  <p>PaGEメンバーがタイアップゲームを制作し、「NEXTA」展にて展示しました！</p>
                  <a href="https://neyagawa-ds.co.jp/" target="_blank" rel="noopener noreferrer" className="card-link">公式サイトへ</a>
                </div>
              </div>
            </div>
            <p className="partners-note">順不同・敬称略</p>
          </section>
      </div>
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
        <Routes>
          {/* メインのヘッダーとフッターを持つルート */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="qanda" element={<QandA />} />
          </Route>

          {/* 大学祭関連のルート */}
          <Route path="/festival-page" element={<FestivalLayout />}>
            <Route index element={<FestivalPage />} />
            <Route path=":gameId" element={<GameDetailPage />} />
          </Route>

          {/* ブログ用のレイアウトを持つルート */}
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
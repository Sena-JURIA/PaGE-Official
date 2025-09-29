import { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import NewsSection from './components/NewsSection';
import EventSection from './components/EventSection';
import AccessSection from './components/AccessSection';
import FadeInSection from '../components/FadeInSection'; // アニメーション用にインポート
import GuestCreditSection from './components/GuestCreditSection';

export default function FestivalPage() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000); // 2秒後にスプラッシュを非表示
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* スプラッシュスクリーン */}
      <div className={`festival-splash-overlay${showSplash ? "" : " hide"}`}>
        <h1 className="festival-splash-title">NEXTA</h1>
      </div>

      {/* メインコンテンツ */}
      <div className={showSplash ? 'festival-content-hidden' : ''}>
        <div className="festival-announcement">
          <p>
            NEXTA展は終了しました！たくさんのご来場有難うございました。
            <br />
            次回のイベントは12月20日です！特設ページは10月14日に公開予定です。
          </p>
        </div>
        <HeroSection />
        <FadeInSection>
          <NewsSection />
        </FadeInSection>
        <FadeInSection>
          <EventSection />
        </FadeInSection>
        <FadeInSection>
          <AccessSection />
        </FadeInSection>
        <FadeInSection>
          <GuestCreditSection />
        </FadeInSection>
      </div>
    </>
  );
}
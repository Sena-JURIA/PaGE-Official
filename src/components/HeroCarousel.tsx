import { useState, useEffect } from "react";
// import { getPosts } from "../data/blogPosts"; // APIからのフェッチは不要になります
import { Link } from "react-router-dom";
import festivalInfo from "../assets/images/400.png"; // 大学祭情報のインポート

interface Slide {
  img: string;
  title: string;
  desc: string;
  link: string;
}

// 静的なスライドデータ。ブログ記事の代わりにこちらを使用します。
const staticSlides: Slide[] = [
  {
    img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop',
    title: 'PaGEへようこそ！',
    desc: '私たちはゲーム制作や競技プログラミングなど、様々な活動を行っています。',
    link: '#activities',
  },
  {
    img: festivalInfo,
    title: '大学祭に出展します！',
    desc: '今年の大学祭では、私たちが制作したゲームを展示します。ぜひ遊びに来てください！',
    link: '/festival-page',
  },
  {
    img: 'https://images.unsplash.com/photo-1580894732444-8ec53925b354?q=80&w=2070&auto=format&fit=crop',
    title: '新メンバー募集中',
    desc: 'プログラミングに興味がある方、一緒に何かを作りたい方、いつでも大歓迎です！',
    link: '#join-us',
  },
];

export default function HeroCarousel() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [current, setCurrent] = useState(0);
  const [isZooming, setIsZooming] = useState(true);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    // APIからブログ記事をフェッチする代わりに、静的なデータをセットします。
    setSlides(staticSlides);
  }, []);

  const goTo = (idx: number) => setCurrent(idx);
  const prev = () => slides.length > 0 && setCurrent((current - 1 + slides.length) % slides.length);
  const next = () => slides.length > 0 && setCurrent((current + 1) % slides.length);

  // スライド切り替え時にアニメーション中フラグを立てる
  useEffect(() => {
    if (slides.length > 0) {
      setIsZooming(true);
      const timer = setTimeout(() => setIsZooming(false), 5000); // 5秒間overflow: hidden
      return () => clearTimeout(timer);
    }
  }, [current, slides.length]);

  if (error) {
    return <div className="hero-carousel-error">カルーセルを読み込めませんでした: {error}</div>;
  }

  if (slides.length === 0) {
    return <div className="hero-carousel-loading">Loading...</div>; // Or a placeholder
  }

  return (
    <div className="hero-carousel">
      <div
        className="carousel-slides-container"
        style={{
          transform: `translateX(-${current * 100}%)`,
          display: "flex",
          transition: "transform 0.5s"
        }}
      >
        {slides.map((slide, idx) => (
          <div
            className="carousel-slide"
            key={idx}
            style={{
              minWidth: "100%",
              height: "60vh",
              overflow: isZooming && current === idx ? "hidden" : "auto"
            }}
          >
            <img
              key={current === idx ? `active-${idx}` : `inactive-${idx}`}
              src={slide.img}
              alt={slide.title}
              className="hero-zoom-img"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }}
            />
            <div className="slide-caption">
              <h3>{slide.title}</h3>
              <p>{slide.desc}</p>
              <Link to={slide.link} className="cta-button slide-cta">詳細を見る</Link>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-nav prev" aria-label="前のスライドへ" onClick={prev}>&#10094;</button>
      <button className="carousel-nav next" aria-label="次のスライドへ" onClick={next}>&#10095;</button>
      <div className="carousel-dots">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`dot${current === idx ? " active" : ""}`}
            aria-label={`スライド${idx + 1}へ`}
            onClick={() => goTo(idx)}
          />
        ))}
      </div>
    </div>
  );
}

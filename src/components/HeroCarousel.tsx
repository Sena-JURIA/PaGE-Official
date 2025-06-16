import React, { useState } from "react";

const slides = [
  {
    img: "https://placehold.co/1200x500/7FDBFF/333?text=注目のゲーム+1",
    title: "ゲームタイトル ALPHA",
    desc: "革新的なゲームプレイと美しいグラフィックが融合した、次世代の体験をあなたに。",
    link: "#game-alpha-details"
  },
  {
    img: "https://placehold.co/1200x500/39CCCC/FFF?text=ピックアップゲーム+BETA",
    title: "プロジェクト BETA",
    desc: "仲間と協力し、広大な世界を冒険しよう。無限の可能性が待っている。",
    link: "#project-beta-details"
  },
  {
    img: "https://placehold.co/1200x500/01FF70/333?text=最新作+GAMMA",
    title: "最新作 GAMMA",
    desc: "手に汗握るストーリーと、戦略的なバトルが楽しめる意欲作。",
    link: "#latest-gamma-details"
  }
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const goTo = (idx: number) => setCurrent(idx);
  const prev = () => setCurrent((current - 1 + slides.length) % slides.length);
  const next = () => setCurrent((current + 1) % slides.length);

  return (
    <div className="hero-carousel">
      <div className="carousel-slides-container" style={{ transform: `translateX(-${current * 100}%)`, display: "flex", transition: "transform 0.5s" }}>
        {slides.map((slide, idx) => (
          <div className="carousel-slide" key={idx} style={{ minWidth: "100%" }}>
            <img src={slide.img} alt={slide.title} />
            <div className="slide-caption">
              <h3>{slide.title}</h3>
              <p>{slide.desc}</p>
              <a href={slide.link} className="cta-button slide-cta">詳細を見る</a>
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

// CSS styles
const styles = `
.splash-overlay {
  position: fixed;
  z-index: 2000;
  inset: 0;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  pointer-events: all;
  transition: opacity 0.8s cubic-bezier(.4,0,.2,1);
}

.splash-overlay.hide {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.8s cubic-bezier(.4,0,.2,1);
}
`;

// Inject styles into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
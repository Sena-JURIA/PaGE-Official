import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="festival-footer">
      <div className="festival-footer-container">
        <div className="festival-social-links">
          <a href="https://x.com/WearePaGE0125" target="_blank" rel="noopener noreferrer" aria-label="X (formerly Twitter)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
            </svg>
          </a>
        </div>
        <nav className="festival-footer-nav">
          <Link to="/" className="festival-footer-link">トップ</Link>
          <a href="#news" className="festival-footer-link">お知らせ</a>
          <a href="#events" className="festival-footer-link">ゲーム紹介</a>
          <a href="#access" className="festival-footer-link">アクセス</a>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSdP_kxvYST2-IFc7e1RF7_OQ1A-JOQbURd275pC5UM6CdRg8A/viewform" target="_blank" rel="noopener noreferrer" className="festival-footer-link">お問い合わせ</a>
        </nav>
        <p className="festival-copyright">
          &copy; 2025 PaGE. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
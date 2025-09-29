import { Link } from 'react-router-dom';
import nextaLogo from '../../assets/images/6b94218c35011d23コピー.png'; // ロゴ画像のパスを仮定しています。実際のパスに修正してください。

export default function Header() {
  return (
    <header className="festival-header">
      <Link to="/festival-page" className="festival-logo-link">
        <img src={nextaLogo} alt="NEXTA vol.1-星彩繚乱- ロゴ" className="festival-logo" />
      </Link>
      <nav className="festival-nav">
        <ul>
          <li><a href="#news">お知らせ</a></li>
          <li><a href="#events">ゲーム紹介</a></li>
          <li><a href="#access">アクセス</a></li>
        </ul>
      </nav>
    </header>
  );
}
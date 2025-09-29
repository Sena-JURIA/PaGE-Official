// お知らせのデータ型を定義
type NewsItem = {
  date: string;
  title: string;
  url: string;
};

// サンプルデータ
const newsData: NewsItem[] = [
  { date: '2025.09.15', title: '特設サイトをオープンしました！', url: '#' },
  { date: '2025.09.13', title: '公式Xにて開催までのカウントダウンを開始！', url: 'https://x.com/WearePaGE0125' },
  { date: '2025.09.06', title: '今年のテーマが「星彩繚乱」に決定しました。', url: '#' },
];

export default function NewsSection() {
  return (
    <section id="news" className="festival-section news-section">
      <h2 className="festival-section-title">News</h2>
      <ul className="news-list">
        {newsData.map((item, index) => (
          <li key={index} className="news-item">
            <a
              href={item.url}
              className="news-link"
              target={item.url.startsWith('http') ? '_blank' : undefined}
              rel={item.url.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              <time className="news-date">{item.date}</time>
              <span className="news-title">{item.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
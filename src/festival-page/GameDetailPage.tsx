import { useParams, Link } from 'react-router-dom';
import { getGameById } from './components/games';

export default function GameDetailPage() {
  const { gameId } = useParams<{ gameId: string }>();
  const game = getGameById(gameId);

  if (!game) {
    return (
      <section className="game-detail-section" style={{ textAlign: 'center' }}>
        <h2>ゲームが見つかりません</h2>
        <Link to="/festival-page" className="access-map-link" style={{ marginTop: '2rem' }}>
          大学祭ページに戻る
        </Link>
      </section>
    );
  }

  return (
    <section className="game-detail-section">
      <div className="game-detail-content">
        <img src={game.imageUrl} alt={game.title} className="game-detail-img" />
        <div className="game-detail-text">
          <h2 className="game-detail-title">{game.title}</h2>
          <div
            className="game-detail-description"
            dangerouslySetInnerHTML={{ __html: game.detail.description }}
          />
          {game.detail.credits && <p className="game-detail-credits"><strong>制作:</strong> {game.detail.credits}</p>}
          {game.detail.note && <p className="game-detail-note">{game.detail.note}</p>}
          <Link to="/festival-page" className="access-map-link" style={{ marginTop: '2rem' }}>
            大学祭ページに戻る
          </Link>
        </div>
      </div>
    </section>
  );
}
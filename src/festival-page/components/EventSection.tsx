import { Link } from 'react-router-dom';
import { games } from '../components/games';
import type { Game } from './types';

const EventCard = ({ game }: { game: Game }) => {
  const isComingSoon = game.title === 'Coming Soon';
  const cardClassName = `event-card ${isComingSoon ? 'event-card--coming-soon' : ''}`;

  return (
    <Link to={`/festival-page/${game.id}`} className={cardClassName}>
      <img src={game.imageUrl} alt={game.title} className="event-card-img" />
      <div className="event-card-content">
        <h3 className="event-card-title">{game.title}</h3>
        <p className="event-card-description">{game.description}</p>
      </div>
    </Link>
  );
};

export default function EventSection() {
  return (
    <section id="events" className="festival-section event-section">
      <h2 className="festival-section-title">ゲーム紹介</h2>
      <div className="event-cards-container">
        {games.map((game) => (
          <EventCard
            key={game.id}
            game={game}
          />
        ))}
      </div>
    </section>
  );
}
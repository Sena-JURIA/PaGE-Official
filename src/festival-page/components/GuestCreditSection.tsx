import guestIcon from '../../assets/images/pJguDF64_400x400.jpg'; // ゲストのアイコン画像をインポート

const GuestCreditSection = () => {
  return (
    <section id="guest-credit" className="festival-section guest-credit-section">
      <h2 className="festival-section-title">Special Thanks</h2>
      <div className="guest-credit-content">
        <div className="guest-credit-item">
          <img src={guestIcon} alt="麗星夜いぶ" className="guest-credit-icon" />
          <div className="guest-credit-details">
            <p className="guest-credit-role">メインビジュアル担当</p>
            <div className="guest-credit-name-container">
              <p className="guest-credit-name">麗星夜いぶ</p>
              <a href="https://x.com/Eve24186720" target="_blank" rel="noopener noreferrer" className="guest-credit-social-link" aria-label="麗星夜いぶさんのXプロフィール">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="guest-credit-social-icon">
                  <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuestCreditSection;
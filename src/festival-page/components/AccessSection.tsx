export default function AccessSection() {
  return (
    <section id="access" className="festival-section access-section">
      <h2 className="festival-section-title">Access</h2>
      <div className="access-content">
        <div className="access-map">
          <iframe 
            loading="lazy" 
            style={{ display: 'block', margin: '0 auto', maxWidth: '100%' }} 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3897.9579220795154!2d135.6233765621699!3d34.76116346506581!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60011e69b69c1f33%3A0x5d3ef7e4bba601!2z44CSNTcyLTA4MzMg5aSn6Ziq5bqc5a-d5bGL5bed5biC5Yid55S677yR77yY!5e0!3m2!1sja!2sjp!4v1696240449478!5m2!1sja!2sjp" 
            width="80%" 
            height="450"
            allowFullScreen={true}
          >
          </iframe>
        </div>
        <div className="access-info">
          <h3>会場：大阪電気通信大学 寝屋川キャンパス J-408</h3>
          <p>
            〒572-8530 大阪府寝屋川市初町18-8
          </p>
          <h4>電車でのアクセス</h4>
          <ul>
            <li>京阪本線「寝屋川市」駅から徒歩約7分</li>
            <li>京阪本線「萱島」駅から徒歩約10分</li>
          </ul>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=大阪電気通信大学寝屋川キャンパス"
            target="_blank"
            rel="noopener noreferrer"
            className="access-map-link"
          >
            Googleマップでルートを検索
          </a>
        </div>
      </div>
    </section>
  );
}
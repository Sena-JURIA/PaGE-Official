
import React from 'react';
import './QandA.css';
import { qandaData } from '../data/qandaData';

const QandA: React.FC = () => {
  return (
    <div className="qanda-container">
      <main>
        <section id="faq-section" className="content-block faq-block">
          <h2 className="section-heading">
            <span className="title-main">Q&A</span>
            <span className="title-sub">よくある質問</span>
          </h2>
        </section>
        <div className="card-layout-container">
          {qandaData.map((item, index) => (
            <div className="info-card" key={index}>
              <div className="info-card-content">
                <h3>{item.question}</h3>
                <p dangerouslySetInnerHTML={{ __html: item.answer }} />
                {item.link && (
                  <p>
                    <a href={item.link} className="form-button-link">
                      {item.linkText}
                    </a>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default QandA;

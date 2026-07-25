import React from 'react';
import Layout from '../../components/layout';
import Image from 'next/image';
import copenhagen from '../../data/travel-guides/copenhagen';

const CopenhagenGuide = () => {
  const total = copenhagen.reduce((n, section) => n + section.places.length, 0);

  return (
    <Layout
      title="Copenhagen"
      description="Where to stay, what to see and where to eat in my hometown."
      socialImage="/images/travel/copenhagen/christianshavn.webp"
      center
    >
      <div className="guide">
        <header>
          <h1>Copenhagen</h1>
          <p className="intro">
            My hometown, and the list I send friends before they visit.
            {' '}{total} places to stay, see, eat and drink.
          </p>
          <nav className="jump">
            {copenhagen.map((section) => (
              <a href={`#${section.category.toLowerCase()}`} key={section.category}>
                {section.category}
              </a>
            ))}
          </nav>
        </header>

        {copenhagen.map((section) => (
          <section key={section.category} id={section.category.toLowerCase()}>
            <h2>{section.category}</h2>
            <div className="items-grid">
              {section.places.map((place) => (
                <a
                  href={place.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="item-card"
                  key={place.name}
                >
                  <div className="image-wrapper">
                    <Image
                      src={place.image}
                      alt={place.name}
                      width={600}
                      height={450}
                      className="item-image"
                    />
                  </div>
                  <div className="item-info">
                    <div className="item-meta">
                      <span className="place-meta">{place.meta}</span>
                    </div>
                    <h3 className="item-name">{place.name}</h3>
                    <p className="item-description">{place.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>

      <style jsx>{`
        .guide {
          margin: 0 auto;
          max-width: 1400px;
        }

        header {
          margin-bottom: 56px;
        }

        h1 {
          margin: 0 0 12px 0;
        }

        .intro {
          color: #666;
          margin: 0;
          font-size: 16px;
          line-height: 1.6;
          max-width: 42em;
        }

        .jump {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 18px;
          margin-top: 24px;
        }

        .jump a {
          font-size: 13px;
          color: #666;
          text-decoration: none;
          letter-spacing: 0.02em;
        }

        .jump a:hover {
          color: #000;
          text-decoration: underline;
        }

        section {
          margin-bottom: 60px;
          scroll-margin-top: 24px;
        }

        h2 {
          font-size: 20px;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid #eaeaea;
        }

        .items-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 40px 32px;
        }

        @media (max-width: 768px) {
          .items-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }

        .item-card {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: inherit;
        }

        .image-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
          border-radius: 12px;
          overflow: hidden;
          background-color: #f5f5f5;
          margin-bottom: 16px;
        }

        :global(.item-image) {
          width: 100%;
          height: 100%;
          object-fit: cover;
          /* The files keep their colour; the grid is desaturated here so
             hovering a card brings its real colour back. */
          filter: grayscale(1);
          transition: transform 0.5s ease, filter 0.5s ease;
        }

        .item-card:hover :global(.item-image) {
          transform: scale(1.03);
          filter: grayscale(0);
        }

        .item-info {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }

        .item-meta {
          margin-bottom: 4px;
        }

        .place-meta {
          font-size: 13px;
          color: #666;
          font-weight: 500;
          letter-spacing: 0.01em;
        }

        .item-name {
          font-size: 18px;
          font-weight: 600;
          margin: 0;
          color: #000;
          line-height: 1.4;
          letter-spacing: -0.01em;
        }

        .item-card:hover .item-name {
          text-decoration: underline;
        }

        .item-description {
          font-size: 14px;
          color: #666;
          line-height: 1.5;
          margin: 6px 0 0 0;
        }
      `}</style>
    </Layout>
  );
};

export default CopenhagenGuide;

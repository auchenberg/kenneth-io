import Layout from '../components/layout';
import press from '../data/press';
import { pressStructuredData } from '../helpers/seo';

const DESCRIPTION =
  'Selected press, interviews, podcasts, and news featuring Kenneth Auchenberg.';

const languageLabels = {
  'da-DK': 'Danish',
  'de-DE': 'German',
};

const formatDate = (date) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T12:00:00Z`));

const PressItem = ({ item }) => {
  const details = [
    item.type,
    item.outlet,
    item.durationLabel,
    languageLabels[item.language],
  ].filter(Boolean);

  return (
    <li className="press-item">
      <div className="press-meta">
        <span>{details.join(' · ')}</span>
        <time dateTime={item.date}>{formatDate(item.date)}</time>
      </div>
      <h3>
        <a href={item.url} target="_blank" rel="noopener noreferrer">
          {item.title} <span aria-hidden="true">↗</span>
        </a>
      </h3>
      <p>{item.description}</p>

      <style jsx>{`
        .press-item {
          border-top: 1px solid #e7e7e7;
          list-style: none;
          padding: 1.5rem 0 1.65rem;
        }

        .press-meta {
          align-items: baseline;
          color: #707070;
          display: flex;
          font-size: 12px;
          gap: 1rem;
          justify-content: space-between;
          line-height: 18px;
          margin-bottom: 0.45rem;
        }

        .press-meta time {
          flex-shrink: 0;
        }

        h3 {
          font-size: 18px;
          line-height: 24px;
          margin: 0 0 0.55rem;
        }

        h3 a {
          color: #202020;
          text-decoration-thickness: 1px;
          text-underline-offset: 3px;
        }

        h3 a:hover {
          color: #0066cc;
        }

        h3 span {
          color: #777;
          font-size: 13px;
          white-space: nowrap;
        }

        p {
          color: #555;
          line-height: 21px;
          margin: 0;
        }

        @media (max-width: 520px) {
          .press-meta {
            align-items: flex-start;
            flex-direction: column;
            gap: 0;
          }
        }
      `}</style>
    </li>
  );
};

const Press = () => {
  const itemsByYear = press.reduce((years, item) => {
    const year = item.date.slice(0, 4);
    years[year] = years[year] || [];
    years[year].push(item);
    return years;
  }, {});

  const years = Object.keys(itemsByYear).sort((a, b) => b - a);

  return (
    <Layout
      title="Press"
      seoTitle="Kenneth Auchenberg — Press, Interviews, and Podcasts"
      description={DESCRIPTION}
      canonicalPath="/press"
      structuredData={pressStructuredData(press)}
      center
    >
      <main className="press-page">
        <header className="press-header">
          <h1>Press</h1>
          <p>
            Selected interviews, podcasts, profiles, and coverage of my work in
            AI, developer tools, infrastructure, and investing.
          </p>
        </header>

        <div className="press-years">
          {years.map((year) => (
            <section className="press-year" key={year} aria-labelledby={`year-${year}`}>
              <h2 id={`year-${year}`}>{year}</h2>
              <ul>
                {itemsByYear[year].map((item) => (
                  <PressItem key={item.url} item={item} />
                ))}
              </ul>
            </section>
          ))}
        </div>

        <aside className="press-contact">
          <h2>Press inquiries</h2>
          <p>
            For interviews, speaking, or media requests, email{' '}
            <a href="mailto:kenneth@auchenberg.dk">kenneth@auchenberg.dk</a>.
          </p>
        </aside>
      </main>

      <style jsx>{`
        .press-page {
          max-width: 700px;
        }

        .press-header {
          margin-bottom: 3.25rem;
        }

        .press-header h1 {
          margin-bottom: 0.8rem;
        }

        .press-header p {
          color: #555;
          font-size: 17px;
          line-height: 25px;
          margin: 0;
          max-width: 610px;
        }

        .press-year {
          display: grid;
          gap: 2rem;
          grid-template-columns: 70px minmax(0, 1fr);
          margin-bottom: 2.5rem;
        }

        .press-year h2 {
          color: #777;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.04em;
          line-height: 20px;
          margin: 1.5rem 0 0;
        }

        .press-year ul {
          margin: 0;
          padding: 0;
        }

        .press-contact {
          border-top: 1px solid #d8d8d8;
          margin: 3rem 0 1rem 102px;
          padding-top: 1.5rem;
        }

        .press-contact h2 {
          font-size: 18px;
          margin: 0 0 0.5rem;
        }

        .press-contact p {
          margin: 0;
        }

        @media (max-width: 600px) {
          .press-header {
            margin-bottom: 2.5rem;
          }

          .press-year {
            display: block;
            margin-bottom: 3rem;
          }

          .press-year h2 {
            margin: 0 0 0.75rem;
          }

          .press-contact {
            margin-left: 0;
          }
        }
      `}</style>
    </Layout>
  );
};

export default Press;

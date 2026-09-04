import React from 'react';
import Layout from '../components/layout';
import {PROFILE_URLS} from '../helpers/seo';

const principles = [
  {
    title: 'Force multipliers',
    description:
      'A better tool changes what an entire team can build, how quickly they can ship, and which ideas become practical.',
  },
  {
    title: 'Product-led distribution',
    description:
      'Developers try tools, read the docs, and share what works. A useful product can spread from a project to a team to a company.',
  },
  {
    title: 'New platform shifts',
    description:
      'Cloud, open source, and now AI have each changed how software gets made, creating room for new tools and infrastructure.',
  },
  {
    title: 'Demanding users',
    description:
      'Developers expect speed, reliability, clear documentation, and a product they can try before they talk to sales.',
  },
];

const companies = [
  ['Linear', 'https://linear.app/', 'The system for product development'],
  ['Bolt.new', 'https://bolt.new', 'Invented the concept of vibe coding'],
  ['Resend', 'https://resend.com', 'Email infrastructure for developers'],
  ['Replay', 'https://replay.io', 'Time-travel debugging'],
  ['Browserbase', 'https://browserbase.com', 'Browser infrastructure for AI'],
  ['turbopuffer', 'https://turbopuffer.com', 'Search infrastructure on object storage'],
  ['Dosu', 'https://dosu.dev', 'Knowledge infrastructure for agents and humans'],
  ['Git AI', 'https://usegitai.com', 'Tracking AI-generated code to production'],
];

const Investing = () => (
  <Layout
    title="What I invest in"
    description="How Kenneth Auchenberg thinks about software infrastructure, developer-focused companies, and investing."
    canonicalPath="/investing"
    center
  >
    <div className="investing">
      <header>
        <h1>What I invest in</h1>
        <p className="intro">
          AI, developer tools, and the software infrastructure that makes other
          products possible.
        </p>
      </header>

      <section>
        <h2>Why software infrastructure?</h2>
        <p>
          Infrastructure is the software that other software is built on. Most
          customers never see it, but every product depends on it to store data,
          run code, send messages, take payments, stay secure, and work reliably.
        </p>
        <p>
          If your product is a restaurant, infrastructure is the kitchen,
          refrigeration, power, and supply chain. Diners come for the meal, but
          the systems behind it determine what the team can serve, how
          consistently, and at what scale.
        </p>
      </section>

      <section>
        <h2>Why developers?</h2>
        <p>
          An ICP, or ideal customer profile, is the person or company a product
          is designed to serve. In a developer-focused company, a developer is
          often the user and internal champion, even when an engineering leader
          signs the contract.
        </p>

        <div className="principles">
          {principles.map((principle) => (
            <div className="principle" key={principle.title}>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </div>
          ))}
        </div>

        <p>
          The best developer products respect the user&rsquo;s time. They are quick
          to understand, easy to try, reliable under pressure, and documented
          well enough that someone can succeed without talking to sales. That
          product quality is not polish around the business. It is the business.
        </p>
      </section>

      <section>
        <h2>Selected investments</h2>
        <div className="companies">
          {companies.map(([name, url, description]) => (
            <a href={url} className="company" key={name}>
              <h3>{name}</h3>
              <p>{description}</p>
            </a>
          ))}
        </div>
        <p className="footnote">
          Selected angel investments made through{' '}
          <a href="https://developers.vc">developers.vc</a>. Today, I invest as a
          partner at{' '}
          <a href={PROFILE_URLS.innovationEndeavors}>Innovation Endeavors</a>.
        </p>
      </section>

      <p className="contact">
        Building in AI, developer tools, or infrastructure?{' '}
        <a href="mailto:kenneth@auchenberg.dk">Get in touch</a>.
      </p>
    </div>

    <style jsx>{`
      .investing {
        margin: 0 auto;
        max-width: 600px;
      }

      header {
        margin-bottom: 48px;
      }

      h1 {
        margin: 0 0 12px 0;
      }

      .intro {
        color: #666;
        font-size: 16px;
        line-height: 1.6;
        margin: 0;
      }

      section {
        margin-bottom: 40px;
      }

      h2 {
        border-bottom: 1px solid #eaeaea;
        font-size: 20px;
        margin-bottom: 20px;
        padding-bottom: 10px;
      }

      section > p {
        font-size: 14px;
        line-height: 1.6;
      }

      .principles,
      .companies {
        display: grid;
        gap: 24px 32px;
        grid-template-columns: repeat(2, 1fr);
        margin: 28px 0;
      }

      .principle h3,
      .company h3 {
        color: #000;
        font-size: 13px;
        font-weight: 600;
        margin: 0 0 6px 0;
      }

      .principle p,
      .company p {
        color: #666;
        font-size: 13px;
        line-height: 1.6;
        margin: 0;
      }

      .company {
        color: inherit;
        text-decoration: none;
      }

      .company:hover h3 {
        text-decoration: underline;
      }

      .footnote {
        color: #999;
        font-size: 13px;
        margin: 28px 0 0 0;
      }

      .contact {
        font-size: 14px;
        margin: 0;
        padding-bottom: 40px;
      }

      @media (max-width: 560px) {
        .principles,
        .companies {
          grid-template-columns: 1fr;
        }

      }
    `}</style>
  </Layout>
);

export default Investing;

import React from 'react';
import Link from 'next/link';
import Layout from '../components/layout';
import Nav from '../components/nav';

const Home = () => {
  return (
    <Layout title="Hej" main>
      <div className="home">
        <h1>Kenneth Auchenberg</h1>
        <p className="wave">👋</p>
        <p>Hej there, I'm Kenneth.</p>

        <p>I'm a product leader, angel investor, strategic advisor focused on developer tools based in NYC.</p>

        <p>
          Before that I worked at <a href="https://stripe.com">Stripe</a>, building developer experience infrastructure and ecosystems.</p>

        <p>Prior to that I spent a few years at Microsoft, building developer tools such as
          Visual Studio Code and browser DevTools.
        </p>
        <p>
         When I was based in Europe, I co-founded{' '}
          <a href="https://coldfront.co">ColdFront</a>, and was a part of the
          Danish startups, Podio and ZYB, who both got acquired with the Podio
          going to Citrix, and ZYB going to Vodafone.
        </p>
        <p>
          I'm a Global Shaper for{' '}
          <a href="https://www.weforum.org/">Word Economic Forum</a>, serve on
          multiple advisory boards and a frequent public speaker who travels the
          world
        </p>
        <p>
          I love helping people and am always up for a ☕️ so shoot me an email
          at <a href="">kenneth@auchenberg.dk</a> or ping me at Twitter{' '}
          <a href="https://twitter.com/auchenberg">@auchenberg</a> if you wanna
          chat.
        </p>
        <Nav />
      </div>
      <style jsx>{`
        @keyframes wave-animation {
          0% {
            transform: rotate(0deg);
          }
          10% {
            transform: rotate(-10deg);
          }
          20% {
            transform: rotate(50deg);
          }
          30% {
            transform: rotate(-10deg);
          }
          40% {
            transform: rotate(9deg);
          }
          50% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }

        h1 {
          font-size: 35px;
          font-weight: 600;
        }

        h2 {
          font-size: 16px;
          width: 70%;
        }

        .wave {
          font-size: 30px;
          animation-name: wave-animation;
          animation-duration: 2.5s;
          animation-iteration-count: infinite;
          transform-origin: 70% 70%;
          display: inline-block;
        }
      `}</style>
    </Layout>
  );
};

export default Home;

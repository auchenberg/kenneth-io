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

        <p>I'm a partner at <a href="https://alleycorp.com">AlleyCorp</a>, a New York-based venture capital firm, where I focus on AI, developer tools, and infrastructure.</p>

        <p>Before stepping into venture capital, I spent two decades building products and leading engineering teams. As an <a href="https://developers.vc/">angel investor</a>, I help and support founders building for developers.</p>

        <p>My journey brought me to the US to work on developer tools at Microsoft, where I was a part of the early <a href="https://code.visualstudio.com/">Visual Studio Code</a> team. Later, at <a href="https://stripe.com">Stripe</a>, I led the work on our developer platform and platform for extensibility.</p>

        <p>
          I was born and raised in Copenhagen, Denmark, where I co-founded the technology <a href="https://clearleft.com/thinking/ice-cold-in-copenhagen">ColdFront conference</a>, the hacker café <a href="/post/rebooting-prototype-our-hacker-cafe-in-copenhagen">Prototype</a>, and was a part of the Danish startups <a href="https://techcrunch.com/2012/04/11/citrix-acquires-cloud-based-social-business-collaboration-platform-podio/">Podio</a> and <a href="https://archive.nytimes.com/www.nytimes.com/idg/IDG_852573C4006938800025744B003E6D64.html?ref=technology">ZYB</a>, both of which were acquired, by Citrix and Vodafone, respectively.
        </p>

        <p>
          I love helping people and am always up for a coffee ☕️.
        </p>

        <p> Drop me a line
          at <a href="mailto:kenneth@auchenberg.dk">kenneth@auchenberg.dk</a> or reach out on X at{' '}
          <a href="https://twitter.com/auchenberg">@auchenberg</a>.</p>
        <Nav />
      </div>
      <style jsx>{`
        @keyframes wave-animation {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          10% {
            transform: translateY(0) rotate(-10deg);
          }
          20% {
            transform: translateY(0) rotate(50deg);
          }
          30% {
            transform: translateY(0) rotate(-10deg);
          }
          40% {
            transform: translateY(0) rotate(9deg);
          }
          50% {
            transform: translateY(0) rotate(0deg);
          }
          100% {
            transform: translateY(0) rotate(0deg);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .home p:not(.wave) {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .home p:not(.wave):nth-of-type(2) {
          animation-delay: 0.1s;
        }

        .home p:not(.wave):nth-of-type(3) {
          animation-delay: 0.2s;
        }

        .home p:not(.wave):nth-of-type(4) {
          animation-delay: 0.3s;
        }

        .home p:not(.wave):nth-of-type(5) {
          animation-delay: 0.4s;
        }

        .home p:not(.wave):nth-of-type(6) {
          animation-delay: 0.5s;
        }

        .home p:not(.wave):nth-of-type(7) {
          animation-delay: 0.6s;
        }

        .home p:not(.wave):nth-of-type(8) {
          animation-delay: 0.7s;
        }

        .home p:not(.wave):nth-of-type(9) {
          animation-delay: 0.8s;
        }

        .home p.wave {
          font-size: 30px;
          animation: fadeInUp 0.6s ease-out 0.05s forwards, wave-animation 2.5s ease-in-out 0.65s infinite;
          transform-origin: 70% 70%;
          display: inline-block;
          opacity: 0;
        }

        h1 {
          font-size: 35px;
          font-weight: 600;
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        h2 {
          font-size: 16px;
          width: 70%;
        }

        .home :global(.menu) {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
          animation-delay: 0.9s;
        }

        .home :global(.menu a) {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .home :global(.menu a:nth-child(1)) {
          animation-delay: 1s;
        }

        .home :global(.menu a:nth-child(2)) {
          animation-delay: 1.1s;
        }

        .home :global(.menu a:nth-child(3)) {
          animation-delay: 1.2s;
        }

        .home :global(.menu a:nth-child(4)) {
          animation-delay: 1.3s;
        }
      `}</style>
    </Layout>
  );
};

export default Home;

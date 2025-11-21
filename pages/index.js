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

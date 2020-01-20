import React from 'react';
import Link from 'next/link';
import Layout from '../components/layout';
import Nav from '../components/nav';

class Home extends React.Component {
  render() {
    return (
      <Layout title="Welcome" main>
        <div className="home">
          <h1>Kenneth Auchenberg</h1>
          <p className="wave">👋</p>
          <p>Hej there, I'm Kenneth.</p>
          <p>
            I work at <a href="https://stripe.com">Stripe</a>, building economic
            infrastructure for the internet.
          </p>{' '}
          <p>
            Before that I worked at Microsoft building developer tools such as
            Visual Studio Code and Edge DevTools.
          </p>
          <p>
            Prior to that I co-founded{' '}
            <a href="https://coldfront.co">ColdFront</a>, and been a part of two
            startup acquisitions with the Podio (=> Citrix) and ZYB (=>
            Vodafone).
          </p>
          <p>
            I'm a Global Shaper for{' '}
            <a href="https://www.weforum.org/">Word Economic Forum</a>, serves
            on multiple advisory boards, and I'm a frequent public speaker who
            travels the world.
          </p>
          <p>
            I love helping people, and I'm always up for a ☕️so shoot me an
            email at <a href="">kenneth@auchenberg.dk</a> or ping me at Twitter{' '}
            <a href="https://twitter.com/auchenberg">@auchenberg</a> if you
            wanna chat.
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
            animation-name: wave-animation;
            animation-duration: 2.5s;
            animation-iteration-count: infinite;
            transform-origin: 70% 70%;
            display: inline-block;
          }
        `}</style>
      </Layout>
    );
  }
}

export default Home;

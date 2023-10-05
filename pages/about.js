import React from 'react';
import Link from 'next/link';
import Layout from '../components/layout';
import Nav from '../components/nav';

export default class About extends React.Component {
  render() {
    return (
      <Layout title="About Kenenth Auchenberg" center>
        <div className="page-about">
          <h1>About</h1>
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
        </div>
        <style jsx>{``}</style>
      </Layout>
    );
  }
}

import React from 'react';

import Layout from '../components/layout';
import {getTalks} from '../helpers/getTalks';

class Speaking extends React.Component {
  static async getInitialProps() {
    if (typeof window === 'undefined') {
      return {
        talks: getTalks(),
      };
    }
  }

  render() {
    const talks = () => {
      let talks = this.props.talks;

      return talks.map((talk) => {
        return (
          <li key={talk.event} className="talk">
            <h4>
              <a href="{talk.url}">{talk.title}</a>
            </h4>
            <h5>{talk.event}</h5>
            <date>{talk.date}</date>
            <p>{talk.place}</p>
            <style jsx>{`
              .talk {
                list-style: none;
                padding: 0px;
              }

              h4 {
                font-size: 20px;
              }
            `}</style>
          </li>
        );
      });
    };
    return (
      <Layout title="Speaking" center>
        <div className="speaking">
          <h1>Speaking</h1>
          <p>
            I often speak in public; in communities, at conferences and in
            companies. Mostly I talk about the web platform, but you'll also
            hear me talk about things like architecture, minimalism and design,
            simply because I'm curious about how we, human beings, interpret and
            interact with the world.
          </p>
          <p>
            If you want me to speak at your event, please feel free to{' '}
            <a href="/contact/">contact me</a>, and let's see if it makes sense.
          </p>
          <img src="/images/me_full_frontal_web.jpg" />
          <p>
            Photo credits:{' '}
            <a href="http://www.flickr.com/photos/drewm/10757628855">
              Drew McLellan
            </a>
            , Full Frontal 2013, Brigthon
          </p>

          <h2>Past talks</h2>
          <ul className="list">{talks()}</ul>
        </div>
        <style jsx>{`
          img {
            width: 100%;
          }

          .list {
            margin: 30px 0 0 0;
            padding: 0;
          }
        `}</style>
      </Layout>
    );
  }
}

export default Speaking;

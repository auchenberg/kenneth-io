import React from 'react';
import Link from 'next/link';
import Layout from '../components/layout';
import Nav from '../components/nav';

export default class About extends React.Component {
  render() {
    return (
      <Layout title="About Kenenth Auchenberg">
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
          {/* <p>
            Kenneth is a Program Manager at Microsoft and lives in Vancouver,
            Canada, where he leads the next generation of web developer tooling.
            He's a Global Shaper for Word Economic Forum, serves on multiple
            advisory boards, and is a frequent public speaker who travels the
            world.
          </p>

          <img src="images/me_coldfront15.jpg" />

          <p>
            Kenneth has been all connecting dots over the last decade. He quit
            his gas station clerk job at 16 to code web scrapers, and fell
            deeply in love with the web, so he took a job at a newly acquired
            startup, ZYB, and saw it grow from 15 people in a basement to
            100.000 people in skyscrapers around the world in Vodafone. He then
            once again went back to the basement and joined Hoist (later Podio),
            and helped take the startup on a very similar journey from basement
            to skyscraper, when Citrix bought the small Copenhagen-based company
            in April 2012
          </p>

          <p>
            Recently, he skipped the basement for a change, and went straight to
            Microsoft on a mission to get browsers to talk to text editors and
            to enable everyone to build the developer tools they need for the
            web.
          </p>

          <p>
            Getting things and people talking isn't a new thing for Kenneth.
            During the last decade he repeatedly asked himself why everything
            isn’t as connected as it could be.
          </p>

          <h3>Why don’t browsers talk to text editors?</h3>
          <p>
            With the RemoteDebug initiative, Kenneth enables exactly that — a
            potential rethink of how we code for the web, and how a new
            generation of tooling can be built. He now works as a Program
            Manager at Microsoft to get that conversation going.
          </p>

          <h3>Why can't I just talk to people without installing software?</h3>
          <p>
            Literally by expensing the project costs to his own credit card,
            Kenneth disrupted Citrix’s flagship GoToMeeting video conferencing
            platform from within, by building a peer to peer video meeting
            system, that avoided complicated signup flows, expensive severs and
            annoying latency.
          </p>

          <h3>Why don’t startups talk to startups?</h3>
          <p>
            Cliques and a lack of international visibility led to a new
            non-profit, #CPHFTW. Kenneth joined from the start and helped unite
            the Danish tech scene, spawning the #CPHFTW platform, hashtag and
            pieces international media like{' '}
            <a href="http://www.forbes.com/sites/edmundingham/2015/11/06/48-hours-on-the-copenhagen-start-up-scene-what-i-learned/2/#263c5e186f91">
              Forbes
            </a>
            ,{' '}
            <a href="http://www.theguardian.com/small-business-network/2016/mar/10/cool-copenhagen-startup-community">
              The Guardian
            </a>
            , and{' '}
            <a href="http://www.ft.com/cms/s/0/15672dc4-1fdb-11e5-ab0f-6bb9974f25d0.html">
              Financial Times
            </a>
          </p>

          <h3>Why doesn’t JavaScripters talk to other JavaScripters?</h3>
          <p>
            Being the only front-end guy at Podio, and lacking inspiration and
            solutions from others, Kenneth asked on Twitter, “why don’t we all
            meet?” One month later, equally frustrated engineers knocked on the
            door to the Podio office, and just a few years later CopenhagenJS
            has grown to 1.000+ members with meetups in both Copenhagen, Denmark
            and Malmö, Sweden.
          </p>

          <h3>
            Why doesn’t the international front-end industry talk to the Danish
            crowd?
          </h3>

          <p>
            One of the products of the CopenhagenJS meetups was a desire to take
            the next step — an international conference, in Copenhagen, focusing
            solely on front-end. Along with a co-founder, Kenneth created
            ColdFront, invited speakers from all over the world, and had over
            1.000 participants by selling out three years in a row.
          </p> */}
          {/* <!--<h2>Press mentions</h2>
    <ul class="list">
      <li>
        <h4><a href="http://www.version2.dk/artikel/frontendudvikler-internet-explorer-8-forurening-html5-49943">Version2: IE8 is pollution for HTML5</a></h4>
        <date>January 2013</date>
        <p>After I spoke at Microsoft Warm Crocodile Conference in Copenhagen, a journalist from the biggest danish IT newspaper, Version2, pickup my statement, and I ended at the front-page of the paper.</p>
      </li>
      <li>
        <h4><a href="">Trendsonline: 1</a></h4>
        <date>September 2015</date>
        <p></p>
      </li>    
      <li>
        <h4><a href="">Trendsonline: 2</a></h4>
        <date>September 2015</date>
        <p></p>
      </li>
      <li>
        <h4><a href="">ProData Konsulent Nyt: 1</a></h4>
        <date>September 2015</date>
        <p></p>
      </li>
      <li>
        <h4>SocialSquare Christmas Calendar</h4>
        <date>September 2015</date>
        <p></p>
      </li> 
      <li>
        <h4>DotNetRocks podcast: RemoteDebug</h4>
        <date>September 2015</date>
        <p></p>
      </li>                    
    </ul>--> */}
          {/* <h2>Awards</h2>
          <ul class="list">
            <li>
              <h4>Citrix Blueprint Leadership</h4>
              <date>November 2014</date>
              <p>Award for leading change in the product organization.</p>
            </li>
            <li>
              <h4>Citrix Connect Tech Fair: Winner</h4>
              <date>2013</date>
              <p>Best internal product innovation in 2013.</p>
            </li>
            <li>
              <h4>Citrix Excellence</h4>
              <date>2012</date>
              <p>Award for impact in organization 2012/2013.</p>
            </li>
          </ul>
          <h2>Organizations</h2>
          <ul class="list">
            <li>
              <h4>
                <a
                  href="http://www.weforum.org/community/global-shapers"
                  target="_blank"
                >
                  Global Shaper under World Economic Forum
                </a>
              </h4>
              <date>July 2015 - Present </date>
              <p>
                The Global Shapers Community is a network of Hubs developed and
                led by young people who are exceptional in their potential,
                their achievement and their drive to make a contribution to
                their communities.{' '}
              </p>
            </li>
          </ul>
          <h2>Patents</h2>
          <ul class="list">
            <li>
              <h4>
                <a
                  href="https://www.google.com.mm/patents/US20140350997"
                  target="_blank"
                >
                  WO2014190011: User-defined workflows In app-based
                  collaborative workspace system
                </a>
              </h4>
              <date>Filed April 2014</date>

              <p>
                An online collaborative workspace system includes a set of first
                subsystems and a workflow subsystem. The first subsystems
                provide a project-oriented social network environment in which
                system users collaboratively interact with user-defined
                application objects that store user data and user-determined
                application functions executed to display the user data and
                interlink the application objects into project-scale
                organizations.
              </p>
            </li>
          </ul>
          <h2>Education</h2>
          <ul class="list">
            <li>
              <h4>Copenhagen Business School</h4>
              <date>2013 – 2013</date>
              <p>
                Macroeconomics and financial systems. Took a single course in
                macroeconomics and financial systems to get a deeper
                understanding on the financial crisis.
              </p>
              <h5>Copenhagen, Denmark</h5>
            </li>

            <li>
              <h4>HTX Sukkertoppen (College)</h4>
              <date>2005 – 2008</date>
              <p>Software Development & Communication</p>
              <h5>Copenhagen, Denmark</h5>
            </li>
          </ul>
          <h2>Photos</h2>
          <ul class="list grid photos">
            <li>
              <img src="/images/me_coldfront.jpg" />
            </li>
          </ul> */}
        </div>
        <style jsx>{`
          h1 {
            font-size: 35px;
            font-weight: 600;
          }

          h2 {
            font-size: 16px;
            width: 70%;
          }
        `}</style>
      </Layout>
    );
  }
}

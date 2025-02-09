import React from 'react';
import Link from 'next/link';

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="menu">
        <a href="/posts">Thoughts</a>
        <a href="https://instagram.com/auchenberg">Photography</a>
        <a href="/objects">Objects</a>
        <a href="/travel">Travel</a>

        <style jsx>{`
          .menu {
            margin-top: 40px;
          }

          a {
            display: block;
            font-size: 20px;
            color: #000;
            margin-bottom: 10px;
          }
        `}</style>
      </nav>
    );
  }
}

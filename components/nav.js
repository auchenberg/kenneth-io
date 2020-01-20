import React from 'react';
import Link from 'next/link';

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="menu">
        <a href="/posts">Articles</a>
        <a href="/projects">Projects</a>
        <a href="/speaking">Speaking</a>
        <a href="https://instagram.com/auchenberg">Photography</a>
        <a href="/about">About</a>

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
export default Nav;

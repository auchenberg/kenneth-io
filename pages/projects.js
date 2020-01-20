import React from 'react';

import Layout from '../components/layout';
import {getProjects} from '../helpers/getProjects';

export default class Projects extends React.Component {
  static async getInitialProps() {
    if (typeof window === 'undefined') {
      return {
        projects: getProjects(),
      };
    }
  }

  render() {
    const projects = () => {
      let projects = this.props.projects;

      return projects.map((item) => {
        return (
          <li key={item.event} className="item">
            <h4>
              <a href={item.url} target="_blank">
                {item.title}
              </a>
            </h4>
            <p>{item.description}</p>
            <style jsx>{`
              .item {
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
      <Layout title="Speaking">
        <div className="speaking">
          <h1>Projects</h1>
          <ul className="list">{projects()}</ul>
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

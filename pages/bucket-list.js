import React from 'react';
import Layout from '../components/layout';
import { getBucketList } from '../helpers/getBucketList';

const BucketListPage = ({ bucketListData }) => {
    const { metadata, categories } = bucketListData;

    // Calculate completion stats
    const calculateStats = () => {
        let totalItems = 0;
        let completedItems = 0;

        Object.values(categories).forEach(items => {
            totalItems += items.length;
            completedItems += items.filter(item => item.completed).length;
        });

        return {
            total: totalItems,
            completed: completedItems,
            percentage: totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0
        };
    };

    const stats = calculateStats();

    return (
        <Layout
            title={`${metadata.title} - ${stats.completed}/${stats.total} completed`}
            description={metadata.description}
            center
        >
            <div className="bucket-list">
                <header>
                    <h1>{metadata.title}</h1>
                    <p className="intro">{metadata.description}</p>
                    <div className="stats">
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: `${stats.percentage}%` }}
                            ></div>
                        </div>
                        <p className="progress-text">
                            {stats.completed} of {stats.total} completed ({stats.percentage}%)
                        </p>
                    </div>
                </header>

                {Object.entries(categories).map(([category, items]) => {
                    const categoryCompleted = items.filter(item => item.completed).length;
                    const categoryTotal = items.length;
                    const categoryPercentage = categoryTotal > 0 ? Math.round((categoryCompleted / categoryTotal) * 100) : 0;

                    return (
                        <section key={category}>
                            <h2>
                                {category}
                                <span className="category-stats">
                                    {categoryCompleted}/{categoryTotal}
                                </span>
                            </h2>
                            <div className="items">
                                {items.map((item, index) => (
                                    <div className={`item ${item.completed ? 'completed' : ''}`} key={index}>
                                        <div className="checkbox">
                                            {item.completed ? '[x]' : '[ ]'}
                                        </div>
                                        <span className="text">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    );
                })}
            </div>

            <style jsx>{`
        .bucket-list {
          margin: 0 auto;
          max-width: 800px;
          padding: 0 20px;
        }

        .intro {
          color: #666;
          margin-bottom: 30px;
          max-width: 600px;
        }

        .stats {
          margin-bottom: 40px;
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background-color: #f0f0f0;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 10px;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #4CAF50, #8BC34A);
          transition: width 0.3s ease;
        }

        .progress-text {
          color: #666;
          font-size: 14px;
          margin: 0;
        }

        section {
          margin-bottom: 50px;
        }

        h2 {
          font-size: 16px;
          margin-bottom: 15px;
          padding-bottom: 5px;
          border-bottom: 1px solid #333;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: normal;
        }

        .category-stats {
          font-size: 12px;
          color: #666;
          font-weight: normal;
        }

        .items {
          display: block;
        }

        .item {
          display: flex;
          align-items: flex-start;
          padding: 0px 0;
          border: none;
          background: none;
          font-size: 14px;
          line-height: 1.4;
        }

        .item.completed .text {
          text-decoration: line-through;
          color: #888;
        }

        .checkbox {
          margin-right: 5px;
          font-family: 'Courier New', monospace;
          font-size: 14px;  
          color: #333;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .text {
          flex: 1;
          color: #333;
        }

        @media (max-width: 768px) {
          .bucket-list {
            padding: 0 15px;
          }
          
          .item {
            padding: 4px 0;
          }
        }
      `}</style>
        </Layout>
    );
};

export async function getStaticProps() {
    const bucketListData = getBucketList();

    return {
        props: {
            bucketListData
        }
    };
}

export default BucketListPage; 
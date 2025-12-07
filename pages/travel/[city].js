import React from 'react';
import Layout from '../../components/layout';
import Link from 'next/link';
import MarkdownIt from 'markdown-it';
import { getAllTravelGuides, getTravelGuideBySlug } from '../../helpers/getTravelGuides';

const md = new MarkdownIt({
    html: true,
    linkify: true,
    breaks: true
});

const TravelGuidePage = ({ guide }) => {
    if (!guide) {
        return (
            <Layout title="Travel Guide Not Found" center>
                <div className="not-found">
                    <h1>Travel guide not found</h1>
                    <Link href="/travel">← Back to travel guides</Link>
                </div>
            </Layout>
        );
    }

    const htmlContent = md.render(guide.content);

    return (
        <Layout
            title={`${guide.title}`}
            description={`${guide.description}`}
            center
        >
            <div className="travel-guide">
                <header>
                    <h1>{guide.title}</h1>
                    {<p className="country">{guide.description}</p>}
                </header>

                <div
                    className="content"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
            </div>

            <style jsx>{`
                .travel-guide {
                    margin: 0 auto;
                    max-width: 800px;
                    padding: 0 20px;
                }

                header {
                    margin-bottom: 30px;
                }

                header :global(h1) {
                    font-size: 30px;
                }

                .content {
                    line-height: 1.6;
                }

                .content :global(h2) {
                    font-size: 16px;
                    margin-top: 40px;
                    margin-bottom: 15px;
                    padding-bottom: 5px;
                    border-bottom: 1px solid #eaeaea;
                    font-weight: bold;
                }

                .content :global(h2:first-child) {
                    margin-top: 0;
                }

                .content :global(h3) {
                    font-size: 14px;
                    margin-top: 25px;
                    margin-bottom: 10px;
                    font-weight: normal;
                }

                .content :global(ul) {
                    list-style: none;
                    padding: 0;
                    margin: 0 0 20px 0;
                }

                .content :global(li) {
                    margin-bottom: 8px;
                    padding-left: 0;
                    line-height: 1.5;
                    display: list-item;
                }

                .content :global(li::before) {
                    content: '• ';
                    margin-right: 8px;
                    display: inline-block;
                    font-size: 24px;
                    line-height: 1;
                }

                .content :global(ul ul) {
                    margin-left: 20px;
                    margin-top: 5px;
                    margin-bottom: 10px;
                }

                .content :global(ul ul li) {
                    margin-bottom: 5px;
                }

                .content :global(ul ul li::before) {
                    content: '• ';
                    margin-right: 8px;
                    font-size: 24px;
                    line-height: 1;
                }

                .content :global(li p) {
                    margin: 0;
                    display: inline;
                }

                .content :global(li > a) {
                    word-break: break-all;
                }

                .content :global(li:empty) {
                    display: none;
                }

                .content :global(a) {
                    color: #333;
                    text-decoration: underline;
                }

                .content :global(a:hover) {
                    opacity: 0.7;
                }

                .content :global(strong) {
                    font-weight: bold;
                }

                .content :global(em) {
                    font-style: italic;
                }

                @media (max-width: 768px) {
                    .travel-guide {
                        padding: 0 15px;
                    }

                    h1 {
                        font-size: 24px;
                    }
                }
            `}</style>
        </Layout>
    );
};

export async function getStaticPaths() {
    const guides = getAllTravelGuides();

    const paths = guides.map((guide) => ({
        params: { city: guide.slug }
    }));

    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps({ params }) {
    const guide = getTravelGuideBySlug(params.city);

    return {
        props: {
            guide
        }
    };
}

export default TravelGuidePage;


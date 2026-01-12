import React, { useState } from 'react';
import Layout from '../components/layout';

const Bio = () => {
    const [copied, setCopied] = useState(false);

    const bioText = `Kenneth Auchenberg is a partner at AlleyCorp, a New York-based venture capital firm, where he focuses on AI, developer tools, and infrastructure.

Before stepping into venture capital, he spent two decades building products and leading engineering teams at the forefront of developer platforms. At Stripe, he led the work on their developer platform, and helped scale Stripe to the first $1T in PV. At Microsoft, he was a part of the early Visual Studio Code team, building what became the most used code editor in the world.

Kenneth was born and raised in Copenhagen, Denmark, where he co-founded the technology ColdFront conference, ran the hacker café Prototype, and was a part of the Danish startups Podio and ZYB, which were some of the biggest exits in Denmark, with the acquisitions by Citrix and Vodafone, respectively.

Kenneth is based in New York City.`;

    const copyBio = async () => {
        try {
            await navigator.clipboard.writeText(bioText);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    const headshots = [
        { src: '/images/headshots/headshot.jpg', alt: 'Kenneth Auchenberg' },
        { src: '/images/headshots/headshot2.jpg', alt: 'Kenneth Auchenberg' },
    ];

    return (
        <Layout title="Bio" description="Bio for Kenneth Auchenberg" center>
            <div className="page-bio">
                <h1>Bio</h1>

                <div className="bio-section">
                    <div className="bio-header">
                        <h2>About Kenneth Auchenberg</h2>
                        <button onClick={copyBio} className="copy-button">
                            {copied ? 'Copied!' : 'Copy bio'}
                        </button>
                    </div>

                    <div className="bio-content">
                        <p>
                            Kenneth Auchenberg is a partner at{' '}
                            <a href="https://alleycorp.com">AlleyCorp</a>, a New York-based
                            venture capital firm, where he focuses on AI, developer tools, and
                            infrastructure.
                        </p>

                        <p>
                            Before stepping into venture capital, he spent two decades building products and leading engineering teams at the forefront of developer platforms. At <a href="https://stripe.com">Stripe</a>, he led the work on their developer platform, and helped scale Stripe to the first $1T in PV. At <a href="https://microsoft.com">Microsoft</a>, he was a part of the early{' '}
                            <a href="https://code.visualstudio.com/">Visual Studio Code</a> team, building what became the most used code editor in the world.

                        </p>

                        <p>
                            Kenneth was born and raised in Copenhagen, Denmark, where he co-founded the
                            technology{' '}
                            <a href="https://clearleft.com/thinking/ice-cold-in-copenhagen">
                                ColdFront conference
                            </a>
                            , ran the hacker café{' '}
                            <a href="/post/rebooting-prototype-our-hacker-cafe-in-copenhagen">
                                Prototype
                            </a>
                            , and was a part of the Danish startups{' '}
                            <a href="https://techcrunch.com/2012/04/11/citrix-acquires-cloud-based-social-business-collaboration-platform-podio/">
                                Podio
                            </a>{' '}
                            and{' '}
                            <a href="https://archive.nytimes.com/www.nytimes.com/idg/IDG_852573C4006938800025744B003E6D64.html?ref=technology">
                                ZYB
                            </a>
                            , which were some of the biggest exits in Denmark, with the acquisitions by Citrix and Vodafone, respectively.
                        </p>

                        <p>
                            Kenneth is based in New York City.
                        </p>
                    </div>
                </div>

                <div className="headshots-section">
                    <h2>Headshots</h2>
                    <p className="headshots-description">
                        Click on an image to download the full resolution version.
                    </p>
                    <div className="headshots-grid">
                        {headshots.map((headshot, index) => (
                            <a
                                key={index}
                                href={headshot.src}
                                target="_blank"
                                className="headshot-item"
                            >
                                <img src={headshot.src} alt={headshot.alt} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
            <style jsx>{`
                .page-bio {
                    max-width: 700px;
                }

                .page-bio h1 {
                    margin-bottom: 2rem;
                }

                .bio-section {
                    margin-bottom: 3rem;
                }

                .bio-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                }

                .bio-header h2 {
                    margin: 0;
                    font-size: 1.25rem;
                }

                .copy-button {
                    background: none;
                    color: #0066cc;
                    border: none;
                    padding: 0;
                    font-size: 12px;
                    cursor: pointer;
                    text-decoration: underline;
                }

                .copy-button:hover {
                    color: #0052a3;
                }

                .bio-content p {
                    font-size: 14px;
                    line-height: 20px;
                    margin-bottom: 1.25em;
                }

                .headshots-section h2 {
                    font-size: 1.25rem;
                    margin-bottom: 0.5rem;
                }

                .headshots-description {
                    color: #666;
                    font-size: 14px;
                    margin-bottom: 1.5rem;
                }

                .headshots-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                }

                .headshot-item {
                    display: block;
                    aspect-ratio: 1;
                    overflow: hidden;
                    border: 1px solid #eee;
                    transition: border-color 0.2s ease;
                }

                .headshot-item:hover {
                    border-color: #000;
                }

                .headshot-item img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                @media (max-width: 600px) {
                    .bio-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 1rem;
                    }

                    .headshots-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </Layout>
    );
};

export default Bio;

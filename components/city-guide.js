import React, { useState } from 'react';
import Layout from './layout';
import Image from 'next/image';

// Shared layout for the city travel guides. A guide page supplies the city,
// an intro line and its sections; everything else is the same across guides
// so they stay visually identical as more are added.
//
// `sections` is an array of { category, places: [{ name, meta, description,
// link, image }] } — the shape the data files in data/travel-guides export.
const anchor = (category) => category.toLowerCase().replace(/\s+/g, '-');

// Down the first column, then the second — the reading order CSS columns gave.
const splitInTwo = (places) => {
    const half = Math.ceil(places.length / 2);
    return [places.slice(0, half), places.slice(half)];
};

const CityGuide = ({ city, intro, description, socialImage, sections }) => {
    const total = sections.reduce((n, section) => n + section.places.length, 0);
    // A hundred places is a long scroll in photos. List view is the same
    // content as plain columns of links, for when you know what you're after.
    const [view, setView] = useState('grid');

    return (
        <Layout title={city} description={description} socialImage={socialImage} center>
            <div className="guide">
                <header>
                    {/* The view switch sits on the title line, well clear of
                        the category links — sharing that row read as a clash. */}
                    <div className="title-row">
                        <h1>{city}</h1>
                        <div className="views">
                            {['grid', 'list'].map((option) => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => setView(option)}
                                    className={view === option ? 'current' : undefined}
                                    aria-pressed={view === option}
                                >
                                    {option === 'grid' ? 'Grid' : 'List'}
                                </button>
                            ))}
                        </div>
                    </div>
                    <p className="intro">
                        {intro} {total} places to stay, see, eat and drink.
                    </p>
                    <nav className="jump">
                        {sections.map((section) => (
                            <a href={`#${anchor(section.category)}`} key={section.category}>
                                {section.category}
                            </a>
                        ))}
                    </nav>
                </header>

                {sections.map((section) => (
                    <section key={section.category} id={anchor(section.category)}>
                        <h2>{section.category}</h2>
                        {view === 'list' ? (
                            /* Two explicit lists rather than CSS columns: the
                               right one is right-aligned, and a multi-column
                               flow can't be styled per column. */
                            <div className="place-columns">
                                {splitInTwo(section.places).map((column, index) => (
                                    <ul className={index === 1 ? 'place-list end' : 'place-list'} key={index}>
                                        {column.map((place) => (
                                            <li key={place.name}>
                                                <a href={place.link} target="_blank" rel="noopener noreferrer">
                                                    {place.name}
                                                </a>
                                                <span className="list-meta">{place.meta}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ))}
                            </div>
                        ) : (
                        <div className="items-grid">
                            {section.places.map((place) => (
                                <a
                                    href={place.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="item-card"
                                    key={place.name}
                                >
                                    <div className="image-wrapper">
                                        <Image
                                            src={place.image}
                                            alt={place.name}
                                            width={600}
                                            height={450}
                                            className="item-image"
                                        />
                                    </div>
                                    <div className="item-info">
                                        <div className="item-meta">
                                            <span className="place-meta">{place.meta}</span>
                                        </div>
                                        <h3 className="item-name">{place.name}</h3>
                                        <p className="item-description">{place.description}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                        )}
                    </section>
                ))}
            </div>

            <style jsx>{`
                .guide {
                    margin: 0 auto;
                    max-width: 1400px;
                }

                header {
                    margin-bottom: 56px;
                }

                .title-row {
                    display: flex;
                    align-items: baseline;
                    justify-content: space-between;
                    gap: 24px;
                }

                h1 {
                    margin: 0 0 12px 0;
                }

                .intro {
                    color: #666;
                    margin: 0;
                    font-size: 16px;
                    line-height: 1.6;
                    max-width: 42em;
                }

                .jump {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px 18px;
                    margin-top: 24px;
                }

                .jump a {
                    font-size: 13px;
                    color: #666;
                    text-decoration: none;
                    letter-spacing: 0.02em;
                }

                .jump a:hover {
                    color: #000;
                    text-decoration: underline;
                }

                .views {
                    display: flex;
                    gap: 14px;
                    flex-shrink: 0;
                }

                .views button {
                    appearance: none;
                    background: none;
                    border: 0;
                    padding: 0;
                    font: inherit;
                    font-size: 13px;
                    color: #bbb;
                    cursor: pointer;
                    letter-spacing: 0.02em;
                }

                .views button:hover {
                    color: #666;
                }

                .views button.current {
                    color: #000;
                    font-weight: 500;
                }

                section {
                    margin-bottom: 60px;
                    scroll-margin-top: 24px;
                }

                /* List view: plain bullets flowed into columns, so a long
                   category reads as one scannable block. */
                /* Same column geometry as the grid, so switching views doesn't
                   shift anything sideways. */
                .place-columns {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 0 32px;
                }

                .place-list {
                    margin: 0;
                    padding: 0;
                    list-style: none;
                }

                .place-list li {
                    margin-bottom: 7px;
                    line-height: 1.45;
                    position: relative;
                    padding-left: 17px;
                }

                .place-list li::before {
                    content: '•';
                    position: absolute;
                    left: 2px;
                    top: 0;
                    color: #bbb;
                }

                /* Right column mirrors the left: text to the right edge, and
                   the bullet flips over with it so it stays beside the text. */
                .place-list.end {
                    text-align: right;
                }

                .place-list.end li {
                    padding-left: 0;
                    padding-right: 17px;
                }

                .place-list.end li::before {
                    left: auto;
                    right: 2px;
                }

                /* Stacked on a narrow screen, so both read left. */
                @media (max-width: 560px) {
                    .place-columns {
                        grid-template-columns: 1fr;
                    }

                    .place-list.end {
                        text-align: left;
                    }

                    .place-list.end li {
                        padding-left: 17px;
                        padding-right: 0;
                    }

                    .place-list.end li::before {
                        left: 2px;
                        right: auto;
                    }
                }

                .place-list a {
                    color: #000;
                    text-decoration: none;
                    font-size: 14px;
                }

                .place-list a:hover {
                    text-decoration: underline;
                }

                .list-meta {
                    display: block;
                    font-size: 12px;
                    color: #999;
                }

                h2 {
                    font-size: 20px;
                    margin-bottom: 20px;
                    padding-bottom: 10px;
                    border-bottom: 1px solid #eaeaea;
                }

                .items-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 40px 32px;
                }

                @media (max-width: 768px) {
                    .items-grid {
                        grid-template-columns: 1fr;
                        gap: 32px;
                    }
                }

                .item-card {
                    display: flex;
                    flex-direction: column;
                    text-decoration: none;
                    color: inherit;
                }

                .image-wrapper {
                    position: relative;
                    width: 100%;
                    aspect-ratio: 4/3;
                    border-radius: 12px;
                    overflow: hidden;
                    background-color: #f5f5f5;
                    margin-bottom: 16px;
                }

                :global(.item-image) {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s ease;
                }

                /* The photos show in colour; hovering keeps the lift. To get
                   the desaturated grid back, add filter: grayscale(1) to the
                   rule above and filter: grayscale(0) to this one. */
                .item-card:hover :global(.item-image) {
                    transform: scale(1.03);
                }

                .item-info {
                    display: flex;
                    flex-direction: column;
                    gap: 1px;
                }

                .item-meta {
                    margin-bottom: 4px;
                }

                .place-meta {
                    font-size: 13px;
                    color: #666;
                    font-weight: 500;
                    letter-spacing: 0.01em;
                }

                .item-name {
                    font-size: 18px;
                    font-weight: 600;
                    margin: 0;
                    color: #000;
                    line-height: 1.4;
                    letter-spacing: -0.01em;
                }

                .item-card:hover .item-name {
                    text-decoration: underline;
                }

                .item-description {
                    font-size: 14px;
                    color: #666;
                    line-height: 1.5;
                    margin: 6px 0 0 0;
                }
            `}</style>
        </Layout>
    );
};

export default CityGuide;

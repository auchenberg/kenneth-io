import React, { useEffect, useRef, useState } from 'react';
import Layout from '../../components/layout';
import Link from 'next/link';
import Image from 'next/image';
import * as d3 from 'd3';
import { feature } from 'topojson-client';
import worldData from '../../public/data/world.json';
import copenhagen from '../../data/travel-guides/copenhagen';

// Countries I've visited, grouped by region. Names match the `name`
// property in public/data/world.json.
const visitedByRegion = {
    'Europe': [
        'Andorra',
        'Austria',
        'Belgium',
        'Bulgaria',
        'Czechia',
        'Denmark',
        'France',
        'Germany',
        'Greece',
        'Iceland',
        'Italy',
        'Netherlands',
        'Norway',
        'Poland',
        'Portugal',
        'Romania',
        'Spain',
        'Sweden',
        'Switzerland',
        'United Kingdom',
    ],
    'Asia': [
        'Bangladesh',
        'Cambodia',
        'China',
        'India',
        'Indonesia',
        'Japan',
        'Laos',
        'Malaysia',
        'Myanmar',
        'Qatar',
        'Singapore',
        'South Korea',
        'Taiwan',
        'Thailand',
        'Timor-Leste',
        'Vietnam',
    ],
    'North America': ['Canada', 'Cuba', 'Mexico', 'United States of America'],
    'South America': ['Argentina', 'Colombia'],
};

const visited = new Set(Object.values(visitedByRegion).flat());

// Countries too small to have a polygon in the 110m topology. Without
// these they'd silently vanish from the map.
const microStates = [
    { name: 'Andorra', coordinates: [1.52, 42.51] },
    { name: 'Singapore', coordinates: [103.82, 1.35] },
];

const DISPLAY_NAMES = { 'United States of America': 'United States' };
const displayName = (name) => DISPLAY_NAMES[name] || name;

// Some countries ship as one multipolygon that includes overseas territory,
// so marking the country visited lights up somewhere I haven't been. Split
// those out into their own features. Bounds are [west, south, east, north].
const TERRITORY_SPLITS = {
    // France's polygon includes French Guiana, which would put South
    // America on the map for a trip to Paris.
    France: [{ name: 'French Guiana', bounds: [-55, -2, -50, 7] }],
};

const ringCentroid = (ring) => {
    let x = 0;
    let y = 0;
    for (const point of ring) {
        x += point[0];
        y += point[1];
    }
    return [x / ring.length, y / ring.length];
};

const within = ([x, y], [west, south, east, north]) =>
    x >= west && x <= east && y >= south && y <= north;

const splitTerritories = (features) =>
    features.flatMap((f) => {
        const splits = TERRITORY_SPLITS[f.properties.name];
        if (!splits || f.geometry.type !== 'MultiPolygon') return [f];

        const home = [];
        const carved = new Map(splits.map((s) => [s.name, []]));
        for (const polygon of f.geometry.coordinates) {
            const match = splits.find((s) => within(ringCentroid(polygon[0]), s.bounds));
            (match ? carved.get(match.name) : home).push(polygon);
        }

        return [
            { ...f, geometry: { type: 'MultiPolygon', coordinates: home } },
            ...[...carved]
                .filter(([, polygons]) => polygons.length)
                .map(([name, polygons]) => ({
                    type: 'Feature',
                    properties: { name },
                    geometry: { type: 'MultiPolygon', coordinates: polygons },
                })),
        ];
    });

const FILL_VISITED = '#2b2b2b';
const FILL_VISITED_HOVER = '#000000';
const FILL_UNVISITED = '#ececec';
const FILL_UNVISITED_HOVER = '#dcdcdc';

const guides = [
    {
        slug: 'copenhagen',
        city: 'Copenhagen',
        country: 'Denmark',
        description: 'Where to stay, what to see and where to eat in my hometown.',
        image: '/images/travel/copenhagen/christianshavn.webp',
        places: copenhagen.reduce((total, section) => total + section.places.length, 0),
    },
];

const WorldMap = () => {
    const containerRef = useRef();
    const [hovered, setHovered] = useState(null);

    useEffect(() => {
        const container = d3.select(containerRef.current);
        const countries = splitTerritories(
            feature(worldData, worldData.objects.countries).features
        );
        const collection = { type: 'FeatureCollection', features: countries };

        const draw = () => {
            const width = containerRef.current.getBoundingClientRect().width;
            if (!width) return;

            container.selectAll('*').remove();

            // Fit to the available width, then take the height the
            // projection actually needs — no letterboxing.
            const projection = d3.geoNaturalEarth1().fitWidth(width, collection);
            const path = d3.geoPath(projection);
            const [[, y0], [, y1]] = path.bounds(collection);
            const height = Math.ceil(y1 - y0);
            projection.fitExtent(
                [
                    [0, 0],
                    [width, height],
                ],
                collection
            );

            const svg = container
                .append('svg')
                .attr('width', width)
                .attr('height', height)
                .attr('viewBox', `0 0 ${width} ${height}`)
                .attr('preserveAspectRatio', 'xMidYMid meet')
                .style('display', 'block')
                .style('overflow', 'visible');

            const isVisited = (d) => visited.has(d.properties.name);

            svg
                .append('g')
                .selectAll('path')
                .data(countries)
                .join('path')
                .attr('d', path)
                .attr('fill', (d) => (isVisited(d) ? FILL_VISITED : FILL_UNVISITED))
                .attr('stroke', '#ffffff')
                .attr('stroke-width', 0.6)
                .attr('class', (d) => (isVisited(d) ? 'country visited' : 'country'))
                .on('mouseenter', function (event, d) {
                    d3.select(this).attr(
                        'fill',
                        isVisited(d) ? FILL_VISITED_HOVER : FILL_UNVISITED_HOVER
                    );
                    setHovered({ name: displayName(d.properties.name), visited: isVisited(d) });
                })
                .on('mouseleave', function (event, d) {
                    d3.select(this).attr('fill', isVisited(d) ? FILL_VISITED : FILL_UNVISITED);
                    setHovered(null);
                });

            svg
                .append('g')
                .selectAll('circle')
                .data(microStates)
                .join('circle')
                .attr('cx', (d) => projection(d.coordinates)[0])
                .attr('cy', (d) => projection(d.coordinates)[1])
                .attr('r', Math.max(2.5, width / 300))
                .attr('fill', FILL_VISITED)
                .attr('stroke', '#ffffff')
                .attr('stroke-width', 1)
                .attr('class', 'country visited')
                .on('mouseenter', function (event, d) {
                    d3.select(this).attr('fill', FILL_VISITED_HOVER);
                    setHovered({ name: d.name, visited: true });
                })
                .on('mouseleave', function () {
                    d3.select(this).attr('fill', FILL_VISITED);
                    setHovered(null);
                });
        };

        draw();

        const observer = new ResizeObserver(draw);
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div className="map">
            <div className="map-canvas" ref={containerRef}></div>
            <p className="map-caption">
                {hovered ? (
                    <span className={hovered.visited ? 'hovered visited' : 'hovered'}>
                        {hovered.name}
                        {!hovered.visited && <span className="not-yet"> — not yet</span>}
                    </span>
                ) : (
                    <span className="hint">Hover a country</span>
                )}
            </p>

            <style jsx>{`
                .map {
                    /* Break out of the 600px text column — a world map
                       wants the width. Capped so the page never scrolls
                       sideways. */
                    width: min(1100px, calc(100vw - 100px));
                    margin-left: 50%;
                    transform: translateX(-50%);
                }

                .map-canvas {
                    width: 100%;
                }

                .map-caption {
                    font-size: 13px;
                    color: #666;
                    margin: 14px 0 0 0;
                    min-height: 20px;
                    text-align: center;
                }

                .hint {
                    color: #bbb;
                }

                .hovered {
                    color: #666;
                }

                .hovered.visited {
                    color: #000;
                    font-weight: 500;
                }

                .not-yet {
                    color: #bbb;
                    font-weight: normal;
                }

                @media (max-width: 768px) {
                    .map {
                        width: calc(100vw - 50px);
                    }
                }

                :global(.country) {
                    transition: fill 0.15s ease;
                }

                :global(.country.visited) {
                    cursor: default;
                }
            `}</style>
        </div>
    );
};

const TravelPage = () => {
    const countryCount = visited.size;
    const regionCount = Object.keys(visitedByRegion).length;

    return (
        <Layout
            title="Travel"
            description="Guides to the cities I know well, and a map of everywhere I've been."
            center
        >
            <div className="travel">
                <header>
                    <h1>Travel</h1>
                    <p className="intro">
                        Guides to the cities I know well, and a map of everywhere I've been.
                    </p>
                </header>

                <section>
                    <h2>Guides</h2>
                    <div className="guides-grid">
                        {guides.map((guide) => (
                            <Link href={`/travel/${guide.slug}`} className="guide-card" key={guide.slug}>
                                <div className="image-wrapper">
                                    <Image
                                        src={guide.image}
                                        alt={guide.city}
                                        width={600}
                                        height={450}
                                        className="guide-image"
                                    />
                                </div>
                                <div className="guide-info">
                                    <span className="guide-meta">
                                        {guide.country} · {guide.places} places
                                    </span>
                                    <h3 className="guide-name">{guide.city}</h3>
                                    <p className="guide-description">{guide.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                <section>
                    <h2>
                        Countries
                        <span className="count">{countryCount} visited</span>
                    </h2>
                </section>
            </div>

            <WorldMap />

            <div className="travel">
                <div className="regions">
                    {Object.entries(visitedByRegion).map(([region, countries]) => (
                        <div className="region" key={region}>
                            <h3>
                                {region}
                                <span className="region-count">{countries.length}</span>
                            </h3>
                            <p>{countries.map(displayName).sort().join(', ')}</p>
                        </div>
                    ))}
                </div>
                <p className="footnote">
                    {countryCount} countries across {regionCount} regions. Plenty left.
                </p>
            </div>

            <style jsx>{`
                .travel {
                    margin: 0 auto;
                    max-width: 600px;
                }

                header {
                    margin-bottom: 48px;
                }

                h1 {
                    margin: 0 0 12px 0;
                }

                .intro {
                    color: #666;
                    margin: 0;
                    font-size: 16px;
                    line-height: 1.6;
                }

                section {
                    margin-bottom: 40px;
                }

                h2 {
                    font-size: 20px;
                    margin-bottom: 20px;
                    padding-bottom: 10px;
                    border-bottom: 1px solid #eaeaea;
                    display: flex;
                    justify-content: space-between;
                    align-items: baseline;
                }

                .count {
                    font-size: 13px;
                    color: #666;
                    font-weight: normal;
                }

                .guides-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 28px;
                }

                /* Horizontal cards: one guide doesn't leave half the row
                   empty, and the list grows cleanly as cities are added. */
                .guides-grid :global(.guide-card) {
                    display: grid;
                    grid-template-columns: 210px 1fr;
                    gap: 22px;
                    align-items: start;
                    text-decoration: none;
                    color: inherit;
                }

                @media (max-width: 560px) {
                    .guides-grid :global(.guide-card) {
                        grid-template-columns: 1fr;
                        gap: 14px;
                    }
                }

                .image-wrapper {
                    position: relative;
                    width: 100%;
                    aspect-ratio: 4/3;
                    border-radius: 12px;
                    overflow: hidden;
                    background-color: #f5f5f5;
                }

                :global(.guide-image) {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    filter: grayscale(1);
                    transition: transform 0.5s ease, filter 0.5s ease;
                }

                .guides-grid :global(.guide-card:hover .guide-image) {
                    transform: scale(1.03);
                    filter: grayscale(0);
                }

                .guide-info {
                    display: flex;
                    flex-direction: column;
                }

                .guide-meta {
                    font-size: 13px;
                    color: #666;
                    font-weight: 500;
                    margin-bottom: 4px;
                }

                .guide-name {
                    font-size: 18px;
                    font-weight: 600;
                    margin: 0;
                    color: #000;
                    line-height: 1.4;
                    letter-spacing: -0.01em;
                }

                .guides-grid :global(.guide-card:hover) .guide-name {
                    text-decoration: underline;
                }

                .guide-description {
                    font-size: 14px;
                    color: #666;
                    line-height: 1.5;
                    margin: 6px 0 0 0;
                }

                .regions {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 24px 32px;
                    margin-top: 48px;
                }

                @media (max-width: 768px) {
                    .regions {
                        grid-template-columns: 1fr;
                    }
                }

                .region h3 {
                    font-size: 13px;
                    font-weight: 600;
                    color: #000;
                    margin: 0 0 6px 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: baseline;
                }

                .region-count {
                    font-size: 12px;
                    color: #bbb;
                    font-weight: normal;
                }

                .region p {
                    font-size: 13px;
                    color: #666;
                    line-height: 1.6;
                    margin: 0;
                }

                .footnote {
                    font-size: 13px;
                    color: #999;
                    margin: 40px 0 0 0;
                }
            `}</style>
        </Layout>
    );
};

export default TravelPage;

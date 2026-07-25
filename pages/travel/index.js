import React, { useEffect, useRef, useState } from 'react';
import Layout from '../../components/layout';
import Link from 'next/link';
import Image from 'next/image';
import * as d3 from 'd3';
import { feature } from 'topojson-client';
import worldData from '../../public/data/world.json';
import copenhagen from '../../data/travel-guides/copenhagen';

// Countries I've visited, grouped by region.
//
// To add one: put its name in the right region below. That's it — the map
// fill, the hover label, the region counts and the total all read from
// here. The name has to match the `name` property in
// public/data/world.json, which mostly uses common names ("Czechia",
// "Timor-Leste") but not always ("United States of America").
//
// Two cases need a line elsewhere:
//   - a country too small to have a polygon at this resolution goes in
//     `microStates` below, as a dot
//   - a country whose polygon includes overseas territory goes in
//     `TERRITORY_SPLITS`, so the territory isn't marked visited too
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

// The two cities that matter more than the rest — pinned in blue, the
// only colour on the map.
const pinnedCities = [
    {
        name: 'Copenhagen',
        note: 'born here',
        coordinates: [12.5683, 55.6761],
        offset: [9, -7],
    },
    {
        name: 'New York',
        note: 'live here',
        coordinates: [-74.006, 40.7128],
        offset: [10, 4],
    },
];

const PIN_BLUE = '#007aff';

// Keep the tooltip clear of the map's edges, and flip it below the pointer
// when there isn't room above.
const TOOLTIP_MARGIN = 60;
const TOOLTIP_FLIP_AT = 44;

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

        // Only the width matters, and redrawing throws away the SVG. Mobile
        // browsers fire resize whenever the address bar slides, so redrawing
        // on every callback would wipe the map mid-interaction.
        let drawnAtWidth = 0;

        const draw = () => {
            const width = containerRef.current.getBoundingClientRect().width;
            if (!width || width === drawnAtWidth) return;
            drawnAtWidth = width;

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

            // Tapping the ocean dismisses the tooltip on touch.
            svg.on('click', () => setHovered(null));

            const isVisited = (d) => visited.has(d.properties.name);

            // Where to put the tooltip: pointer position relative to the
            // map, clamped so it can't hang off either edge.
            const positionOf = (event) => {
                const [x, y] = d3.pointer(event, containerRef.current);
                return {
                    x: Math.max(TOOLTIP_MARGIN, Math.min(width - TOOLTIP_MARGIN, x)),
                    y,
                    // Near the top there's no room above the cursor, so flip
                    // the tooltip below it.
                    below: y < TOOLTIP_FLIP_AT,
                };
            };

            // Label on hover for a mouse, and on tap for a touch screen.
            // Touch needs the explicit click binding — iOS Safari happens to
            // synthesise mouse events on tap, but Android and Chrome don't.
            const labels = (selection, { label, highlight, restore }) =>
                selection
                    .on('mouseenter', function (event, d) {
                        highlight(d3.select(this), d);
                        setHovered({ ...label(d), ...positionOf(event) });
                    })
                    .on('mousemove', function (event, d) {
                        setHovered({ ...label(d), ...positionOf(event) });
                    })
                    .on('mouseleave', function (event, d) {
                        restore(d3.select(this), d);
                        setHovered(null);
                    })
                    .on('click', function (event, d) {
                        // Don't let it reach the background handler, which
                        // clears the tooltip.
                        event.stopPropagation();
                        setHovered({ ...label(d), ...positionOf(event) });
                    });

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
                .call(labels, {
                    label: (d) => ({
                        name: displayName(d.properties.name),
                        visited: isVisited(d),
                    }),
                    highlight: (node, d) =>
                        node.attr('fill', isVisited(d) ? FILL_VISITED_HOVER : FILL_UNVISITED_HOVER),
                    restore: (node, d) =>
                        node.attr('fill', isVisited(d) ? FILL_VISITED : FILL_UNVISITED),
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
                .call(labels, {
                    label: (d) => ({ name: d.name, visited: true }),
                    highlight: (node) => node.attr('fill', FILL_VISITED_HOVER),
                    restore: (node) => node.attr('fill', FILL_VISITED),
                });

            // Pins last so they sit above every country fill.
            const pins = svg
                .append('g')
                .selectAll('g')
                .data(pinnedCities)
                .join('g')
                .attr('transform', (d) => {
                    const [x, y] = projection(d.coordinates);
                    return `translate(${x},${y})`;
                })
                .attr('class', 'pin')
                .call(labels, {
                    label: (d) => ({ name: d.name, note: d.note, pin: true }),
                    highlight: () => {},
                    restore: () => {},
                });

            pins.append('circle').attr('r', 8).attr('fill', PIN_BLUE).attr('opacity', 0.16);
            pins
                .append('circle')
                .attr('r', 4.5)
                .attr('fill', PIN_BLUE)
                .attr('stroke', '#ffffff')
                .attr('stroke-width', 1.75);

            // White halo under the label so it stays readable over both the
            // dark visited fills and the light ones.
            pins
                .append('text')
                .attr('x', (d) => d.offset[0])
                .attr('y', (d) => d.offset[1])
                .attr('dominant-baseline', 'middle')
                .attr('font-size', 11)
                .attr('font-weight', 500)
                .attr('fill', '#111111')
                .attr('stroke', '#ffffff')
                .attr('stroke-width', 3)
                .attr('paint-order', 'stroke')
                .attr('pointer-events', 'none')
                .text((d) => d.name);
        };

        draw();

        const observer = new ResizeObserver(draw);
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div className="map">
            {/* The tooltip is a sibling of the canvas, never a child of it:
                d3 clears the canvas with selectAll('*').remove() on redraw,
                which would tear a React-rendered child out of the DOM. */}
            <div className="map-frame">
                <div className="map-canvas" ref={containerRef}></div>
                {hovered && (
                    <div
                        className={
                            'tooltip' +
                            (hovered.pin ? ' pin' : hovered.visited ? ' visited' : '') +
                            (hovered.below ? ' below' : '')
                        }
                        style={{ left: hovered.x, top: hovered.y }}
                    >
                        {hovered.name}
                        {hovered.note && <span className="note"> — {hovered.note}</span>}
                        {!hovered.visited && !hovered.pin && <span className="not-yet"> — not yet</span>}
                    </div>
                )}
            </div>

            <style jsx>{`
                .map {
                    /* Break out of the 600px text column — a world map
                       wants the width. Capped so the page never scrolls
                       sideways. */
                    width: min(1100px, calc(100vw - 100px));
                    margin-left: 50%;
                    transform: translateX(-50%);
                    /* Padding, not margin — a top margin here would just
                       collapse with the heading's margin above it. */
                    padding-top: 12px;
                }

                .map-frame {
                    position: relative;
                }

                .map-canvas {
                    width: 100%;
                }

                /* Sits at the pointer. left/top come from the handler; the
                   transform lifts it clear of the cursor. */
                .tooltip {
                    position: absolute;
                    transform: translate(-50%, calc(-100% - 12px));
                    background: #ffffff;
                    border: 1px solid #e5e5e5;
                    border-radius: 6px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
                    padding: 5px 9px;
                    font-size: 12px;
                    line-height: 1.3;
                    color: #666;
                    white-space: nowrap;
                    pointer-events: none;
                    z-index: 2;
                }

                .tooltip.below {
                    transform: translate(-50%, 12px);
                }

                .tooltip.visited {
                    color: #000;
                    font-weight: 500;
                }

                .tooltip.pin {
                    color: ${PIN_BLUE};
                    font-weight: 500;
                }

                .not-yet {
                    color: #bbb;
                    font-weight: normal;
                }

                .note {
                    font-weight: normal;
                    opacity: 0.75;
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

                :global(.pin) {
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
            description="Everywhere I've been, and guides to the cities I know well."
            center
        >
            <div className="travel">
                <header>
                    <h1>Travel</h1>
                    <p className="intro">
                        Everywhere I've been, and guides to the cities I know well.
                    </p>
                </header>

                <section>
                    <h2>Countries</h2>
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
                </section>

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

                {/* The map breaks out wider than this column, so its heading
                    lives here to stay aligned with the others. */}
                <section className="map-section">
                    <h2>Map</h2>
                </section>
            </div>

            <WorldMap />

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

                /* Holds only the map's heading; the map itself supplies the
                   gap below it. */
                .map-section {
                    margin-bottom: 0;
                }

                h2 {
                    font-size: 20px;
                    margin-bottom: 20px;
                    padding-bottom: 10px;
                    border-bottom: 1px solid #eaeaea;
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
                    margin: 28px 0 0 0;
                }
            `}</style>
        </Layout>
    );
};

export default TravelPage;

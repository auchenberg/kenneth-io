import React, { useEffect, useRef } from 'react';
import Layout from '../../components/layout';
import * as d3 from 'd3';
import { feature } from 'topojson-client';
import worldData from '../../public/data/world.json';

const TravelMap = () => {
    const mapRef = useRef();

    // Countries I've visited (use full country names)
    const visitedCountries = [
        // North America
        'Canada',
        'Cuba',
        'Mexico',
        'United States of America',

        // Europe
        'Austria',
        'Belgium',
        'Bulgaria',
        'Czech Republic',
        'Denmark',
        'France',
        'Germany',
        'Greece',
        'Iceland',
        'Italy',
        'Netherlands',
        'Norway',
        'Portugal',
        'Romania',
        'Spain',
        'Sweden',
        'Switzerland',
        'United Kingdom',

        // Asia
        'Bangladesh',
        'Cambodia',
        'China',
        'India',
        'Indonesia',
        'Japan',
        'Korea, Republic of',
        "Lao People's Democratic Republic",
        'Malaysia',
        'Myanmar',
        'Qatar',
        'Singapore',
        'Taiwan',
        'Thailand',
        'Timor-Leste',
        'Vietnam',

        // South America
        'Argentina',
        'Colombia',
    ];

    useEffect(() => {
        const width = 600;
        const height = 600;

        // Clear any existing SVG
        d3.select(mapRef.current).selectAll("*").remove();

        // Create SVG
        const svg = d3.select(mapRef.current)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .style('background', '#E8E8E8');

        // Create projection
        const projection = d3.geoMercator()
            .scale(120)
            .center([0, 20])
            .translate([width / 2, height / 2]);

        // Create path generator
        const path = d3.geoPath().projection(projection);

        // Use the imported data directly instead of loading via d3.json
        const countries = feature(worldData, worldData.objects.countries);

        // Draw countries
        svg.selectAll('path')
            .data(countries.features)
            .enter()
            .append('path')
            .attr('d', path)
            .attr('class', d => {
                console.log(d);
                return visitedCountries.includes(d.properties.name) ? 'visited' : 'unvisited';
            })
            .style('stroke', '#666')
            .style('stroke-width', '0.5px')
            .style('fill', d =>
                visitedCountries.includes(d.properties.name) ? '#95A5A6' : '#ECF0F1'
            )
            .style('shape-rendering', 'crispEdges'); // Pixelated effect
    }, []);

    return (
        <Layout
            title="Travel Map"
            description="Places I've visited around the world"
            center
        >
            <div className="travel-map">
                <h1>Travel Map</h1>
                <div className="map-container" ref={mapRef}></div>
            </div>

            <style jsx>{`
                .travel-map {
                    margin: 0 auto;
                    max-width: 600px;
                }

                .map-container {
                    border-radius: 4px;
                }

                :global(.visited) {
                    cursor: pointer;
                    fill: #95A5A6;
                }
                    
                :global(.visited:hover) {
                    fill: #7F8C8D !important;
                }

      `}</style>
        </Layout>
    );
};

export default TravelMap; 

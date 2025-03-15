import React, { useEffect, useRef } from 'react';
import Layout from '../../components/layout';
import * as d3 from 'd3';
import { feature } from 'topojson-client';
import worldData from '../../public/data/world.json';

const TravelMap = () => {
    const mapRef = useRef();
    const globeRef = useRef();
    const rotationStateRef = useRef({ isRotating: true });

    // Countries I've visited (use full country names)
    const visitedCountries = [
        // North America
        'Canada',
        'Cuba',
        'Mexico',
        'United States of America',

        // Europe
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

        // Asia
        'Bangladesh',
        'Cambodia',
        'China',
        'India',
        'Indonesia',
        'Japan',
        'South Korea',
        "Laos",
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
        // Get the viewport dimensions
        const container = d3.select(mapRef.current);
        const containerWidth = container.node().getBoundingClientRect().width;
        const width = containerWidth;
        const height = containerWidth; // Keep it square

        // Clear any existing SVG
        container.selectAll("*").remove();

        // Create SVG with touch-action manipulation
        const svg = container
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('viewBox', `0 0 ${width} ${height}`)
            .attr('preserveAspectRatio', 'xMidYMid meet')
            .style('background', '#ffffff')
            .style('touch-action', 'none'); // Prevent default touch actions

        // Create tooltip
        const tooltip = d3.select(mapRef.current)
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        // Create a group for the globe
        const g = svg.append('g')
            .attr('transform', `translate(${width / 2},${height / 2})`);

        // Set initial scale
        const initialScale = Math.min(width, height) / 2.2;

        // Create projection for 3D globe with larger scale
        const projection = d3.geoOrthographic()
            .scale(initialScale)
            .translate([0, 0])
            .clipAngle(90);

        // Create path generator
        const path = d3.geoPath(projection);

        // Use the imported data directly
        const countries = feature(worldData, worldData.objects.countries);

        // Add water sphere
        const sphere = g.append('circle')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', initialScale)
            .style('fill', '#fafafa');

        // Initialize rotation variables
        const rotationState = {
            rotation: [0, 0],
            lastTime: d3.now(),
            speed: 0.01
        };

        // Draw countries
        const countryPaths = g.selectAll('path')
            .data(countries.features)
            .enter()
            .append('path')
            .attr('d', path)
            .attr('class', d => {
                return visitedCountries.includes(d.properties.name) ? 'visited' : 'unvisited';
            })
            .style('stroke', '#e6e6e6')
            .style('stroke-width', '0.5px')
            .style('fill', d =>
                visitedCountries.includes(d.properties.name) ? '#404040' : '#f0f0f0'
            )
            .on('mouseover', function (event, d) {
                d3.select(this)
                    .style('fill', visitedCountries.includes(d.properties.name) ? '#202020' : '#e0e0e0');

                tooltip.transition()
                    .duration(200)
                    .style("opacity", 1);

                // Calculate position relative to the container
                const containerRect = mapRef.current.getBoundingClientRect();
                const tooltipX = event.clientX - containerRect.left + 10;
                const tooltipY = event.clientY - containerRect.top - 20;

                tooltip.html(d.properties.name)
                    .style("left", tooltipX + "px")
                    .style("top", tooltipY + "px");
            })
            .on('mouseout', function (event, d) {
                d3.select(this)
                    .style('fill', visitedCountries.includes(d.properties.name) ? '#404040' : '#f0f0f0');

                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        // Add resume button
        const resumeButton = d3.select(mapRef.current)
            .append("div")
            .attr("class", "resume-button")
            .style("opacity", 0)
            .style("pointer-events", "none")
            .html("Resume Rotation")
            .on("click", function () {
                // Store current rotation
                rotationState.rotation = projection.rotate();
                rotationState.lastTime = d3.now();

                // Update state and UI
                rotationStateRef.current.isRotating = true;
                d3.select(this)
                    .style("opacity", 0)
                    .style("pointer-events", "none");

                // Start animation
                startAnimation();
            });

        // Function to stop rotation
        const stopRotation = function () {
            if (rotationStateRef.current.isRotating) {
                rotationStateRef.current.isRotating = false;
                cancelAnimationFrame(globeRef.current);

                // Save current rotation state
                rotationState.rotation = projection.rotate();

                // Show resume button
                resumeButton
                    .style("opacity", 1)
                    .style("pointer-events", "auto");
            }
        };

        // Animation frame function
        function animate() {
            if (!rotationStateRef.current.isRotating) return;

            const now = d3.now();
            const diff = now - rotationState.lastTime;
            rotationState.lastTime = now;

            // Update rotation based on current position
            rotationState.rotation[0] += diff * rotationState.speed;
            projection.rotate(rotationState.rotation);

            // Update paths
            countryPaths.attr('d', path);

            // Continue animation
            globeRef.current = requestAnimationFrame(animate);
        }

        // Function to start animation
        function startAnimation() {
            if (rotationStateRef.current.isRotating) {
                animate();
            }
        }

        // Initialize animation if needed
        if (rotationStateRef.current.isRotating) {
            startAnimation();
        }

        // Drag behavior
        const drag = d3.drag()
            .touchable(true)
            .on('start', function () {
                stopRotation();
                d3.select(this).style("cursor", "grabbing");
            })
            .on('drag', function (event) {
                const currentRotate = projection.rotate();
                const newRotate = [
                    currentRotate[0] + event.dx * 0.5,
                    currentRotate[1] - event.dy * 0.5
                ];
                projection.rotate(newRotate);
                countryPaths.attr('d', path);
            })
            .on('end', function () {
                // Update rotation state with current projection
                rotationState.rotation = projection.rotate();
                d3.select(this).style("cursor", "grab");
            });

        // Click handler for stopping rotation
        g.on("click", function (event) {
            if (!event.defaultPrevented) {
                stopRotation();
            }
        });

        // Zoom behavior
        const zoom = d3.zoom()
            .scaleExtent([0.5, 5])
            .touchable(true)
            .filter(event => {
                return (!event.ctrlKey || event.type === 'wheel') &&
                    !event.button &&
                    (event.type !== 'mousedown' || !event.altKey);
            })
            .on('start', function () {
                stopRotation();
            })
            .on('zoom', function (event) {
                const newScale = initialScale * event.transform.k;
                projection.scale(newScale);
                sphere.attr('r', newScale);
                countryPaths.attr('d', path);
                g.selectAll('path')
                    .style('stroke-width', `${0.5 / event.transform.k}px`);
            });

        // Apply behaviors
        svg.call(zoom);
        g.call(drag);

        // Set cursor style
        g.style("cursor", "grab");

        // Disable double-click zoom
        svg.on("dblclick.zoom", null);

        // Add touch event listeners for iOS
        svg.node().addEventListener('gesturestart', function (e) {
            e.preventDefault();
        });

        svg.node().addEventListener('gesturechange', function (e) {
            e.preventDefault();
        });

        // Cleanup
        return () => {
            cancelAnimationFrame(globeRef.current);
            svg.node().removeEventListener('gesturestart', null);
            svg.node().removeEventListener('gesturechange', null);
        };
    }, []); // No dependency on React state

    return (
        <Layout
            title="Travel"
            description="A map of the places I've visited around the world."
            center
        >
            <div className="travel-map">
                <header>
                    <h1>Travel</h1>
                    <p className="intro">
                        A map of the places I've visited around the world.
                    </p>
                </header>

                <div className="map-container" ref={mapRef}></div>
            </div>

            <style jsx>{`
                .travel-map {
                    background: #ffffff;
                    margin: 0 auto;
                    max-width: 1200px;
                    padding: 0 20px;
                    width: 100%;
                }

                .map-container {
                    width: 100%;
                    aspect-ratio: 1;
                    user-select: none;
                    touch-action: none;
                    position: relative;          
                }

                header {
                    padding-bottom: 20px;
                    margin-bottom: 20px;
                    border-bottom: 1px solid #eaeaea;
                }

                :global(.visited) {
                    cursor: pointer;
                    fill: #404040;
                }
                    
                :global(.visited:hover) {
                    fill: #202020 !important;  // Darker grey on hover
                }

                :global(.unvisited) {
                    fill: #f0f0f0;
                }

                :global(.tooltip) {
                    position: absolute;
                    padding: 8px 12px;
                    font: 14px/1.5 system-ui, sans-serif;
                    background: rgba(255, 255, 255, 0.95);
                    border: 1px solid #e0e0e0;
                    border-radius: 4px;
                    pointer-events: none;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    z-index: 100;
                    transform: translate(0, 0); /* Ensures positioning is exact */
                }

                :global(.resume-button) {
                    position: absolute;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(255, 255, 255, 0.95);
                    border: 1px solid #e0e0e0;
                    border-radius: 4px;
                    padding: 8px 16px;
                    font: 14px/1.5 system-ui, sans-serif;
                    cursor: pointer;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    transition: all 0.2s ease;
                }

                :global(.resume-button:hover) {
                    background: #f0f0f0;
                }
            `}</style>
        </Layout>
    );
};

export default TravelMap; 

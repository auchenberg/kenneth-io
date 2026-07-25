import React from 'react';
import CityGuide from '../../components/city-guide';
import newYork from '../../data/travel-guides/new-york';

const NewYorkGuide = () => (
  <CityGuide
    city="New York"
    intro="Where I live now, and what I'd send you to if you had a week."
    description="Where to stay, what to see and where to eat in the city I live in."
    socialImage="/images/travel/new-york/brooklyn-bridge.webp"
    sections={newYork}
  />
);

export default NewYorkGuide;

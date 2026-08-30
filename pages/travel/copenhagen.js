import React from 'react';
import CityGuide from '../../components/city-guide';
import copenhagen from '../../data/travel-guides/copenhagen';

const CopenhagenGuide = () => (
  <CityGuide
    city="Copenhagen"
    slug="copenhagen"
    intro="My hometown, and the list I send friends before they visit."
    description="Where to stay, what to see and where to eat in my hometown."
    socialImage="/images/travel/copenhagen/nyhavn.webp"
    sections={copenhagen}
  />
);

export default CopenhagenGuide;

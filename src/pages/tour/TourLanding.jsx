// pages/tour/TourLanding.jsx
import React, { useState, useEffect } from 'react';
import { LandingHero } from '../../components/common/LandingHero';
import { fetchDestinations } from '../../api/visaApi';
import { TourCarousel } from '../../components/tour/TourCarousel';
import { TourSearch } from '../../components/tour/TourSearch';
import { tourSections } from '../../api/visaApi';

export const TourLanding = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const loadDestinations = async () => {
      const data = await fetchDestinations();
      setDestinations(data);
    };
    loadDestinations();
  }, []);

  return (
    <div className="tour-landing flex flex-col overflow-y-auto bg-white">
      <div className="relative z-10">
        <LandingHero activeTab="Tour" />
      </div>

      <div className="z-20 -mt-6">
        <TourSearch />
      </div>

      {tourSections.map((section) => (
        <div key={section.id} className="px-4 py-10">
          <div className="w-4/5 mx-auto mb-8">
            <h2 className="text-4xl font-black text-black text-left mb-1">{section.title}</h2>
            <p className="text-gray-500 mb-6 text-left">{section.description}</p>
          </div>

          <TourCarousel destinations={destinations} />
        </div>
      ))}
    </div>
  );
};

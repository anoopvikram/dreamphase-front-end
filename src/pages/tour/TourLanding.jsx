import React, { useState, useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import axios from 'axios';
import { LandingHero } from '../../components/common/LandingHero';
import { fetchDestinations } from '../../api/visaApi';
import { TourCard } from '../../components/tour/TourCard';

export const TourLanding = () => {
  const [destinations, setDestinations] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const CARDS_PER_PAGE = 4;



  useEffect(() => {
  const loadDestinations = async () => {
    const data = await fetchDestinations();
    setDestinations(data);
  };
  loadDestinations();
}, []);

  const nextCards = () => {
    const next = startIndex + CARDS_PER_PAGE;
    if (next < destinations.length) setStartIndex(next);
  };

  const visibleDestinations = destinations.slice(startIndex, startIndex + CARDS_PER_PAGE);
  return (
    <div className='insurance-landing flex flex-col overflow-y-auto h-screen bg-white'>
          <div className='relative z-10'>
            <LandingHero activeTab='Insurance' />
          </div>

          <div className="px-4 py-10">
            <h2 className="text-3xl font-bold text-center mb-2">Top Tourist Destination</h2>
            <p className="text-center text-gray-500 mb-6">Our most popular country-level destinations, loved by travelers worldwide.</p>

            <div className="flex gap-6 justify-center flex-wrap relative">
                {visibleDestinations.map((dest, index) => (
                <div className="flex gap-6 justify-center flex-wrap relative">
                {visibleDestinations.map((dest, index) => (
                    <TourCard
                key={index}
                destination={dest}
                isSelected={selectedCard?.name === dest.name}
                onSelect={() => setSelectedCard(dest)}
                />
                ))}

                {/* Next arrow button */}
                {startIndex + CARDS_PER_PAGE < destinations.length && (
                    <button
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#0F2E3C] text-white p-4 rounded-full shadow-xl"
                    onClick={nextCards}
                    >
                    <FaArrowRight />
                    </button>
                )}
                </div>
                ))}

                {/* Next arrow button */}
                {startIndex + CARDS_PER_PAGE < destinations.length && (
                <button
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#0F2E3C] text-white p-4 rounded-full shadow-xl"
                    onClick={nextCards}
                >
                    <FaArrowRight />
                </button>
                )}
            </div>
        </div>
    </div>
  )
}

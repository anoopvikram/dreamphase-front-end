import React, { useState } from 'react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { TourCard } from './TourCard';

export const TourCarousel = ({ destinations }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const CARDS_PER_PAGE = 4;

  const nextCards = () => {
    const next = startIndex + CARDS_PER_PAGE;
    if (next < destinations.length) setStartIndex(next);
  };

  const prevCards = () => {
    const prev = startIndex - CARDS_PER_PAGE;
    if (prev >= 0) setStartIndex(prev);
  };

  const handleSelect = (card) => {
    setSelectedCard((prev) => (prev?.name === card.name ? null : card));
  };

  const visibleDestinations = destinations.slice(startIndex, startIndex + CARDS_PER_PAGE);

  return (
    <div className="flex gap-6 justify-center flex-wrap relative">
      {/* Back Button */}
      {startIndex > 0 && (
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#0F2E3C] text-white p-4 rounded-full shadow-xl z-10"
          onClick={prevCards}
        >
          <FaArrowLeft />
        </button>
      )}

      {/* Cards */}
      {visibleDestinations.map((dest, index) => (
        <TourCard
          key={index}
          destination={dest}
          isSelected={selectedCard?.name === dest.name}
          onSelect={() => handleSelect(dest)}
        />
      ))}

      {/* Next Button */}
      {startIndex + CARDS_PER_PAGE < destinations.length && (
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#0F2E3C] text-white p-4 rounded-full shadow-xl z-10"
          onClick={nextCards}
        >
          <FaArrowRight />
        </button>
      )}
    </div>
  );
};

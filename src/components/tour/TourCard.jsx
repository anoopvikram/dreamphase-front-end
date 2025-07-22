import React from 'react';

export const TourCard = ({ destination, isSelected, onSelect }) => {
  return (
    <div className="relative w-[280px] flex flex-col rounded-xl overflow-hidden shadow-md group">
      {/* Top Image with Destination Name */}
      <div className="h-[200px] relative">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer"
          onClick={onSelect}
        >
          <p className="text-white text-3xl font-bold">{destination.name}</p>
        </div>
      </div>

      {/* Feature tags (only if selected) */}
      {isSelected && (
        <div className="bg-white p-3 flex flex-wrap justify-center gap-2">
          {destination.categories?.map((feature, i) => (
            <div
              key={i}
              className="flex items-center gap-1 border border-black px-3 py-1 rounded-full text-sm"
            >
              <img src={feature.icon} alt={feature.name} className="w-4 h-4" />
              <p>{feature.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

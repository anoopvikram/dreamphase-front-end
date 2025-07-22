import React, { useState } from 'react';

export const CountryCard = ({ data, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="country-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(data)}
    >
      <img src={data.image} alt={data.name} className="country-image object-cover" />
      <p className="absolute bottom-3 right-3 bg-[#455078] text-white text-base px-3 py-1 rounded-full">
    {data.name}
  </p>

      {hovered && (
        <div className="country-info">
          <h2 className="text-xl font-bold">{data.name}</h2>

          <div className="flex  gap-4 mt-3 text-[10px]">
            <div className="flex items-center gap-1">
              <img src="/icons/visa-type.svg" className="w-4 h-4" />
              <div className='flex flex-col '>
                <p>Visa type:</p>
                <span>{data.visa_type} | {data.entry_type}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <img src="/icons/calendar.svg" className="w-4 h-4" />
              <div className='flex flex-col '>
              <p>Length of stay:</p>
              <span>{data.duration} days</span>
              </div>    
            </div>

            <div className="flex items-center gap-2">
              <img src="/icons/timer.svg" className="w-4 h-4" />
              <div className='flex flex-col '>
              <p>Validity:</p>
              <span>{data.visa_validity} days</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="text-2xl font-bold">{data.total_charge}</p>
            <button className="apply-button">Apply</button>
          </div>
        </div>
      )}
    </div>
  );
};

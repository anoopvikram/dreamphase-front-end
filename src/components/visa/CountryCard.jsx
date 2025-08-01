import React, { useState, useRef, useEffect } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaTablet } from "react-icons/fa6";
import { MdTimer } from "react-icons/md";
import gsap from 'gsap';

export const CountryCard = ({ data, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const infoRef = useRef(null);

  useEffect(() => {
    if (hovered) {
      gsap.to(infoRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
        pointerEvents: 'auto'
      });
    } else {
      gsap.to(infoRef.current, {
        opacity: 0,
        scale: 0.98,
        duration: 0.3 ,
        ease: 'power2.in',
        pointerEvents: 'none'
      });
    }
  }, [hovered]);

  return (
    <div
      className="country-card relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(data)}
    >
      <img src={data.image} alt={data.name} className="country-image object-cover" />
      <p className="absolute bottom-3 right-3 bg-[#455078] text-white text-base px-3 py-1 rounded-full">
        {data.name}
      </p>

      <div
        ref={infoRef}
        className="country-info bg-black/70 absolute inset-0 p-4 text-white rounded-xl opacity-0 scale-95 pointer-events-none"
      >
        <h2 className="text-xl font-bold">{data.name}</h2>

        <div className="flex gap-4 mt-3 text-[10px]">
          <div className="flex items-center gap-2">
            <FaTablet className="w-6 h-6" />
            <div className="flex flex-col">
              <p>Visa type:</p>
              <span>{data.visa_type} | {data.entry_type}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <FaCalendarAlt className="w-6 h-6" />
            <div className="flex flex-col">
              <p>Length of stay:</p>
              <span>{data.duration} days</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <MdTimer className="w-6 h-6" />
            <div className="flex flex-col">
              <p>Validity:</p>
              <span>{data.visa_validity} days</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-2xl font-bold">₹{data.total_charge}</p>
          <button className="apply-button">Apply</button>
        </div>
      </div>
    </div>
  );
};

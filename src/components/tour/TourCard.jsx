import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';

export const TourCard = ({ destination, isSelected, onSelect }) => {
  const navigate = useNavigate();
  const itemRefs = useRef([]);
  const featureBoxRef = useRef(null);
  const [showBox, setShowBox] = useState(false);

  const handleCategoryClick = (category) => {
    navigate('/tour-details', {
      state: {
        tripType: category.name,
        destination: destination.name,
        allTripTypes: destination.features.map((f) => f.name),
      },
    });
  };

  const handleClick = (feet, index) => {
    gsap.fromTo(
      itemRefs.current[index],
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'back.in' }
    );
    handleCategoryClick(feet);
  };

  // Manage animation for feature box
  useEffect(() => {
    if (isSelected) {
      setShowBox(true);
    } else {
      if (featureBoxRef.current) {
        gsap.to(featureBoxRef.current, {
          y: 100,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
          onComplete: () => setShowBox(false), // remove only after animation completes
        });
      }
    }
  }, [isSelected]);

  useEffect(() => {
    if (showBox && featureBoxRef.current) {
      gsap.fromTo(
        featureBoxRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [showBox]);

  return (
    <div className="relative text-black w-[280px] flex flex-col rounded-xl overflow-hidden shadow-md group">
      <div className="h-[200px] relative overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover transform scale-140 group-hover:scale-100 transition-transform duration-500 ease-in-out"
        />

        <div
          className={`absolute inset-0 text-white transition-all duration-300 flex flex-col items-center ${
            isSelected ? 'justify-center pt-10' : 'justify-center'
          }`}
          onClick={onSelect}
        >
          <p
            className={`text-2xl font-bold bg-black/50 p-6 rounded-xl mb-2 transition-all duration-300 ${
              isSelected ? 'text-sm' : 'text-3xl'
            }`}
          >
            {destination.name}
          </p>

          {showBox && (
            <div
              ref={featureBoxRef}
              className="flex flex-wrap justify-center rounded-t-xl bg-[#FFFFFFB2] w-full h-full gap-1 py-2 px-2 mt-1"
            >
              {destination.features?.map((feet, i) => (
                <div
                  key={i}
                  ref={(el) => (itemRefs.current[i] = el)}
                  onClick={() => handleClick(feet, i)}
                  className="cursor-pointer flex flex-row border-[.5px] border-black p-1 gap-1 w-fit rounded-lg h-fit my-auto bg-white hover:bg-gray-200"
                >
                  <div className="flex flex-row items-center gap-1">
                    <img src={feet.icon} alt={feet.name} className="w-4 h-4" />
                    <p className="text-black text-xs">{feet.name}</p>
                  </div>
                </div>
              ))} 
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

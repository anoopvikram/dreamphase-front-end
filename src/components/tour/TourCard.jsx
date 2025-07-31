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
    <div className="relative text-black  flex flex-col rounded-xl overflow-hidden shadow-md group">
      <div className="h-[190px] w-[320px] relative overflow-hidden">
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
            className={`text-2xl font-bold bg-black/50  text-center rounded-xl mb-2 transition-all duration-300 ${
              isSelected ? 'text-md min-h-[72px] min-w-[176px] p-5' : 'text-3xl min-h-[90px] min-w-[220px] p-6'
            }`}
          >
            {destination.name}
          </p>

          {showBox && (
            <div
              ref={featureBoxRef}
              className="flex flex-wrap justify-center rounded-t-xl bg-[#FFFFFFB2] w-full h-full my-3 gap-2 py-3 px-2 "
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

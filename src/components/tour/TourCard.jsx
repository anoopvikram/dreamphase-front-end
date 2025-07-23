import { useNavigate } from 'react-router-dom';

export const TourCard = ({ destination, isSelected, onSelect }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
  navigate('/tour-details', {
    state: {
      tripType: category.name, // selected one
      destination: destination.name,
      allTripTypes: destination.features.map(f => f.name), // pass all
    },
  });
};

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
            isSelected ? 'justify-start pt-10' : 'justify-center'
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

          {isSelected && (
            <div className="flex flex-wrap justify-center rounded-t-xl bg-white/80 w-full h-full gap-2 py-2 px-2 mt-2">
              {destination.features?.map((feet, i) => (
                <div
                  key={i}
                  onClick={() => handleCategoryClick(feet)}
                  className="cursor-pointer flex flex-row border p-1 gap-1 rounded h-fit my-auto bg-white hover:bg-gray-200"
                >
                  <div className=' flex flex-row items-center gap-1'>
                    <img src={feet.icon} alt={feet.name} className="w-3 h-3" />
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

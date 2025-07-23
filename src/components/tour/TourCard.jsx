import { useNavigate } from 'react-router-dom';

export const TourCard = ({ destination, isSelected, onSelect }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate('/tour-details', {
      state: {
        tripType: category.name,
        destination: destination.name,
      },
    });
  };

  return (
    <div className="relative text-black w-[280px] flex flex-col rounded-xl overflow-hidden shadow-md group">
      <div className="h-[200px] relative overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover"
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
            <div className="flex flex-wrap justify-center rounded-t-xl bg-white/80 w-full h-full gap-2 px-2 mt-2">
              {destination.categories?.map((cat, i) => (
                <div
                  key={i}
                  onClick={() => handleCategoryClick(cat)}
                  className="cursor-pointer flex flex-row border p-2 gap-2 rounded-xl bg-white hover:bg-gray-200"
                >
                  <img src={cat.icon} alt={cat.name} className="w-4 h-4" />
                  <p className="text-black">{cat.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

  import React, { useState, useEffect } from 'react';
  import { FaGripVertical } from 'react-icons/fa';
  import {
    DragDropContext,
    Droppable,
    Draggable
  } from '@hello-pangea/dnd';
  import { useLocation } from 'react-router-dom';
  import ImageCarousel from '../../components/tour/ImageCarousel';
  import { fetchDestinations } from '../../api/visaApi';
  import { useNavigate } from 'react-router-dom';

  export const TourDetails = () => {
    const navigate = useNavigate();

    const { state } = useLocation();
    const destination = state?.destination || '';

    const [availableCities, setAvailableCities] = useState([]);
    const [allTripTypes, setAllTripTypes] = useState([]);
    const [tripType, setTripType] = useState('');
    const [allDestinations, setAllDestinations] = useState([]);

    const [starRating, setStarRating] = useState('');
    const [nights, setNights] = useState('');
    const [rooms, setRooms] = useState('');
    const [adults, setAdults] = useState('');
    const [children, setChildren] = useState('');

    const [addTransport, setAddTransport] = useState(false);
    const [landOnly, setLandOnly] = useState(false);
    const [needGuide, setNeedGuide] = useState(false);


    useEffect(() => {
  async function loadCities() {
    const data = await fetchDestinations();
    setAllDestinations(data);
    setAvailableCities(data.map(dest => dest.name));

    const typesFromState = state?.allTripTypes || [];
    const selectedType = state?.tripType || typesFromState[0] || '';
    setAllTripTypes(typesFromState);
    setTripType(selectedType);

    // Setup default cities
    const matched = data.find(dest => dest.name === destination);
    const defaultCities = [
      {
        id: 'city-1',
        name: destination || '',
        backendId: matched ? matched.id : null
      },
      { id: 'city-2', name: '', backendId: null }
    ];
    setCities(defaultCities);
  }

  loadCities();
}, [destination]);



    const [cities, setCities] = useState([]);

    useEffect(() => {
      const matched = allDestinations.find(dest => dest.name === destination);
      const defaultCities = [
        {
          id: 'city-1',
          name: destination || '',
          backendId: matched ? matched.id : null
        },
        { id: 'city-2', name: '', backendId: null }
      ];

      setCities(defaultCities);
    }, [destination]);

    const handleAddCity = () => {
      if (cities.length >= 5) return;
      setCities([...cities, { id: `city-${cities.length + 1}`, name: '' }]);
    };

    const handleCityChange = (localId, selectedName) => {
  const matchedCity = allDestinations.find(dest => dest.name === selectedName);
  const backendId = matchedCity ? matchedCity.id : null;

  setCities(cities.map(city =>
    city.id === localId
      ? { ...city, name: selectedName, backendId }
      : city
  ));
};

    const handleDragEnd = (result) => {
      if (!result.destination) return;
      const reordered = [...cities];
      const [moved] = reordered.splice(result.source.index, 1);
      reordered.splice(result.destination.index, 0, moved);
      setCities(reordered);
    };
const matched = allDestinations.find(dest => dest.name === cities[0]?.name);
    const handleContinue = () => {
      const payload = {
        destination_id: matched.id,
        nights: Number(nights),
        hotel_star_rating: Number(starRating),
        add_transport: addTransport,
        land_only: landOnly,
        need_tour_guid: needGuide,
        number_of_adults: Number(adults),
        number_of_children: Number(children),
        number_of_rooms: Number(rooms),
      };

  console.log("➡ Navigating with payload:", payload);

  // Directly navigate to next page without calling the backend
  navigate('/tourinclusion', { state: { payload } });
};


// const handleContinue = async () => {
//   const matched = allDestinations.find(dest => dest.name === destination);

//   if (!matched || !matched.id) {
//   alert("Please select a destination before continuing.");
//   return;
// }

//       const payload = {
//         destination_id: matched.id,
//         nights: Number(nights),
//         hotel_star_rating: Number(starRating),
//         add_transport: addTransport,
//         land_only: landOnly,
//         need_tour_guid: needGuide,
//         number_of_adults: Number(adults),
//         number_of_children: Number(children),
//         number_of_rooms: Number(rooms),
//       };


//   console.log('Payload being sent:', payload);

//   try {
//   const response = await fetch('https://website-0suz.onrender.com/api/custom-tour/create/', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(payload),
//   });

//   const text = await response.text(); // 👈 instead of json
//   console.log('🔍 Full response text:', text);

//   // If status is not OK
//   if (!response.ok) throw new Error(`API Error ${response.status}`);

//   // Try parsing if necessary
//   const result = JSON.parse(text);
//   console.log('✅ Success:', result);

//   navigate('/tourinclusion', { state: { payload } });

// } catch (error) {
//   console.error('❌ Failed to submit tour data:', error);
// }

// };





    return (
      <div className='pt-5 flex flex-col justify-center'>
        <div className='mt-20'>
          <ImageCarousel images={destination.images} />
        </div>

        <div className="flex items-center justify-between w-full max-w-4xl mx-auto mb-15 px-0 -mt-20">
          {['Trip Details', 'Trip Customization', 'Save Proposal', 'AI Suggestions', 'Review and Payment'].map((step, i, arr) => (
            <div key={i} className="relative flex-1 flex items-center justify-center">
              {i !== 0 && (
                <div className={`absolute -translate-x-1/2 top-1/2 transform -translate-y-1/2 h-1 ${i <= 1 ? 'bg-[#164B71]' : 'bg-gray-300'} w-full z-0`}></div>
              )}
              <div className={`relative z-10 w-5 h-5 rounded-full border-2 ${i === 0 ? 'bg-[#164B71] border-[#164B71]' : i === 1 ? 'bg-white border-[#164B71]' : 'bg-gray-300 border-gray-300'}`}></div>
              <div className="absolute top-8 text-[13px] font-semibold text-center w-max -translate-x-1/2 left-1/2">
                <p className={`${i <= 1 ? 'text-[#164B71]' : 'text-gray-500'}`}>{step}</p>
              </div>
            </div>
          ))}
        </div>

        <div className='tour-details px-8 py-8 flex flex-col gap-5 text-black max-w-6xl mx-auto'>
          <div className='tour-head mb-8'>
            <h2 className='text-4xl font-extrabold mb-2'>Destination</h2>
            <p className='text-gray-600 text-xl'>
              Enter the cities below in the order in which they will be visited for the itinerary.
            </p>
          </div>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId='cities' direction='horizontal'>
              {(provided) => (
                <div className='tour-cities flex flex-wrap gap-4 mb-6' ref={provided.innerRef} {...provided.droppableProps}>
                  {cities.map((city, index) => (
                    <Draggable key={city.id} draggableId={city.id} index={index}>
                      {(provided) => (
                        <div className='tour-city flex items-center gap-3' ref={provided.innerRef} {...provided.draggableProps}>
                          <span {...provided.dragHandleProps} className='cursor-move text-gray-400'>
                            <FaGripVertical size={20} />
                          </span>
                          <div className='border rounded pr-3'>
                            <select
                              value={city.name}
                              onChange={(e) => handleCityChange(city.id, e.target.value)}
                              className="px-4 py-2 rounded w-48 text-base pr-6"
                            >
                              <option value=''>Select City</option>
                              {availableCities.map((cityName, i) => (
                                <option key={i} value={cityName}>{cityName}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  {cities.length < 5 && (
                    <button onClick={handleAddCity} className='text-[#164B71] text-base self-center'>
                      + Add Another City
                    </button>
                  )}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <div className='tour-type flex flex-wrap gap-5 mb-6'>
            <div className='border rounded pr-3'>
              <select
                className='p-3 w-44 text-base'
                value={tripType}
                onChange={(e) => setTripType(e.target.value)}
              >
                <option value="">Select Trip Type</option>
                {allTripTypes.map((type, i) => (
                  <option key={i} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className='border rounded pr-3'>
              <select className='p-3 w-44 text-base' value={starRating} onChange={(e) => setStarRating(e.target.value)}>
                <option value="">Star rating</option>
                <option value="3">3 Star</option>
                <option value="4">4 Star</option>
                <option value="5">5 Star</option>
              </select>
            </div>

            <div className='border rounded pr-3'>
              <select className='p-3 w-44 text-base' value={nights} onChange={(e) => setNights(e.target.value)}>
                <option value="">Nights</option>
                <option value="1">1 Night</option>
                <option value="2">2 Nights</option>
                <option value="3">3 Nights</option>
                <option value="4">4 Nights</option>
              </select>
            </div>
          </div>

          <div className='rooms-Adults flex items-center gap-5 mb-6'>
            <div className='flex rounded border items-center gap-3'>
              <div className='rounded pr-3'>
                <select className='p-3 w-32 text-base' value={rooms} onChange={(e) => setRooms(e.target.value)}>
                  <option value="">Rooms</option>
                  <option value="1">1 Room</option>
                  <option value="2">2 Rooms</option>
                  <option value="3">3 Rooms</option>
                  <option value="4">4 Rooms</option>
                  <option value="5">5 Rooms</option>
                </select>
              </div>

              <span className='text-gray-400'>|</span>

              <div className='rounded pr-3'>
                <select className='p-3 w-32 text-base' value={adults} onChange={(e) => setAdults(e.target.value)}>
                  <option value="">Adults</option>
                  <option value="1">1 Adult</option>
                  <option value="2">2 Adults</option>
                  <option value="3">3 Adults</option>
                  <option value="4">4 Adults</option>
                  <option value="5">5 Adults</option>
                  <option value="6">6 Adults</option>
                </select>
              </div>

              <span className='text-gray-400'>|</span>

              <div className='rounded pr-3'>
                <select className='p-3 w-32 text-base' value={children} onChange={(e) => setChildren(e.target.value)}>
                  <option value="">Children</option>
                  <option value="1">1 Child</option>
                  <option value="2">2 Children</option>
                  <option value="3">3 Children</option>
                  <option value="4">4 Children</option>
                  <option value="5">5 Children</option>
                  <option value="6">6 Children</option>
                </select>
              </div>
            </div>

            <p className='text-base text-gray-600'>
              For more than 6 rooms <a href='#' className='text-[#164B71]'>click here</a>
            </p>
          </div>
          
          <div className='flex flex-row justify-between items-center'>
            <div className='features flex flex-col gap-3'>
            <label className='flex items-center gap-3 text-base'>
              <input type='checkbox' checked={addTransport} onChange={() => setAddTransport(!addTransport)} /> Add Transport
            </label>
            <label className='flex items-center gap-3 text-base'>
              <input type='checkbox' checked={landOnly} onChange={() => setLandOnly(!landOnly)} /> Land Only (No Stay)
            </label>
            <label className='flex items-center gap-3 text-base'>
              <input type='checkbox' checked={needGuide} onChange={() => setNeedGuide(!needGuide)} /> Need a Travel Guide
            </label>
          </div>

          <button onClick={handleContinue} className='py-1 px-3 w-fit h-fit rounded  bg-[#164B71] text-white'>
            Continue
          </button>

          </div>
          
        </div>
      </div>
    );
  };

  export default TourDetails;

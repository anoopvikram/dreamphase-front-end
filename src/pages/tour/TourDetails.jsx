import React, { useState, useEffect } from 'react';
import { FaGripVertical } from 'react-icons/fa';
import {
  DragDropContext,
  Droppable,
  Draggable
} from '@hello-pangea/dnd';
import { useLocation } from 'react-router-dom';
import ImageCarousel from '../../components/visa/ImageCarousel';
import { fetchDestinations } from '../../api/visaApi';

export const TourDetails = () => {
  const { state } = useLocation();
  const destination = state?.destination || '';

  const [availableCities, setAvailableCities] = useState([]);
  const [allTripTypes, setAllTripTypes] = useState([]);
  const [tripType, setTripType] = useState('');
  const [allDestinations, setAllDestinations] = useState([]);

  useEffect(() => {
    async function loadCities() {
      const data = await fetchDestinations();
      setAllDestinations(data);
      setAvailableCities(data.map(dest => dest.name));
      const matched = data.find(dest => dest.name === destination);
      if (matched) {
        const uniqueTypes = [...new Set(matched.categories.map(cat => cat.name))];
        setAllTripTypes(uniqueTypes);
        setTripType(uniqueTypes[0] || '');
      }
    }
    loadCities();
  }, [destination]);

  const [cities, setCities] = useState([]);

  useEffect(() => {
    const defaultCities = [
      { id: 'city-1', name: destination || '' },
      { id: 'city-2', name: '' }
    ];
    setCities(defaultCities);
  }, [destination]);

  const handleAddCity = () => {
    if (cities.length >= 5) return;
    setCities([...cities, { id: `city-${cities.length + 1}`, name: '' }]);
  };

  const handleCityChange = (id, value) => {
    setCities(cities.map(city => city.id === id ? { ...city, name: value } : city));
    const matched = allDestinations.find(dest => dest.name === value);
    if (matched) {
      const uniqueTypes = [...new Set(matched.categories.map(cat => cat.name))];
      setAllTripTypes(uniqueTypes);
      setTripType(uniqueTypes[0] || '');
    } else {
      setAllTripTypes([]);
      setTripType('');
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = [...cities];
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setCities(reordered);
  };

  return (
    <div className='pt-5 flex flex-col justify-center'>
      <div className='mt-20'>
        <ImageCarousel/>
      </div>

      <div className="flex items-center justify-between w-full max-w-4xl mx-auto mb-15 px-0 -mt-20">
        {['Trip Details', 'Trip Customization', 'Save Proposal', 'AI Suggestions', 'Review and Payment'].map((step, i, arr) => (
          <div key={i} className="relative flex-1 flex items-center justify-center">
            {i !== 0 && (
              <div className={`absolute -translate-x-1/2 top-1/2 transform -translate-y-1/2 h-1 ${i <= 1 ? 'bg-blue-600' : 'bg-gray-300'} w-full z-0`}></div>
            )}
            <div className={`relative z-10 w-5 h-5 rounded-full border-2 ${i === 0 ? 'bg-blue-600 border-blue-600' : i === 1 ? 'bg-white border-blue-600' : 'bg-gray-300 border-gray-300'}`}></div>
            <div className="absolute top-8 text-[13px] font-semibold text-center w-max -translate-x-1/2 left-1/2">
              <p className={`${i <= 1 ? 'text-blue-800' : 'text-gray-500'}`}>{step}</p>
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
                  <button onClick={handleAddCity} className='text-blue-600 text-base self-center'>
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
              <option disabled>Select Trip Type</option>
              {allTripTypes.map((type, i) => (
                <option key={i} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className='border rounded pr-3'>
            <select className='p-3 w-44 text-base'>
              <option>Star rating</option>
              <option>3 Star</option>
              <option>4 Star</option>
              <option>5 Star</option>
            </select>
          </div>

          <div className='border rounded pr-3'>
            <select className='p-3 w-44 text-base'>
              <option>4 night</option>
              <option>1 night</option>
              <option>2 nights</option>
              <option>3 nights</option>
            </select>
          </div>
        </div>

        <div className='rooms-Adults flex items-center gap-5 mb-6'>
          <div className='flex rounded border items-center gap-3'>
            <div className='rounded pr-3'>
              <select className='p-3 w-32 text-base'>
                <option>1 Room</option>
                <option>2 Rooms</option>
                <option>3 Rooms</option>
                <option>4 Rooms</option>
                <option>5 Rooms</option>
              </select>
            </div>

            <span className='text-gray-400'>|</span>

            <div className='rounded pr-3'>
              <select className='p-3 w-32 text-base'>
                <option>1 Adult</option>
                <option>2 Adults</option>
                <option>3 Adults</option>
                <option>4 Adults</option>
                <option>5 Adults</option>
                <option>6 Adults</option>
              </select>
            </div>

            <span className='text-gray-400'>|</span>

            <div className='rounded pr-3'>
              <select className='p-3 w-32 text-base'>
                <option>1 child</option>
                <option>2 Children</option>
                <option>3 Children</option>
                <option>4 Children</option>
                <option>5 Children</option>
                <option>6 Children</option>
              </select>
            </div>
          </div>

          <p className='text-base text-gray-600'>
            For more than 6 rooms <a href='#' className='text-blue-600'>click here</a>
          </p>
        </div>

        <div className='features flex flex-col gap-3'>
          <label className='flex items-center gap-3 text-base'>
            <input type='checkbox' /> Add Transport
          </label>
          <label className='flex items-center gap-3 text-base'>
            <input type='checkbox' /> Land Only (No Stay)
          </label>
          <label className='flex items-center gap-3 text-base'>
            <input type='checkbox' /> Need a Travel Guide
          </label>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;

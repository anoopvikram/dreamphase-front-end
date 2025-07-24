import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const TourInclusions = () => {
    const navigate = useNavigate();
  const { state } = useLocation();
  const payload = state?.payload;

  const [data, setData] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
 const location = useLocation();
  const [travelerCount, setTravelerCount] = useState(payload?.number_of_adults);


  // Dynamic pricing
  const totalPrice = selectedVehicle ? (selectedVehicle.price + (data?.total_price || 0)) : (data?.total_price || 0);

  const perPersonPrice = Math.round(totalPrice / travelerCount);

  useEffect(() => {
    console.log("⬇ Received state in TourInclusions:", state);
  }, [state]);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch('https://website-0suz.onrender.com/api/destinations/price/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            destination_id: payload?.destination_id || 2,
            num_nights: payload?.nights || 4,
            star_rating: payload?.hotel_star_rating || 4,
            number_of_adults: payload?.number_of_adults || 2,
            number_of_rooms: payload?.number_of_rooms || 1
          }),
        });

        const text = await res.text();
        if (!res.ok) {
          console.error('❌ Server error:', res.status, text);
          return;
        }

        const result = JSON.parse(text);
        console.log('✅ Price data:', result);
        setData(result);
        setSelectedVehicle(result.selected_vehicle);
        setTravelerCount(result.breakdown?.number_of_adults || 1); // ✅ set here
      } catch (err) {
        console.error('❌ Exception:', err);
      }
    };

    if (payload) fetchPrice();
  }, [payload]);

  if (!payload) return <div className="p-8">No data provided.</div>;
  if (!data) return <div className="p-8">Loading...</div>;

  const { add_transport, land_only } = payload;

  return (
    <div className='tour-inclusion flex flex-row w-4/5 mx-auto py-30 text-black gap-15'>
      <div className='inclusion-left flex flex-col gap-2 w-2/3'>

        {add_transport && (<>
            <h2 className='text-xl font-semibold mb-0'>Flight</h2>
          <div className='flight mb-5 rounded-xl p-4 bg-[#0E375533]'>
            <h2 className='text-xl font-semibold mb-3'>Add flight details.</h2>
            <div className='flex flex-row border-t pt-3 justify-between items-center'>
              <p className='text-sm text-gray-600'>No Flight included</p>
              <button className='bg-[#164B71] text-white px-4 py-2 rounded text-sm'>Add Flight</button>
            </div>
          </div></>
        )}

        {add_transport && (<>
            <h2 className='text-xl font-semibold mb-0'>Road Transport</h2>
          <div className='road mb-5 rounded-xl p-4 bg-[#0E375533]'>
            <div className='flex flex-row items-center border-b pb-3 gap-3 mb-3'>
              <h2 className='text-xl font-semibold'>Need a car:</h2>
              <select className='border p-1 rounded text-sm'>
                <option>Delhi</option>
              </select>
              <select className='border p-1 rounded text-sm'>
                <option>Drop at Delhi</option>
              </select>
            </div>

            {/* Selected vehicle display */}
            <div className='flex justify-between items-center px-2 mb-3 pb-2'>
              <p className='font-medium'>
                {selectedVehicle?.name} (Seats: {selectedVehicle?.seating_capacity} people)
              </p>
              <p className='text-gray-700 font-semibold'>
                {selectedVehicle?.price ? `₹${selectedVehicle.price}` : 'Included'}
              </p>
            </div>

            {/* Vehicle selection list */}
            <div className='ml-4 pl-2'>
              {data.all_vehicles?.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedVehicle(item)}
                  className={`flex items-center justify-between p-2 rounded cursor-pointer ${
                    selectedVehicle?.name === item.name ? 'bg-blue-100' : 'hover:bg-gray-100'
                  }`}
                >
                  <label className='flex items-center gap-2 cursor-pointer'>
                    <input
                      type='radio'
                      name='vehicle'
                      checked={selectedVehicle?.name === item.name}
                      onChange={() => setSelectedVehicle(item)}
                    />
                    <span>
                      {item.name} (Seats: {item.seating_capacity} people)
                    </span>
                  </label>

                  <p className={`font-medium ${selectedVehicle?.name === item.name ? 'text-green-700' : ''}`}>
                    {selectedVehicle?.name === item.name ? 'Included' : `₹${item.price}`}
                  </p>
                </div>
              ))}
            </div>
          </div></>
        )}

        {!land_only && (<>
            <h2 className='text-xl font-semibold mb-0'>Hotels</h2>
          <div className='hotel flex mb-5 flex-col xl:w-3/4  rounded-xl p-4 bg-[#0E375533]'>
            <div className='flex gap-4 items-end'>
              <div className='bg-[#404040] w-32 h-24 flex items-center rounded-lg justify-center text-sm text-white'>Hotel Image</div>
              <div className='flex flex-col'>
                <h3 className='font-semibold text-lg'>{data.hotel?.name}</h3>
                <p className='text-sm'>{data.hotel?.location}</p>
                <p className='text-sm'>{data.hotel?.pincode}</p>
                <p className='text-sm'>Price: ₹{data.hotel_price}</p>
                <p className='text-sm'>Star Rating: {data.hotel?.star_rating}</p>
                <div className='text-[#164B71]'>{'⭐'.repeat(data.hotel?.star_rating || 0)}</div>
              </div>
              <button className='ml-auto bg-[#164B71] text-white text-sm px-4 py-1 rounded h-fit'>Change Hotel</button>
            </div>

            <div className='mt-4 flex justify-between gap-4 pt-4 text-sm w-fit'>
              <div>
                <p className='font-medium'>Check-in</p>
                <p>{data.hotel?.check_in}</p>
              </div>
              <span className='text-3xl font-extralight'>|</span>
              <div>
                <p className='font-medium'>Check-out</p>
                <p>{data.hotel?.check_out}</p>
              </div>
            </div>

            <div className='mt-3 text-sm'>
              <p>Selected Room: {data.breakdown?.number_of_rooms} x Standard Room</p>
              <p>🍳 Breakfast included: {data.hotel?.breakfast_include ? "Yes" : "No"}</p>
            </div>

            <div className='mt-3 text-sm'>
              <p className='font-medium'>You will be asked to pay the following charges at the property:</p>
              <ul className='list-disc pl-5 mt-1'>
                <li>Christmas Eve (24 Dec) Dinner: ₹2500 per adult</li>
                <li>Christmas Eve (24 Dec) Dinner: ₹1000 per child (5–12 yrs)</li>
                <li>New Year (31 Dec) Dinner: ₹4500 per adult</li>
                <li>New Year (31 Dec) Dinner: ₹3000 per child (5–12 yrs)</li>
              </ul>
              <p className='text-gray-600 mt-1'>We have included all charges provided by the property.</p>
            </div>
            
            <button className='mt-4 text-sm bg-gray-700 text-white px-3 py-2 rounded flex items-center gap-2'>
              ℹ️ <span>Know more about hotel</span>
            </button>
          </div></>
        )}
        <div className='flex xl:w-3/4 justify-end'>
            <button
  className='py-1 px-3 w-fit h-fit rounded bg-[#164B71] text-white'
  onClick={() => {
    navigate('/touritinerary', {
      state: {
        number_of_adults: travelerCount,
        num_nights: payload?.nights || 4
      }
    });
  }}
>
  Set itinerary
</button>

        </div>
        
      </div>

      <div className='inclusion-right mt-20 w-full md:w-1/2 xl:w-1/3'>
        <div className='price-summary border rounded-xl p-4 shadow-md bg-white flex flex-col gap-4'>
          <h2 className='text-2xl -mx-10 text-center font-semibold bg-[#164B71] text-white px-3 py-2 rounded-xl'>
            Price Summary
          </h2>

          <div className='text-sm'>
            <div className='flex justify-between items-center mb-2'>
              <p>👤 Traveler</p>
              <div className='flex items-center gap-2  px-3 py-1 rounded'>
                <button onClick={() => setTravelerCount(Math.max(1, travelerCount - 1))}>-</button>
                <span>{travelerCount}</span>
                <button onClick={() => setTravelerCount(travelerCount + 1)}>+</button>
              </div>
            </div>

            <div className='flex justify-between'>
              <p>Price per person</p>
              <p>₹{perPersonPrice}</p>
            </div>
          </div>

          <div className='flex justify-between font-semibold text-base border-t pt-2'>
            <p>Net Price</p>
            <p>₹{totalPrice}</p>
          </div>

          <button className='bg-[#0068A3] text-white p-2 rounded-lg mx-auto px-5 mt-3 text-sm'>
            Get Your Visa Or Full Refund
          </button>
        </div>
      </div>
    </div>
  );
};

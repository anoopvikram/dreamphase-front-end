import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const TourInclusions = () => {
  const { state } = useLocation();
  const payload = state?.payload;

  const [data, setData] = useState(null);

  useEffect(() => {
    console.log("⬇ Received state in TourInclusions:", state);
  }, [state]);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch('https://website-0suz.onrender.com/api/destinations/price/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
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
    <div className='tour-inclusion flex flex-row w-4/5 mx-auto py-30 text-black gap-10'>
      <div className='inclusion-left flex flex-col gap-8 w-2/3'>

        {add_transport && (
        <div className='flight border rounded p-4 bg-gray-50'>
            <h2 className='text-xl font-semibold mb-3'>Flight</h2>
            <div className='flex flex-row justify-between items-center'>
            <p className='text-sm text-gray-600'>No Flight included</p>
            <button className='bg-blue-700 text-white px-4 py-2 rounded text-sm'>Add Flight</button>
            </div>
        </div>
        )}

        {add_transport && (
        <div className='road border rounded p-4 bg-gray-50'>
            <div className='flex flex-row items-center gap-3 mb-3'>
            <h2 className='text-xl font-semibold'>Road Transport</h2>
            <select className='border p-1 rounded text-sm'>
                <option>Kochi</option>
            </select>
            <select className='border p-1 rounded text-sm'>
                <option>Drop at Kochi</option>
            </select>
            </div>

            <div className='transport-list flex flex-col gap-2 mt-2'>
            <div className='flex justify-between items-center px-2'>
                <p className='font-medium'>{data.selected_vehicle?.name} (Seats: {data.selected_vehicle?.seating_capacity} people)</p>
                <p className='text-gray-700 font-semibold'>₹{data.vehicle_price}</p>
            </div>

            <div className='ml-4 pl-2 border-l'>
                <div className='flex justify-between text-sm bg-blue-50 p-2 rounded'>
                <p>{data.selected_vehicle?.name} (Seats: {data.selected_vehicle?.seating_capacity} people)</p>
                <p className='font-medium text-green-700'>Included</p>
                </div>
                {data.all_vehicles?.map((item, idx) => (
                <div key={idx} className='flex justify-between hover:bg-gray-100 p-2 rounded cursor-pointer'>
                    <p>{item.name}</p>
                    <p>₹{item.price}</p>
                </div>
                ))}
            </div>
            </div>
        </div>
        )}

        {!land_only && (
        <div className='hotel border rounded p-4 bg-gray-50'>
          <h2 className='text-xl font-semibold mb-4'>Hotels</h2>
          <div className='flex gap-4'>
            <div className='bg-gray-300 w-32 h-24 flex items-center justify-center text-sm text-white'>Hotel Image</div>
            <div className='flex flex-col'>
              <h3 className='font-semibold text-lg'>{data.hotel?.name}</h3>
              <p className='text-sm'>{data.hotel?.location}</p>
              <p className='text-sm'>{data.hotel?.pincode}</p>
              <p className='text-sm'>Price: ₹{data.hotel_price}</p>
              <p className='text-sm'>Star Rating: {data.hotel?.star_rating}</p>
              <div className='text-yellow-500'>{'⭐'.repeat(data.hotel?.star_rating || 0)}</div>
            </div>
            <button className='ml-auto bg-blue-600 text-white text-sm px-4 py-1 rounded h-fit'>Change Hotel</button>
          </div>

          <div className='mt-4 flex justify-between border-t pt-4 text-sm'>
            <div>
              <p className='font-medium'>Check-in</p>
              <p>{data.hotel?.check_in}</p>
            </div>
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
        </div>
        )}
      </div>

      <div className='inclusion-right w-1/3'>
        <div className='price-summary border rounded p-4 shadow-md bg-white flex flex-col gap-4'>
          <h2 className='text-xl font-semibold bg-blue-700 text-white px-3 py-2 rounded'>Price Summary</h2>

          <div className='text-sm'>
            <div className='flex justify-between items-center mb-2'>
              <p>👤 Traveler</p>
              <div className='flex items-center gap-2 border px-3 py-1 rounded'>
                <button>-</button>
                <span>{data.breakdown?.number_of_adults}</span>
                <button>+</button>
              </div>
            </div>

            <div className='flex justify-between'>
              <p>Price per person</p>
              <p>₹{Math.round(data.total_price / (data.breakdown?.number_of_adults || 1))}</p>
            </div>
          </div>

          <div className='flex justify-between font-semibold text-base border-t pt-2'>
            <p>Net Price</p>
            <p>₹{data.total_price}</p>
          </div>

          <button className='bg-blue-600 text-white p-2 rounded mt-3 text-sm'>
            Get Your Visa Or Full Refund
          </button>
        </div>
      </div>
    </div>
  );
};

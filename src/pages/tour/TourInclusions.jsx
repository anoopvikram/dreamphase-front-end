import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export const TourInclusions = () => {
  const { state } = useLocation();
  const payload = state?.payload;


  useEffect(() => {
    console.log("⬇ Received state in TourInclusions:", state);
  }, [state]);

  if (!payload) return <div className="p-8">No data provided.</div>;

  const { add_transport, land_only, need_tour_guid } = payload;


  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch('https://website-0suz.onrender.com/api/destinations/price/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            destination_id: 2,
            nights: 4,
            hotel_star_rating: 4,
            add_transport: true,
            land_only: false,
            need_tour_guid: true,
            number_of_adults: 2,
            number_of_children: 1,
            number_of_rooms: 1
          }),
        });

        const text = await res.text();
        if (!res.ok) {
          console.error('❌ Server error:', res.status, text);
          return;
        }

        const data = JSON.parse(text);
        console.log('✅ Price data:', data);
      } catch (err) {
        console.error('❌ Exception:', err);
      }
    };

    fetchPrice();
  }, []);
  return (
    <div className='tour-inclusion flex flex-row w-4/5 mx-auto py-30 text-black gap-10'>

      {/* LEFT SIDE */}
      <div className='inclusion-left flex flex-col gap-8 w-2/3'>

        {/* Flight */}
        {add_transport && (
        <div className='flight border rounded p-4 bg-gray-50'>
            <h2 className='text-xl font-semibold mb-3'>Flight</h2>
            <div className='flex flex-row justify-between items-center'>
            <p className='text-sm text-gray-600'>No Flight included</p>
            <button className='bg-blue-700 text-white px-4 py-2 rounded text-sm'>Add Flight</button>
            </div>
        </div>
        )}

        {/* ROAD TRANSPORT */}
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
                <p className='font-medium'>AC Ertiga (Seats: 6 people)</p>
                <p className='text-gray-700 font-semibold'>₹4,500</p>
            </div>

            <div className='ml-4 pl-2 border-l'>
                <div className='flex justify-between text-sm bg-blue-50 p-2 rounded'>
                <p>AC Ertiga (Seats: 6 people)</p>
                <p className='font-medium text-green-700'>Included</p>
                </div>
                {[
                { name: 'AC Innova', price: '₹4,956' },
                { name: 'AC Innova Crysta', price: '₹13,650' },
                { name: 'Tempo Traveler (12 Seater)', price: '₹24,704' },
                { name: 'Tempo Traveler (17 Seater)', price: '₹26,870' },
                { name: 'Tempo Traveler (26 Seater)', price: '₹32,534' },
                { name: 'Coach (35 Seater)', price: '₹70,273' },
                { name: 'AC Coach (49 Seater)', price: '₹70,633' },
                { name: 'No Transport required', price: '' },
                ].map((item, idx) => (
                <div key={idx} className='flex justify-between hover:bg-gray-100 p-2 rounded cursor-pointer'>
                    <p>{item.name}</p>
                    {item.price && <p>{item.price}</p>}
                </div>
                ))}
            </div>
            </div>
        </div>
        )}


        {/* HOTEL SECTION */}
        {!land_only && (
        <div className='hotel border rounded p-4 bg-gray-50'>
          <h2 className='text-xl font-semibold mb-4'>Hotels</h2>
          <div className='flex gap-4'>
            <div className='bg-gray-300 w-32 h-24 flex items-center justify-center text-sm text-white'>Hotel Image</div>
            <div className='flex flex-col'>
              <h3 className='font-semibold text-lg'>Le Monfort Resort</h3>
              <p className='text-sm'>Location</p>
              <p className='text-sm'>Location</p>
              <p className='text-sm'>Price: Excellent</p>
              <p className='text-sm'>8.8 rating</p>
              <div className='text-yellow-500'>⭐⭐⭐⭐⭐</div>
            </div>
            <button className='ml-auto bg-blue-600 text-white text-sm px-4 py-1 rounded h-fit'>Change Hotel</button>
          </div>

          <div className='mt-4 flex justify-between border-t pt-4 text-sm'>
            <div>
              <p className='font-medium'>Check-in</p>
              <p>01:00 PM</p>
            </div>
            <div>
              <p className='font-medium'>Check-out</p>
              <p>11:00 PM</p>
            </div>
          </div>

          <div className='mt-3 text-sm'>
            <p>Selected Room: 1 x Standard Room, 1 Bedroom</p>
            <p>🍳 Breakfast included</p>
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
      

      {/* RIGHT SIDE - PRICE SUMMARY */}
      <div className='inclusion-right w-1/3'>
        <div className='price-summary border rounded p-4 shadow-md bg-white flex flex-col gap-4'>
          <h2 className='text-xl font-semibold bg-blue-700 text-white px-3 py-2 rounded'>Price Summary</h2>

          <div className='text-sm'>
            <div className='flex justify-between items-center mb-2'>
              <p>👤 Traveler</p>
              <div className='flex items-center gap-2 border px-3 py-1 rounded'>
                <button>-</button>
                <span>1</span>
                <button>+</button>
              </div>
            </div>

            <div className='flex justify-between'>
              <p>Price per person</p>
              <p>₹12,561</p>
            </div>
          </div>

          <div className='flex justify-between font-semibold text-base border-t pt-2'>
            <p>Net Price</p>
            <p>₹25,122</p>
          </div>

          <button className='bg-blue-600 text-white p-2 rounded mt-3 text-sm'>
            Get Your Visa Or Full Refund
          </button>
        </div>
      </div>
    </div>
  );
};

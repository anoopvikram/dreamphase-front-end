import React, { useEffect, useState } from 'react'
import { fetchTravelMartData } from '../../api/visaApi'
import { LandingHero } from '../../components/common/LandingHero'

export const TravelMartLanding = () => {
  const [data, setData] = useState({ clothing: [], essentials: [] })
  const [activeFilter, setActiveFilter] = useState(null);


  const filterOptions = {
    Climate: ['Hot', 'Cold', 'Rainy'],
    Occasion: ['Beach', 'Hiking', 'Business'],
    Gender: ['Men', 'Women', 'Unisex'],
    Categories: ['Shoes', 'Clothing', 'Accessories'],
  };

  useEffect(() => {
    const fetched = fetchTravelMartData()
    setData(fetched)
  }, [])

  return (
    <div className="travelmart-landing flex flex-col overflow-y-auto bg-white">
      <div className="relative z-10">
        <LandingHero activeTab="Tour" />
      </div>

      <div className='flex flex-col pb-20 w-3/4 mx-auto gap-5'>

        {/* Ad Banner */}
        <div className='ad z-20 -mt-15 bg-gradient-to-r mx-auto  from-blue-400 to-blue-700 text-center w-5/6 items-center flex flex-col justify-center   min-h-[250px] text-white p-10 rounded-2xl shadow-md'>
          <h2 className='text-3xl font-bold mb-4'>PACK YOUR BAGS.....</h2>
          <button className='bg-blue-900 px-6 py-2 rounded-full font-semibold'>Shop Now</button>
        </div>

        {/* Filter Buttons */}
<div className='sort flex flex-row text-black justify-center gap-8 relative'>
  {Object.entries(filterOptions).map(([key, options]) => (
    <div key={key} className='relative'>
      <button
  onClick={() => setActiveFilter(activeFilter === key ? null : key)}
  className='text-black font-medium inline-flex items-center gap-1'
>
  {key} ⌄
</button>

      {activeFilter === key && (
        <div className='absolute top-full mt-2 w-max bg-white shadow rounded z-20'>
          {options.map(option => (
            <div
              key={option}
              className='px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm'
              onClick={() => {
                console.log(`${key}: ${option}`); // replace with your logic
                setActiveFilter(null);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  ))}
</div>


        
        {/* Clothing Section */}
        <h2 className='text-2xl text-left min-w-11/12 mx-auto text-black font-bold'>Clothing</h2>
        <div className='clothing flex flex-col items-center gap-2 w-full'>
          <div className='grid grid-cols-2 sm:grid-cols-3 md-grid-cols-4 lg:grid-cols-5 gap-2 w-full justify-center'>
            {data.clothing.map(cloth => (
              <div key={cloth.id} className='w-full max-w-[200px] aspect-square mx-auto'>
                <img src={cloth.image} alt='cloth' className='rounded-2xl object-cover shadow w-full h-full' />
              </div>
            ))}
          </div>
        </div>

              


        {/* Essentials Section */}
        <h2 className='text-2xl text-left min-w-11/12 mx-auto text-black font-bold'>Travel Essentials</h2>
        <div className='essentials flex flex-col items-center gap-2 w-full'>
          <div className='grid grid-cols-2 sm:grid-cols-3 md-grid-cols-4 lg:grid-cols-5 gap-2 w-full justify-center'>
            {data.essentials.map(es => (
              <div key={es.id} className='relative w-full max-w-[200px] aspect-square mx-auto'>
                  <span className='absolute top-0 right-0 bg-red-500 text-white px-2 py-2 text-xs rounded-br-xl z-10'>
                    coins: {es.price}
                  </span>
                <img src={es.image} alt='essential' className='rounded-2xl object-cover shadow w-full h-full' />
              </div>
            ))}
          </div>
        </div>



      </div>
    </div>
  )
}

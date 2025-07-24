
export const countryList = [
  'United Arab Emirates',
  'Thailand',
  'Singapore',
  'Germany',
  'France',
  'Malaysia',
  'Turkey',
  'Italy',
  'Canada',
  'Australia'
];


export const countryCodes = [
  { country: 'India', code: '+91' },
  { country: 'UAE', code: '+971' },
  { country: 'USA', code: '+1' },
];

export const getPopularCountries = async () => {
  const res = await fetch('https://website-0suz.onrender.com/api/user_countries_list/');
  if (!res.ok) throw new Error('Failed to fetch countries');
  const json = await res.json();
  return json.results; // ✅ only return the array part
};

export const getVisaOptions = async (countryId) => {
  console.log("Fetching visa options for countryId:", countryId);

  const res = await fetch(`https://website-0suz.onrender.com/api/countryvise_visa_options/${countryId}/`);

  if (!res.ok) {
    console.error("API failed with status:", res.status);
    throw new Error('Failed to fetch visa options');
  }

  return await res.json();
};



export const fetchDestinations = async () => {
  try {
    const mockData = [
      {
        name: 'Paris',
        image: 'https://picsum.photos/300/200',
        categories: [
          { name: 'Romantic', icon: '/icons/romantic.png' },
          { name: 'Art', icon: '/icons/art.png' },
          { name: 'culture', icon: '/icons/romantic.png' },
          { name: 'fun', icon: '/icons/art.png' },
          { name: 'adventure', icon: '/icons/romantic.png' },
          { name: 'food', icon: '/icons/art.png' },
        ],
        features: [
          { name: 'Food Tour', icon: '/icons/food.png' },
          { name: 'Couples Trip', icon: '/icons/couple.png' },
        ],
      },
      {
        name: 'Dubai',
        image: 'https://picsum.photos/300/200',
        categories: [
          { name: 'Luxury', icon: '/icons/luxury.png' },
          { name: 'Adventure', icon: '/icons/adventure.png' },
        ],
        features: [
          { name: 'Family Trip', icon: '/icons/family.png' },
          { name: 'Desert Safari', icon: '/icons/safari.png' },
        ],
      },
      {
        name: 'Maldives',
        image: 'https://picsum.photos/300/200',
        categories: [
          { name: 'Beach', icon: '/icons/beach.png' },
        ],
        features: [
          { name: 'Honeymoon', icon: '/icons/honeymoon.png' },
          { name: 'Resort Stay', icon: '/icons/resort.png' },
        ],
      },
      {
        name: 'Tokyo',
        image: 'https://picsum.photos/300/200',
        categories: [
          { name: 'Culture', icon: '/icons/culture.png' },
        ],
        features: [
          { name: 'Food Adventure', icon: '/icons/food.png' },
          { name: 'Tech Tour', icon: '/icons/tech.png' },
        ],
      },
      {
        name: 'Rome',
        image: 'https://picsum.photos/300/200',
        categories: [
          { name: 'History', icon: '/icons/history.png' },
        ],
        features: [
          { name: 'Heritage Walk', icon: '/icons/walk.png' },
          { name: 'Solo Trip', icon: '/icons/solo.png' },
        ],
      },
    ];

    return mockData;
  } catch (err) {
    console.error('Error fetching tour destinations:', err);
    return [];
  }
};


export const tourSections = [
  {
    id: 'top-destinations',
    title: 'Top Tourist Destinations',
    description: 'Our most popular country-level destinations, loved by travelers worldwide.',
    // fetchData: fetchTopDestinations
  },
  {
    id: 'fixed-packages',
    title: 'Most Visited Fixed Packages',
    description: 'Our most popular country-level destinations, loved by travelers worldwide.',
    // fetchData: fetchFixedPackages
  },
  {
    id: 'group-packages',
    title: 'Group Packages',
    description: 'Our most popular country-level destinations, loved by travelers worldwide.',
    // fetchData: fetchGroupPackages
  }
];

// src/api/api.js

export const fetchTravelMartData = () => {
  return {
    clothing: [
      { id: 1, image: '/images/jacket.png' },
      { id: 2, image: '/images/jacket2.png' },
      { id: 3, image: '/images/kidswear.png'},
      { id: 4, image: '/images/womenjacket.png' },
      { id: 5, image: '/images/shorts.png' },
    ],
    essentials: [
      { id: 1, image: '/images/bamboostraw.png', price: 3 },
      { id: 2, image: '/images/bamboobrush.png', price: 3 },
      { id: 3, image: '/images/bamboocomb.png', price: 10 },
      { id: 4, image: '/images/essentialkit.png', price: 15 },
      { id: 5, image: '/images/bamboospoon.jpg', price: 5 },
    ]
  };
};

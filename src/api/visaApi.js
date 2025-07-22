
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
    // Replace this with API call when ready
    const mockData = [
      {
        name: 'Paris',
        image: 'https://via.placeholder.com/300x200?text=Paris',
        categories: [
          { name: 'Romantic', icon: 'https://via.placeholder.com/20' },
          { name: 'Art', icon: 'https://via.placeholder.com/20' },
        ],
      },
      {
        name: 'Dubai',
        image: 'https://via.placeholder.com/300x200?text=Dubai',
        categories: [
          { name: 'Luxury', icon: 'https://via.placeholder.com/20' },
          { name: 'Adventure', icon: 'https://via.placeholder.com/20' },
        ],
      },
      {
        name: 'Maldives',
        image: 'https://via.placeholder.com/300x200?text=Maldives',
        categories: [
          { name: 'Beach', icon: 'https://via.placeholder.com/20' },
        ],
      },
      {
        name: 'Tokyo',
        image: 'https://via.placeholder.com/300x200?text=Tokyo',
        categories: [
          { name: 'Culture', icon: 'https://via.placeholder.com/20' },
        ],
      },
      {
        name: 'Rome',
        image: 'https://via.placeholder.com/300x200?text=Rome',
        categories: [
          { name: 'History', icon: 'https://via.placeholder.com/20' },
        ],
      },
    ];

    return mockData;
  } catch (err) {
    console.error('Error fetching tour destinations:', err);
    return []; // fallback
  }
};

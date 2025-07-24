
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



const defaultFeatures = [
  { name: 'Adventure', icon: 'https://img.icons8.com/ios-filled/50/trekking.png' },
  { name: 'Honeymoon', icon: 'https://img.icons8.com/ios-filled/50/heart-with-arrow.png' },
  { name: 'Family Trip', icon: 'https://img.icons8.com/ios-filled/50/family.png' },
  { name: 'Trip with Friends', icon: 'https://img.icons8.com/ios-filled/50/conference.png' },
  { name: 'Solo Trip', icon: 'https://img.icons8.com/ios-filled/50/user.png' },
];

const mockData = [
  {
    name: 'Paris',
    image: 'https://picsum.photos/300/200?random=1',
    top_tourist_destination: true,
    most_visited_fixed_packages: true,
    group_packages: false,
  },
  {
    name: 'Dubai',
    image: 'https://picsum.photos/300/200?random=2',
    top_tourist_destination: true,
    most_visited_fixed_packages: false,
    group_packages: true,
  },
  {
    name: 'Maldives',
    image: 'https://picsum.photos/300/200?random=3',
    top_tourist_destination: true,
    most_visited_fixed_packages: true,
    group_packages: true,
  },
  {
    name: 'Tokyo',
    image: 'https://picsum.photos/300/200?random=4',
    top_tourist_destination: false,
    most_visited_fixed_packages: true,
    group_packages: false,
  },
  {
    name: 'Rome',
    image: 'https://picsum.photos/300/200?random=5',
    top_tourist_destination: false,
    most_visited_fixed_packages: false,
    group_packages: true,
  },
  {
    name: 'Singapore',
    image: 'https://picsum.photos/300/200?random=6',
    top_tourist_destination: true,
    most_visited_fixed_packages: true,
    group_packages: false,
  },
  {
    name: 'Bali',
    image: 'https://picsum.photos/300/200?random=7',
    top_tourist_destination: true,
    most_visited_fixed_packages: false,
    group_packages: true,
  },
  {
    name: 'London',
    image: 'https://picsum.photos/300/200?random=8',
    top_tourist_destination: false,
    most_visited_fixed_packages: true,
    group_packages: true,
  },
  {
    name: 'New York',
    image: 'https://picsum.photos/300/200?random=9',
    top_tourist_destination: true,
    most_visited_fixed_packages: true,
    group_packages: false,
  },
  {
    name: 'Barcelona',
    image: 'https://picsum.photos/300/200?random=10',
    top_tourist_destination: false,
    most_visited_fixed_packages: false,
    group_packages: true,
  },
];


export const fetchDestinations = async () => {
  try {
    const response = await fetch('https://website-0suz.onrender.com/api/destinations/');
    const data = await response.json();

    return data.map(dest => ({
      ...dest,
      features: defaultFeatures,
    }));
  } catch (err) {
    console.error('API failed. Using mock data.');
    return mockData.map(dest => ({
      ...dest,
      features: defaultFeatures,
    }));
  }
};




export const tourSections = [
  {
    id: 'top',
    title: 'Top Tourist Destinations',
    description: 'Our most popular country-level destinations, loved by travelers worldwide.',
  },
  {
    id: 'most',
    title: 'Most Visited Fixed Packages',
    description: 'Hand-picked packages based on popularity and traveler feedback.',
  },
  {
    id: 'group',
    title: 'Group Packages',
    description: 'Specially curated packages for group travelers and families.',
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


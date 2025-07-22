
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

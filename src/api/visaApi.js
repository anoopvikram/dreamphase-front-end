// export const getPopularCountries = async () => {
//   return [
//     {
//       name: "United Arab Emirates",
//       image: "https://flagcdn.com/w320/ae.png",
//       visaTypes: ["Tourist", "Business"],
//       processingTime: "3-5 days",
//       requirements: "Passport copy, Photo, Bank statement",
//       rate: "₹4500"
//     },
//     {
//       name: "Thailand",
//       image: "https://flagcdn.com/w320/th.png",
//       visaTypes: ["Tourist"],
//       processingTime: "4-6 days",
//       requirements: "Passport, Photo, Tickets, Hotel booking",
//       rate: "₹3000"
//     },
//     {
//       name: "Singapore",
//       image: "https://flagcdn.com/w320/sg.png",
//       visaTypes: ["Tourist", "Business"],
//       processingTime: "2-4 days",
//       requirements: "Photo, Passport, Cover Letter",
//       rate: "₹4200"
//     },
//     {
//       name: "Germany",
//       image: "https://flagcdn.com/w320/de.png",
//       visaTypes: ["Tourist", "Business"],
//       processingTime: "5-7 days",
//       requirements: "Passport, Travel Insurance, Proof of stay",
//       rate: "₹6500"
//     },
//     {
//       name: "France",
//       image: "https://flagcdn.com/w320/fr.png",
//       visaTypes: ["Tourist"],
//       processingTime: "4-6 days",
//       requirements: "Passport, Photo, Accommodation proof",
//       rate: "₹6300"
//     },
//     {
//       name: "Malaysia",
//       image: "https://flagcdn.com/w320/my.png",
//       visaTypes: ["Tourist", "eVisa"],
//       processingTime: "3-4 days",
//       requirements: "Passport, Photo, Flight tickets",
//       rate: "₹2800"
//     },
//     {
//       name: "Turkey",
//       image: "https://flagcdn.com/w320/tr.png",
//       visaTypes: ["Tourist", "Business"],
//       processingTime: "2-3 days",
//       requirements: "Passport, Photo, Hotel booking",
//       rate: "₹4000"
//     },
//     {
//       name: "Italy",
//       image: "https://flagcdn.com/w320/it.png",
//       visaTypes: ["Tourist", "Student"],
//       processingTime: "6-8 days",
//       requirements: "Passport, Financial proof, Travel insurance",
//       rate: "₹7000"
//     },
//     {
//       name: "Canada",
//       image: "https://flagcdn.com/w320/ca.png",
//       visaTypes: ["Tourist", "Work", "Student"],
//       processingTime: "10-15 days",
//       requirements: "Passport, Biometrics, Purpose letter",
//       rate: "₹8500"
//     },
//     {
//       name: "Australia",
//       image: "https://flagcdn.com/w320/au.png",
//       visaTypes: ["Tourist", "Business"],
//       processingTime: "7-10 days",
//       requirements: "Passport, Photo, Purpose letter",
//       rate: "₹8200"
//     }
//   ];
// };


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

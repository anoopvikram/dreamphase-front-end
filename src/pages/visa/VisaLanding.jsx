import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPopularCountries } from '../../api/visaApi';
import { SearchBar } from '../../components/common/SearchBar';
import { CountryCard } from '../../components/visa/CountryCard';
import { LandingHero } from '../../components/common/LandingHero';

export const VisaLanding = () => {
  const [countries, setCountries] = useState([]);
  const [visible, setVisible] = useState(10);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getPopularCountries();
        // Ensure it's an array
        if (Array.isArray(data)) {
          setCountries(data);
        } else {
          console.error('API did not return an array:', data);
          setCountries([]);
        }
      } catch (err) {
        console.error('Error fetching countries:', err);
        setCountries([]);
      }
    };
    fetch();
  }, []);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const bottomReached =
      container.scrollHeight - container.scrollTop <= container.clientHeight + 100;

    if (bottomReached && visible < countries.length) {
      setVisible((prev) => prev + 5);
    }
  };

  const goToCountry = (country) => {
  navigate(`/visa/${country.name.toLowerCase()}`, {
    state: { countryId: country.id, countryName: country.name }
  });
};

  return (
    <div
      className="visa-landing-wrapper overflow-y-auto h-screen"
      ref={containerRef}
      onScroll={handleScroll}
    >
      <LandingHero activeTab="Visa" />
      <SearchBar />

      <div className="visa-country-section">
        {countries.slice(0, visible).map((c) => (
          <CountryCard key={c.name} data={c} onClick={goToCountry} />
        ))}
      </div>
    </div>
  );
};

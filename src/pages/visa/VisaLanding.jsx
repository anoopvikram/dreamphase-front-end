import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPopularCountries } from '../../api/visaApi';
import { SearchBar } from '../../components/visa/SearchBar';
import { CountryCard } from '../../components/visa/CountryCard';
import { LandingHero } from '../../components/common/LandingHero';
import { motion } from 'framer-motion';

export const VisaLanding = () => {
  const blurVariants = {
  initial: {
    opacity: 1,
    filter: 'blur(5px)',
    
  },
  animate: {
    opacity: 1,
    filter: 'blur(0px)',
    
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  exit: {
    opacity: 1,
    filter: 'blur(5px)',
    
    transition: { duration: 0.6, ease: 'easeIn' },
  },
};


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
  console.log("Navigating to:", country.name);
  navigate(`/visa/${country.name.toLowerCase()}?id=${country.id}`, {
  state: { countryId: country.id, countryName: country.name }
});
};

  return (
    <motion.div
      
      variants={blurVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
    <div
      className="visa-landing-wrapper overflow-y-auto"
      ref={containerRef}
      onScroll={handleScroll}
    >
      <LandingHero activeTab="Visa" />
      <SearchBar />

      <div className="visa-country-section grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
        {countries.slice(0, visible).map((c) => (
          <CountryCard key={c.id} data={c} onClick={goToCountry} />
        ))}
      </div>
    </div>
    </motion.div>
  );
};

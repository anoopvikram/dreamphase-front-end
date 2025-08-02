// pages/tour/TourLanding.jsx
import React, { useState, useEffect } from 'react';
import { LandingHero } from '../../components/common/LandingHero';
import { fetchDestinations, tourSections } from '../../api/visaApi';
import { TourCarousel } from '../../components/tour/TourCarousel';
import { TourSearch } from '../../components/tour/TourSearch';
import { motion } from 'framer-motion';

export const TourLanding = () => {

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




  const [destinations, setDestinations] = useState([]);
  const [topTouristDestinations, setTopTouristDestinations] = useState([]);
  const [mostVisitedPackages, setMostVisitedPackages] = useState([]);
  const [groupPackages, setGroupPackages] = useState([]);


  useEffect(() => {
  const loadDestinations = async () => {
    const data = await fetchDestinations();

    const hardcodedFeatures = [
      { name: 'Adventure', icon: '/images/icons/features/adventure.ico' },
      { name: 'Honeymoon', icon: '/images/icons/features/honeymoon.ico' },
      { name: 'Family Trip', icon: '/images/icons/features/family.ico' },
      { name: 'Trip with Friends', icon: '/images/icons/features/friends.ico' },
      { name: 'Solo Trip', icon: '/images/icons/features/solo.ico' },
    ];

    const withFeatures = data.map((d) => ({ ...d, features: hardcodedFeatures }));

    setTopTouristDestinations(withFeatures.filter(d => d.top_tourist_destination));
    setMostVisitedPackages(withFeatures.filter(d => d.most_visited_fixed_packages));
    setGroupPackages(withFeatures.filter(d => d.group_packages));
  };

  loadDestinations();
}, []);


  return (
    <motion.div
      
      variants={blurVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
    <div className="tour-landing flex flex-col overflow-y-auto bg-white">
      <div className="relative z-10">
        <LandingHero activeTab="Tour" animateOnLoad={true} />
      </div>

      <div className="z-20 -mt-6">
        <TourSearch />
      </div>

      {tourSections.map((section) => {
        let sectionData = [];

        if (section.id === 'top') sectionData = topTouristDestinations;
        else if (section.id === 'most') sectionData = mostVisitedPackages;
        else if (section.id === 'group') sectionData = groupPackages;

        return (
          <div key={section.id} className="px-4 py-10">
            <div className="w-4/5 mx-auto mb-8">
              <h2 className="text-4xl font-black text-black text-left mb-1">{section.title}</h2>
              <p className="text-gray-500 mb-6 text-left">{section.description}</p>
            </div>

            <TourCarousel destinations={sectionData} />
          </div>
        );
      })}
    </div>
    </motion.div>
  );
};

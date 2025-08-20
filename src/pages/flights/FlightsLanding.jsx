// File: src/pages/flights/FlightsLanding.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { LandingHero } from '../../components/common/LandingHero';
import  FlightSearch  from '../../components/common/FlightSearch';

export const FlightsLanding = () => {
  const blurVariants = {
    initial: { opacity: 1, filter: 'blur(5px)' },
    animate: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.6, ease: 'easeOut' } },
    exit: { opacity: 1, filter: 'blur(5px)', transition: { duration: 0.6, ease: 'easeIn' } },
  };

  return (
    <motion.div variants={blurVariants} initial="initial" animate="animate" exit="exit">
      <div className="flight-landing flex flex-col overflow-y-auto mb-10 bg-white">
        <div className="relative z-10">
          <LandingHero activeTab="Flight" />
        </div>

        <FlightSearch variant="flight" />
      </div>
    </motion.div>
  );
};

export default FlightsLanding;
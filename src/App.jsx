import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { VisaLanding } from './pages/visa/VisaLanding';
import { VisaTypeSelect } from './pages/visa/VisaTypeSelect';
import { VisaApplicationForm } from './pages/visa/VisaApplicationForm';
import { VisaReviewPage } from './pages/visa/VisaReviewPage';
import { VisaPaymentPage } from './pages/visa/VisaPaymentPage';
import { Navbar } from './components/common/Navbar';
import { InsuranceLanding } from './pages/insurance/InsuranceLanding';
import { InsurancePlan } from './pages/insurance/InsurancePlan';
import { FlightsLanding } from './pages/flights/FlightsLanding';
import { TourLanding } from './pages/tour/TourLanding';
import { TourDetails } from './pages/tour/TourDetails';
import { TravelMartLanding } from './pages/travelmart/TravelMartLanding';
import { TourInclusions } from './pages/tour/TourInclusions';
import { TourItinerary } from './pages/tour/TourItinerary';
import { AuthPage } from './pages/login/Auth';
import { InsuranceAddon } from './pages/insurance/InsuranceAddon';
import { TravelerDetails } from './pages/insurance/TravelerDetails';
import { InsurancePayment } from './pages/insurance/InsurancePayment';
import { motion, AnimatePresence } from 'framer-motion';
import { Footer } from './components/common/Footer';
import Intro from './components/intro/Intro'; // <-- import Intro

gsap.registerPlugin(ScrollTrigger);

// Component that handles scroll to top on route change
const ScrollToTop = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);
  return null;
};

export const App = () => {
  const popupVariants = {
    initial: {
      y: '100%',
      opacity: 1,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    exit: {
      y: '100%',
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeIn' },
    },
  };

  const [showPopup, setShowPopup] = useState(false);

  // ---------- CHANGED: show intro on every refresh (for testing) ----------
  const [showIntro, setShowIntro] = useState(true); // start true so it plays on each load
  useEffect(() => {
    // match the intro duration — adjust 4800ms if your intro length differs
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 5200);
    return () => clearTimeout(timer);
  }, []);
  // -----------------------------------------------------------------------

  // If intro should display, render only Intro (minimal change)
  if (showIntro) {
    return <Intro />;
  }

  return (
    <main id="main">
      <Router>
        <ScrollToTop />
        <Navbar setShowPopup={setShowPopup} />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/auth" element={<AuthPage />} />

            <Route path="/visa" element={<VisaLanding />} />
            <Route path="/visa/:country" element={<VisaTypeSelect />} />
            <Route path="/visa/apply/:country/:visaType" element={<VisaApplicationForm />} />
            <Route path="/visa/review/:id" element={<VisaReviewPage />} />
            <Route path="/visa/payment/:id" element={<VisaPaymentPage />} />

            <Route path="/insurance" element={<InsuranceLanding />} />
            <Route path="/insurance/plan" element={<InsurancePlan />} />
            <Route path="/insurance/addon" element={<InsuranceAddon />} />
            <Route path="/insurance/details" element={<TravelerDetails />} />
            <Route path="/insurance/payment" element={<InsurancePayment />} />

            <Route path="/flight" element={<FlightsLanding />} />

            <Route path="/" element={<TourLanding />} />
            <Route path="/tour-details" element={<TourDetails />} />
            <Route path="/travel-mart" element={<TravelMartLanding />} />
            <Route path="/tourinclusion" element={<TourInclusions />} />
            <Route path="/touritinerary" element={<TourItinerary />} />
          </Routes>
        </AnimatePresence>
        <AnimatePresence>
          {showPopup && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 bg-opacity-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative z-50"
                variants={popupVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <AuthPage onClose={() => setShowPopup(false)} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <Footer />
      </Router>
    </main>
  );
};

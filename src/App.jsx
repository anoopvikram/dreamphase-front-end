import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import {ScrollTrigger} from "gsap/all"
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
import {TravelMartLanding} from './pages/travelmart/TravelMartLanding';
import { TourInclusions } from './pages/tour/TourInclusions';
import { TourItinerary } from './pages/tour/TourItinerary';
import {AuthPage} from './pages/login/Auth';
import { InsuranceAddon } from './pages/insurance/InsuranceAddon';
import {TravelerDetails} from './pages/insurance/TravelerDetails';

gsap.registerPlugin(ScrollTrigger);

export const App = () => {
  return (
    <main id='main'>
    <Router>
      
        <Navbar />
        <Routes>
          <Route path="/auth" element={<AuthPage />} />

          <Route path="/visa" element={<VisaLanding />} />
          <Route path="/visa/:country" element={<VisaTypeSelect />} />
          <Route path="/visa/apply/:country/:visaType" element={<VisaApplicationForm />} />
          <Route path="/visa/review/:id" element={<VisaReviewPage />} />
          <Route path="/visa/payment/:id" element={<VisaPaymentPage />} />

          <Route path="/insurance" element={<InsuranceLanding />} />
          <Route path="/insurance/plan" element={<InsurancePlan />} />
          <Route path="/insurance/addon" element={<InsuranceAddon/>} />
          <Route path="/insurance/details" element={<TravelerDetails/>} />

          <Route path="/flight" element={<FlightsLanding />} />

          <Route path="/" element={<TourLanding />} />
          <Route path="/tour-details" element={<TourDetails />} />
          <Route path="/travel-mart" element={<TravelMartLanding />} />
          <Route path="/tourinclusion" element={<TourInclusions />} />
          <Route path="/touritinerary" element={<TourItinerary />} />


        </Routes>
      
    </Router>
    </main>
  );
};

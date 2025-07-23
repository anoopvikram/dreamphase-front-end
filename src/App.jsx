import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { VisaLanding } from './pages/visa/VisaLanding';
import { VisaTypeSelect } from './pages/visa/VisaTypeSelect';
import { VisaApplicationForm } from './pages/visa/VisaApplicationForm';
import { VisaReviewPage } from './pages/visa/VisaReviewPage';
import { VisaPaymentPage } from './pages/visa/VisaPaymentPage';
import { Navbar } from './components/common/Navbar';
import { InsuranceLanding } from './pages/insurance/InsuranceLanding';
import {InsurancePlan} from './pages/insurance/InsurancePlan';
import { FlightsLanding } from './pages/flights/FlightsLanding';
import { TourLanding } from './pages/tour/TourLanding';
import {TourDetails} from './pages/tour/TourDetails';


export const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/visa" element={<VisaLanding />} />
        <Route path="/visa/:country" element={<VisaTypeSelect />} />
        <Route path="/visa/apply/:country/:visaType" element={<VisaApplicationForm />} />
        <Route path="/visa/review/:id" element={<VisaReviewPage />} />
        <Route path="/visa/payment/:id" element={<VisaPaymentPage />} />
        <Route path="/insurance" element={<InsuranceLanding />} />
        <Route path="/insurance/plan" element={<InsurancePlan/>}/>
        <Route path="/flight" element={<FlightsLanding/>}/>
        <Route path="/tour" element={<TourLanding/>}/>
        <Route path="/tour-details" element={<TourDetails />} />
      </Routes>
    </Router>
  );
};

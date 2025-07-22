import React from 'react';
import { useNavigate } from 'react-router-dom';

export const LandingHero = ({ activeTab = 'Visa' }) => {
  const tabs = ['Visa', 'Tour', 'Insurance', 'Travel Mart', 'Flight', 'Hotels', 'Other'];
  const navigate = useNavigate();

  const getPath = (tab) => {
    switch (tab) {
      case 'Visa':
        return '/visa';
      case 'Insurance':
        return '/insurance';
      case 'Tour':
        return '/tour'; // add this route later
      case 'Travel Mart':
        return '/travel-mart'; // add this route later
      case 'Flight':
        return '/flight'; // add this route later
      case 'Hotels':
        return '/hotels'; // add this route later
      case 'Other':
        return '/other'; // add this route later
      default:
        return '/';
    }
  };

  return (
    <div className="visa-hero">
      <div className="visa-hero-overlay">
        <h1 className="visa-title">Your Journey Starts Here</h1>
        <p className="visa-subtext">Secure Payment | 24 x 7 Customer Support</p>
        <div className="visa-service-menu">
          <ul className="visa-tabs">
            {tabs.map((tab) => (
              <li
                key={tab}
                className={tab === activeTab ? 'active' : ''}
                onClick={() => navigate(getPath(tab))}
                style={{ cursor: 'pointer' }}
              >
                {tab}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

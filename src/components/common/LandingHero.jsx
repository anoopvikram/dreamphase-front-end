import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GiPassport } from "react-icons/gi";
import { RiShieldCheckFill } from "react-icons/ri";
import { MdOutlineFlight, MdShoppingCart, MdKeyboardArrowDown } from "react-icons/md";
import { BsBuilding } from "react-icons/bs";
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export const LandingHero = ({ activeTab = 'Visa', animateOnLoad = false }) => {
  const tabs = ['Tour', 'Visa', 'Insurance', 'Travel Mart', 'Flight', 'Hotels', 'Other'];
  const navigate = useNavigate();
  const heroRef = useRef(null);

  const getPath = (tab) => {
    switch (tab) {
      case 'Visa':
        return '/visa';
      case 'Insurance':
        return '/insurance';
      case 'Tour':
        return '/'; // update later if needed
      case 'Travel Mart':
        return '/travel-mart';
      case 'Flight':
        return '/flight';
      case 'Hotels':
        return '/hotels';
      case 'Other':
        return '/other';
      default:
        return '/';
    }
  };

  useGSAP(() => {
    if (!animateOnLoad) return;
    const tl = gsap.timeline();

    tl.from('.visa-title', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    })
    // .from('.payment', {
    //   x: -50,
    //   opacity: 0,
    //   duration: 0.4,
    //   ease: 'power2.out',
    // }, '-=0.3')
    // .from('.support', {
    //   x: -50,
    //   opacity: 0,
    //   duration: 0.4,
    //   ease: 'power2.out',
    // }, '-=0.6');

  },  [animateOnLoad]);

  return (
    <div className="visa-hero " ref={heroRef} >
      <div className="visa-hero-overlay">
        <h1 className="visa-title">Your Journey Starts Here</h1>
        <div className='flex flex-row gap-2 items-center'>
          <img src="/images/icons/SecurePayment.ico" className='w-5 h-5'/>
          <p className="visa-subtext payment">Secure Payment</p>
          <span className='text-3xl'>|</span>
          <img src="/images/icons/CustomerSupport.ico" className='w-5 h-5'/>
          <p className="visa-subtext support">24 x 7 Customer Support</p>
        </div>
        <div className="visa-service-menu">
          <ul className="visa-tabs">
            {tabs.map((tab) => {
              const isActive = tab === activeTab;

              const getIcon = () => {
                const commonStyle = `inline mr-1 w-6 h-6 ${isActive ?  'text-primary' : 'text-white'}`;

                switch (tab) {
                  case 'Tour':
                    return (
                      <img
                        src={isActive ? "/images/icons/tour.svg" : "/images/icons/tour_white.png"}
                        alt="Tour"
                        className="inline-block w-6 h-6 mr-1"
                      />
                    );
                  case 'Visa':
                    return <GiPassport className={`${commonStyle}  scale-120`} />;
                  case 'Insurance':
                    return <RiShieldCheckFill className={commonStyle} />;
                  case 'Travel Mart':
                    return <MdShoppingCart className={commonStyle} id="cart-icon"/>;
                  case 'Flight':
                    return <MdOutlineFlight className={`${commonStyle}  rotate-[45deg]`} id="flight-icon"/>;
                  case 'Hotels':
                    return <BsBuilding className={commonStyle} />;
                  case 'Other':
                    return <MdKeyboardArrowDown className={commonStyle} />;
                  default:
                    return null;
                }
              };

              return (
                <li
                  key={tab}
                  className={isActive ? 'active' : ''}
                  onClick={() => navigate(getPath(tab))}
                  style={{ cursor: 'pointer' }}
                >
                  {getIcon()} {tab}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

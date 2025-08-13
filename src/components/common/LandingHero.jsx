import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GiPassport } from "react-icons/gi";
import { RiShieldCheckFill } from "react-icons/ri";
import { MdOutlineFlight, MdShoppingCart, MdKeyboardArrowDown } from "react-icons/md";
import { BsBuilding } from "react-icons/bs";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ReactDOM from 'react-dom';

export const LandingHero = ({ activeTab = 'Visa', animateOnLoad = false }) => {
  const tabs = ['Tour', 'Visa', 'Insurance', 'Hotels', 'Flight', 'Other'];
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const [showOtherMenu, setShowOtherMenu] = useState(false);
  const [otherMenuPos, setOtherMenuPos] = useState({ top: 0, left: 0, width: 0 });

  const otherButtonRef = useRef(null);

  const getPath = (tab) => {
    switch (tab) {
      case 'Visa': return '/visa';
      case 'Insurance': return '/insurance';
      case 'Tour': return '/';
      case 'Travel Mart': return '/travel-mart';
      case 'Flight': return '/flight';
      case 'Hotels': return '/hotels';
      default: return '/';
    }
  };

  useGSAP(() => {
    if (!animateOnLoad) return;
    gsap.from('.visa-title', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    });
  }, [animateOnLoad]);

  const toggleOtherMenu = () => {
    if (!showOtherMenu && otherButtonRef.current) {
      const rect = otherButtonRef.current.getBoundingClientRect();
      setOtherMenuPos({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
    setShowOtherMenu(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        otherButtonRef.current &&
        !otherButtonRef.current.contains(e.target)
      ) {
        setShowOtherMenu(false);
      }
    };
    if (showOtherMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showOtherMenu]);

  return (
    <div className="visa-hero relative z-[50]" ref={heroRef}>
      <div className="visa-hero-overlay">
        <h1 className="visa-title">Your Journey Starts Here</h1>

        <div className='flex flex-row gap-2 items-center'>
          <img src="/images/icons/SecurePayment.ico" className='w-5 h-5' />
          <p className="visa-subtext payment">Secure Payment</p>
          <span className='text-3xl'>|</span>
          <img src="/images/icons/CustomerSupport.ico" className='w-5 h-5' />
          <p className="visa-subtext support">24 x 7 Customer Support</p>
        </div>

        <div className="visa-service-menu">
          <ul className="visa-tabs relative">
            {tabs.map((tab) => {
              const isActive = tab === activeTab;

              const getIcon = () => {
                const commonStyle = `inline w-6 h-6 ${isActive ? 'text-primary' : 'text-white'}`;
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
                    return <GiPassport className={`${commonStyle} scale-120 mr-1`} />;
                  case 'Insurance':
                    return <RiShieldCheckFill className={`${commonStyle} mr-1`} />;
                  case 'Travel Mart':
                    return <MdShoppingCart className={`${commonStyle} mr-1`} id="cart-icon" />;
                  case 'Flight':
                    return <MdOutlineFlight className={`${commonStyle} rotate-[45deg] mr-1`} id="flight-icon" />;
                  case 'Hotels':
                    return <BsBuilding className={`${commonStyle} mr-1`} />;
                  case 'Other':
                    return <MdKeyboardArrowDown className={`${commonStyle} ml-1`} />;
                  default:
                    return null;
                }
              };

              if (tab === 'Other') {
                return (
                  <li
                    key={tab}
                    ref={otherButtonRef}
                    className="relative"
                    onClick={toggleOtherMenu}
                    style={{ cursor: 'pointer' }}
                  >
                    <span className="flex items-center">
                      {tab} {getIcon()}
                    </span>
                    {showOtherMenu &&
                      ReactDOM.createPortal(
                        <ul
                          className="absolute bg-white shadow-md rounded-lg border-2 border-[#0E3755] text-black z-[9999]"
                          style={{
                            position: 'absolute',
                            top: otherMenuPos.top,
                            left: otherMenuPos.left,
                            minWidth: otherMenuPos.width
                          }}
                        >
                          <li
                            className="px-4 py-2 rounded hover:bg-[#0068A3]/50"
                            onClick={() => navigate('/return-ticket-cancellation')}
                          >
                            Return Cancellation Ticket
                          </li>
                          <li
                            className="px-4 py-2 rounded-lg hover:bg-[#0068A3]/50"
                            onClick={() => navigate('/attestation')}
                          >
                            Attestation
                          </li>
                          <li
                            className="px-4 py-2 rounded-lg hover:bg-[#0068A3]/50"
                            onClick={() => navigate('/Ok-to-board ')}
                          >
                           Ok to board 
                          </li>
                        </ul>,
                        document.body
                      )}
                  </li>
                );
              }

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

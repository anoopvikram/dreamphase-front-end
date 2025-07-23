import { FaHeadset, FaWallet } from 'react-icons/fa';
import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';


gsap.registerPlugin(ScrollTrigger);

export const Navbar = () => {
  const navRef = useRef(null);
  const location = useLocation();

  useGSAP(() => {
    // Only run scroll animatuseGSAP(() => {
    const navTween = gsap.timeline({
      scrollTrigger: {
        trigger: 'main',
        start: "top+=1 top",
        end: "top top",
        toggleActions: 'play none none reverse'
      }
    });

    navTween.fromTo('nav',
      {
        backgroundColor: 'transparent',
        backdropFilter: 'blur(0px)',
        border: '0px solid transparent'
      },
      {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(10px)',
        
        duration: 0.05,
        ease: 'power1.inOut'
      }
    );
  }, []);

  return (
    <nav
      ref={navRef}
      className="navbar rounded-full transition-all duration-300 ease-in-out"
    >
      {/* Left: Logo */}
      <div className="navbar-left">
        <Link to="/">
          <img src="/images/logo.png" alt="Logo" className="logo-img" />
        </Link>
      </div>


      {/* Right: Menu */}
      <div className="navbar-right">
        <ul className="navbar-menu">
          <li className="menu-item">
            <Link to="/bookings">Bookings</Link>
          </li>
          <li className="menu-item flex items-center gap-1">
            <FaHeadset className="icon" />
            <Link to="/support">Support</Link>
          </li>
          <li className="menu-item flex items-center gap-1">
            <FaWallet className="icon" />
            <Link to="/wallet">Wallet</Link>
          </li>
        </ul>
        <button className="navbar-auth-btn"><Link to="/auth" className="navbar-auth-btn">Sign In / Sign Up</Link></button>
      </div>
    </nav>
  );
};

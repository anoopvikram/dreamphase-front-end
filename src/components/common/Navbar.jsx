import React from 'react';
import { FaHeadset, FaWallet } from 'react-icons/fa';

export const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Left: Company Logo */}
      <div className="navbar-left">
        <img src="/images/logo.png" alt="Logo" className="logo-img" />
      </div>

      {/* Right: Menu */}
      <div className="navbar-right">
        <ul className="navbar-menu">
          <li className="menu-item">Bookings</li>
          <li className="menu-item flex items-center gap-1">
            <FaHeadset className="icon" />
            Support
          </li>
          <li className="menu-item flex items-center gap-1">
            <FaWallet className="icon" />
            Wallet
          </li>
        </ul>

        <button className="navbar-auth-btn">Sign In / Sign Up</button>
      </div>
    </nav>
  );
};

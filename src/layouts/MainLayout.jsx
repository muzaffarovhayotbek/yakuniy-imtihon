import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import icon from '../assets/react.svg';

function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="mt-[25px]">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link className="flex items-center gap-[12px] text-[24px]" to="/">
              <img src={icon} alt="icon" /> SuRaT
            </Link>
          </div>
          <div className="header-nav">
            <ul className="flex items-center gap-4 text-[14px]">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
            </ul>
          </div>
          <div className="header-btn"></div>
        </div>
      </header>
      <main className="flex-grow">{children}</main>
      <footer className="bg-gray-800 p-4 text-white">
        <div className="text-center">
          <p>© 2024 Your Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;

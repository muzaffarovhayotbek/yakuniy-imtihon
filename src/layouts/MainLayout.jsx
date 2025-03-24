import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import icon from '../assets/react.svg';
import { MdOutlineDarkMode, MdDownload } from 'react-icons/md';
import { IoSunny } from 'react-icons/io5';
import useDarkModeStore from '../store/useDarkMore';
import { GrLike } from 'react-icons/gr';
import { FaUnsplash } from 'react-icons/fa';
import { useGlobalContext } from '../context/GlobalContext';
function MainLayout({ children }) {
  const { theme, toggle } = useDarkModeStore();
  const {user }= useGlobalContext()
  return (
    <div
      className={`flex flex-col min-h-screen ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'
      }`}
    >
      <header className="mt-6 px-10">
        <div className="container mx-auto flex items-center justify-between">
          <Link
            className="flex items-center gap-3 text-xl font-semibold"
            to="/"
          >
            <FaUnsplash className="w-[32px] h-[32px]" /> SuRaT
          </Link>

          <nav>
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <NavLink to="/" className="hover:text-gray-500">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="hover:text-gray-500">
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="hover:text-gray-500">
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-5">
            <button className="cursor-pointer" onClick={toggle}>
              {theme === 'dark' ? (
                <IoSunny className="text-yellow-500 w-6 h-6" />
              ) : (
                <MdOutlineDarkMode className="text-gray-800 w-6 h-6" />
              )}
            </button>

            <NavLink to="/download">
              <MdDownload className="w-6 h-6 hover:text-gray-500" />
            </NavLink>
            <NavLink to="/likedImages">
              <GrLike className="w-6 h-6 hover:text-gray-500" />
            </NavLink>
          </div>

          <div className='flex'>
           
          <div className="avatar">
  <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
  {/* <img className='rounded-full w-10 h-10 object-cover' src={user.photoURL} /> */}

  </div>
</div>
          </div>
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

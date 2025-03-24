import React, { useState } from 'react';
import { MdOutlineDarkMode, MdDownload } from 'react-icons/md';
import { IoSunny } from 'react-icons/io5';
import { GrLike } from 'react-icons/gr';
import { FaUnsplash } from 'react-icons/fa';
import { useGlobalContext } from '../context/GlobalContext';
import useDarkModeStore from '../store/useDarkMore';
import { Link, NavLink } from 'react-router-dom';
function Header() {
  const { theme, toggle } = useDarkModeStore();
  const { user } = useGlobalContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <header className="mt-6 px-10">
        <div className="container mx-auto flex items-center justify-between">
          <Link
            className="flex items-center gap-3 text-xl font-semibold"
            to="/"
          >
            <FaUnsplash className="w-8 h-8" />
            <span>SuRaT</span>
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

            {/* <div className="relative">
              <div
                className="cursor-pointer w-8   rounded-full border border-gray-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {user && user.photoURL ? (
                  <img
                    className="w-8 h-8 rounded-full object-cover"
                    src={user.photoURL}
                    alt="User"
                  />
                ) : (
                  <img
                    className="rounded-full"
                    src="/default-avatar.png"
                    alt="Default avatar"
                  />
                )}
              </div> */}

              {/* {isMenuOpen && (
                <ul
                  className="absolute right-0 mt-2 w-52 rounded-md bg-white shadow-lg z-50 border border-gray-200 
                  transition-all duration-200 transform scale-95 opacity-100"
                >
                  <li className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <a href="/" className="flex justify-between w-full">
                      <span>Profile</span>
                      <span className="inline-flex items-center rounded-full bg-blue-500 px-2 py-1 text-xs font-semibold text-white">
                        New
                      </span>
                    </a>
                  </li>

                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Settings
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500">
                    Logout
                  </li>
                </ul>
              )} */}
            </div>
          </div>
      </header>
    </div>
  );
}

export default Header;

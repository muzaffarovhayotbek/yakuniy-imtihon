import React, { useState } from 'react';
import { MdOutlineDarkMode, MdDownload } from 'react-icons/md';
import { GrLike } from 'react-icons/gr';
import { FaUnsplash } from 'react-icons/fa';
import { useGlobalContext } from '../context/GlobalContext';
import useDarkModeStore from '../store/useDarkMore';
import { Link, NavLink } from 'react-router-dom';
import { FiSun } from "react-icons/fi";
import { signOut } from 'firebase/auth'
import { auth } from '../firebase/firabageConfig'
import { MdDarkMode } from "react-icons/md";
import toast from 'react-hot-toast';

function Header() {
  const { theme, toggle } = useDarkModeStore();
  const { user, dispatch } = useGlobalContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);

  const signOutUser = async () => {
    try {
      await signOut(auth)
      dispatch({type:'LOGOUT' })
      toast.success('See yo soon')
    } catch (error) {
      toast.error(error.message)
    }
  }

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
                <NavLink to="/" className="">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-5">
            <button className="cursor-pointer" onClick={toggle}>
              <div className="transition-all duration-500 ease-in-out">
                {theme === 'dark' ? (
                  <FiSun className="w-6 h-6 text-yellow-500" />
                ) : (
                  <MdDarkMode className="w-6 h-6 text-gray-800" />
                )}
              </div>
            </button>

            <NavLink to="/download">
              <MdDownload className="w-6 h-6 hover:text-gray-500" />
            </NavLink>

            

            <div className="relative">
              <div
                className="cursor-pointer w-8 rounded-full border border-gray-300"
                onClick={handleMenuToggle}
              >

                {user && user.photoURL ? (
                  <img
                    className="w-8 h-8 rounded-full object-cover"
                    src={user.photoURL}
                    alt="User"
                  />
                ) : (
                  <img
                    className="w-8 h-8 rounded-full object-cover"
                    src="/default-avatar.png"
                    alt="Default avatar"
                  />
                )}
              </div>

              {isMenuOpen && (
                <ul className="absolute right-0 mt-2 w-52 rounded-md bg-white shadow-lg z-50 border border-gray-200 transition-all duration-200 transform scale-95 opacity-100">
                  <div className="px-4 py-2">
                    <h2 className="text-lg font-semibold">
                      {user.displayName}
                    </h2>
                  </div>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <NavLink
                      to="/profile"
                      className="flex justify-between w-full"
                    >
                      <span className="dark:text-white">Profile</span>
                      <span className="inline-flex items-center rounded-full bg-blue-500 px-2 py-1 text-xs font-semibold text-white">
                        New
                      </span>
                    </NavLink>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Settings
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500">
                    <button onClick={signOutUser}>Logout</button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;

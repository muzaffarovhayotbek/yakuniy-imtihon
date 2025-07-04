import React, { useState } from 'react';
import { MdDownload, MdDarkMode } from 'react-icons/md';
import { FiSun } from 'react-icons/fi';
import { FaUnsplash } from 'react-icons/fa';
import { useGlobalContext } from '../context/GlobalContext';
import useDarkModeStore from '../store/useDarkMore';
import { Link, NavLink } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firabageConfig';
import toast from 'react-hot-toast';
import { FaHeart } from 'react-icons/fa';
function Header() {
  const { theme, toggle } = useDarkModeStore();
  const { user, dispatch } = useGlobalContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);

  const signOutUser = async () => {
    try {
      await signOut(auth);
      dispatch({ type: 'LOGOUT' });
      toast.success('See you soon');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <header className="mt-6 px-10 sm:mt-5">
      <div className="container mx-auto flex flex-col sm:flex-row gap-4 items-center justify-between p-2">
        <Link className="flex items-center gap-3 text-xl font-semibold" to="/">
          <FaUnsplash className="w-8 h-8" />
          <span>SuRaT</span>
        </Link>
        <nav className="flex gap-4 ">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md ${
                isActive
                  ? 'bg-gray-500 text-white'
                  : 'text-gray-800 hover:bg-gray-300'
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md ${
                isActive
                  ? 'bg-gray-500 text-white'
                  : 'text-gray-800 hover:bg-gray-300'
              }`
            }
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md ${
                isActive
                  ? 'bg-gray-500 text-white'
                  : 'text-gray-800 hover:bg-gray-300'
              }`
            }
          >
            Contact
          </NavLink>
        </nav>

        <div className="flex items-center gap-5">
          <button className="cursor-pointer" onClick={toggle}>
            {theme === 'dark' ? (
              <FiSun className="w-6 h-6 text-yellow-500" />
            ) : (
              <MdDarkMode className="w-6 h-6 text-gray-800" />
            )}
          </button>

          <NavLink to="/download">
            <MdDownload className="w-6 h-6 hover:text-gray-500" />
          </NavLink>
          <NavLink to="/likedImages">
            <FaHeart className="w-6 h-6" />
          </NavLink>

          <div className="relative">
            <div
              className="cursor-pointer w-8 h-8 rounded-full border border-gray-300"
              onClick={handleMenuToggle}
            >
              <img
                className="w-8 h-8 rounded-full object-cover"
                src={user?.photoURL || '/default-avatar.png'}
                alt="User"
              />
            </div>

            {isMenuOpen && (
              <ul className="absolute right-0 mt-2 w-52 rounded-md bg-white shadow-lg z-50 border border-gray-200">
                <div className="px-4 py-2">
                  <h2 className="text-lg font-semibold">
                    {user?.displayName || 'Guest'}
                  </h2>
                </div>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <NavLink
                    to="/profile"
                    className="flex justify-between w-full"
                  >
                    <span>Profile</span>
                    <span className="inline-flex items-center rounded-full bg-blue-500 px-2 py-1 text-xs font-semibold text-white">
                      New
                    </span>
                  </NavLink>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <NavLink to="/settings">
                    <span>Settings</span>
                  </NavLink>
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
  );
}

export default Header;

import React, { useState } from 'react';
import { MdDownload, MdDarkMode } from 'react-icons/md';
import { FiSun } from 'react-icons/fi';
import { FaUnsplash, FaHeart } from 'react-icons/fa';
import { useGlobalContext } from '../context/GlobalContext';
import useDarkModeStore from '../store/useDarkMore';
import { Link, NavLink } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firabageConfig';
import toast from 'react-hot-toast';

function Header() {
  const { theme, toggle } = useDarkModeStore();
  const { user, dispatch, downloadImage = [], likedImages = [] } = useGlobalContext();
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
    <header className="mt-6 px-6 sm:mt-4">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 p-3 rounded-lg shadow-md bg-white dark:bg-neutral-900">
        <Link className="flex items-center gap-3 text-2xl font-bold text-neutral-800 dark:text-white" to="/">
          <FaUnsplash className="w-7 h-7 text-indigo-500" />
          <span>SuRaT</span>
        </Link>

        <nav className="flex gap-4">
          {['/', '/about', '/contact'].map((path, i) => (
            <NavLink
              key={i}
              to={path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg transition duration-200 font-medium ${
                  isActive
                    ? 'bg-indigo-500 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700'
                }`
              }
            >
              {path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button onClick={toggle} className="text-xl">
            {theme === 'dark' ? (
              <FiSun className="w-6 h-6 text-yellow-400" />
            ) : (
              <MdDarkMode className="w-6 h-6 text-gray-800" />
            )}
          </button>

          <NavLink to="/download" className="relative">
            <MdDownload className="w-6 h-6 text-gray-600 hover:text-indigo-500 dark:text-gray-300" />
            {downloadImage.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                {downloadImage.length}
              </span>
            )}
          </NavLink>

          <NavLink to="/likedImages" className="relative">
            <FaHeart className="w-6 h-6 text-pink-500 hover:scale-110 transition" />
            {likedImages.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                {likedImages.length}
              </span>
            )}
              
          </NavLink>

<div className='flex items-center pl-20'>
    {user?.displayName || 'User'}
</div>
          <div className="relative">
            <div onClick={handleMenuToggle} className="cursor-pointer flex items-center p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800">
              <p className="text-base font-medium text-gray-800 dark:text-white">
              </p>
              <img
                className="w-9 h-9 rounded-full object-cover border border-gray-300"
                src={user?.photoURL || '/default-avatar.png'}
                alt="User avatar"
              />
            </div>

            {isMenuOpen && (
              <ul className="absolute right-0 mt-2 w-56 rounded-lg bg-white dark:bg-neutral-800 shadow-lg border border-gray-200 dark:border-neutral-700 z-50">
                <li className="px-4 py-2 font-semibold text-gray-800 dark:text-white border-b border-gray-200 dark:border-neutral-700">
                  {user?.displayName || 'Guest'}
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-700 cursor-pointer">
                  <NavLink to="/profile" className="flex justify-between items-center">
                    <span>Profile</span>
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">New</span>
                  </NavLink>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-700 cursor-pointer">
                  <NavLink to="/settings">Settings</NavLink>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-700 cursor-pointer text-red-600">
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

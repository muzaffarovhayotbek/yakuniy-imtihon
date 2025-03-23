import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import icon from "../assets/react.svg";
import { MdOutlineDarkMode, MdDownload } from "react-icons/md";
import { IoSunny } from "react-icons/io5";
import useDarkModeStore from "../store/useDarkMore";
import { GrLike } from "react-icons/gr";
import { FaUnsplash } from "react-icons/fa";
function MainLayout({ children }) {
  const { theme, toggle } = useDarkModeStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const closeMenu = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, []);

  return (
    <div
      className={`flex flex-col min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <header className="mt-6 px-10">
        <div className="container mx-auto flex items-center justify-between">
          <Link className="flex items-center gap-3 text-xl font-semibold" to="/">
  <FaUnsplash className="w-[32px] h-[32px]"/> SuRaT
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
              {theme === "dark" ? (
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

            <div ref={menuRef} className="relative">
              <div
                className="w-10 h-10 rounded-full overflow-hidden cursor-pointer border-2 border-gray-300 hover:border-gray-500"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <img
                  src="https://picsum.photos/id/237/200/200"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              {isMenuOpen && (
                <ul className="absolute right-0 mt-3 w-52 rounded-lg shadow-lg bg-white text-black p-2 z-10">
                  <li className="p-2 font-bold">Hayotbek</li>
                  <li>
                    <NavLink
                      className="flex items-center justify-between block p-2 rounded hover:bg-gray-200"
                      to="/profile"
                    >
                      Profile
                      <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-blue-500 rounded-full">
                        new
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="block p-2 rounded hover:bg-gray-200"
                      to="/settings"
                    >
                      Settings
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="block p-2 rounded text-red-500 hover:bg-red-100"
                      to="/logout"
                    >
                      Log out
                    </NavLink>
                  </li>
                </ul>
              )}
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

import React, { useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import useDarkModeStore from '../store/useDarkMore';
import Header from '../components/Header';
import Footer from '../components/Footer';

function MainLayout({ children }) {
  const { theme, toggle } = useDarkModeStore();
  const { user } = useGlobalContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      className={`flex flex-col min-h-screen ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'
      }`}
    >
      <Header />

      <main className="flex-grow">{children}</main>

      <Footer />
    </div>
  );
}

export default MainLayout;

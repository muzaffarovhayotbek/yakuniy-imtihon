import { Outlet } from 'react-router-dom';
import useDarkModeStore from '../store/useDarkMore';
import Header from '../components/Header';
import Footer from '../components/Footer';
function MainLayout() {
  const { theme } = useDarkModeStore();

  return (
    <div
      className={`flex flex-col min-h-screen ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'
      }`}
    >
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;

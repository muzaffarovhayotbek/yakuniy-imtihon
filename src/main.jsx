import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { GlobalContextProvider } from './context/GlobalContext.jsx';
import App from './App';
import { Toaster } from 'react-hot-toast'; // 🔥 IMPORT TOASTER!
import Home, { action as HomeAction } from './pages/Home/Home.jsx';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Error from './pages/Error/Error';
import Imageinfo from './pages/Imageinfo/Imageinfo';
import Download from './pages/Download/Download';
import Profile from './pages/Profile/Profile';
import LikedImages from './pages/LikedImages/LikedImages';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home />, action: HomeAction },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'imageinfo/:id', element: <Imageinfo /> },
      { path: 'download', element: <Download /> },
      { path: 'profile', element: <Profile /> },
      { path: 'likedImages', element: <LikedImages /> },
      { path: 'register', element: <Register /> },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '*', element: <Error /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <GlobalContextProvider>
      <Toaster position="top-right" reverseOrder={false} /> {/* ✅ TOASTERNI QO'SHDIK */}
      <RouterProvider router={router} />
    </GlobalContextProvider>
  </Provider>
);

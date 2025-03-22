import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import LikedImages from './pages/LikedImages/LikedImages';
import Imageinfo from './pages/Imageinfo/Imageinfo';
import Download from './pages/Download/Download';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';

import { ToastContainer } from 'react-toast';
import Profile from './pages/Profile/Profile';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'likedImages',
        element: <LikedImages />,
      },
      {
        path: '/Imageinfo/:id',
        element: <Imageinfo />,
      },
      {
        path: '/download',
        element: <Download />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer />
    </>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Error from './pages/Error/Error';
import Imageinfo from './pages/Imageinfo/Imageinfo';
import Download from './pages/Download/Download';
import Profile from './pages/Profile/Profile';
import { Toaster } from 'react-hot-toast';
import LikedImages from './pages/LikedImages/LikedImages';
import { useGlobalContext } from './context/GlobalContext';
function App() {
  const { user } = useGlobalContext();
  const navigate = useNavigate();

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route
          index
          element={
            <MainLayout>
              <Home></Home>
            </MainLayout>
          }
        ></Route>
        <Route
          path="/about"
          element={
            <MainLayout>
              <About></About>
            </MainLayout>
          }
        ></Route>
        <Route
          path="/contact"
          element={
            <MainLayout>
              <Contact></Contact>
            </MainLayout>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="*"
          element={
            <MainLayout>
              <Error />
            </MainLayout>
          }
        ></Route>
        <Route
          path="/imageinfo/:id"
          element={
            <MainLayout>
              <Imageinfo />
            </MainLayout>
          }
        ></Route>
        <Route
          path="/download"
          element={
            <MainLayout>
              <Download />
            </MainLayout>
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <MainLayout>
              <Profile />
            </MainLayout>
          }
        ></Route>
        <Route
          path="likedImages"
          element={
            <MainLayout>
              <LikedImages />
            </MainLayout>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;

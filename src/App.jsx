import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
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
import LikedImages from './pages/LikedImages/LikedImages';
import { Toaster } from 'react-hot-toast';
import { auth } from './firebase/firabageConfig';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="text-center mt-20 text-lg font-bold">Loading...</div>;
  }

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={user ? <MainLayout><Home /></MainLayout> : <Navigate to="/login" />} />
        <Route path="/about" element={user ? <MainLayout><About /></MainLayout> : <Navigate to="/login" />} />
        <Route path="/contact" element={user ? <MainLayout><Contact /></MainLayout> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/imageinfo/:id" element={user ? <MainLayout><Imageinfo /></MainLayout> : <Navigate to="/login" />} />
        <Route path="/download" element={user ? <MainLayout><Download /></MainLayout> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <MainLayout><Profile /></MainLayout> : <Navigate to="/login" />} />
        <Route path="/likedImages" element={user ? <MainLayout><LikedImages /></MainLayout> : <Navigate to="/login" />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;

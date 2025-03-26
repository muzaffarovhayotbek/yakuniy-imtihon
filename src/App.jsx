import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
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
      {user ? <MainLayout><Outlet /></MainLayout> : <Navigate to="/login" />}
    </div>
  );
}

export default App;

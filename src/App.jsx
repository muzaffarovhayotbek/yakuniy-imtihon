import React, { useEffect, useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { Toaster } from 'react-hot-toast';
import { auth } from './firebase/firabageConfig';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-20 text-lg font-bold">Loading...</div>
    );
  }

  const isAuthPage =
    location.pathname === '/login' || location.pathname === '/register';

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      {user ? (
        <MainLayout>
          <Outlet />
        </MainLayout>
      ) : isAuthPage ? (
        <Outlet />
      ) : (
        <Navigate to="/login" replace />
      )}
    </div>
  );
}

export default App;

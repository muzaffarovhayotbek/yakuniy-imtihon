import React, { useEffect, useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import toast, { Toaster } from 'react-hot-toast';
import { auth } from './firebase/firabageConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useGlobalContext } from './context/GlobalContext';

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { user, dispatch } = useGlobalContext();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch({ type: 'LOGIN', payload: user });
      dispatch({ type: 'AUTH_READY' });
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (loading) {
    return <div className="text-center mt-20 text-lg font-bold">Loading...</div>;
  }

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

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

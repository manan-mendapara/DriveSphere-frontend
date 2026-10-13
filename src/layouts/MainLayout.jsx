

import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './MainLayout.css';

const MainLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
  }, [location.pathname]);

  return (
    <main className="main-layout">
      <Outlet />
    </main>
  );
};

export default MainLayout;
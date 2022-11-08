import { Outlet } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Header = lazy(() => import('components/Header/Header'));

const Layout = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header />
      <Outlet />
    </Suspense>
  );
};

export default Layout;

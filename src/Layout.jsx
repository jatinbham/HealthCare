import React from 'react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">   {/* Yeh line important hai */}
      <Header />
      
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
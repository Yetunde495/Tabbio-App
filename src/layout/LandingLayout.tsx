import React, { useEffect } from 'react';
import Footer from './Footer';
import Navbar from './HomeNav';

const Layout = ({children}:{children: React.ReactNode}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='dark:bg-[#111827] dark:text-bodydark w-full 4xl:max-w-[1600px] mx-auto'>
        <div className='relative'>
         <Navbar />
          <main className='overflow-y-auto overflow-x-hidden'>
            <div className='mx-auto lg:max-w-screen-2xl 2xl:max-w-full'>
              {children}
            </div>
          </main>
          <Footer />
      </div>
    </div>
  );
};

export default Layout;
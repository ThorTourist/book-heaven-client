import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Hero from '../Components/Hero/Hero';
import Footer from '../Components/Footer/Footer';
import { Outlet } from 'react-router';
import NewsTicker from '../Pages/NewsTricker';

const RootLayout = () => {
    return (
      <div>
        <div className="w-11/12 mx-auto">
          <header>
                    <Navbar></Navbar>
                    <NewsTicker></NewsTicker>
            <Hero></Hero>
          </header>
          {/* main page */}

          <main className="min-h-[calc(100vh-200px)]">
            <Outlet></Outlet>
          </main>

          <footer>
            <Footer></Footer>
          </footer>
        </div>
      </div>
    );
};

export default RootLayout;
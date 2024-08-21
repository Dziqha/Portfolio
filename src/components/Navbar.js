"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Hamburger from 'hamburger-react'; 

const Navbar = () => {
  const [profilePicUrl, setProfilePicUrl] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchProfilePic = async () => {
      try {
        const response = await fetch('https://api.github.com/users/Dziqha',
          {
            headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_GH_TOKEN}` }
          }
        );
        if (!response.ok) throw new Error('Failed to fetch profile data');
        const data = await response.json();
        setProfilePicUrl(data.avatar_url);
      } catch (error) {
        console.error('Error fetching GitHub profile picture:', error);
        setProfilePicUrl('/favicon.ico'); // Use a default image
      }
    };

    fetchProfilePic();
  }, []);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar p-4 flex items-center relative bg-gray-800">
      <div className="navbar-content container mx-auto flex items-center justify-between max-w-screen-lg">
        {/* Logo */}
        <img src={profilePicUrl} alt="Profile Logo" className="logo h-10 w-10 rounded-full" />

        {/* Navbar Links (Desktop) */}
        <div className="nav-links hidden md:flex items-center flex-grow justify-center space-x-5">
          <Link href="/" className="nav-item text-yellow-200 text-lg hover:underline">Home</Link>
          <Link href="/projects" className="nav-item text-yellow-200 text-lg hover:underline">Projects</Link>
          <Link href="/contact" className="nav-item text-yellow-200 text-lg hover:underline">Contact</Link>
          <div className="try-yourself bg-gray-900 p-2 rounded-full relative">
            <Link href="/search" className="nav-item text-green-300 text-lg hover:underline">Search GitHub</Link>
            <span className="absolute top-0 left-0 w-5 h-5 bg-green-300 rounded-full"></span>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="menu-toggle md:hidden flex items-center">
          <Hamburger
            toggled={menuOpen}
            toggle={setMenuOpen}
            size={24}
            color="#e7d7ad" // Set your preferred color
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <div style={{ zIndex: 50, backdropFilter: 'blur(10px)', backgroundColor: 'rgba(31, 41, 55, 0.8)' }} className={`absolute top-16 right-0 w-full md:hidden ${menuOpen ? 'block' : 'hidden'} bg-gray-800 rounded-lg shadow-lg transition-transform transform ${menuOpen ? 'scale-100' : 'scale-95'}`}>
        <div className="p-4 bg-gruvbox-gray rounded-3xl ">
          <Link href="/" className="block py-2 px-4 text-white hover:bg-gray-700 rounded-lg transition-colors" onClick={handleLinkClick}>Home</Link>
          <Link href="/projects" className="block py-2 px-4 text-white hover:bg-gray-700 rounded-lg transition-colors" onClick={handleLinkClick}>Projects</Link>
          <Link href="/contact" className="block py-2 px-4 text-white hover:bg-gray-700 rounded-lg transition-colors" onClick={handleLinkClick}>Contact</Link>
          <Link href="/search" className="block py-2 px-4 text-white hover:bg-gray-700 rounded-lg transition-colors" onClick={handleLinkClick}>Search GitHub</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

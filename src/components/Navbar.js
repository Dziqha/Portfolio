"use client";
import { useState } from "react";
import Link from "next/link";
import Hamburger from "hamburger-react";
import Clock from "./JamAnalog";

const Navbar = ({ navItems }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar p-4 flex items-center relative bg-gray-800">
      <div className="navbar-content container mx-auto flex items-center justify-between max-w-screen-lg">
        {/* Logo */}
        <Clock />
        {/* Navbar Links (Desktop) */}
        <div className="nav-links hidden md:flex items-center flex-grow justify-center space-x-5">
          {navItems.map((navItem, index) => {
            return (
              <Link
                key={index}
                href={navItem.href}
                className="nav-item text-yellow-200 text-lg hover:underline"
              >
                {navItem.title}
              </Link>
            );
          })}
          <div className="try-yourself bg-gray-900 p-2 rounded-full relative">
            <Link
              href="/create"
              className="nav-item text-green-300 text-lg hover:underline"
            >
              Create Your Own
            </Link>
            <span className="absolute top-0 left-0 w-5 h-5 bg-green-300 rounded-full"></span>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="menu-toggle md:hidden flex items-center">
          <Hamburger
            toggled={menuOpen}
            toggle={setMenuOpen}
            size={24}
            color="#e7d7ad"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        style={{
          zIndex: 50,
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(31, 41, 55, 0.8)",
        }}
        className={`absolute top-16 right-0 w-full md:hidden ${
          menuOpen ? "block" : "hidden"
        } bg-gray-800 rounded-lg shadow-lg transition-transform transform ${
          menuOpen ? "scale-100" : "scale-95"
        }`}
      >
        <div className="p-4 bg-gruvbox-gray rounded-3xl ">
          {navItems.map((navItem, index) => {
            return (
              <Link
                key={index}
                href={navItem.href}
                onClick={handleLinkClick}
                className="block py-2 px-4 text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                {navItem.title}
              </Link>
            );
          })}
          <Link
            href="/create"
            className="block py-2 px-4 text-white hover:bg-gray-700 rounded-lg transition-colors"
            onClick={handleLinkClick}
          >
            Make Your Own
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

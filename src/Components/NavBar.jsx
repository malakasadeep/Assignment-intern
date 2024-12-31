import React, { useState } from "react";
import { Airplay, Menu, Search, User, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 z-50 font-sans font-light">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-md " />

      {/* Main navbar content */}
      <div className="relative px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-white/20 rounded-full transition-colors duration-300"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-800" />
            ) : (
              <Menu className="w-6 h-6 text-gray-800" />
            )}
          </button>

          {/* Logo */}
          <div className="text-2xl font-bold text-bg-primary md:mr-12 flex-grow-0 text-center md:text-left">
            <Airplay />
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex space-x-8 flex-grow justify-center">
            {["Home", "About Us", "Agents", "Blog"].map((item) => (
              <a
                key={item}
                href="#"
                className="relative text-white hover:text-bg-primary transition-colors duration-300 group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right side content */}
          <div className="flex items-center space-x-4">
            {/* Search bar - visible only on desktop */}
            <div className="hidden md:flex items-center relative">
              <div className="flex items-center border-b border-gray-300 focus-within:border-bg-primary transition-all duration-300">
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent outline-none px-2 py-1 w-48 lg:w-64 text-white"
                />
                <Search className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Sign In/Sign Up buttons - visible only on desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="text-white hover:text-bg-primary transition-colors duration-300">
                Sign In
              </button>
              <span className="text-white">|</span>
              <button className=" text-white hover:text-bg-primary  transition-colors duration-300">
                Sign Up
              </button>
            </div>

            {/* Mobile icons */}
            <div className="md:hidden flex items-center space-x-2">
              <button className="p-2 hover:bg-white/20 rounded-full transition-colors duration-300">
                <Search className="w-5 h-5 text-gray-800" />
              </button>
              <button className="p-2 hover:bg-white/20 rounded-full transition-colors duration-300">
                <User className="w-5 h-5 text-gray-800" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`absolute left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg transition-all duration-300 ease-in-out ${
            isMenuOpen ? "top-full opacity-100" : "-top-96 opacity-0"
          }`}
        >
          <div className="px-4 py-6 space-y-4">
            {["Home", "About Us", "Agents", "Blog"].map((item) => (
              <a
                key={item}
                href="#"
                className="block text-gray-800 hover:text-purple-700 hover:bg-purple-50 px-4 py-2 rounded-lg transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

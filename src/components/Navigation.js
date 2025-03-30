import React, { useState } from 'react';
import { FaSearch, FaShoppingCart, FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
    setIsCategoryOpen(false);
  };

  return (
    <nav className="bg-blue1 shadow-md px-6 py-5 flex items-center justify-between relative z-50">
      {/* Logo + Search */}
      <div className="flex items-center gap-16">
        <img src="images/logo.jpg" alt="Logo" className="h-8" />

        {/* Search Bar (Desktop Only) */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-1 border rounded-full w-60 bg-Green3 text-white placeholder-white focus:outline-none"
          />
          <FaSearch className="absolute right-3 top-2.5 text-gray-300" />
        </div>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden text-white text-xl"
      >
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6">
        <Link to="/Home" className="text-white font-semibold hover:text-blue2">Home</Link>
        <Link to="/services" className="text-white font-semibold hover:text-blue2">Services</Link>
        <Link to="/contact" className="text-white font-semibold hover:text-blue2">Contact us</Link>
        <Link to="/projects" className="text-white font-semibold hover:text-blue2">Our projects</Link>

        {/* Category Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className="flex items-center gap-1 text-white font-semibold hover:text-blue2"
          >
            Categories <FaChevronDown className="text-xs" />
          </button>
          {isCategoryOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-50">
              <Link to="/electronics" className="block px-4 py-2 hover:bg-gray-100">Electronics</Link>
              <Link to="/fashion" className="block px-4 py-2 hover:bg-gray-100">Fashion</Link>
              <Link to="/grocery" className="block px-4 py-2 hover:bg-gray-100">Grocery</Link>
            </div>
          )}
        </div>

        <Link to="/login" className="text-white font-semibold hover:text-blue2">Log in</Link>

        {/* Cart */}
        <div className="relative">
          <button onClick={() => setIsCartOpen(!isCartOpen)}>
            <FaShoppingCart className="text-xl text-white hover:text-blue2" />
          </button>
          {isCartOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-50 p-4">
              <p className="text-sm text-gray-600">Your cart is empty</p>
            </div>
          )}
        </div>

        {/* Register */}
        <Link to="/register">
          <button className="bg-gradient-to-r from-blue2 to-blue2 text-white px-4 py-1 rounded-full hover:opacity-90">
            Create an Account
          </button>
        </Link>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-blue1 p-6 md:hidden z-40 space-y-3 transition-all duration-300">
          <Link onClick={handleMobileLinkClick} to="/" className="block text-white">Home</Link>
          <Link onClick={handleMobileLinkClick} to="/services" className="block text-white">Services</Link>
          <Link onClick={handleMobileLinkClick} to="/contact" className="block text-white">Contact us</Link>
          <Link onClick={handleMobileLinkClick} to="/projects" className="block text-white">Our projects</Link>

          {/* Mobile Category Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="flex items-center gap-1 text-white w-full"
            >
              Categories <FaChevronDown className="text-xs" />
            </button>
            {isCategoryOpen && (
              <div className="mt-2 w-full bg-white border rounded shadow-md z-50">
                <Link onClick={handleMobileLinkClick} to="/electronics" className="block px-4 py-2 hover:bg-gray-100">Electronics</Link>
                <Link onClick={handleMobileLinkClick} to="/fashion" className="block px-4 py-2 hover:bg-gray-100">Fashion</Link>
                <Link onClick={handleMobileLinkClick} to="/grocery" className="block px-4 py-2 hover:bg-gray-100">Grocery</Link>
              </div>
            )}
          </div>

          <Link onClick={handleMobileLinkClick} to="/login" className="block text-white">Log in</Link>
          <Link onClick={handleMobileLinkClick} to="/register" className="block">
            <button className="bg-gradient-to-r from-blue2 to-blue2 text-white w-full py-2 rounded-full hover:opacity-90 mt-2">
              Create an Account
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navigation;

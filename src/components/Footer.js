import React from "react";

export default function Footer() {
  return (
    <footer className="bg-blue1 text-white py-10">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Left Section */}
        <div>
          <h2 className="text-xl font-bold">EASY MART</h2>
          <p className="text-gray-400 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Navigation</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Services</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
          </ul>
        </div>

        {/* Information */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Information</h3>
          <p className="text-gray-400">+114536617</p>
          <p className="text-gray-400">smai@gmail.com</p>
          <p className="text-gray-400">Welivita Road, Kothalawala, Kaduwela, Sri Lanka</p>
        </div>

        {/* Opening Hours */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Opening Hours</h3>
          <p className="text-gray-400">Mon - Thu: 9:00 - 21:00</p>
          <p className="text-gray-400">Fri: 8:00 - 21:00</p>
          <p className="text-gray-400">Sat-Sun: 8:30 - 22:00</p>
          <p className="text-gray-400">Holiday: Off</p>
        </div>
      </div>

      {/* Social & Payments */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center">
        {/* Social Icons */}
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="text-gray-400 hover:text-white text-2xl"><i className="fab fa-facebook"></i></a>
          <a href="#" className="text-gray-400 hover:text-white text-2xl"><i className="fab fa-twitter"></i></a>
          <a href="#" className="text-gray-400 hover:text-white text-2xl"><i className="fab fa-instagram"></i></a>
          <a href="#" className="text-gray-400 hover:text-white text-2xl"><i className="fab fa-linkedin"></i></a>
        </div>

        {/* Payment Methods */}
        <div className="flex justify-center space-x-4 mb-4">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-8"/>
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" alt="MasterCard" className="h-8"/>
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-8"/>
        </div>

        {/* Copyright */}
        <p className="text-gray-500 mt-4 text-sm">
          Copyright ©2025 All rights reserved | Block is made with by <a href="#" className="text-white">Group SMAI</a>
        </p>
      </div>
    </footer>
  );
}

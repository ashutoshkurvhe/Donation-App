// src/components/landing/HeroSection.jsx
import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-blue-600 text-white py-20">
      <div className="max-w-6xl mx-auto text-center space-y-6">
        <h1 className="text-5xl font-bold">Make a Difference Today</h1>
        <p className="text-xl">Support trusted NGOs and change lives</p>
        <Link
          to="/register"
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;

// src/components/landing/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p>© 2025 NGO Donation App. All rights reserved.</p>
        <div className="space-x-4 mt-4 md:mt-0">
          <Link to="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:underline">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineUser,
} from "react-icons/hi2";
import { Heart } from "lucide-react";
import { useSelector } from "react-redux";



const Navbar = () => {
  const {user} = useSelector((state)=> state.auth)

  return (
    <>
      <nav className="container-full mx-auto flex items-center justify-between py-4 px-2 md:px-6 bg-transparent sticky top-0">
        {/* Left - Logo */}
        <div>
          <Link to="/" className="text-2xl text-black font-medium flex gap-2">
            <Heart className="group bg-gradient-to-r from-blue-600 to-emerald-500 text-white p-2 w-10 h-10 rounded-full" />
            LetsDonate
          </Link>
        </div>
        {/* Center - navigation Links */}

        {/* Right - Icons */}
        <div className="flex items-center space-x-2">
          {user && user.role === "admin" && (
            <Link
              to="/admin"
              className="block bg-black px-3 py-1 rounded text-sm text-white"
            >
              Admin
            </Link>
          )}
          <Link to="/profile" className="hover:text-black">
            <HiOutlineUser className="h-6 w-6 text-gray-900" />
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "../ui/button";

function Navbar({ openSignIn, openLogin }) { // إضافة openSignIn كخاصية
  const [isOpen, setIsOpen] = useState(false); // State to track menu visibility

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the menu
  };

  return (
    <nav className="lg:bg-[#0E0F2A] fixed z-40 w-full mb-auto">
      <div className="flex flex-wrap items-center justify-between py-2 md:px-10">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center space-x-3">
          <span className="text-[12px] lg:text-2xl text-white logo-font flex items-center">
            <span className="text-[#4169e1] text-2xl ">D</span>iscover
          </span>
        </Link>

        {/* Login/Signup Buttons */}
        <div className="flex md:order-2 space-x-3 gap-[5px] md:gap-2">
          <Button
            asChild
            type="button"
            variant="outline"
          >
            <Link to="/login" onClick={openLogin}>Log in</Link>
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={openSignIn}
          >
            Sign up
          </Button>
          <button
            onClick={toggleMenu}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none"
            aria-controls="navbar-cta"
            aria-expanded={isOpen ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Menu Items */}
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 transition-all duration-300 ${
            isOpen ? "flex" : "hidden"
          }`}
          id="navbar-cta"
        >
          <ul className="flex flex-col md:flex-row font-medium p-4 mt-4 bg-transparent rounded-lg md:space-x-8 md:mt-0 transition-transform duration-300">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 rounded text-[#4169e1] hover:text-white transition-colors duration-300"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/map"
                className="block py-2 px-3 text-white rounded hover:text-[#4169e1] transition-colors duration-300"
              >
                Map
              </Link>
            </li>
            <li>
              <Link
                to="/instruction"
                className="block py-2 px-3 text-white rounded hover:text-[#4169e1] transition-colors duration-300"
              >
                Instructions
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block py-2 px-3 text-white rounded hover:text-[#4169e1] transition-colors duration-300"
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

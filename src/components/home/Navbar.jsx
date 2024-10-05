import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useModal } from "../../services/contextApi";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { MdOutlineSupervisorAccount, MdOutlineShareLocation } from "react-icons/md";
import { useNavbarHook } from "../../hooks/useNavebarHook";

function Navbar() {
  const {
    isOpen,
    user,
    isPopupOpen,
    isProfilePopupOpen,
    isLocationPopupOpen,
    toggleMenu,
    togglePopup,
    toggleProfilePopup,
    toggleLocationPopup,
    handleLogout,
  } = useNavbarHook();

  // Use Modal Context for opening Login and Signup modals
  const { openLogin, openSignUP } = useModal(); // Corrected to match the context

  return (
    <nav className="bg-[#0E0F2A] fixed z-40 w-full mb-auto">
      <div className="flex flex-wrap items-center justify-between py-2 md:px-10">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center space-x-3">
          <span className="text-[12px] lg:text-2xl text-white logo-font flex items-center">
            <span className="text-[#4169e1] text-2xl">D</span>iscover
          </span>
        </Link>

        {/* Conditionally render Login/Signup or User Info */}
        <div className="flex md:order-2 space-x-3 gap-[5px] md:gap-2">
          {user ? (
            <div className="flex items-center space-x-3 text-white relative">
              <div className="w-8 h-8 cursor-pointer" onClick={togglePopup}>
                <RiAccountPinCircleLine className="w-full h-full" />
              </div>

              {isPopupOpen && (
                <div className="absolute right-0 top-16 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-50 transition duration-300">
                  <div className="flex flex-col text-black space-y-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        User Actions
                      </label>
                      <Link
                        to="#"
                        onClick={() => {
                          toggleProfilePopup();
                          togglePopup(); // Close the main pop-up
                        }}
                        className="cursor-pointer border-b pb-2 text-blue-500 hover:underline flex items-center"
                      >
                        <MdOutlineSupervisorAccount className="mr-1" />
                        View Profile
                      </Link>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location Options
                      </label>
                      <Link
                        to="#"
                        onClick={() => {
                          toggleLocationPopup();
                          togglePopup(); // Close the main pop-up
                        }}
                        className="text-blue-500 hover:underline flex items-center"
                      >
                        <MdOutlineShareLocation className="mr-1" />
                        Your Location
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              <Button type="button" variant="outline" onClick={handleLogout}>
                <Link to="/">Log out</Link>
              </Button>
            </div>
          ) : (
            <>
              <Button asChild type="button" variant="outline">
                <Link to="/login" onClick={openLogin}>
                  Log in
                </Link>
              </Button>
              <Button type="button" variant="secondary">
                <Link to="/signup" onClick={openSignUP}>
                  Sign up
                </Link>
              </Button>
            </>
          )}

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
                className="block py-2 px-3 text-white rounded hover:bg-gray-700 hover:text-white transition-colors duration-300"
              >
                Map
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block py-2 px-3 text-white rounded hover:bg-gray-700 hover:text-white transition-colors duration-300"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block py-2 px-3 text-white rounded hover:bg-gray-700 hover:text-white transition-colors duration-300"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

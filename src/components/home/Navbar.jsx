import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useModal } from "../../services/contextApi";
import { RiAccountPinCircleLine } from "react-icons/ri";
import {
  MdOutlineSupervisorAccount,
  MdOutlineShareLocation,
} from "react-icons/md";
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

  const { openLogin, openSignUp } = useModal(); // Use Modal Context for opening Login and Signup modals

  return (
    <nav className="bg-[#0E0F2A] fixed z-40 w-full mb-auto shadow-lg">
      <div className="flex flex-wrap items-center justify-between py-2 px-5 md:px-10">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center space-x-3">
          <span className="text-[12px] lg:text-2xl text-white font-semibold flex items-center text-Monoton">
            <span className="text-[#4169e1] text-2xl text-Monoton">D</span>
            iscover
          </span>
        </Link>

        {/* Conditionally render Login/Signup or User Info */}
        <div className="flex md:order-2 space-x-3 gap-[5px] md:gap-2">
          {user ? (
            <div className="flex items-center space-x-3 text-white relative">
              <div
                className="w-8 h-8 cursor-pointer hover:bg-gray-700 rounded-full flex items-center justify-center"
                onClick={togglePopup}
              >
                <RiAccountPinCircleLine className="w-full h-full" />
              </div>

              {/* User Actions Pop-up */}
              {isPopupOpen && (
                <div className="absolute right-0 top-16 mt-2 w-64 bg-white rounded-lg shadow-xl p-4 z-50">
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
                        className="cursor-pointer border-b pb-2 text-blue-500 hover:text-blue-700 hover:underline flex items-center"
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
                        className="text-blue-500 hover:text-blue-700 hover:underline flex items-center"
                      >
                        <MdOutlineShareLocation className="mr-1" />
                        Your Location
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              <Button
                type="button"
                variant="outline"
                onClick={handleLogout}
                className="hover:bg-red-500 hover:text-white transition-all duration-300"
              >
                <Link to="/">Log out</Link>
              </Button>
            </div>
          ) : (
            <>
              <Button
                asChild
                type="button"
                variant="outline"
                className="px-2 md:px-4 hover:bg-blue-500 hover:text-white"
              >
                <Link to="/login" onClick={openLogin}>
                  Log in
                </Link>
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="px-2 md:px-4 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Link to="/signup" onClick={openSignUp}>
                  Sign up
                </Link>
              </Button>
            </>
          )}

          {/* Mobile Menu Toggle Button */}
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

        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 transition-transform duration-300 ease-in-out ${
            isOpen ? "" : "hidden"
          } md:block`}
          id="navbar-cta"
        >
          <ul className="flex flex-col md:flex-row font-medium p-4 mt-4 bg-transparent rounded-lg md:space-x-8 md:mt-0">
            {["Home", "Map", "About", "Instructions"].map((link, index) => (
              <li
                key={link}
                className={`transform transition-transform duration-300 ease-in-out ${
                  isOpen
                    ? `translate-x-0 delay-${index * 100}`
                    : "translate-x-10"
                }`}
              >
                <Link
                  to={`/${link.toLowerCase()}`}
                  className="block py-2 px-3 rounded text-white hover:text-[#4169e1] hover:translate-x-2 active:text-[#224ccc] transition-all duration-300"
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Profile Popup */}
      {isProfilePopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm z-50">
          <div className="bg-white w-80 p-6 rounded-xl shadow-xl border border-gray-300">
            <h3 className="text-lg font-semibold text-black mb-4 border-b pb-2">
              User Profile
            </h3>
            {user && (
              <div>
                <div className="mb-4">
                  <label className="block text-sm mb-2 font-medium text-gray-700">
                    Name:
                  </label>
                  <p className="text-gray-900 border rounded-md p-2">
                    {user.fullName}
                  </p>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Email:
                  </label>
                  <p className="text-gray-900 border rounded-md p-2">
                    {user.email}
                  </p>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              onClick={toggleProfilePopup}
              className="mt-4 text-white bg-red-400 hover:bg-red-500"
            >
              Close
            </Button>
          </div>
        </div>
      )}

      {/* Location Popup */}
      {isLocationPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm z-50">
          <div className="bg-white w-80 p-6 rounded-xl shadow-xl border border-gray-300">
            <h3 className="text-lg font-semibold text-black mb-4 border-b pb-2">
              Your Location
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Location:
              </label>
              <p className="text-gray-900 border rounded-md p-2">
                Display users location here.
              </p>
            </div>
            <Button
              variant="ghost"
              onClick={toggleLocationPopup}
              className="mt-4 text-white bg-red-400 hover:bg-red-500"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

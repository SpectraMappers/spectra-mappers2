import { useState, useEffect } from "react";
import axios from "axios";

export const useNavbarHook = () => {
  const [isOpen, setIsOpen] = useState(false); // State to track menu visibility
  const [user, setUser] = useState(null); // State to store user data
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State for user actions pop-up
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false); // State for profile pop-up
  const [isLocationPopupOpen, setIsLocationPopupOpen] = useState(false); // State for location pop-up

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the menu
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen); // Toggle user actions pop-up
  };

  const toggleProfilePopup = () => {
    setIsProfilePopupOpen(!isProfilePopupOpen); // Toggle profile pop-up
    setIsPopupOpen(false); // Ensure the main pop-up is closed
  };

  const toggleLocationPopup = () => {
    setIsLocationPopupOpen(!isLocationPopupOpen); // Toggle location pop-up
    setIsPopupOpen(false); // Ensure the main pop-up is closed
  };

  // Function to fetch user data using the token
  const fetchUserData = async (token) => {
    try {
      const response = await axios.get("https://nasa.elyra.games/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = response.data.data;
      setUser(userData); // Set user state with fetched data
      localStorage.setItem("user", JSON.stringify(userData)); // Save user to localStorage
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Fetch user data from localStorage if logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData); // Parse the user data if available
        setUser(parsedUserData);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }

    if (token) {
      fetchUserData(token);
    }
  }, []);

  // Logout function to clear user data
  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data from localStorage
    localStorage.removeItem("token"); // Clear the token from localStorage
    setUser(null); // Reset user state
    window.location.reload(); // Optionally reload to update the UI
  };

  return {
    isOpen,
    user,
    isPopupOpen,
    isProfilePopupOpen,
    isLocationPopupOpen,
    toggleMenu,
    togglePopup, // Make sure this is included
    toggleProfilePopup,
    toggleLocationPopup,
    handleLogout,
  };
};

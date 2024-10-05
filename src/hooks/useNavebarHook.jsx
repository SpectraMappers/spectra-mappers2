import { useState, useEffect } from "react";
import axios from "axios";
import { useModal } from "../services/contextApi"; // Import the useModal hook

export const useNavbarHook = () => {
  const [isOpen, setIsOpen] = useState(false); // State to track menu visibility
  const [user, setUser] = useState(null); // State to store user data
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State for user actions pop-up
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false); // State for profile pop-up
  const [isLocationPopupOpen, setIsLocationPopupOpen] = useState(false); // State for location pop-up
  
  const { openLogin, closeLogin, openSignUp, closeSignUp } = useModal();

  // Toggle the menu visibility
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Toggle the user actions pop-up
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // Toggle the profile pop-up and close the main pop-up if open
  const toggleProfilePopup = () => {
    setIsProfilePopupOpen(!isProfilePopupOpen);
    setIsPopupOpen(false);
  };

  // Toggle the location pop-up and close the main pop-up if open
  const toggleLocationPopup = () => {
    setIsLocationPopupOpen(!isLocationPopupOpen);
    setIsPopupOpen(false);
  };

  // Fetch user data using token
  const fetchUserData = async (token) => {
    try {
      const response = await axios.get("https://nasa.elyra.games/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userData = response.data.data;
      setUser(userData); // Set user state with fetched data
      localStorage.setItem("user", JSON.stringify(userData)); // Save user to localStorage
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
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
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    window.location.reload();
  };

  return {
    isOpen,
    user,
    isPopupOpen,
    isProfilePopupOpen,
    isLocationPopupOpen,
    openLogin,
    closeLogin,
    openSignUp,
    closeSignUp,
    toggleMenu,
    togglePopup, 
    toggleProfilePopup,
    toggleLocationPopup,
    handleLogout,
  };
};

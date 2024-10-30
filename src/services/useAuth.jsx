import { createContext, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useModal } from "../services/contextApi";
import Swal from "sweetalert2";
import axios from "axios";

// Create an AuthContext to store authentication state
const AuthContext = createContext();

export const useAuth = () => {
  const {closeLogin} =useModal()
  const navigate = useNavigate(); // React hook for navigation
  const queryClient = useQueryClient(); // React Query hook for managing cache

  // Login mutation using react-query's useMutation
  const loginMutation = useMutation(
    async (userData) => {
      // Call the login endpoint to authenticate the user
      return await axios.post("https://nasa.elyra.games/auth/login", userData);
    },
    {
      onSuccess: async (response) => {
        // Check if the login was successful
        if (response.data.success) {
          const token = response.data.token;

          // Save the token to localStorage
          localStorage.setItem("token", token);

          try {
            // Fetch the user data after login
            await fetchUserData(token);

            // Display success message
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Login Successful!",
              showConfirmButton: false,
              timer: 1500,
            });

            // Invalidate user query cache and navigate to the map page
            queryClient.invalidateQueries("user");
            navigate("/map");
            closeLogin();
          } catch (error) {
            // Handle error if fetching user data fails
            Swal.fire(
              error,
              "Failed to fetch user data. Please try again.",
              "error"
            );
          }
        } else {
          // Show error message if login credentials are incorrect
          Swal.fire("Error", "Username or password is incorrect.", "error");
        }
      },
      onError: () => {
        // Handle login request failure
        Swal.fire("Error", "Failed to log in. Please try again.", "error");
      },
    }
  );

  // Function to fetch user data from the server after login
  const fetchUserData = async (token) => {
    try {
      const response = await axios.get("https://nasa.elyra.games/user/me", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });

      // Save the fetched user data to localStorage
      localStorage.setItem("user", JSON.stringify(response.data.user));
    } catch (error) {
      // Throw a formatted error for handling in the login mutation
      throw new Error("Failed to fetch user data. Please try again.");
    }
  };

  // Logout function to clear the authentication state
  const logout = () => {
    // Remove stored token and user data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Invalidate the user query cache to reflect logout
    queryClient.invalidateQueries("user");

    // Navigate back to the login page
    navigate("/login");
  };

  return {
    loginMutation,
    logout,
  };
};

// Create the `AuthProvider` component to wrap the application with AuthContext
export const AuthProvider = ({ children }) => {
  const auth = useAuth(); // Use the useAuth hook

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

// Custom hook to access the AuthContext
export const useAuthContext = () => useContext(AuthContext);

export default useAuth;

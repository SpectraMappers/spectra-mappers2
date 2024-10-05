import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Login mutation
  const loginMutation = useMutation(
    async (userData) => {
      return await axios.post("https://nasa.elyra.games/auth/login", userData);
    },
    {
      onSuccess: (response) => {
        if (response.data.success) {
          // Save token to localStorage
          localStorage.setItem("token", response.data.token);

          // After login, fetch user data using the token
          fetchUserData(response.data.token);

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });

          navigate("/map");
          queryClient.invalidateQueries("user");
        } else {
          Swal.fire("Error", "Username or password is incorrect.", "error");
        }
      },
      onError: () => {
        Swal.fire("Error", "Failed to log in. Please try again.", "error");
      },
    }
  );

  // Fetch user data from server after login
  const fetchUserData = async (token) => {
    try {
      const response = await axios.get(
        "https://nasa.elyra.games/user/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token to authenticate the request
          },
        }
      );

      // Save user data to localStorage
      localStorage.setItem("user", JSON.stringify(response.data.user));
    } catch (error) {
      Swal.fire(error, "Failed to fetch user data.", "error");
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    queryClient.invalidateQueries("user");
    navigate("/login");
  };

  return {
    loginMutation,
    logout,
  };
};

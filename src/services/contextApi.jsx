// src/services/contextApi.jsx
import { createContext, useContext, useReducer } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

// Initial state for the modals
const initialState = {
  isSignupOpen: false, // SignUp modal state
  isLoginOpen: false,  // Login modal state
  isForgetPassOpen: false,  // Forget Password modal state
  signUpData: null,  // Store sign-up data if needed
};

// Action types for state management
const OPEN_SIGNUP = "OPEN_SIGNUP";
const CLOSE_SIGNUP = "CLOSE_SIGNUP";
const OPEN_LOGIN = "OPEN_LOGIN";
const CLOSE_LOGIN = "CLOSE_LOGIN";
const OPEN_FORGETPASS = "OPEN_FORGETPASS";
const CLOSE_FORGETPASS = "CLOSE_FORGETPASS";
const SET_SIGNUP_DATA = "SET_SIGNUP_DATA";

// Reducer function to handle the modal state transitions
const modalReducer = (state, action) => {
  switch (action.type) {
    case OPEN_SIGNUP:
      return { ...state, isSignupOpen: true };
    case CLOSE_SIGNUP:
      return { ...state, isSignupOpen: false };
    case OPEN_LOGIN:
      return { ...state, isLoginOpen: true };
    case CLOSE_LOGIN:
      return { ...state, isLoginOpen: false };
    case OPEN_FORGETPASS:
      return { ...state, isForgetPassOpen: true };
    case CLOSE_FORGETPASS:
      return { ...state, isForgetPassOpen: false };
    case SET_SIGNUP_DATA:
      return { ...state, signUpData: action.payload }; // Set sign-up data
    default:
      return state;
  }
};

// Create the context
const ModalContext = createContext();

// API URL for the sign-up endpoint
const apiUrl = "https://nasa.elyra.games/auth/register";

// Create the provider component
export const ModalProvider = ({ children }) => {
  // Use React's `useReducer` hook for state management
  const [state, dispatch] = useReducer(modalReducer, initialState);

  // Functions to open and close modals
  const openSignUp = () => dispatch({ type: OPEN_SIGNUP }); // Ensure this function name is correct
  const closeSignUp = () => dispatch({ type: CLOSE_SIGNUP });
  const openLogin = () => dispatch({ type: OPEN_LOGIN });
  const closeLogin = () => dispatch({ type: CLOSE_LOGIN });
  const openForgetPass = () => dispatch({ type: OPEN_FORGETPASS });
  const closeForgetPass = () => dispatch({ type: CLOSE_FORGETPASS });

  // Function to set sign-up data
  const setSignUpData = (data) => dispatch({ type: SET_SIGNUP_DATA, payload: data });

  // React Query mutation to handle the sign-up request
  const mutation = useMutation(
    async (userData) => {
      // Post the user data to the API
      const response = await axios.post(apiUrl, userData);
      return response.data;
    },
    {
      onSuccess: (data) => {
        // Display a success alert on successful sign-up
        Swal.fire({
          title: "Success",
          text: "You have successfully signed up!",
          icon: "success",
          confirmButtonText: "OK",
        });
        console.log("Sign-up success:", data);
      },
      onError: (error) => {
        // Display an error alert if sign-up fails
        Swal.fire({
          title: "Error",
          text: error?.response?.data?.message || "Sign-up failed!",
          icon: "error",
          confirmButtonText: "OK",
        });
        console.error("Sign-up error:", error);
      },
    }
  );

  // Function to handle the sign-up submission
  const submitSignUp = async (data) => {
    setSignUpData(data); // Store the sign-up data in context
    mutation.mutate(data); // Trigger the React Query mutation to post data
  };

  return (
    <ModalContext.Provider
      value={{
        ...state,
        openSignUp, // Correct function name
        closeSignUp,
        openLogin,
        closeLogin,
        openForgetPass,
        closeForgetPass,
        submitSignUp,
        fetchUserData: setSignUpData,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

// Custom hook to use the modal context in components
export const useModal = () => useContext(ModalContext);

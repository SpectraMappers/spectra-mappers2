import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../services/contextApi";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const { openLogin } = useModal(); // Get openLogin from context
  const navigate = useNavigate(); // React Router's navigate hook

  useEffect(() => {
    // If no token is found, open the login modal and navigate to home
    if (!token) {
      openLogin();
      navigate("/"); // Redirect to home or a specific route
    }
  }, [token, openLogin, navigate]);

  // Render children if the token exists, otherwise return null
  return token ? children : null;
};

export default PrivateRoute;

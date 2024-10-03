import { useState } from "react";
import { IoArrowUpCircle } from "react-icons/io5"; // Import an arrow icon
import Navbar from "../components/home/Navbar";
import Landing from "../components/home/Landing";
import About from "../components/home/About";
import Text from "../components/home/Text";
import Instructions from "../components/home/Instructions";
import SignInForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm"; // Import the LoginForm component

function Home() {
  const [isSignInOpen, setSignUpOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false); 

  const openSignUp = () => setSignUpOpen(true);
  const closeSignUP = () => setSignUpOpen(false);
  
  const openLogin = () => setLoginOpen(true); 
  const closeLogin = () => setLoginOpen(false); 

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scroll to top
    });
  };

  return (
    <>
      <Navbar openSignIn={openSignUp} openLogin={openLogin} />
      <Landing>
        <Text />
      </Landing>
      <Instructions />
      <About />

      {/* SignIn Popup */}
      {isSignInOpen && (
        <div className="fixed p-20 inset-0 bg-transparent filter backdrop-blur flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-10"
            onClick={closeSignUP}
          ></div>
          <div className="p-20 rounded shadow-lg z-10 relative flex items-center justify-center">
            <SignInForm closeSignUp={closeSignUP} openLogin={openLogin} />
          </div>
        </div>
      )}

      {/* Login Popup */}
      {isLoginOpen && (
        <div className="fixed p-20 inset-0 bg-transparent filter backdrop-blur flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-10"
            onClick={closeLogin}
          ></div>
          <div className="p-20 rounded shadow-lg z-10 relative flex items-center justify-center">
            <LoginForm closeLogin={closeLogin} openSignUp={openSignUp} />
          </div>
        </div>
      )}

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed z-50 bottom-4 right-4 bg-blue-500 text-white rounded-full p-3 shadow-lg hover:bg-blue-600 transition duration-200"
        aria-label="Scroll to Top"
      >
        <IoArrowUpCircle size={24} />
      </button>
    </>
  );
}

export default Home;

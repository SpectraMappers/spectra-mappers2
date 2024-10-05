import { IoArrowUpCircle } from "react-icons/io5"; // Import an arrow icon
import Navbar from "../components/home/Navbar";
import Landing from "../components/home/Landing";
import About from "../components/home/About";
import Text from "../components/home/Text";
import Instructions from "../components/home/Instructions";
import SignInForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";
import ForgetPass from "../components/ForgetPass";
import { useModal } from "../services/contextApi"; // Import the context

// Reusable Modal Component
function Modal({ children, closeModal }) {
  return (
    <div className="fixed inset-0 bg-transparent filter backdrop-blur flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-10"
        onClick={closeModal}
      ></div>
      <div className="rounded shadow-lg z-10 relative flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

function Home() {
  const {
    isSignupOpen,
    isLoginOpen,
    isForgetPassOpen,
    openSignup,
    closeSignIn,
    openLogin,
    closeLogin,
    openForgetPass,
    closeForgetPass,
  } = useModal();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll to top
    });
  };

  return (
    <>
      <Navbar openSignIn={openSignup} openLogin={openLogin} />
      <Landing>
        <Text />
      </Landing>
      <Instructions />
      <About />

      {/* SignIn Modal */}
      {isSignupOpen && (
        <div className="w-full p-20 ">
          <Modal closeModal={closeSignIn}>
            <SignInForm closeSignUp={closeSignIn} openLogin={openLogin} />
          </Modal>
        </div>
      )}

      {/* Login Modal */}
      {isLoginOpen && (
        <Modal closeModal={closeLogin}>
          <LoginForm
            closeLogin={closeLogin}
            openSignUp={openSignup}
            openForgetPass={openForgetPass}
          />
        </Modal>
      )}

      {/* ForgetPass Modal */}
      {isForgetPassOpen && (
        <Modal closeModal={closeForgetPass}>
          <ForgetPass closeForgetPass={closeForgetPass} />
        </Modal>
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

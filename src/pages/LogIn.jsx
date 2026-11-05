import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, use } from "react";
import api from "../api/api";
import PasswordVisibilityToggle from "../components/PasswordVisibilityToggle";

const LogIn = () => {
  const { setIsLoggedIn, redirectAfterLogin, setRedirectAfterLogin, setUser } =useAuth();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState(false);
  const [message,setMessage]=useState("");

  const postLogin = async () => {
    try {
      const request = await api.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/login`,
        loginData,
      );
      

      if(request.data.success){
        console.log("inside postLogin: ", request.data.data);
        localStorage.setItem("token", request.data.data.token);
        setUser(request.data.data);

        setIsLoggedIn(true);
        if (redirectAfterLogin) {
          navigate(redirectAfterLogin);
          setRedirectAfterLogin(null);
        } else {
          navigate("/");
        }
      }else{
        setError(true);
        setMessage(request.data.message);
        // console.log(request.data.message);
      }
    
    } catch (error) {
      console.error("error occurred while sending request: ",error);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [error]);



  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full">

      {error && (<div className="w-full fixed top-20 sm:top-24 z-50 flex items-center justify-center px-2">
        <div className="flex items-center justify-center gap-2 rounded-full bg-white px-6 sm:px-10 py-1.5 sm:py-2">
          <h3 className="text-sm sm:text-lg md:text-xl font-bold text-red-500 text-center">{message}</h3>
        </div>
      </div>)}


      {/* Left Side */}
      <div className="hidden md:flex w-full md:w-[55%] bg-purple-900 items-center justify-center italic font-extrabold text-white text-2xl sm:text-3xl md:text-4xl px-4 text-center">
        "From cart to heart – the journey matters"
      </div>

      {/* Right Side */}
      <div className="w-full md:w-[45%] bg-gray-800 flex items-center justify-center min-h-screen md:min-h-full">

        <form
          className="auth-form w-full max-w-md px-4 sm:px-6 py-6 sm:py-8 md:py-10"
          onSubmit={(e) => {
            e.preventDefault();
            postLogin();
          }}
        >
          <h4 className="font-bold text-xl sm:text-2xl text-white mb-4 sm:mb-6 text-left">
            Log into Amazio
          </h4>

          {/* Email or Mobile number */}
          <div className="group relative flex flex-col mb-3 sm:mb-4 text-white">
            <input
              type="text"
              id="email"
              required
              placeholder=" "
              className="peer text-sm sm:text-base md:text-lg px-3 sm:px-4 md:px-6 pt-4 sm:pt-5 md:pt-6 pb-2 sm:pb-2.5 md:pb-3 rounded-md bg-gray-900 border focus:outline-none focus:border-white"
              value={loginData.email}
              onChange={(e) => {
                setLoginData({ ...loginData, email: e.target.value });
              }}
            />
            <label
              htmlFor="email"
              className="absolute top-3 sm:top-4 md:top-5 left-3 sm:left-4 md:left-6 duration-200 transition-all text-xs sm:text-sm
              peer-focus:-translate-y-2 sm:peer-focus:-translate-y-2.5 md:peer-focus:-translate-y-3
              peer-focus:text-xs sm:peer-focus:text-xs md:peer-focus:text-sm
              peer-focus:font-light
              peer-focus:text-white
              group-hover:text-white

              peer-not-placeholder-shown:-translate-y-2 sm:peer-not-placeholder-shown:-translate-y-2.5 md:peer-not-placeholder-shown:-translate-y-3
              peer-not-placeholder-shown:text-xs sm:peer-not-placeholder-shown:text-xs md:peer-not-placeholder-shown:text-sm
              peer-not-placeholder-shown:text-white

              peer-placeholder-shown:text-sm sm:peer-placeholder-shown:text-base"
            >
              email address
            </label>
          </div>

          {/* Password */}
          <div className="group relative flex flex-col mb-4 sm:mb-5 md:mb-6 text-white">
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              required
              placeholder=" "
              className="peer text-sm sm:text-base md:text-lg pl-3 pr-12 sm:pl-4 sm:pr-12 md:pl-6 md:pr-12 pt-4 sm:pt-5 md:pt-6 pb-2 sm:pb-2.5 md:pb-3 rounded-md bg-gray-900 border focus:outline-none focus:border-white"
              value={loginData.password}
              onChange={(e) => {
                setLoginData({ ...loginData, password: e.target.value });
              }}
            />
            <PasswordVisibilityToggle
              isVisible={isPasswordVisible}
              onToggle={() => setIsPasswordVisible((visible) => !visible)}
            />
            <label
              htmlFor="password"
              className="absolute top-3 sm:top-4 md:top-5 left-3 sm:left-4 md:left-6 duration-200 transition-all text-xs sm:text-sm
              peer-focus:-translate-y-2 sm:peer-focus:-translate-y-2.5 md:peer-focus:-translate-y-3
              peer-focus:text-xs sm:peer-focus:text-xs md:peer-focus:text-sm
              peer-focus:font-light
              peer-focus:text-white
              group-hover:text-white

              peer-not-placeholder-shown:-translate-y-2 sm:peer-not-placeholder-shown:-translate-y-2.5 md:peer-not-placeholder-shown:-translate-y-3
              peer-not-placeholder-shown:text-xs sm:peer-not-placeholder-shown:text-xs md:peer-not-placeholder-shown:text-sm
              peer-not-placeholder-shown:text-white

              peer-placeholder-shown:text-sm sm:peer-placeholder-shown:text-base"
            >
              Password
            </label>
          </div>

          {/* Buttons */}
          <button
            type="submit"
            className="w-full rounded-full p-1.5 sm:p-2 md:p-2.5 mb-2 sm:mb-3 text-sm sm:text-base md:text-lg text-white bg-slate-950 hover:bg-slate-500 hover:font-bold transition cursor-pointer font-semibold"
          >
            Log in
          </button>

          <Link
            to="/forgot-password"
            className="block w-full rounded-full p-1.5 sm:p-2 md:p-2.5 mb-2 sm:mb-3 text-sm sm:text-base md:text-lg text-white bg-purple-800 hover:bg-rose-500 hover:font-bold transition cursor-pointer font-semibold text-center"
          >
            Forgot password?
          </Link>
          <Link
            to="/adminlogin"
            className="px-3 sm:px-4 text-xs sm:text-sm text-white text-left cursor-pointer underline underline-offset-2 hover:text-green-400 transition-colors"
          >
            Looking for admin access??
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LogIn;

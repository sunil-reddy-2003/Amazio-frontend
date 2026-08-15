import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, use } from "react";
import axios from "axios";

const LogIn = () => {
  const { setIsLoggedIn,setJustLoggedIn, redirectAfterLogin, setRedirectAfterLogin, setUser } =useAuth();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);
  const [message,setMessage]=useState("");

  const postLogin = async () => {
    try {
      const request = await axios.post(
        // "http://localhost:9090/api/user/login",
        `${import.meta.env.VITE_API_BASE_URL}/api/user/login`,
        loginData,
      );
      // console.log("inside postLogin: ", request);

      if(request.data.Success){
        localStorage.setItem("token", request.data.token);
        setUser(request.data.user);

        setIsLoggedIn(true);
        setJustLoggedIn(true);
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
          className="w-full max-w-md px-4 sm:px-6 py-6 sm:py-8 md:py-10"
          onSubmit={(e) => {
            e.preventDefault();
            postLogin();
          }}
        >
          <h4 className="font-bold text-xl sm:text-2xl text-white mb-4 sm:mb-6 text-left">
            Log into Amazio
          </h4>

          {/* Email or Mobile number */}
          <div className="relative flex flex-col mb-3 sm:mb-4 text-white">
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

              peer-not-placeholder-shown:-translate-y-2 sm:peer-not-placeholder-shown:-translate-y-2.5 md:peer-not-placeholder-shown:-translate-y-3
              peer-not-placeholder-shown:text-xs sm:peer-not-placeholder-shown:text-xs md:peer-not-placeholder-shown:text-sm
              peer-not-placeholder-shown:text-black

              peer-placeholder-shown:text-sm sm:peer-placeholder-shown:text-base"
            >
              email address
            </label>
          </div>

          {/* Password */}
          <div className="relative flex flex-col mb-4 sm:mb-5 md:mb-6 text-white">
            <input
              type="password"
              id="password"
              required
              placeholder=" "
              className="peer text-sm sm:text-base md:text-lg px-3 sm:px-4 md:px-6 pt-4 sm:pt-5 md:pt-6 pb-2 sm:pb-2.5 md:pb-3 rounded-md bg-gray-900 border focus:outline-none focus:border-white"
              value={loginData.password}
              onChange={(e) => {
                setLoginData({ ...loginData, password: e.target.value });
              }}
            />
            <label
              htmlFor="password"
              className="absolute top-3 sm:top-4 md:top-5 left-3 sm:left-4 md:left-6 duration-200 transition-all text-xs sm:text-sm
              peer-focus:-translate-y-2 sm:peer-focus:-translate-y-2.5 md:peer-focus:-translate-y-3
              peer-focus:text-xs sm:peer-focus:text-xs md:peer-focus:text-sm
              peer-focus:font-light
              peer-focus:text-white

              peer-not-placeholder-shown:-translate-y-2 sm:peer-not-placeholder-shown:-translate-y-2.5 md:peer-not-placeholder-shown:-translate-y-3
              peer-not-placeholder-shown:text-xs sm:peer-not-placeholder-shown:text-xs md:peer-not-placeholder-shown:text-sm
              peer-not-placeholder-shown:text-black

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

          <button
            type="button"
            className="w-full rounded-full p-1.5 sm:p-2 md:p-2.5 mb-2 sm:mb-3 text-sm sm:text-base md:text-lg text-white bg-purple-800 hover:bg-rose-500 hover:font-bold transition cursor-pointer font-semibold"
          >
            Forgot password?
          </button>
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

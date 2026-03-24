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
    <div className="flex  h-screen ">

      {error && (<div className=" w-full absolute top-25 z-1 flex items-center justify-center">
        <div className=" flex items-center justify-center gap-2  rounded-full bg-white px-10 py-2">
          <h3 className="text-xl font-bold text-red-500">{message}</h3>
        </div>
      </div>)}


      {/* Left Side */}
      <div className="hidden md:flex w-[55%]    bg-purple-900 items-center justify-center italic font-extrabold text-white text-4xl">
        "From cart to heart – the journey matters"
      </div>

      {/* Right Side */}
      <div className="w-full md:w-[45%]  bg-gray-800 flex items-center justify-center">



        <form
          className="w-full max-w-md px-6 py-10"
          onSubmit={(e) => {
            e.preventDefault();
            postLogin();
          }}
        >
          <h4 className="font-bold text-2xl text-white mb-6 text-left">
            Log into Amazio
          </h4>

          {/* Email or Mobile number */}
          <div className="relative flex flex-col mb-4  text-white">
            <input
              type="text"
              id="email"
              required
              placeholder=" "
              className="peer text-xl  px-6 pt-6 pb-3 rounded-md bg-gray-900 border"
              value={loginData.email}
              onChange={(e) => {
                setLoginData({ ...loginData, email: e.target.value });
              }}
            />
            <label
              htmlFor="email"
              className="absolute top-5 left-0 px-6  duration-200 transition-all
              peer-focus:-translate-y-3
              peer-focus:text-sm
              peer-focus:font-light
              peer-focus:text-white

              peer-not-placeholder-shown:-translate-y-3
              peer-not-placeholder-shown:text-sm
              peer-not-placeholder-shown:text-black

              peer-placeholder-shown:text-lg"
            >
              email address
            </label>
          </div>

          {/* Password */}
          <div className="relative flex flex-col mb-6 text-white">
            <input
              type="password"
              id="password"
              required
              placeholder=" "
              className="peer text-xl  px-6 pt-6 pb-3 rounded-md bg-gray-900 border"
              value={loginData.password}
              onChange={(e) => {
                setLoginData({ ...loginData, password: e.target.value });
              }}
            />
            <label
              htmlFor="password"
              className="absolute top-5 left-0 px-6  duration-200 transition-all
              peer-focus:-translate-y-3
              peer-focus:text-sm
              peer-focus:font-light
              peer-focus:text-white

              peer-not-placeholder-shown:-translate-y-3
              peer-not-placeholder-shown:text-sm
              peer-not-placeholder-shown:text-black

              peer-placeholder-shown:text-lg"
            >
              Password
            </label>
          </div>

          {/* Buttons */}
          <button
            type="submit"
            className="w-full rounded-full p-2 mb-3 text-xl text-white bg-slate-950 hover:bg-slate-500 hover:font-bold transition cursor-pointer"
          >
            Log in
          </button>

          <button
            type="button"
            className="w-full rounded-full p-2 mb-3 text-xl text-white bg-purple-800 hover:bg-rose-500 hover:font-bold transition cursor-pointer"
          >
            Forgot password?
          </button>
          <Link
            to="/adminlogin"
            className="px-4 text-sm text-white text-left cursor-pointer underline underline-offset-2 hover:text-green-400"
          >
            Looking for admin access??
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LogIn;

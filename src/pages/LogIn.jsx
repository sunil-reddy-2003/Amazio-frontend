import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {useState} from "react";

const LogIn = () => {
  const { setIsLoggedIn, redirectAfterLogin, setRedirectAfterLogin } =
    useAuth();
  const navigate = useNavigate();

  const [loginData,setLoginData]=useState({email:"",password:""});
  return (
    <div className="h-screen flex my-2 mx-4 ">
      {/* Left Side */}
      <div className="hidden md:flex w-[55%]  border-l-2 rounded-l-md bg-purple-900 items-center justify-center italic font-extrabold text-white text-4xl">
        "From cart to heart – the journey matters"
      </div>

      {/* Right Side */}
      <div className="w-full md:w-[45%] border-r-2 rounded-r-md bg-gray-800 flex items-center justify-center">
        <form 
          className="w-full max-w-md px-6 py-10"
          onSubmit={(e)=>{
            e.preventDefault();
            localStorage.setItem("loginData",JSON.stringify(loginData));
          }}  
          >
          <h4 className="font-bold text-2xl text-white mb-6 text-left">
            Log into Amazon
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
              onChange={(e)=>{
                setLoginData({...loginData,email:e.target.value})
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
              onChange={(e)=>{
                setLoginData({...loginData,password:e.target.value})
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
            onClick={(e) => {
              setIsLoggedIn(true);
              if (redirectAfterLogin) {
                navigate(redirectAfterLogin);
                setRedirectAfterLogin(null);
              } else {
                navigate("/");
              }
            }}
          >
            Log in
          </button>

          <button
            type="button"
            className="w-full rounded-full p-2 text-xl text-white bg-purple-800 hover:bg-rose-500 hover:font-bold transition cursor-pointer"
          >
            Forgot password?
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;

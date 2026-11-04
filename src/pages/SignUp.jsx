import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import PasswordVisibilityToggle from "../components/PasswordVisibilityToggle";
const SignUp = () => {
  const [signUpData, setSignUpData] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    mobile: "",
  });
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [message,setMessage]=useState("");


  const signUpRequest = async () => {
    try {
      const request = await api.post(
        `${import.meta.env.VITE_USER_BASE_URL}/api/v1/auth/signup`,
        signUpData,
      );
      
      if(request.data.success){
        // console.log(request.data.message);
        navigate("/log-in");
      }else{
        // console.log(request.data.message);
        setMessage(request.data.message);
      }
      
    } catch (error) {
      console.log("error occurred while registering:", error);
    }
    
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full">

      <div className="hidden md:flex justify-center items-center md:w-[55%] bg-fuchsia-900 px-4">
        <p className="font-extrabold text-white text-2xl sm:text-3xl md:text-4xl text-center">
          Sign up. Show up. Level up
        </p>
      </div>
      <div className="w-full md:w-[45%] bg-gray-800 flex items-center justify-center min-h-screen md:min-h-full">
        <form
          className="auth-form flex flex-col w-full text-white px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-10"
          onSubmit={(e) => {
            e.preventDefault();
            signUpRequest();
          }}
        >
          <h1 className="font-bold text-xl sm:text-2xl text-white mb-4 sm:mb-6 text-left">
            Create your account
            <span>
              <i className="pl-2 fa-solid fa-face-grin-hearts"></i>
            </span>
          </h1>
          <div className="group relative flex flex-col mb-3 sm:mb-4">
            <input
              type="text"
              id="fname"
              placeholder=" "
              required
              className="peer text-sm sm:text-base md:text-lg px-3 sm:px-4 md:px-6 pt-4 sm:pt-5 md:pt-6 pb-2 sm:pb-2.5 md:pb-3 rounded-md bg-gray-900 border focus:outline-none focus:border-white"
              value={signUpData.fName}
              onChange={(e) => {
                setSignUpData({ ...signUpData, fName: e.target.value });
              }}
            ></input>
            <label
              htmlFor="fname"
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
              First Name
            </label>
          </div>
          <div className="group relative flex flex-col mb-3 sm:mb-4">
            <input
              id="lname"
              type="text"
              placeholder=" "
              required
              className="peer text-sm sm:text-base md:text-lg px-3 sm:px-4 md:px-6 pt-4 sm:pt-5 md:pt-6 pb-2 sm:pb-2.5 md:pb-3 rounded-md bg-gray-900 border focus:outline-none focus:border-white"
              value={signUpData.lName}
              onChange={(e) => {
                setSignUpData({ ...signUpData, lName: e.target.value });
              }}
            ></input>
            <label
              htmlFor="lname"
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
              Last Name
            </label>
          </div>
          <div className="group relative flex flex-col mb-3 sm:mb-4">
            <input
              id="email"
              type="email"
              required
              placeholder=" "
              className="peer text-sm sm:text-base md:text-lg px-3 sm:px-4 md:px-6 pt-4 sm:pt-5 md:pt-6 pb-2 sm:pb-2.5 md:pb-3 rounded-md bg-gray-900 border focus:outline-none focus:border-white"
              value={signUpData.email}
              onChange={(e) => {
                setSignUpData({ ...signUpData, email: e.target.value });
              }}
            ></input>
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
              Email address
            </label>
          </div>
          <div className="group relative flex flex-col mb-3 sm:mb-4">
            <input
              id="password"
              type={isPasswordVisible ? "text" : "password"}
              minLength={10}
              required
              placeholder=" "
              className="peer text-sm sm:text-base md:text-lg pl-3 pr-12 sm:pl-4 sm:pr-12 md:pl-6 md:pr-12 pt-4 sm:pt-5 md:pt-6 pb-2 sm:pb-2.5 md:pb-3 rounded-md bg-gray-900 border focus:outline-none focus:border-white"
              value={signUpData.password}
              onChange={(e) => {
                setSignUpData({ ...signUpData, password: e.target.value });
              }}
            ></input>
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
          <div className="group relative flex flex-col mb-4 sm:mb-5">
            <input
              id="number"
              type="text"
              required
              placeholder=" "
              className="peer text-sm sm:text-base md:text-lg px-3 sm:px-4 md:px-6 pt-4 sm:pt-5 md:pt-6 pb-2 sm:pb-2.5 md:pb-3 rounded-md bg-gray-900 border focus:outline-none focus:border-white"
              minLength={10}
              maxLength={10}
              value={signUpData.mobile}
              onChange={(e) => {
                setSignUpData({ ...signUpData, mobile: e.target.value });
              }}
            ></input>
            <label
              htmlFor="number"
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
              Mobile number
            </label>
          </div>
          <button
            type="submit"
            className="rounded-full p-2 sm:p-3 md:p-4 bg-white text-black text-sm sm:text-base md:text-lg hover:bg-fuchsia-900 hover:text-white cursor-pointer font-semibold transition-colors"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

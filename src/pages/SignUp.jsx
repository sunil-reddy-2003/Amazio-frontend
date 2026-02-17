import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SignUp = () => {
  const [signUpData, setSignUpData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    mobile: "",
  });

  const navigate = useNavigate();

  const signUpRequest = async () => {
    try {
      const request = await axios.post(
        "http://localhost:9090/api/user/signup",
        signUpData,
      );
      console.log("user registered successfylly:", request.data);
    } catch (error) {
      console.log("erroe occurred while registering:", error);
    }
    navigate("/log-in");
  };

  return (
    <div className="md:flex  mx-4 my-2">
      <div className="hidden md:flex justify-center items-center md:w-[55%]  rounded-l-md  bg-fuchsia-900 ">
        <p className="font-extrabold text-white text-4xl">
          Sign up. Show up. Level up
        </p>
      </div>
      <div className=" w-full md:w-[45%]  rounded-r-md bg-gray-800">
        <form
          className="flex flex-col  text-white h-full p-12 md:px-32"
          onSubmit={(e) => {
            e.preventDefault();
            signUpRequest();
          }}
        >
          <h1 className="font-bold text-2xl text-white mb-6 text-left">
            Create your account
            <span>
              <i className="pl-2 fa-solid fa-face-grin-hearts"></i>
            </span>
          </h1>
          <div className="relative flex flex-col mb-4 ">
            <input
              type="text"
              id="fname"
              placeholder=" "
              required
              className="peer text-xl  px-6 pt-6 pb-3 rounded-md bg-gray-900 border"
              value={signUpData.fname}
              onChange={(e) => {
                setSignUpData({ ...signUpData, fname: e.target.value });
              }}
            ></input>
            <label
              htmlFor="fname"
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
              First Name
            </label>
          </div>
          <div className="relative flex flex-col mb-4 ">
            <input
              id="lname"
              type="text"
              placeholder=" "
              required
              className="peer text-xl  px-6 pt-6 pb-3 rounded-md bg-gray-900 border"
              value={signUpData.lname}
              onChange={(e) => {
                setSignUpData({ ...signUpData, lname: e.target.value });
              }}
            ></input>
            <label
              htmlFor="lname"
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
              Last Name
            </label>
          </div>
          <div className="relative flex flex-col mb-4 ">
            <input
              id="email"
              type="email"
              required
              placeholder=" "
              className="peer text-xl  px-6 pt-6 pb-3 rounded-md bg-gray-900 border"
              value={signUpData.email}
              onChange={(e) => {
                setSignUpData({ ...signUpData, email: e.target.value });
              }}
            ></input>
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
              Email address
            </label>
          </div>
          <div className="relative flex flex-col mb-4 ">
            <input
              id="password"
              type="password"
              minLength={10}
              required
              placeholder=" "
              className="peer text-xl  px-6 pt-6 pb-3 rounded-md bg-gray-900 border"
              value={signUpData.password}
              onChange={(e) => {
                setSignUpData({ ...signUpData, password: e.target.value });
              }}
            ></input>
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
          <div className="relative flex flex-col mb-4 ">
            <input
              id="number"
              type="text"
              required
              placeholder=" "
              className="peer text-xl  px-6 pt-6 pb-3 rounded-md bg-gray-900 border"
              minLength={10}
              maxLength={10}
              value={signUpData.mobile}
              onChange={(e) => {
                setSignUpData({ ...signUpData, mobile: e.target.value });
              }}
            ></input>
            <label
              htmlFor="number"
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
              Mobile number
            </label>
          </div>
          <button
            type="submit"
            className=" rounded-full p-4 bg-white text-black hover:bg-fuchsia-900 hover:text-white cursor-pointer"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

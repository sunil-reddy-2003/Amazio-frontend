import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const AdminLogin = () => {
  const { setIsAdmin } =
    useAuth();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const postLogin = async () => {
    try {
      const request = await axios.post(
        "http://localhost:9090/api/user/login",
        loginData,
      );
      console.log("inside postLogin: ",request.data);

      localStorage.setItem("token",request.data.token);
      setIsAdmin(true);
      navigate("/admin");
    } catch (error) {
      console.error("error while sending request: ", error);
    }
  };

  return (
    <div className="flex  h-screen  ">
      {/* Left Side */}
      <div className="hidden md:flex w-[55%]  bg-slate-900 items-center justify-center italic font-extrabold text-white text-3xl p-10">
        “Leadership is not about being in charge. It’s about taking responsibility.”
      </div>

      {/* Right Side */}
      <div className="w-full md:w-[45%]  bg-gray-800 flex items-center justify-center">
        <form
          className="w-full max-w-md px-6 py-10"
          onSubmit={(e) => {
            e.preventDefault();
            postLogin();
            localStorage.setItem("loginData", JSON.stringify(loginData));
          }}
        >
          <h4 className="font-bold text-2xl text-white text-left">
           ADMINISTRATOR LOGIN
          </h4>
          <h4 className="font-semibold text-lg text-white mb-6 text-left">
           authorized access only
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
              admin email address
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
             admin Password
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
            className="w-full rounded-full p-2 text-xl text-white bg-fuchsia-800 hover:bg-rose-500 hover:font-bold transition cursor-pointer"
          >
            Forgot password?
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

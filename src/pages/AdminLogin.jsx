import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/api";
import PasswordVisibilityToggle from "../components/PasswordVisibilityToggle";

const AdminLogin = () => {
  const { setIsAdmin } =
    useAuth();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const postLogin = async () => {
    try {
      const request = await api.post(
        `${import.meta.env.VITE_USER_BASE_URL}/api/v1/auth/adminlogin`,
        loginData,
      );
      console.log("inside postLogin: ",request.data);

      localStorage.setItem("token",request.data.data.token);
      setIsAdmin(true);
      navigate("/admin");
    } catch (error) {
      console.error("error while sending request: ", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left Side */}
      <div className="hidden w-[55%] items-center justify-center bg-slate-900 p-10 text-center text-2xl font-extrabold italic text-white lg:flex lg:text-3xl">
        “Leadership is not about being in charge. It’s about taking responsibility.”
      </div>

      {/* Right Side */}
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-800 px-4 py-10 md:w-full lg:w-[45%]">
        <form
          className="auth-form w-full max-w-md px-2 py-6 sm:px-6 sm:py-10"
          onSubmit={(e) => {
            e.preventDefault();
            postLogin();
            localStorage.setItem("loginData", JSON.stringify(loginData));
          }}
        >
          <h4 className="text-left text-xl font-bold text-white sm:text-2xl">
           ADMINISTRATOR LOGIN
          </h4>
          <h4 className="mb-6 text-left text-base font-semibold text-white sm:text-lg">
           authorized access only
          </h4>

          {/* Email or Mobile number */}
          <div className="group relative flex flex-col mb-4 text-white">
            <input
              type="text"
              id="email"
              required
              placeholder=" "
              className="peer w-full rounded-md border bg-gray-900 px-4 pb-3 pt-6 text-base text-white sm:px-6 sm:text-xl"
              value={loginData.email}
              onChange={(e) => {
                setLoginData({ ...loginData, email: e.target.value });
              }}
            />
            <label
              htmlFor="email"
              className="absolute left-0 top-5 px-4 transition-all duration-200 sm:px-6
              peer-focus:-translate-y-3
              peer-focus:text-sm
              peer-focus:font-light
              peer-focus:text-white
              group-hover:text-white

              peer-not-placeholder-shown:-translate-y-3
              peer-not-placeholder-shown:text-sm
              peer-not-placeholder-shown:text-white

              peer-placeholder-shown:text-lg
              peer-placeholder-shown:text-white/70"
            >
              admin email address
            </label>
          </div>

          {/* Password */}
          <div className="group relative flex flex-col mb-6 text-white">
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              required
              placeholder=" "
              className="peer w-full rounded-md border bg-gray-900 pl-4 pr-12 pb-3 pt-6 text-base text-white sm:pl-6 sm:pr-12 sm:text-xl"
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
              className="absolute left-0 top-5 px-4 transition-all duration-200 sm:px-6
              peer-focus:-translate-y-3
              peer-focus:text-sm
              peer-focus:font-light
              peer-focus:text-white
              group-hover:text-white

              peer-not-placeholder-shown:-translate-y-3
              peer-not-placeholder-shown:text-sm
              peer-not-placeholder-shown:text-white

              peer-placeholder-shown:text-lg
              peer-placeholder-shown:text-white/70"
            >
             admin Password
            </label>
          </div>

          {/* Buttons */}
          <button
            type="submit"
            className="mb-3 w-full cursor-pointer rounded-full bg-slate-950 p-2 text-base text-white transition hover:bg-slate-500 hover:font-bold sm:text-xl"
          >
            Log in
          </button>

          <button
            type="button"
            className="w-full cursor-pointer rounded-full bg-fuchsia-800 p-2 text-base text-white transition hover:bg-rose-500 hover:font-bold sm:text-xl"
          >
            Forgot password?
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

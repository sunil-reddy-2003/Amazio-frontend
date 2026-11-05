import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import PasswordVisibilityToggle from "../components/PasswordVisibilityToggle";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleResetPassword = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!token) {
      setError("Invalid or missing password reset link.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/reset-password`,
        {
          token,
          newPassword,
        }
      );

      if (response.data.success) {
        setMessage(
          response.data.message || "Your password has been reset successfully."
        );

        setNewPassword("");
        setConfirmPassword("");

        setTimeout(() => {
          navigate("/log-in");
        }, 2000);
      } else {
        setError(
          response.data.message || "Unable to reset password. Please try again."
        );
      }
    } catch (requestError) {
      console.error("Error resetting password:", requestError);

      setError(
        requestError.response?.data?.message ||
          "Your reset link may have expired or is invalid. Please request a new one."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      {/* Left Section */}
      <div className="hidden w-full items-center justify-center bg-purple-900 px-4 text-center text-2xl font-extrabold italic text-white md:flex md:w-[55%] md:text-3xl lg:text-4xl">
        "A stronger password, a fresh start"
      </div>

      {/* Right Section */}
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-800 px-4 md:w-[45%]">
        <form
          className="auth-form w-full max-w-md px-2 py-8 sm:px-6 sm:py-10"
          onSubmit={handleResetPassword}
        >
          <h1 className="mb-3 text-left text-xl font-bold text-white sm:text-2xl">
            Reset your password
          </h1>

          <p className="mb-6 text-sm text-gray-300 sm:text-base">
            Enter your new password below to regain access to your Amazio
            account.
          </p>

          {/* Success Message */}
          {message && (
            <p
              className="mb-4 rounded-md border border-green-500/40 bg-green-500/10 p-3 text-sm text-green-200"
              role="status"
            >
              {message}
            </p>
          )}

          {/* Error Message */}
          {error && (
            <p
              className="mb-4 rounded-md border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200"
              role="alert"
            >
              {error}
            </p>
          )}

          {/* New Password */}
          <div className="group relative mb-5 flex flex-col text-white">
            <input
              type={isNewPasswordVisible ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              autoComplete="new-password"
              required
              minLength={8}
              disabled={isSubmitting || !token}
              placeholder=" "
              className="peer rounded-md border border-gray-600 bg-gray-900 pl-3 pr-12 pb-2 pt-5 text-sm focus:border-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 sm:pl-4 sm:pr-12 sm:pb-2.5 sm:pt-6 sm:text-base"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
            />
            <PasswordVisibilityToggle
              isVisible={isNewPasswordVisible}
              onToggle={() =>
                setIsNewPasswordVisible((visible) => !visible)
              }
            />

            <label
              htmlFor="newPassword"
              className="absolute left-3 top-3 text-xs text-gray-300 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-white peer-not-placeholder-shown:text-white group-hover:text-white sm:left-4"
            >
              New password
            </label>
          </div>

          {/* Confirm Password */}
          <div className="group relative mb-5 flex flex-col text-white">
            <input
              type={isConfirmPasswordVisible ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              autoComplete="new-password"
              required
              disabled={isSubmitting || !token}
              placeholder=" "
              className="peer rounded-md border border-gray-600 bg-gray-900 pl-3 pr-12 pb-2 pt-5 text-sm focus:border-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 sm:pl-4 sm:pr-12 sm:pb-2.5 sm:pt-6 sm:text-base"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
            <PasswordVisibilityToggle
              isVisible={isConfirmPasswordVisible}
              onToggle={() =>
                setIsConfirmPasswordVisible((visible) => !visible)
              }
            />

            <label
              htmlFor="confirmPassword"
              className="absolute left-3 top-3 text-xs text-gray-300 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-white peer-not-placeholder-shown:text-white group-hover:text-white sm:left-4"
            >
              Confirm password
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !token || !!message}
            className="mb-4 w-full cursor-pointer rounded-full bg-slate-950 p-2 text-sm font-semibold text-white transition hover:bg-slate-500 disabled:cursor-not-allowed disabled:opacity-60 sm:p-2.5 sm:text-base"
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </button>

          {/* Back to Login */}
          <Link
            to="/log-in"
            className="block text-center text-sm text-white underline underline-offset-2 transition-colors hover:text-green-400"
          >
            Back to log in
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
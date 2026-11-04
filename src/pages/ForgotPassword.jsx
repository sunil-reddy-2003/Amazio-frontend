import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const requestPasswordReset = async (event) => {
    event.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }

    setMessage("");
    setError("");
    setIsSubmitting(true);

    try {
      const response = await api.post(
        `${import.meta.env.VITE_USER_BASE_URL}/api/v1/auth/forgot-password`,
        { email: trimmedEmail }
      );

      if (response.data.success) {
        setMessage(
          response.data.message ||
            "If an account exists for this email, password reset instructions will be sent."
        );
      } else {
        setError(
          response.data.message ||
            "Unable to send password reset instructions. Please try again."
        );
      }
    } catch (requestError) {
      console.error("Error requesting password reset:", requestError);

      setError(
        requestError.response?.data?.message ||
          "Unable to send password reset instructions. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      {/* Left Section */}
      <div className="hidden w-full items-center justify-center bg-purple-900 px-4 text-center text-2xl font-extrabold italic text-white md:flex md:w-[55%] md:text-3xl lg:text-4xl">
        "A fresh start is only a step away"
      </div>

      {/* Right Section */}
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-800 px-4 md:w-[45%]">
        <form
          className="auth-form w-full max-w-md px-2 py-8 sm:px-6 sm:py-10"
          onSubmit={requestPasswordReset}
        >
          <h1 className="mb-3 text-left text-xl font-bold text-white sm:text-2xl">
            Forgot your password?
          </h1>

          <p className="mb-6 text-sm text-gray-300 sm:text-base">
            Enter your email below to receive password reset instructions.
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

          {/* Email Input */}
          <div className="relative mb-5 flex flex-col text-white">
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              required
              disabled={isSubmitting}
              placeholder=" "
              className="peer rounded-md border border-gray-600 bg-gray-900 px-3 pb-2 pt-5 text-sm focus:border-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 sm:px-4 sm:pb-2.5 sm:pt-6 sm:text-base"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setMessage("");
                setError("");
              }}
            />

            <label
              htmlFor="email"
              className="absolute left-3 top-3 text-xs text-gray-300 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs sm:left-4 sm:peer-placeholder-shown:top-4 sm:peer-placeholder-shown:text-base"
            >
              Email address
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mb-4 w-full cursor-pointer rounded-full bg-slate-950 p-2 text-sm font-semibold text-white transition hover:bg-slate-500 disabled:cursor-not-allowed disabled:opacity-60 sm:p-2.5 sm:text-base"
          >
            {isSubmitting ? "Sending..." : "Send reset instructions"}
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

export default ForgotPassword;
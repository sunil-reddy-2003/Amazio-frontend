const PasswordVisibilityToggle = ({ isVisible, onToggle }) => (
  <button
    type="button"
    aria-label={isVisible ? "Hide password" : "Show password"}
    aria-pressed={isVisible}
    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white p-1 text-black transition hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    onClick={onToggle}
  >
    <svg
      aria-hidden="true"
      className="h-[22px] w-[22px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      {isVisible ? (
        <>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12s3.5-7 9.75-7 9.75 7 9.75 7-3.5 7-9.75 7-9.75-7-9.75-7Z"
          />
          <circle cx="12" cy="12" r="3" />
        </>
      ) : (
        <>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.2A10.7 10.7 0 0 1 12 5c6.25 0 9.75 7 9.75 7a15.7 15.7 0 0 1-3.1 3.8M6.2 6.2C3.6 8.1 2.25 12 2.25 12s3.5 7 9.75 7c1.4 0 2.65-.35 3.75-.9"
          />
        </>
      )}
    </svg>
  </button>
);

export default PasswordVisibilityToggle;

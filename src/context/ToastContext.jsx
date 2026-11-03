import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);
  const timeoutRef = useRef(null);

  const showToast = (toastData) => {
    // Clear previous timer
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setToast(toastData);

    // Hide toast after 2.5 seconds
    timeoutRef.current = setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  useEffect(() => {
    const handleToast = (event) => {
      showToast(event.detail);
    };

    window.addEventListener("app-toast", handleToast);

    return () => {
      window.removeEventListener("app-toast", handleToast);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast && (
        <div
  className={`
    fixed top-14 left-1/2 -translate-x-1/2 z-[9999]
    flex items-center gap-3
    min-w-[300px] max-w-[90vw]
    px-5 py-3.5
    rounded-2xl
    border border-white/20
    backdrop-blur-2xl
    shadow-2xl
    animate-toast-in
    ${
      toast.type === "success"
        ? "bg-emerald-950/90 text-emerald-50 shadow-emerald-500/20"
        : "bg-rose-950/90 text-rose-50 shadow-rose-500/20"
    }
  `}
>
  {/* Status Icon */}
  <div
    className={`
      flex items-center justify-center
      w-9 h-9 rounded-full shrink-0
      ${
        toast.type === "success"
          ? "bg-emerald-400/15 text-emerald-400"
          : "bg-rose-400/15 text-rose-400"
      }
    `}
  >
    {toast.type === "success" ? (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 12l4 4L19 6"
        />
      </svg>
    ) : (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    )}
  </div>

  {/* Message */}
  <div className="flex flex-col">
    <span className="text-sm font-bold tracking-wide">
      {toast.type === "success" ? "Success" : "Something went wrong"}
    </span>

    <span className="text-xs opacity-80 font-medium">
      {toast.message}
    </span>
  </div>
</div>
        // <div
        //   className={`fixed top-14 left-1/2 -translate-x-1/2 z-[9999]
        //   px-6 py-3 rounded-full shadow-lg text-white font-semibold
        //   transition-all duration-300
        //   ${
        //     toast.type === "success"
        //       ? "bg-green-600"
        //       : "bg-red-600"
        //   }`}
        // >
        //   {toast.message}
        // </div>
      )}
    </ToastContext.Provider>
  );
};
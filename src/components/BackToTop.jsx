import { useEffect, useState } from "react";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight / 2);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed p-4 bottom-1 right-2 bg-black/60 backdrop-blur-md shadow-xl text-xl  transition rounded-full cursor-pointer"
    >
      <i className="text-white fa-solid fa-arrow-up-long fa-beat"></i>
    </button>
  );
};

export default BackToTop;

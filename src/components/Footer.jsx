import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" mt-auto">
      <div className="relative flex flex-col bg-black/90 backdrop-blur-xs shadow-xl  md:flex-row items-center text-white w-full p-10 gap-4">
        <p className="flex justify-center w-full md:w-[55%] text-center">
          © {new Date().getFullYear()} All rights reserved | Amazon
        </p>

        <div className="flex justify-center w-full md:w-[45%] gap-6 ">
          <Link to="#" className="hover:underline">
            About
          </Link>
          <Link to="#" className="hover:underline">
            Help
          </Link>
          <Link to="#" className="hover:underline">
            Terms
          </Link>
          <Link to="#" className="hover:underline">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

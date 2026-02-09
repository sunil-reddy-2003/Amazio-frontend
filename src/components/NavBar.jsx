import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  const { onSearch } = props;
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-xs shadow-xl flex items-center justify-between px-14 py-4  rounded-full mt-2 mx-4 text-white">
      {/* Hamburger - MOBILE ONLY */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="md:hidden"
        aria-label="Toggle menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        <i className="fa-solid fa-bars cursor-pointer"></i>
      </button>

      {/* Logo */}
      <Link
        to="."
        className="flex items-center text-2xl font-bold gap-2 flex-shrink-0 "
      >
        <i className="fa-brands fa-atlassian"></i>
        <span>Amazon</span>
      </Link>

      {/* search bar */}
      <div className="relative hidden md:flex flex-1  mx-6 ">
        <input
          type="text"
          placeholder="Search for products"
          aria-label="Search for products"
          className="border-2  md:w-3/6 p-2 rounded-full"
          onInput={(e) => {
            onSearch(e.target.value);
          }}
        ></input>
        {/* <i className="absolute fa-solid fa-magnifying-glass text-2xl  "></i> */}
      </div>

      {/* Menu */}
      <div
        className={`
          ${open ? "block" : "hidden"}
          md:hidden absolute top-full left-0 z-50 w-full bg-white shadow-sm
          flex flex-col items-start gap-1 p-3 font-bold 
        `}
      >
        <Link to="." onClick={() => setOpen(false)}>
          Electronics
        </Link>
        <Link to="." onClick={() => setOpen(false)}>
          Fashion
        </Link>
        <Link to="." onClick={() => setOpen(false)}>
          Orders
        </Link>
        <Link to="." onClick={() => setOpen(false)}>
          Account
        </Link>
      </div>

      {/*cart login and signup */}
      <div className="flex justify-center items-center gap-4 font-bold flex-shrink-0">
        <Link to="/cart" className="p-1 rounded-full cursor-pointer">
          <i className="fa-solid fa-cart-arrow-down text-lg md:block"></i>
        </Link>
        <Link
          to="/log-in"
          className="hidden md:block border-2 rounded-full px-3 py-2 cursor-pointer hover:bg-black hover:text-white"
        >
          Log in
        </Link>
        <Link
          to="/orders"
          // to="/sign-up"
          className="hidden md:block border-2 rounded-full px-3 py-2 cursor-pointer hover:bg-purple-900 hover:text-white"
        >
          Sign up
        </Link>
      </div>

      <button
        className="md:hidden font-bold text-2xl"
        aria-label="Account menu"
      >
        <i className="fa-solid fa-circle-user"></i>
      </button>
    </nav>
  );
};

export default NavBar;

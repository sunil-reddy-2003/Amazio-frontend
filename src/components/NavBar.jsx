import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar = (props) => {
  const { onSearch, cartTotal } = props;
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const profileClick = () => {
    setProfile((prev) => !prev);
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-black/100 via-black/60 to-black/80 backdrop-blur-xs shadow-xl flex items-center justify-between px-14 py-4  rounded-full my-2 mx-4 text-white">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="md:hidden"
        aria-label="Toggle menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        <i className="fa-solid fa-bars cursor-pointer"></i>
      </button>

      <Link
        to="."
        className="flex items-center text-2xl font-bold gap-2 flex-shrink-0 "
      >
        <i className="fa-brands fa-atlassian"></i>
        <span>Amazio</span>
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

      <div className="flex gap-4">
        <Link
          to="/cart"
          className="flex flex-col items-center justify-center cursor-pointer  border-t-2 rounded-full"
        >
          <p className=" text-sm  font-bold  text-white ">{cartTotal}</p>
          <i className="fa-solid fa-cart-arrow-down text-2xl md:block"></i>
        </Link>
        {isLoggedIn ? (
          <button
            className="fa-solid fa-circle-user font-bold text-3xl cursor-pointer"
            aria-label="Account menu"
            onClick={profileClick}
          ></button>
        ) : (
          <div className="flex justify-center items-center gap-4 font-bold flex-shrink-0 ">
            <Link
              to="/log-in"
              className="hidden md:block border-2 rounded-full px-3 py-2 cursor-pointer hover:bg-black hover:text-white"
            >
              Log in
            </Link>
            <Link
              to="/sign-up"
              className="hidden md:block border-2 rounded-full px-3 py-2 cursor-pointer hover:bg-purple-900 hover:text-white"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>

      {profile && (
        <div className="absolute flex flex-col  w-[200px] bg-white/90 shadow-lg top-20 right-14 ">
          <div className="flex items-center justify-between bg-black p-2 border">
            <h1 className="font-bold text-2xl text-white ">
              My Account
            </h1>
            <i
              className="text-xl fa-regular fa-circle-xmark cursor-pointer text-red-600 hover:text-green-600"
              onClick={profileClick}
            ></i>
          </div>
          <div className="flex flex-col items-stretch text-black text-lg font-mono text-left">
            <Link
              to="/profile"
              className="hover:bg-gray-600 px-4"
              onClick={profileClick}
            >
              {" "}
              Profile
            </Link>
            <Link
              to="/orders"
              className="hover:bg-gray-600 px-4"
              onClick={profileClick}
            >
              {" "}
              My orders
            </Link>
            <Link
              to="/profile"
              className="hover:bg-gray-600 px-4"
              onClick={profileClick}
            >
              Wallet balance
            </Link>

            <button
              className="bg-green-500 hover:bg-red-700 text-left font-bold px-4"
              onClick={() => {
                profileClick();
                setIsLoggedIn(false);
                localStorage.clear();
              }}
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

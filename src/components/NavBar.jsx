import { useCallback, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar = (props) => {
  const { onSearch, cartTotal } = props;
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = useState("");

  const profileObj = [
    {
      label: "Profile",
      route: "/profile",
    },
    {
      label: "My Orders",
      route: "/orders",
    },
    {
      label: "Wallet",
      route: "/",
    },
    {
      label: "Logout",
      route: "/log-in",
      action: "Logout",
    },
  ];

  return (
    // mt-2 mx-4 rounded-full
    <nav className="sticky flex items-center justify-between top-0 z-50 bg-gradient-to-r from-black/100 via-black/60 to-black/80 backdrop-blur-sm px-3 sm:px-6 md:px-14 py-3 sm:py-4 md:py-6 text-white">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="md:hidden text-lg sm:text-xl"
        aria-label="Toggle menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        <i className="fa-solid fa-bars cursor-pointer"></i>
      </button>

      <Link
        to="."
        className="flex items-center text-lg sm:text-xl md:text-2xl font-bold gap-1 sm:gap-2 flex-shrink-0"
      >
        <i className="fa-brands fa-atlassian text-sm sm:text-base"></i>
        <span className="hidden sm:inline">Amazio</span>
      </Link>

      {/* search bar */}
      {isLoggedIn && (<div className="hidden md:flex flex-1 mx-3 md:mx-6">
        <div className="relative flex items-center w-full border-2 rounded-full">
          <input
            type="text"
            value={searchVal}
            placeholder="Search products..."
            aria-label="Search for products"
            className="px-4 md:px-8 py-1 md:py-2 rounded-l-full w-full placeholder:text-xs md:placeholder:text-base placeholder:tracking-widest text-sm md:text-base"
            onChange={(e) => {
              setSearchVal(e.target.value);
              if (e.target.value === "") {
                onSearch("");
              }
            }}
            onKeyDown={(e) => {
              e.key == "Enter" && onSearch(searchVal);
            }}
          ></input>
          {searchVal && (
            <div
              className="absolute right-12 md:right-14 cursor-pointer rounded-full hover:bg-white/40 hover:text-black p-1 md:p-2"
              onClick={() => {
                onSearch("");
                setSearchVal("");
              }}
            >
              <i className="fa-solid fa-xmark text-sm md:text-base"></i>
            </div>
          )}
          <div
            className="border-l px-2 md:px-4 py-1 md:py-2 hover:bg-white/30 rounded-r-full cursor-pointer text-sm md:text-base"
            onClick={() => onSearch(searchVal)}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
      </div>)}

      {/* Menu */}
      <div
        id="mobile-menu"
        className={`
            ${open ? "flex" : "hidden"}
            md:hidden absolute top-full left-0 right-0 z-50 w-full bg-white shadow-sm
            flex-col items-start gap-1 p-2 sm:p-3 font-bold text-sm sm:text-base text-black
          `}
      >
        {isLoggedIn ? (
          <>
            <Link to="/profile" onClick={() => setOpen(false)}>
              Profile
            </Link>
            <Link to="/orders" onClick={() => setOpen(false)}>
              Orders
            </Link>
            <Link to="/" onClick={() => setOpen(false)}>
              Wallet
            </Link>
            <button
              type="button"
              className="text-left"
              onClick={() => {
                localStorage.clear();
                setIsLoggedIn(false);
                setOpen(false);
                navigate("/log-in");
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/log-in" onClick={() => setOpen(false)}>
              Log in
            </Link>
            <Link to="/sign-up" onClick={() => setOpen(false)}>
              Sign up
            </Link>
          </>
        )}
      </div>

      <div className="flex gap-2 sm:gap-4 items-center">
        <Link
          to="/cart"
          className="flex flex-col items-center justify-center cursor-pointer border-t-2 rounded-full text-sm sm:text-base"
        >
          <p className="text-xs sm:text-sm font-bold text-white">{cartTotal}</p>
          <i className="fa-solid fa-cart-arrow-down text-xl sm:text-2xl"></i>
        </Link>
        {isLoggedIn ? (
          <button
            className="fa-solid fa-circle-user font-bold text-2xl sm:text-3xl cursor-pointer"
            aria-label="Account menu"
            onClick={() => setProfile((prev) => !prev)}
          ></button>
        ) : (
          <div className="hidden sm:flex justify-center items-center gap-2 md:gap-4 font-bold flex-shrink-0 text-sm md:text-base">
            <Link
              to="/log-in"
              className="border-2 rounded-full px-2 md:px-3 py-1 md:py-2 cursor-pointer hover:bg-green-500 hover:text-black text-xs md:text-sm"
            >
              Log in
            </Link>
            <Link
              to="/sign-up"
              className="border-2 rounded-full px-2 md:px-3 py-1 md:py-2 cursor-pointer hover:bg-purple-900 hover:text-white text-xs md:text-sm"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>

      {profile && (
        <div 
          className="fixed top-0 right-0 h-screen flex justify-end bg-white/30 backdrop-blur-xl w-full z-50"
          onClick={() => setProfile(false)}
        >
          <div 
            className="shadow-xl bg-white w-full sm:w-2/3 md:w-1/2 lg:w-[20%]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between bg-black p-3 sm:p-4 h-16 sm:h-20">
              <h1 className="font-bold text-xl sm:text-2xl md:text-3xl text-white">My Account</h1>
              <i
                className="text-xl sm:text-2xl fa-regular fa-circle-xmark cursor-pointer text-red-600 hover:text-green-600"
                onClick={() => setProfile(false)}
              ></i>
            </div>
            <ul className="text-black font-bold">
              {profileObj.map((item) => {
                return (
                  <li
                    className={
                      item.action
                        ? "text-base sm:text-lg px-3 sm:px-4 py-2 sm:py-2 mb-1 hover:bg-red-400 cursor-pointer transition-colors"
                        : "text-base sm:text-lg px-3 sm:px-4 py-2 sm:py-2 mb-1 hover:bg-gray-400 cursor-pointer transition-colors"
                    }
                    key={item.label}
                    onClick={() => {
                      if (item.action) {
                        localStorage.clear();
                        setIsLoggedIn(false);
                      }
                      navigate(item.route);
                      setProfile(false);
                    }}
                  >
                    {item.label}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

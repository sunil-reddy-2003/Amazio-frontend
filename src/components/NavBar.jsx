import { useCallback, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { debounce } from "lodash";

const NavBar = (props) => {
  const { onSearch, cartTotal } = props;
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();


  const handleSearch = useCallback(
    debounce((value) => {
      onSearch(value);
    }, 300),
    [onSearch],
  );
  const profileObj=[
    {
      label:"Profile",
      route:"/profile"
    },
    {
      label:"My Orders",
      route:"/orders"
    },
    {
      label:"Wallet",
      route:"/payment"
    },
    {
      label:"Logout",
      route:"/log-in",
      action:"Logout"
    },
  ]

  return (
    // mt-2 mx-4 rounded-full
    <nav className="sticky flex items-center justify-between top-0 z-50 bg-gradient-to-r from-black/100 via-black/60 to-black/80 backdrop-blur-sm  px-14 py-6  text-white">
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
            handleSearch(e.target.value);
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
            onClick={()=>
              setProfile((prev) => !prev)
            }
          ></button>
        ) : (
          <div className="flex justify-center items-center gap-4 font-bold flex-shrink-0 ">
            <Link
              to="/log-in"
              className="hidden md:block border-2 rounded-full px-3 py-2 cursor-pointer hover:bg-green-500 hover:text-black"
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
        <div className="fixed top-0 right-0 h-screen flex justify-end  bg-white/30 backdrop-blur-xl w-full">
          <div className="shadow-xl bg-white w-[20%]">
            <div className="flex items-center justify-between bg-black p-4 h-20">
              <h1 className="font-bold text-3xl text-white ">My Account</h1>
              <i
                className="text-2xl fa-regular fa-circle-xmark cursor-pointer text-red-600 hover:text-green-600"
                onClick={()=>
                  setProfile(false)}
              ></i>
            </div>
            <ul className="text-black font-bold">
              
              {
                profileObj.map((item)=>{
                  return <li 
                    className={item.action?"text-lg px-4 py-2 mb-1 hover:bg-red-400" :"text-lg px-4 py-2 mb-1 hover:bg-gray-400" }
                    key={item.label}
                    onClick={
                      ()=>{
                        if(item.action){
                          localStorage.clear();
                          setIsLoggedIn(false); 
                        }
                        navigate(item.route);
                        setProfile(false);
                      }
                    }
                    >{item.label}</li>
                })
              }
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

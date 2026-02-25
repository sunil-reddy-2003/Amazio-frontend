import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const AdminNav = (props) => {

  const { isAdmin, setIsAdmin } = useAuth();
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = useState("");
  const { onSearch } = props;
  const [viewClicked,setViewClicked]=useState(false);



  return (
    <nav className="sticky flex items-center justify-between top-0 z-50 bg-gradient-to-r from-gray-900 via-gray-600 to-gray-800   px-14 py-6  text-white">
      <Link
        to="/admin"
        className="flex items-center text-2xl font-bold gap-2 flex-shrink-0 "
        onClick={()=>setViewClicked(false)}
      >
        <i className="fa-brands fa-atlassian"></i>
        <span>Amazio</span>
      </Link>

      {viewClicked && (
        <div className=" hidden md:flex flex-1  mx-6 ">
          <div className="relative flex items-center w-140 border-2 rounded-full">
            <input
              type="text"
              value={searchVal}
              placeholder="Search any product name..."
              aria-label="Search for products"
              className="px-8 py-2 rounded-l-full  w-full placeholder:tracking-widest"
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
                className="absolute right-14 cursor-pointer rounded-full hover:bg-white/40 hover:text-black p-2"
                onClick={() => {
                  onSearch("");
                  setSearchVal("");
                }}
              >
                <i className="fa-solid fa-xmark"></i>
              </div>
            )}
            <div
              className="border-l px-4 py-2 hover:bg-white/30 rounded-r-full cursor-pointer"
              onClick={() => onSearch(searchVal)}
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
        </div>
      )}


      {!isAdmin && (<Link to='/adminlogin'>Log in</Link>)}
      {isAdmin && (<div className="flex items-center  gap-8">
        <Link 
          to="viewallproducts"
          onClick={()=>setViewClicked(true)}
          className="hover:underline underline-offset-3 hover:decoration-green-400"
        >view products</Link>
        <Link 
          to="/add-product"
          onClick={()=>setViewClicked(false)}
          className="hover:underline underline-offset-3 hover:decoration-green-400"  
        >add product</Link>
        <button
          onClick={() => {
            setIsAdmin(false);
            localStorage.clear();
            navigate("/adminlogin");
          }}
          className="border px-4 py-2 rounded-full  hover:bg-green-500 font-bold bg-slate-900 cursor-pointer "
        >Logout</button>
      </div>)}
    </nav>
  )
}

export default AdminNav;
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const ProductSearch = ({ searchVal, setSearchVal, onSearch, className = "" }) => (
  <form
    className={`flex w-full items-center overflow-hidden rounded-full border-2 ${className}`}
    onSubmit={(event) => {
      event.preventDefault();
      onSearch(searchVal);
    }}
  >
    <input
      type="search"
      value={searchVal}
      placeholder="Search products..."
      aria-label="Search for products"
      className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm text-white outline-none placeholder:text-white/70 sm:px-6"
      onChange={(event) => {
        setSearchVal(event.target.value);
        if (event.target.value === "") onSearch("");
      }}
    />
    {searchVal && (
      <button
        type="button"
        aria-label="Clear search"
        className="px-3 py-2 hover:bg-white/20"
        onClick={() => {
          setSearchVal("");
          onSearch("");
        }}
      >
        <i className="fa-solid fa-xmark" />
      </button>
    )}
    <button
      type="submit"
      aria-label="Submit search"
      className="border-l px-4 py-2 transition hover:bg-white/30"
    >
      <i className="fa-solid fa-magnifying-glass" />
    </button>
  </form>
);

const AdminNav = ({ onSearch }) => {
  const { isAdmin, setIsAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchVal, setSearchVal] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const showSearch = location.pathname === "/viewallproducts";

  const logout = () => {
    setIsAdmin(false);
    localStorage.clear();
    navigate("/adminlogin");
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-gray-600 to-gray-800 px-4 py-3 text-white sm:px-6 md:px-8">
      <div className="flex items-center justify-between gap-4">
        <Link
          to="/admin"
          className="flex shrink-0 items-center gap-2 text-xl font-bold sm:text-2xl"
          onClick={() => setMobileMenuOpen(false)}
        >
          <i className="fa-brands fa-atlassian" />
          <span>Amazio</span>
        </Link>

        {isAdmin && showSearch && (
          <ProductSearch
            searchVal={searchVal}
            setSearchVal={setSearchVal}
            onSearch={onSearch}
            className="mx-4 hidden max-w-2xl flex-1 md:flex"
          />
        )}

        <div className="hidden items-center gap-4 md:flex lg:gap-8">
          {!isAdmin ? (
            <Link to="/adminlogin" className="rounded-full border px-4 py-2 hover:bg-white/20">
              Log in
            </Link>
          ) : (
            <>
              <Link to="/viewallproducts" className="hover:underline hover:decoration-green-400">
                View products
              </Link>
              <Link to="/add-product" className="hover:underline hover:decoration-green-400">
                Add product
              </Link>
              <button
                onClick={logout}
                className="cursor-pointer rounded-full border bg-slate-900 px-4 py-2 font-bold hover:bg-green-500"
              >
                Logout
              </button>
            </>
          )}
        </div>

        <button
          type="button"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          className="rounded-md border px-3 py-2 md:hidden"
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <i className={`fa-solid ${mobileMenuOpen ? "fa-xmark" : "fa-bars"}`} />
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="mt-3 flex flex-col gap-3 border-t border-white/30 pt-3 md:hidden">
          {isAdmin ? (
            <>
              <Link
                to="/viewallproducts"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md px-2 py-2 hover:bg-white/10"
              >
                View products
              </Link>
              <Link
                to="/add-product"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md px-2 py-2 hover:bg-white/10"
              >
                Add product
              </Link>
              {showSearch && (
                <ProductSearch
                  searchVal={searchVal}
                  setSearchVal={setSearchVal}
                  onSearch={onSearch}
                />
              )}
              <button
                onClick={logout}
                className="w-full rounded-full border bg-slate-900 px-4 py-2 text-left font-bold hover:bg-green-500"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/adminlogin"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-md px-2 py-2 hover:bg-white/10"
            >
              Log in
            </Link>
          )}
        </div>
      )}

      {isAdmin && showSearch && !mobileMenuOpen && (
        <div className="mt-3 md:hidden">
          <ProductSearch
            searchVal={searchVal}
            setSearchVal={setSearchVal}
            onSearch={onSearch}
          />
        </div>
      )}
    </nav>
  );
};

export default AdminNav;

import { useState } from "react";
const CategoryBar = (props) => {
  const { category, setCategory,adminCat } = props;

  const itemClick = (e) => {
    if (e.target.textContent === "All") {
      return setCategory([]);
    }
    return setCategory((prev) => {
      if (prev.includes(e.target.textContent)){
        const newCat=[...prev];
        const index=newCat.indexOf(e.target.textContent);
        newCat.splice(index,1);
        
        return newCat;
      }
      return [...prev, e.target.textContent];
    });
  };
  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Home",
    "Sports",
    "Beauty",
    "Books",
    "Groceries",
    "Toys",
  ];
  return (
    <div className={`sticky top-14 sm:top-16 md:top-20 backdrop-blur-sm px-2 sm:px-4 md:px-14 pb-1 sm:pb-2 text-white text-xs sm:text-sm md:text-base font-thin ${adminCat ? "bg-gradient-to-r from-gray-900 via-gray-600 to-gray-800" : "bg-gradient-to-r from-black/100 via-black/60 to-black/80"}`}>
      <ul className="flex justify-start sm:justify-between overflow-x-auto sm:overflow-x-visible gap-1 sm:gap-2">
        {categories.map((cat) => {
          return (
            <li
              className={`px-1.5 sm:px-2 md:px-4 py-1 sm:py-2 w-12 sm:w-20 text-center text-white/80 cursor-pointer hover:underline hover:decoration-2 hover:underline-offset-2 sm:hover:underline-offset-4 hover:decoration-green-500 active:decoration-red-500 transition-all whitespace-nowrap flex-shrink-0 sm:flex-shrink text-xs sm:text-sm md:text-base
                ${
                  cat== "All" && category.length == 0
                    ? "underline decoration-2 underline-offset-2 sm:underline-offset-4 decoration-red-500"
                    : category.includes(cat)
                      ? "underline decoration-2 underline-offset-2 sm:underline-offset-4 decoration-red-500"
                      : ""
                }`}
              value={cat}
              onClick={itemClick}
              key={cat}
            >
              {cat}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoryBar;

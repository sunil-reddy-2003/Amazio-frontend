import { useOutletContext } from "react-router-dom";
import React from "react";
const ProductCard = React.memo((props) => {
  const { product } = props;
  const { addToCart } = useOutletContext();
  return (
    <div className="flex flex-col justify-center items-center border border-white/40 text-black p-1 sm:p-2 md:p-3 rounded-lg hover:bg-purple-100 transition-colors">
      {" "}
      {/*border-[1px] rounded-4xl  transition delay-50 duration-600 ease-in-out hover:-translate-y-1 hover:scale-110  */}
      <img
        src={`${product.imageUrl}?auto=compress&cs=tinysrgb&w=500&h=500`}
        loading="lazy"
        alt={product.name}
        className="w-40 sm:w-48 md:w-56 h-40 sm:h-48 md:h-56 object-cover border-2 border-black rounded-xl"
      />
      <div className="text-sm sm:text-base md:text-lg font-bold text-center mt-2 line-clamp-2">{product.name}</div>
      <div className="text-sm sm:text-base md:text-lg font-bold text-green-600">₹{product.price}</div>
      <div className="text-xs sm:text-sm text-gray-700 text-center line-clamp-2">{product.description}</div>
      <button
        className="mt-2 px-2 sm:px-3 py-1 sm:py-1.5 font-bold text-xs sm:text-sm md:text-base rounded-lg bg-black text-white cursor-pointer active:bg-white active:text-black hover:bg-gray-800 transition-colors"
        onClick={() => {
          addToCart(product);
        }}
      >
        Add to cart
      </button>
    </div>
  );
})

export default ProductCard;

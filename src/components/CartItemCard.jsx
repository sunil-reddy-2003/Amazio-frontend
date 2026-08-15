import React from "react";
const CartItemCard = React.memo((props) => {
  const { product, onIncrease, onDecrease, onDelete } = props;
  return (
    <div className="bg-white/20 backdrop-blur-xs mb-2 sm:mb-3 md:mb-4 rounded-md hover:bg-black/30 transition-colors">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
        <div className="w-full sm:w-[20%] p-2 sm:p-2">
          <img
            src={`${product.imageUrl}?auto=compress&cs=tinysrgb&w=500&h=500`}
            className="h-40 sm:h-50 w-40 sm:w-50 object-cover border border-white/20 rounded-sm"
            alt={product.name}
          />
        </div>
        <div className="flex flex-col justify-between w-full sm:w-[70%] p-2 sm:p-4 gap-2">
          <div>
            <div className="text-base sm:text-lg md:text-xl font-bold text-black">{product.name}</div>
            <p className="text-xs sm:text-sm md:text-base font-light text-white line-clamp-2">
              {product.description}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 text-black items-center">
              <button
                type="button"
                disabled={product.quantity === 1}
                className="border-2 px-1.5 sm:px-2 text-xs sm:text-sm font-extrabold rounded-full cursor-pointer hover:text-white hover:bg-black active:bg-white active:text-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                onClick={() => {
                  onDecrease(product.id);
                }}
              >
                <i className="fa-solid fa-minus"></i>
              </button>
              <span className="text-sm sm:text-base md:text-lg font-bold min-w-6 text-center">
                {product.quantity}
              </span>
              <button
                type="button"
                className="border-2 px-1.5 sm:px-2 text-xs sm:text-sm font-extrabold rounded-full cursor-pointer hover:text-white hover:bg-black active:bg-white active:text-black transition-colors"
                onClick={() => {
                  onIncrease(product.id);
                }}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
            <button
              className="text-xs sm:text-sm md:text-base px-3 sm:px-4 py-1 sm:py-1.5 rounded-lg bg-white text-black border hover:bg-black hover:text-white hover:border-white active:bg-white active:text-black transition-colors w-full sm:w-auto"
              onClick={() => {
                onDelete(product.id);
              }}
            >
              Remove
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center w-full sm:w-[10%] p-2 sm:p-0 text-lg sm:text-xl md:text-2xl text-white font-bold">
          ₹{product.price * product.quantity}
        </div>
      </div>
    </div>
  );
})
export default CartItemCard;

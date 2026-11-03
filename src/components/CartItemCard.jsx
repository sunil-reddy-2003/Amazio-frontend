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
          <div className="flex flex-row flex-wrap items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2 text-black">
              <button
                type="button"
                disabled={product.quantity === 1}
                aria-label={`Decrease quantity of ${product.name}`}
                className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 text-xs font-extrabold transition-colors hover:bg-black hover:text-white active:bg-white active:text-black disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => {
                  onDecrease(product.id);
                }}
              >
                <i className="fa-solid fa-minus"></i>
              </button>
              <span className="min-w-6 text-center text-sm font-bold sm:text-base">
                {product.quantity}
              </span>
              <button
                type="button"
                aria-label={`Increase quantity of ${product.name}`}
                className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 text-xs font-extrabold transition-colors hover:bg-black hover:text-white active:bg-white active:text-black"
                onClick={() => {
                  onIncrease(product.id);
                }}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
            <button
              type="button"
              className="w-fit rounded-md border bg-white px-3 py-1 text-xs text-black transition-colors hover:border-white hover:bg-black hover:text-white active:bg-white active:text-black sm:py-1.5 sm:text-sm"
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

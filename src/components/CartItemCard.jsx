const CartItemCard = (props) => {
  const { product, onIncrease, onDecrease, onDelete } = props;
  return (
    <div className="bg-white/20 backdrop-blur-xs mb-2 rounded-md hover:bg-black/30">
      <div className="flex">
        <div className="mr-2 w-[20%] p-2">
          <img
            src={product.imageUrl}
            className="h-50 w-50 object-cover border border-white/20 rounded-sm"
          />
        </div>
        <div className="flex flex-col justify-between mr-2 w-[70%] p-4">
          <div>
            <div className="text-xl font-bold text-black">{product.name}</div>
            <p className="text-md font-light text-white">
              {product.description}
            </p>
          </div>
          <div className="flex flex-col items-start">
            <div className="flex m-2 text-black">
              <button
                type="button"
                disabled={product.quantity === 1}
                className="border-2 px-1 mr-2 text-md font-extrabold rounded-full cursor-pointer hover:text-white hover:bg-black active:bg-white active:text-black"
                onClick={() => {
                  onDecrease(product.id);
                }}
              >
                <i className="fa-solid fa-minus"></i>
              </button>
              <span className="mr-2 text-lg font-bold">
                {product.quantity}{" "}
              </span>
              <button
                type="button"
                className="border-2 px-1 mr-2  text-md font-extrabold rounded-full cursor-pointer hover:text-white hover:bg-black active:bg-white active:text-black"
                onClick={() => {
                  onIncrease(product.id);
                }}
              >
                <i className="fa-solid fa-plus"></i>
              </button>{" "}
            </div>
            <button
              className="ml-2 text-lg  px-4 rounded-lg bg-white text-black border hover:bg-black hover:text-white hover:border-white hover:border active:bg-white active:text-black"
              onClick={() => {
                onDelete(product.id);
              }}
            >
              Remove
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center  w-[10%] p-2 text-2xl text-white font-bold">
          ₹{product.price * product.quantity}
        </div>
      </div>
    </div>
  );
};
export default CartItemCard;

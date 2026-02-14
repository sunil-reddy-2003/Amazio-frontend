import { useOutletContext } from "react-router-dom";
const ProductCard = (props) => {
  const { product } = props;
  const { addToCart } = useOutletContext();
  return (
    <div className="flex flex-col justify-center items-center border border-white/40 text-black p-2 rounded-lg hover:bg-purple-100">
      {" "}
      {/*border-[1px] rounded-4xl  transition delay-50 duration-600 ease-in-out hover:-translate-y-1 hover:scale-110  */}
      <img
        src={product.imageUrl}
        loading="lazy"
        alt={product.name}
        className="w-70 h-70 object-cover border-2 border-black rounded-xl"
      />
      <div className="text-lg font-bold">{product.name}</div>
      <div className="text-lg font-bold">₹{product.price}</div>
      <div className="text-sm ">{product.description}</div>
      <button
        className="mt-2 px-2 py-1 font-bold text-md rounded-lg  bg-black text-white cursor-pointer active:bg-white active:text-black"
        onClick={() => {
          addToCart(product);
        }}
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;

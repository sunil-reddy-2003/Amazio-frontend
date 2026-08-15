import { useOutletContext } from "react-router-dom";
import CartItemCard from "../components/CartItemCard";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import OrderDetails from "../components/OrderDetails";

const Cart = () => {
  const { cartItems, increaseQty, decreaseQty, deleteItem} =
    useOutletContext();
  const { isLoggedIn, setRedirectAfterLogin } = useAuth();
  const navigate = useNavigate();

  const btnName = "CONTINUE TO SHIPPING";
  const nextStep = "/shipping";
  const orderHeading="Order Details";

  return cartItems.length !== 0 ? (
    <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-0">
      <div className="w-full lg:w-[75%] p-2 sm:p-3 md:p-4 lg:m-4">
        {cartItems.map((product) => {
          return (
            <CartItemCard
              product={product}
              key={product.id}
              onIncrease={() => increaseQty(product.id)}
              onDecrease={() => decreaseQty(product.id)}
              onDelete={() => deleteItem(product.id)}
            />
          );
        })}
      </div>
      <div className="w-full lg:w-[25%] relative py-4 md:py-6 lg:py-8 px-2 sm:px-3 md:px-4 lg:pr-4">
        <OrderDetails
          isLoggedIn={isLoggedIn}
          setRedirectAfterLogin={setRedirectAfterLogin}
          btnName={btnName}
          nextStep={nextStep}
          orderHeading={orderHeading}
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center h-60 sm:h-72 md:h-84 text-center text-base sm:text-lg md:text-xl font-semibold text-gray-700 m-4 sm:m-8 md:m-10">
      <div className="fa-solid fa-cart-arrow-down fa-shake text-black text-6xl sm:text-7xl md:text-8xl p-2 sm:p-4"></div>

      <p className="text-black font-bold text-sm sm:text-base md:text-lg mt-4">
        Your cart is looking a little empty{" "}
        <span>
          <i className="fa-regular fa-face-frown"></i>
        </span>
      </p>

      <button
        className="m-2 sm:m-4 px-6 sm:px-12 md:px-18 py-2 bg-black text-xs sm:text-sm border-black text-white rounded hover:bg-green-800 transition-colors"
        onClick={() => {
          navigate("/");
        }}
      >
        Continue Shopping
      </button>
    </div>
  );
};
export default Cart;

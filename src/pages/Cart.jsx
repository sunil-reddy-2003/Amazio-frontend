import { useOutletContext } from "react-router-dom";
import CartItemCard from "../components/CartItemCard";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import OrderDetails from "../components/OrderDetails";

const Cart = () => {
  const { cartItems, increaseQty, decreaseQty, deleteItem } =
    useOutletContext();
  const { isLoggedIn, setRedirectAfterLogin } = useAuth();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const Fees = 0;
  const btnName = "CONTINUE TO SHIPPING";
  const nextStep = "/shipping";
  const orderHeading="Order Details";

  return cartItems.length !== 0 ? (
    <div className="flex ">
      <div className="w-[75%] p-4 m-4">
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
      <div className="relative py-8 pr-4 w-[25%]">
        <OrderDetails
          totalPrice={totalPrice}
          totalItems={totalItems}
          Fees={Fees}
          isLoggedIn={isLoggedIn}
          setRedirectAfterLogin={setRedirectAfterLogin}
          btnName={btnName}
          nextStep={nextStep}
          orderHeading={orderHeading}
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center h-84 text-center text-xl font-semibold text-gray-700 m-10">
      <div className="fa-solid fa-cart-arrow-down fa-shake text-black text-8xl p-4 md:block"></div>

      <p className="text-black font-bold text-md fa-fade">
        Your cart is looking a little empty{" "}
        <span>
          <i className="fa-regular fa-face-frown"></i>
        </span>
      </p>

      <button
        className="m-4 px-18 py-2 bg-black text-sm border-black text-white rounded hover:bg-green-500 hover:text-black"
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

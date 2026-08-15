import OrderDetails from "../components/OrderDetails";
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import { useState } from "react";

const Payment = () => {
  const { totalPrice, createOrder, cartItems } = useOutletContext();
  const navigate = useNavigate();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("Cash on Delivery");
  const [btnState, setBtnState] = useState(false);

  const orderHeading = "Order Summary";
  const btnName = "amount payable";
  const paymentModes = [
    "Cash on Delivery",
    "Credit/Debit Card",
    "UPI",
    "Net Banking",
    "Wallet",
    "EMI",
  ];

  const [cardFormValues, setCardFormValues] = useState({
    cardNumber: "",
    name: "",
    month: "",
    year: "",
    cvv: "",
  });

  if (!cartItems.length) {
    return (
      <div className="flex flex-col items-center justify-center text-black h-90 text-4xl font-bold tracking-widest">
        <h1>Looks like your cart is empty...</h1>
        <Link to="/" className="text-lg underline text-red-700 tracking-wide">
          Start shopping now!
        </Link>
      </div>
    );
  }

  const paymentRequest = async () => {
    if (!cartItems.length) return;
    setBtnState(true);
    const response = await createOrder(selectedPaymentMethod);
    if (response) {
      navigate("/order-success");
    } else {
      setBtnState(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-0">
      <div className="w-full lg:w-[75%] m-2 sm:m-4 md:m-6 lg:m-8">
        <div className="p-4 sm:p-6 md:p-8 font-black text-lg sm:text-xl md:text-2xl text-white bg-linear-to-r from-green-800 to-green-400 rounded-t-lg">
          <p>SELECT PAYMENT METHOD</p>
        </div>
        <div className="flex flex-col sm:flex-row relative w-full bg-slate-800 rounded-b-lg">
          <ul className="flex flex-col w-full sm:w-1/3 font-light text-sm sm:text-base md:text-lg cursor-pointer bg-black/60">
            {paymentModes.map((mode) => {
              return <li
                className="px-4 sm:px-8 md:px-16 py-2 sm:py-2 text-white hover:-translate-y-1 hover:scale-100 hover:duration-300 hover:bg-purple-500 hover:text-white transition-colors"
                onClick={() => setSelectedPaymentMethod(mode)}
                key={mode}
              >
                {mode}
              </li>;
            })}
          </ul>
          {selectedPaymentMethod === "Credit/Debit Card" && (
            <div className="flex flex-col items-center justify-center w-full sm:w-2/3 p-4 sm:p-8">
              <p className="flex text-base sm:text-lg md:text-xl font-semi-bold text-white text-center">
                Sorry for the inconvenience...
              </p>
              <p className="flex text-sm sm:text-base md:text-lg font-semi-bold text-white text-center">
                we are currently working on credit and debit cards
              </p>
            </div>
          )}
          {selectedPaymentMethod === "Net Banking" && (
            <div className="flex flex-col items-center justify-center w-full sm:w-2/3 p-4 sm:p-8">
              <p className="flex text-base sm:text-lg md:text-xl font-semi-bold text-white text-center">
                Sorry for the inconvenience...
              </p>
              <p className="flex text-sm sm:text-base md:text-lg font-semi-bold text-white text-center">
                we are currently working on netbanking
              </p>
            </div>
          )}
          {selectedPaymentMethod === "Wallet" && (
            <div className="flex flex-col items-center justify-center w-full sm:w-2/3 p-4 sm:p-8">
              <p className="flex text-base sm:text-lg md:text-xl font-semi-bold text-white text-center">
                Sorry for the inconvenience...
              </p>
              <p className="flex text-sm sm:text-base md:text-lg font-semi-bold text-white text-center">
                we are currently working on wallet balance
              </p>
            </div>
          )}
          {selectedPaymentMethod === "UPI" && (
            <div className="flex flex-col items-center justify-center w-full sm:w-2/3 p-4 sm:p-8">
              <p className="flex text-base sm:text-lg md:text-xl font-semi-bold text-white text-center">
                Sorry for the inconvenience...
              </p>
              <p className="flex text-sm sm:text-base md:text-lg font-semi-bold text-white text-center">
                we are currently working on UPI
              </p>
            </div>
          )}
          {selectedPaymentMethod === "EMI" && (
            <div className="flex flex-col items-center justify-center w-full sm:w-2/3 p-4 sm:p-8">
              <p className="flex text-base sm:text-lg md:text-xl font-semi-bold text-white text-center">
                Sorry for the inconvenience...
              </p>
              <p className="flex text-sm sm:text-base md:text-lg font-semi-bold text-white text-center">
                we are currently working on EMI
              </p>
            </div>
          )}
          {selectedPaymentMethod === "Cash on Delivery" && (
            <div className="flex flex-col items-center justify-center w-full sm:w-2/3 p-4 sm:p-8">
              <p className="font-bold text-lg sm:text-xl md:text-2xl text-white text-center">
                Click to pay on delivery
              </p>
              <button
                disabled={btnState}
                className={`mt-4 border rounded-md px-3 sm:px-4 py-1.5 sm:py-2 bg-green-600 text-white text-xs sm:text-sm md:text-base font-semibold transition-colors ${btnState ? "cursor-not-allowed opacity-50" : "hover:bg-black cursor-pointer"}`}
                onClick={() => {
                  if (btnState) return;
                  paymentRequest();
                }}
              >
                CONFIRM ORDER OF ₹{totalPrice}
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="w-full lg:w-[25%] relative py-4 md:py-6 lg:py-8 px-2 sm:px-4 lg:pr-4">
        <OrderDetails
          orderHeading={orderHeading}
          btnName={btnName}
          showAmtPybl={true}
        />
      </div>
    </div>
  );
};

export default Payment;

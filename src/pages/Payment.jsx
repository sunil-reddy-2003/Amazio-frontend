import OrderDetails from "../components/OrderDetails";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useState } from "react";

const Payment = () => {
  const { cartItems, orderComplete } = useOutletContext();
  const navigate = useNavigate();
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("cod");
  const [btnState, setBtnState] = useState(false);

  const Fees = 0;
  const totalPrice = cartItems.reduce((sum, item) => {
    return (sum += item.price * item.quantity);
  }, 0);
  const totalItems = cartItems.reduce((sum, item) => {
    return (sum += item.quantity);
  }, 0);
  const orderHeading = "Order Summary";
  const btnName = "amount payable";

  const [cardFormValues, setCardFormValues] = useState({
    cardNumber: "",
    name: "",
    month: "",
    year: "",
    cvv: "",
  });
  return (
    <div className=" flex ">
      <div className=" flex flex-col py-8 pl-30 pr-16 w-[75%]">
        <div className="px-16 py-4 font-bold text-xl text-white bg-linear-to-r from-green-800  to-green-400 mb-2">
          <p>SELECT PAYMENT METHOD</p>
        </div>
        <div className="flex relative w-full bg-slate-800 ">
          <ul className=" flex flex-col w-1/3  font-light text-xl cursor-pointer">
            <li
              className=" px-16 py-2 bg-black/60 text-white hover:-translate-y-1 hover:scale-100 hover:duration-300 hover:bg-purple-500 hover:text-white"
              onClick={() => setSelectedPaymentMethod("creditCard")}
            >
              Credit/ Debit Card
            </li>
            <li
              className=" px-16 py-2  bg-black/60 text-white hover:-translate-y-2 hover:duration-300 hover:bg-purple-500 hover:text-white"
              onClick={() => setSelectedPaymentMethod("netBanking")}
            >
              NetBanking
            </li>
            <li
              className=" px-16 py-2 bg-black/60 text-white hover:-translate-y-2 hover:duration-300 hover:bg-purple-500 hover:text-white"
              onClick={() => setSelectedPaymentMethod("wallet")}
            >
              Wallet
            </li>
            <li
              className=" px-16 py-2 bg-black/60 text-white hover:-translate-y-2 hover:duration-300 hover:bg-purple-500 hover:text-white"
              onClick={() => setSelectedPaymentMethod("upi")}
            >
              UPI
            </li>
            <li
              className=" px-16 py-2 bg-black/60 text-white hover:-translate-y-2 hover:duration-300 hover:bg-purple-500 hover:text-white"
              onClick={() => setSelectedPaymentMethod("emi")}
            >
              EMI
            </li>
            <li
              className=" px-16 py-2 bg-black/60 text-white hover:-translate-y-2 hover:duration-300 hover:bg-purple-500 hover:text-white"
              onClick={() => setSelectedPaymentMethod("cod")}
            >
              Cash on delivery
            </li>
          </ul>
          {/* <div className="border bg-red  w-2/3 bg-white px-20"></div> */}
          {selectedPaymentMethod === "creditCard" && (
            <div className="flex flex-col items-center justify-center  w-2/3">
              <p className="flex text-xl font-semi-bold text-white">
                Sorry for the inconvenience...
              </p>
              <p className="flex text-lg font-semi-bold text-white">
                we are currently working on credit and debit cards
              </p>
            </div>
          )}
          {selectedPaymentMethod === "netBanking" && (
            <div className="flex flex-col items-center justify-center  w-2/3">
              <p className="flex text-xl font-semi-bold text-white">
                Sorry for the inconvenience...
              </p>
              <p className="flex text-lg font-semi-bold text-white">
                we are currently working on netbanking
              </p>
            </div>
          )}
          {selectedPaymentMethod === "wallet" && (
            <div className="flex flex-col items-center justify-center  w-2/3">
              <p className="flex text-xl font-semi-bold text-white">
                Sorry for the inconvenience...
              </p>
              <p className="flex text-lg font-semi-bold text-white">
                we are currently working on wallet balance
              </p>
            </div>
          )}
          {selectedPaymentMethod === "upi" && (
            <div className="flex flex-col items-center justify-center  w-2/3">
              <p className="flex text-xl font-semi-bold text-white">
                Sorry for the inconvenience...
              </p>
              <p className="flex text-lg font-semi-bold text-white">
                we are currently working on UPI
              </p>
            </div>
          )}
          {selectedPaymentMethod === "emi" && (
            <div className="flex flex-col items-center justify-center  w-2/3">
              <p className="flex text-xl font-semi-bold text-white">
                Sorry for the inconvenience...
              </p>
              <p className="flex text-lg font-semi-bold text-white">
                we are currently working on EMI
              </p>
            </div>
          )}
          {selectedPaymentMethod === "cod" && (
            <div className="flex flex-col items-center justify-center  w-2/3 border">
              <p className="font-bold text-2xl text-white">Click to pay on delivery</p>
              <button
                disabled={btnState}
                className={`border rounded-md px-4 py-2 bg-green-600 text-white ${btnState ? "cursor-not-allowed" : "hover:bg-black"}`}
                onClick={() => {
                  orderComplete();
                  setBtnState(true);
                  navigate("/order-success");
                }}
              >
                CONFIRM ORDER OF ₹{totalPrice}
              </button>
            </div>
          )}
        </div>
      </div>
      <div className=" relative  py-8 pr-4 w-[25%]">
        <OrderDetails
          Fees={Fees}
          totalPrice={totalPrice}
          totalItems={totalItems}
          orderHeading={orderHeading}
          btnName={btnName}
          showAmtPybl={true}
        />
      </div>
    </div>
  );
};

export default Payment;

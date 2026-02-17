import { useNavigate,useOutletContext } from "react-router-dom";
const OrderDetails = (props) => {
  const {
    totalPrice,
    totalItems,
    Fees,
    isLoggedIn,
    setRedirectAfterLogin,
    btnName,
    nextStep,
    address,
    orderHeading,
    showAmtPybl
  } = props;

  const navigate = useNavigate();
  // const [showAmtPybl,setShowAmtPybl]=useState(false);

  return (
    <div className="sticky top-20 p-8 bg-linear-to-r from-black/40 to-black/60">
      <h2 className="font-bold text-2xl mb-4">{orderHeading}</h2>
      <div className="flex justify-between mb-2 text-white">
        <span>MRP</span>
        <span>₹{totalPrice}</span>
      </div>
      <div className="flex justify-between mb-2 text-white">
        <span>Fees</span>
        <span>₹{Fees}</span>
      </div>
      <div className="flex justify-between mb-2 text-white">
        <span>Total Items</span>
        <span>{totalItems}</span>
      </div>

      {showAmtPybl ? (
        <>
          <div className="flex justify-between mb-2 text-white">
            <span>Total Price</span>
            <span>₹{totalPrice}</span>
          </div>
          <div className="flex justify-between mb-2 text-lg text-white font-bold">
            <span>Amount Payable</span>
            <span>₹{totalPrice}</span>
          </div>
        </>
      ) : (
        <>
          <div className="border-b-2 my-2 text-white"></div>
          <div className="flex justify-between font-bold text-lg text-white mt-2">
            <span>Total Price</span>
            <span>₹{totalPrice}</span>
          </div>
          <button
            className="mt-4 w-full py-2 bg-black text-white rounded hover:bg-white hover:text-black"
            onClick={() => {
              if (nextStep === "/shipping") {
                if (isLoggedIn) {
                  navigate("/shipping");
                } else {
                  setRedirectAfterLogin("/shipping");
                  navigate("/log-in");
                }
              }
              if (nextStep === "/payment") {
                if (address.mobile) {
                  navigate("/payment");
                } else {
                  alert("address is incomplete");
                }
              }
            }}
          >
            {btnName}
          </button>
        </>
      )}
    </div>
  );
};

export default OrderDetails;

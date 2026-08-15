import { useNavigate,useOutletContext } from "react-router-dom";
const OrderDetails = (props) => {
  const {
    isLoggedIn,
    setRedirectAfterLogin,
    btnName,
    nextStep,
    address,
    orderHeading,
    showAmtPybl
  } = props;

  const navigate = useNavigate();
  const {totalItems,totalPrice,fees}=useOutletContext();
  // const [showAmtPybl,setShowAmtPybl]=useState(false);

  return (
    <div className="sticky top-24 lg:top-24 p-4 sm:p-6 md:p-8 bg-linear-to-r from-black/40 to-black/60 rounded-lg lg:rounded-none">
      <h2 className="font-bold text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4">{orderHeading}</h2>
      <div className="flex justify-between mb-2 text-white text-xs sm:text-sm md:text-base">
        <span>MRP</span>
        <span>₹{totalPrice}</span>
      </div>
      <div className="flex justify-between mb-2 text-white text-xs sm:text-sm md:text-base">
        <span>Fees</span>
        <span>₹{fees}</span>
      </div>
      <div className="flex justify-between mb-2 text-white text-xs sm:text-sm md:text-base">
        <span>Total Items</span>
        <span>{totalItems}</span>
      </div>

      {showAmtPybl ? (
        <>
          <div className="flex justify-between mb-2 text-white text-xs sm:text-sm md:text-base">
            <span>Total Price</span>
            <span>₹{totalPrice}</span>
          </div>
          <div className="flex justify-between mb-2 text-base sm:text-lg md:text-lg text-white font-bold">
            <span>Amount Payable</span>
            <span>₹{totalPrice}</span>
          </div>
        </>
      ) : (
        <>
          <div className="border-b-2 my-2 text-white"></div>
          <div className="flex justify-between font-bold text-base sm:text-lg md:text-lg text-white mt-2">
            <span>Total Price</span>
            <span>₹{totalPrice}</span>
          </div>
          <button
            className="mt-4 w-full py-2 px-2 sm:px-3 md:px-4 bg-black text-white rounded hover:bg-white hover:text-black transition-colors text-xs sm:text-sm md:text-base font-semibold"
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

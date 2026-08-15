import { useNavigate } from "react-router-dom";
import React from "react";
const OrderCard = React.memo((props) => {
  const { order } = props;
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col m-1 w-full hover:scale-98 duration-600 cursor-pointer rounded-lg hover:bg-purple-200 transition-transform"
      onClick={() => {
        navigate(`/orders/${order.orderId}`);
      }}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-6 md:px-8 rounded-t-lg backdrop-blur-xl bg-white/60 gap-3 sm:gap-0">
        <div className="">
          <p className="text-sm sm:text-base md:text-lg font-bold pt-2">Order Placed on</p>
          <p className="text-xs sm:text-sm md:text-base">{order.date}</p>
        </div>
        <p className="text-xs sm:text-sm md:text-lg">
          Order Id <span className="font-semibold underline decoration-dotted">{order.orderId}</span>
        </p>
      </div>
      <div className="flex flex-col px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-black/10 rounded-b-lg gap-2">
        <p className="text-xs sm:text-sm md:text-base flex gap-4">
          <span className="font-semibold">Price:</span>
          <span>₹{order.totalPrice}</span>
        </p>

        <p className="text-xs sm:text-sm md:text-base flex gap-4">
          <span className="font-semibold">Items:</span>
          <span>{order.totalQuantity}</span>
        </p>

        <p className="text-xs sm:text-sm md:text-base flex gap-4">
          <span className="font-semibold">Status:</span>
          <span className="text-green-600 font-semibold">{order.orderStatus}</span>
        </p>
      </div>
    </div>
  );
});
export default OrderCard;

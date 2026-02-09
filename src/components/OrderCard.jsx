const OrderCard = (props) => {
  const { order, date, month, year } = props;
  return (
    <div className="flex flex-col  border-b border-gray-400 mb-2 w-full">
      <div className=" px-10 py-2 bg-black/90 ">
        <div className="flex items-center justify-between ">
          <div className=" font-semibold text-white">
            <p className="text-lg  ">Order Placed on</p>
            <p className="text-md">{date + " " + month + " " + year}</p>
          </div>
          <p className="text-lg font-semibold text-white">
            Order id: {order.orderId}
          </p>
        </div>
      </div>
      <div className="flex flex-col px-10 py-2   bg-black/30  text-slate-900 font-semibold ">
        <p className="text-md flex  gap-4">
          <span>Price : </span>
          <span>₹{order.price}</span>
        </p>

        <p className="text-md flex gap-4">
          <span>Items : </span>
          <span>{order.quantity}</span>
        </p>

        <p className="text-md flex gap-4">
          <span>Status : </span>
          <span>PLACED</span>
        </p>
      </div>
    </div>
  );
};

export default OrderCard;

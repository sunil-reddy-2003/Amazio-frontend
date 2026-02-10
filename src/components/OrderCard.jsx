const OrderCard = (props) => {
  const { order, date, month, year } = props;
  return (
    <div className="flex flex-col   mb-2 w-full hover:-translate-y-0 hover:scale-98 duration-300  text-white">
        <div className="flex items-center justify-between px-10 bg-green-900 backdrop-blur-xl">
          <div className=" ">
            <p className="text-lg  ">Order Placed on</p>
            <p className="text-md">{date + " " + month + " " + year}</p>
          </div>
          <p className="text-lg   underline decoration-dotted">
            Order id: {order.orderId}
          </p>
      </div>
      <div className="flex flex-col px-10 py-6 bg-black/90 ">
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

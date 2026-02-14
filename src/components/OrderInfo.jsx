import OrderInfoImageCard from "./OrderInfoImageCard";
const OrderInfo = () => {
  const id = window.location.pathname.slice(8);
  const orders = JSON.parse(localStorage.getItem("orders"));
  const ORDER = orders.filter((order) => {
    return order.orderId === id;
  });
  return (
    <div className="m-4 flex  justify-center ">
      <div className=" w-[70%] rounded-md bg-white/40 p-6 ">
        <h1 className="text-3xl font-extrabold">Order details</h1>
        <h2 className="px-2 mb-2">
          Order placed on <span>{ORDER[0].date}</span> | order number{" "}
          <span className="underline decoration-purple-900 decoration-dotted text-purple-900">
            {ORDER[0].orderId}
          </span>
        </h2>
        <div className="grid grid-cols-3 p-2 gap-2 border border-gray-400 rounded-md my-2">
          <div className=" p-2">
            <h3 className="font-bold text-lg mb-2">Shipping address</h3>
            <p className="text-sm mx-2">
              {ORDER[0].address.flat + ", "} {ORDER[0].address.area + ", "}
            </p>
            <p className="text-sm mx-2">
              {ORDER[0].address.landmark + ", "}
              {ORDER[0].address.city}
            </p>
            <p className="text-sm mx-2">
              {ORDER[0].address.state + ", "}india - {ORDER[0].address.pincode}
            </p>
          </div>
          <div className=" p-2">
            <h3 className="font-bold text-lg mb-2">Payment method</h3>

            <p className="text-sm m-2">{ORDER[0].paymentMethod}</p>
          </div>
          <div className=" p-2">
            <h3 className="font-bold text-lg mb-2">Order summary</h3>
            <div className="flex flex-col m-2">
              <div className="flex justify-between text-sm">
                <p>Item(s) Subtotal :</p>
                <p className="font-semibold">
                  ₹{ORDER[0].priceDetails.totalPrice}
                </p>
              </div>
              <div className="flex justify-between text-sm">
                <p>Fees :</p>
                <p className="font-semibold">₹{ORDER[0].priceDetails.fees}</p>
              </div>
              <div className="flex justify-between font-semibold text-lg my-4">
                <p>Grand Total :</p>
                <p>
                  ₹
                  {ORDER[0].priceDetails.totalPrice +
                    ORDER[0].priceDetails.fees}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 p-4 gap-8 border border-gray-200 rounded-md my-2">
          {ORDER[0].items.map((item) => {
            return <OrderInfoImageCard item={item} key={item.id}/>;
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;

import OrderInfoImageCard from "./OrderInfoImageCard";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const OrderInfo = () => {
    // const orderId = window.location.pathname.slice(8);
    const {orderId}=useParams();

  const [order,setOrder]=useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOrder = async () => {
      try{
        const orderResponse = await axios.get(
        `http://localhost:9090/api/order/getOrder/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        }
      );
      setOrder(orderResponse.data);
      console.log("inside orderResponse",orderResponse);
      }catch(error){
        console.error("error while getting the order:",error);
      }finally{
        setLoading(false);
      }
    };
    getOrder();
  }, []);

  if (loading) return <div className="flex items-center justify-center h-90 text-5xl font-bold text-white">Loading order Information...</div>;


  return (
    <div className="m-4 flex  justify-center ">
      <div className=" w-[70%] rounded-md bg-white/40 p-6 ">
        <h1 className="text-3xl font-extrabold">Order details</h1>
        <h2 className="px-2 mb-2">
          Order placed on <span>{order.date}</span> | order number{" "}
          <span className="underline decoration-purple-900 decoration-dotted text-purple-900">
            {orderId}
          </span>
        </h2>
        <div className="grid grid-cols-3 p-2 gap-2 border border-gray-400 rounded-md my-2">
          <div className=" p-2">
            <h3 className="font-bold text-lg mb-2">Shipping address</h3>
            <p className="text-sm mx-2">
              {order.address.flat + ", "} {order.address.area + ", "}
            </p>
            <p className="text-sm mx-2">
              {order.address.landmark + ", "}
              {order.address.city}
            </p>
            <p className="text-sm mx-2">
              {order.address.state + ", "}india - {order.address.pincode}
            </p>
          </div>
          <div className=" p-2">
            <h3 className="font-bold text-lg mb-2">Payment method</h3>

            <p className="text-sm m-2">{order.payment.paymentMethod}</p>
          </div>
          <div className=" p-2">
            <h3 className="font-bold text-lg mb-2">Order summary</h3>
            <div className="flex flex-col m-2">
              <div className="flex justify-between text-sm">
                <p>Item(s) Subtotal :</p>
                <p className="font-semibold">
                  ₹{order.totalPrice}
                </p>
              </div>
              <div className="flex justify-between text-sm">
                <p>Fees :</p>
                <p className="font-semibold">₹{order.totalPrice-order.totalPrice}</p>
              </div>
              <div className="flex justify-between font-semibold text-lg my-4">
                <p>Grand Total :</p>
                <p>
                  ₹
                  {order.totalPrice}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 p-4 gap-8 border border-gray-200 rounded-md my-2">
          {order.orderItems.map((item) => {
            return <OrderInfoImageCard item={item} key={item.productId} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;

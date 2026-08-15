import { Link } from "react-router-dom";
import OrderCard from "../components/OrderCard";
import axios from "axios";
import { useState, useEffect } from "react";
import {useAuth} from "../context/AuthContext"
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const {user} =useAuth();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const ordersResponse = await axios.get(
          // `http://localhost:9090/api/order/getOrders/${user.userId}`,
          `${import.meta.env.VITE_API_BASE_URL}/api/order/getOrders/${user.userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );
        // console.log("inside ordersResponse: ",ordersResponse);
        setOrders(ordersResponse.data);
      } catch (error) {
        console.error("error while getting the orders response", error);
      }finally{
        setLoading(false);
      }
    };
    getOrders();
  }, []);

    if (loading) return <div className="flex items-center justify-center h-90 text-5xl font-bold text-white">Loading order details..</div>


  return (
    <div className="flex flex-col items-center w-full">
      {orders.length > 0 ? (
        <>
          <div className="flex flex-col items-center text-white py-3 sm:py-4 md:py-6 mb-2 sm:mb-3 md:mb-4 w-full tracking-widest bg-linear-to-r from-black/90 to-black/90">
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-center">My Orders</h1>
            <p className="text-xs sm:text-sm md:text-base text-center">All your past and current orders in one place</p>
          </div>
          <div className="flex flex-col items-center w-full sm:w-4/5 md:w-[65%] px-2 sm:px-4">
            {orders &&
              orders.map((order) => {
                return <OrderCard key={order.orderId} order={order}/>;
              })}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center text-black w-full sm:w-4/5 md:w-[65%] h-60 sm:h-80 md:h-120 text-xl sm:text-2xl md:text-4xl font-bold tracking-widest text-center px-4">
          "Looks like you haven't placed any orders yet."
          <Link to="/" className="text-base sm:text-lg md:text-lg underline text-red-700 tracking-wide mt-4">
            Start shopping now!
          </Link>
        </div>
      )}
    </div>
  );
};

export default Orders;

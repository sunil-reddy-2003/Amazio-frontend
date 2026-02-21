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
          `http://localhost:9090/api/order/getOrders/${user.userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );
        console.log("inside ordersResponse: ",ordersResponse);
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
    <div className="flex flex-col items-center ">
      {orders.length > 0 ? (
        <>
          <div className="flex flex-col items-center  text-white w-[65%] py-4 mb-2 tracking-widest bg-linear-to-r from-black/50 to-black/90">
            <h1 className="font-bold text-4xl">My Orders</h1>
            <p> All your past and current orders in one place</p>
          </div>
          <div className="flex flex-col items-center w-[65%]   ">
            {orders &&
              orders.map((order) => {
                return <OrderCard key={order.orderId} order={order}/>;
              })}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center  justify-center text-black w-[65%] h-120 text-4xl font-bold tracking-widest ">
          "Looks like you haven't placed any orders yet."
          <Link to="/" className="text-lg underline text-red-700 tracking-wide">
            Start shopping now!
          </Link>
        </div>
      )}
    </div>
  );
};

export default Orders;

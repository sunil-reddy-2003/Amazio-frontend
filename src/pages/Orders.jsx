import { useOutletContext,Link } from "react-router-dom";
import OrderCard from "../components/OrderCard";
const Orders = () => {
  const { orders } = useOutletContext();
  const date = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <div className="flex flex-col items-center ">
      {orders.length>0 ? (
        <>
          <div className="flex flex-col items-center  text-white w-[65%] py-4 mb-2 tracking-widest bg-linear-to-r from-black/50 to-black/90">
            <h1 className="font-bold text-4xl">My Orders</h1>
            <p> All your past and current orders in one place</p>
          </div>
          <div className="flex flex-col items-center w-[65%]   ">
            {orders &&
              orders.map((order) => {
                return (
                  <OrderCard
                    order={order}
                    key={order.orderId}
                    date={date.getDate()}
                    month={months[date.getMonth()]}
                    year={date.getFullYear()}
                  />
                );
              })}
          </div>
        </>
      ) : (<div className="flex flex-col items-center  justify-center text-black w-[65%] h-120 text-4xl font-bold tracking-widest ">

        "Looks like you haven't placed any orders yet."
        <Link to="/" className="text-lg underline text-red-700 tracking-wide">Start shopping now!</Link>
        </div>)}
    </div>
  );
};

export default Orders;

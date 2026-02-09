import { useOutletContext } from "react-router-dom";
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
    <div className="flex flex-col items-center justify-center  w-full m-2 ">
      <div className="border-2 flex flex-col items-center bg-black text-white w-[65%] py-4 tracking-widest">
        <h1 className="font-bold text-4xl">My Orders</h1>
        <p> All your past and current orders in one place</p>
      </div>
      <div className="flex flex-col items-center w-[65%]  bg-white">
        {orders && (
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
          })
        ) }
      </div>
    </div>
  );
};

export default Orders;

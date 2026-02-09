import { Link } from "react-router-dom";
import { useState } from "react";
const OrderSuccess = () => {
  const [underLine,setUnderLine]=useState(true);
  return (
    <div className="flex flex-col items-center justify-center h-90">
      <h1 className="text-5xl font-bold text-green-600">
        🎉 Order Placed Successfully!
      </h1>
      <p className="mt-4 text-xl">Thank you for shopping with us.</p>
      <div className="flex gap-2">
        <Link to="/orders" className="hover:text-red-600 underline"> Go to orders</Link>
        <Link to="/" className="hover:text-red-600 underline"> continue shopping</Link>
      </div>
    </div>
  );
};

export default OrderSuccess;

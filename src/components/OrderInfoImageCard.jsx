import React from "react";
const OrderInfoImageCard=React.memo((props)=>{
    const {item}=props;
    return (
        <div className="bg-black/20 rounded-md flex  text-white/90">
            <img
              src={`${item.imageUrl}?auto=compress&cs=tinysrgb&w=500&h=500`}
              className="object-cover w-30 h-30  rounded-l-md"
            ></img>
            <div className="flex flex-col p-4">
              <p className="text-sm font-bold mb-2">{item.name}</p>
              <div className="flex gap-2 text-md">
                <p className="font-semibold">unit price :</p>
                <p>
                  ₹{item.price}
                </p>
              </div>
              <div className="flex gap-4 text-md">
                <p className="font-semibold">quantity :</p>
                <p>
                  { item.quantity}
                </p>
              </div>
            </div>
          </div>
    )
});
export default OrderInfoImageCard;
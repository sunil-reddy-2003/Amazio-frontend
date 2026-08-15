import React from "react";
const OrderInfoImageCard=React.memo((props)=>{
    const {item}=props;
    return (
        <div className="bg-black/20 rounded-md flex flex-col sm:flex-row text-white/90">
            <img
              src={`${item.imageUrl}?auto=compress&cs=tinysrgb&w=500&h=500`}
              className="object-cover w-full sm:w-24 md:w-28 lg:w-32 h-20 sm:h-24 md:h-28 lg:h-32 rounded-t-md sm:rounded-l-md sm:rounded-t-none"
            ></img>
            <div className="flex flex-col p-2 sm:p-3 md:p-4 flex-1">
              <p className="text-xs sm:text-sm md:text-base font-bold mb-1 sm:mb-2 line-clamp-2">{item.name}</p>
              <div className="flex flex-col gap-1 sm:gap-2 text-xs sm:text-sm md:text-base">
                <div className="flex gap-2 justify-between sm:justify-start">
                  <p className="font-semibold">Unit price:</p>
                  <p>₹{item.price}</p>
                </div>
                <div className="flex gap-2 justify-between sm:justify-start">
                  <p className="font-semibold">Qty:</p>
                  <p>{item.quantity}</p>
                </div>
              </div>
            </div>
          </div>
    )
});
export default OrderInfoImageCard;
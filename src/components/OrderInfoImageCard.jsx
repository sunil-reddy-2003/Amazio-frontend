const OrderInfoImageCard=(props)=>{
    const {item}=props;
    return (
        <div className="bg-black/30 rounded-md flex  text-white/90">
            <img
              src={item.imageUrl}
              className="object-cover w-30 h-30  rounded-l-md"
            ></img>
            <div className="flex flex-col p-4">
              <p className="text-sm font-bold mb-2">{item.name}</p>
              <div className="flex justify-between text-xs">
                <p className="font-semibold">unit price :</p>
                <p>
                  ₹{item.price}
                </p>
              </div>
              <div className="flex justify-between text-xs">
                <p className="font-semibold">quantity :</p>
                <p>
                  { item.quantity}
                </p>
              </div>
            </div>
          </div>
    )
}
export default OrderInfoImageCard;
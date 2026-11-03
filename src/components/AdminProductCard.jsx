import React from "react";
import { useNavigate } from "react-router-dom";
const AdminProductCard = React.memo((props) => {
    const { product , onDelete} = props;
    const navigate =useNavigate();

    return (
        <div className="flex min-w-0 flex-col items-start justify-center rounded-lg bg-white/10 p-3 text-black sm:p-4">
            <div className="flex w-full min-w-0 items-center gap-3 p-1 sm:gap-4 sm:p-2">
                <img
                    src={`${product.imageUrl}?auto=compress&cs=tinysrgb&w=700&h=700`}
                    loading="lazy"
                    alt={product.name}
                    className="h-24 w-24 shrink-0 rounded-xl border-2 border-black object-cover sm:h-32 sm:w-32 lg:h-40 lg:w-40"
                />
                <div className="my-2 flex min-w-0 flex-1 flex-col">
                    <div className="flex flex-col gap-1 p-2 sm:p-4">
                        <div className="break-all text-sm font-bold sm:text-base">Id: {product.id}</div>
                        <div className="text-base font-bold sm:text-lg">₹{product.price}</div>
                    </div>
                    <div className="flex flex-col gap-2 sm:gap-1">
                        <button 
                            className="rounded-full border px-3 py-1 text-center text-sm font-bold transition hover:bg-green-500 sm:mx-2 sm:mb-1 sm:text-base"
                            onClick={()=>{
                                navigate(`/updateproduct/${product.id}`);
                            }}
                            >Update</button>
                        <button 
                            className="rounded-full border px-3 py-1 text-center text-sm font-bold transition hover:bg-red-400 sm:mx-2 sm:mb-1 sm:text-base"
                            onClick={()=>{
                                onDelete(product.id);
                            }}
                        >Delete</button>
                    </div>
                </div>
            </div>
            <div className="flex w-full min-w-0 items-start justify-between p-2">
                <div className="flex min-w-0 flex-col">
                    <div className="break-words text-base font-bold sm:text-lg">{product.name}</div>
                    <p className="break-words text-sm">{product.description}</p>
                </div>


            </div>
        </div>
    );
})

export default AdminProductCard;

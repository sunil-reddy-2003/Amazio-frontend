import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
const AdminProductCard = React.memo((props) => {
    const { product , onDelete} = props;
    const navigate =useNavigate();

    return (
        <div className="flex flex-col justify-center items-start bg-white/10 text-black p-2 rounded-lg ">
            <div className="flex items-center justify-around w-full  p-2 ">
                <img
                    src={`${product.imageUrl}?auto=compress&cs=tinysrgb&w=700&h=700`}
                    loading="lazy"
                    alt={product.name}
                    className="w-40 h-40 object-cover border-2 border-black rounded-xl "
                />
                <div className="flex flex-col w-[50%] m-2 ">
                    <div className="flex flex-col  p-4">
                        <div className="text-lg font-bold">Id : {product.id}</div>
                        <div className="text-lg font-bold">₹{product.price}</div>
                    </div>
                    <div className="flex flex-col">
                        <button 
                            className="text-md text-center  font-bold border rounded-full mx-2 mb-2 hover:bg-green-500"
                            onClick={()=>{
                                navigate(`/updateproduct/${product.id}`);
                            }}
                            >Update</button>
                        <button 
                            className="text-md text-center font-bold border rounded-full mx-2 mb-2 hover:bg-red-400"
                            onClick={()=>{
                                onDelete(product.id);
                            }}
                        >Delete</button>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between w-full  p-2">
                <div className="flex flex-col">
                    <div className="text-lg font-bold">{product.name}</div>
                    <p className="text-sm ">{product.description}</p>
                </div>


            </div>
        </div>
    );
})

export default AdminProductCard;

import { useState } from "react"
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const AddProduct = () => {

    const { isAdmin } = useAuth();
    const navigate = useNavigate();

    const [productDetails, setProductDetails] = useState({
        name: "",
        imageUrl: "",
        price: "",
        description: "",
        category: ""
    });


    const saveProduct = async () => {
        try {
            const postProduct = await api({
                method: "post",
                url: `${import.meta.env.VITE_PRODUCT_BASE_URL}/api/v1/admin/products/`,
                data: productDetails,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            alert(`product saved successfully`);
            setProductDetails({
                name: "",
                imageUrl: "",
                price: "",
                description: "",
                category: ""
            });
            console.log("saved product : ", postProduct);
        } catch (error) {
            console.error("error occurred while saving product: ", error);
        }
    }

    const inputCss = "peer p-4  border-2 rounded-2xl w-full text-xl font-bold focus:outline-3"
    const labelCSS = "absolute top-6 left-8 duration-200 font-extralight peer-focus:-translate-y-4 peer-focus:text-sm peer-focus:text-white peer-focus:tracking-widest peer-not-placeholder-shown:-translate-y-4 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-white peer-not-placeholder-shown:tracking-widest peer-placeholder-shown:text-xl peer-placeholder-shown:text-black"


    return (
        <div className="flex items-center justify-center min-h-screen bg-linear-to-r from-gray-800  to-gray-400">
            <div className=" w-[30%] rounded-md">
                <h1 className="mx-8 p-4 border-2 rounded-md text-center tracking-widest font-bold text-2xl bg-gray-900 text-white">Add Product</h1>
                <form
                    className="flex flex-col mx-2 p-2"
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (isAdmin) {
                            saveProduct();
                        } else {
                            navigate("/adminlogin");
                        }
                    }}
                >
                    <div className="relative px-4 py-2 ">
                        <input
                            id="name"
                            placeholder=" "
                            type="text"
                            value={productDetails.name}
                            className={inputCss}
                            onChange={(e) => setProductDetails({ ...productDetails, name: e.target.value })}
                            required
                        ></input>
                        <label
                            htmlFor="name"
                            className={labelCSS}
                        >enter product name</label>

                    </div>
                    <div className="relative px-4 py-2">
                        <input
                            id="url"
                            placeholder=" "
                            type="text"
                            value={productDetails.imageUrl}
                            className={inputCss}
                            onChange={(e) => setProductDetails({ ...productDetails, imageUrl: e.target.value })}
                            required
                        ></input>
                        <label
                            htmlFor="url"
                            className={labelCSS}
                        >enter product URL</label>

                    </div>
                    <div className="relative px-4 py-2">
                        <input
                            id="price"
                            placeholder=" "
                            type="number"
                            value={productDetails.price}
                            className={inputCss}
                            onChange={(e) => setProductDetails({ ...productDetails, price: e.target.value })}
                            required
                        ></input>
                        <label
                            htmlFor="price"
                            className={labelCSS}
                        >enter product price</label>

                    </div>
                    <div className="relative px-4 py-2">
                        <input
                            id="description"
                            placeholder=" "
                            type="text"
                            value={productDetails.description}
                            className={inputCss}
                            onChange={(e) => setProductDetails({ ...productDetails, description: e.target.value })}
                            required
                        ></input>
                        <label
                            htmlFor="description"
                            className={labelCSS}
                        >enter product description</label>

                    </div>
                    <div className="relative px-4 py-2">
                        <input
                            id="category"
                            placeholder=" "
                            type="text"
                            value={productDetails.category}
                            className={inputCss}
                            onChange={(e) => setProductDetails({ ...productDetails, category: e.target.value })}
                            required
                        ></input>
                        <label
                            htmlFor="category"
                            className={labelCSS}
                        >enter product category</label>

                    </div>
                    <button
                        className="mx-4 p-4 border-2 rounded-full text-center hover:tracking-widest font-bold text-xl hover:bg-white hover:text-black hover:scale-98 duration-300"
                        type="submit"
                    >
                        SAVE PRODUCT
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddProduct;
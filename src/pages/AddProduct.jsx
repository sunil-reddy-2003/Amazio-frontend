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

    const inputCss = "peer w-full rounded-2xl border-2 p-3 text-base font-bold focus:outline-3 sm:p-4 sm:text-xl"
    const labelCSS = "absolute top-6 left-8 duration-200 font-extralight peer-focus:-translate-y-4 peer-focus:text-sm peer-focus:text-gray-700 peer-focus:tracking-widest peer-not-placeholder-shown:-translate-y-4 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-white peer-not-placeholder-shown:tracking-widest peer-placeholder-shown:text-xl peer-placeholder-shown:text-white"


    return (
        <div className="flex min-h-screen items-center justify-center bg-linear-to-r from-gray-800 to-gray-400 px-4 py-8 sm:px-6">
            <div className="w-full max-w-2xl rounded-md">
                <h1 className="mx-2 rounded-md border-2 bg-gray-900 p-4 text-center text-xl font-bold tracking-widest text-white sm:mx-8 sm:text-2xl">Add Product</h1>
                <form
                    className="mx-auto flex w-full flex-col p-2 sm:p-4"
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
                        className="mx-4 rounded-full border-2 p-3 text-center text-base font-bold duration-300 hover:scale-98 hover:bg-white hover:text-black hover:tracking-widest sm:p-4 sm:text-xl"
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
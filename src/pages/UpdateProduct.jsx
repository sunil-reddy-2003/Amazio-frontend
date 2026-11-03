import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext";
import { useNavigate,useParams } from "react-router-dom";
import api from "../api/api";


const UpdateProduct = () => {

    const { isAdmin } = useAuth();
    const navigate = useNavigate();

    const [productInfo, setProductInfo] = useState({
        name: "",
        imageUrl: "",
        price: "",
        description: "",
        category: ""
    });


    // const prodId = window.location.pathname.slice(15,);
    const { id } = useParams();
    useEffect(() => {
        const getProduct = async () => {
            try {
                const responce = await api({
                    method: "get",
                    url: `${import.meta.env.VITE_PRODUCT_BASE_URL}/api/v1/products/${id}`,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setProductInfo({
                    name: responce.data.name,
                    imageUrl: responce.data.imageUrl,
                    price: responce.data.price,
                    description: responce.data.description,
                    category: responce.data.category
                })
                console.log("product fetched successfully: ", responce.data);
            } catch (error) {
                console.error("error occurred while fetching product: ", error);
            }
        }
        getProduct();
    }, [])



    const updateProduct = async () => {
        try {
            const prodResp = await api({
                method: "put",
                url: `${import.meta.env.VITE_PRODUCT_BASE_URL}/api/v1/admin/products/${id}`,
                data: productInfo,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            alert("product updated successfully!!");
            navigate("/viewallproducts")
            console.log("updated product successfully ", prodResp.data);
        } catch (error) {
            alert("error occurred while updating the product !!");

            console.error("error occurred while updating the product", error);
        } finally {
            setProductInfo({
                name: "",
                imageUrl: "",
                price: "",
                description: "",
                category: ""
            })
        }
    }


    const inputCss = "peer p-4  border-2 rounded-2xl w-full text-xl font-bold focus:outline-3"
    const labelCSS = "absolute top-6 left-8 duration-200 font-extralight peer-focus:-translate-y-4 peer-focus:text-sm peer-focus:text-white peer-focus:tracking-widest peer-not-placeholder-shown:-translate-y-4 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-white peer-not-placeholder-shown:tracking-widest peer-placeholder-shown:text-xl peer-placeholder-shown:text-black"
    return (
        <div className="flex items-center justify-center min-h-screen bg-linear-to-r from-gray-800  to-gray-400">
            {!isAdmin && (<div className="border p-10 rounded-full hover:scale-90 hover:bg-gray-800 duration-1000 transition-all">
                <h1 className="text-3xl font-bold mb-4">Hello User!!</h1>
                <p className="text-white text-sm tracking-widest w-200">
                    This area is restricted to authorized administrators.
                    Please log in to access the dashboard and manage the platform.
                </p>
            </div>)}
            
            {isAdmin && (<div className=" w-[30%] rounded-md">
                <h1 className="mx-8 p-4 border-2 rounded-md text-center tracking-widest font-bold text-2xl bg-gray-900 text-white">Update Product  : {id} </h1>
                <form
                    className="flex flex-col mx-2 p-2"
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (isAdmin) {
                            updateProduct();
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
                            value={productInfo.name}
                            className={inputCss}
                            onChange={(e) => setProductInfo({ ...productInfo, name: e.target.value })}
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
                            value={productInfo.imageUrl}
                            className={inputCss}
                            onChange={(e) => setProductInfo({ ...productInfo, imageUrl: e.target.value })}
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
                            value={productInfo.price}
                            className={inputCss}
                            onChange={(e) => setProductInfo({ ...productInfo, price: e.target.value })}
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
                            value={productInfo.description}
                            className={inputCss}
                            onChange={(e) => setProductInfo({ ...productInfo, description: e.target.value })}
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
                            value={productInfo.category}
                            className={inputCss}
                            onChange={(e) => setProductInfo({ ...productInfo, category: e.target.value })}
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
            </div>)}
        </div>
    )
}

export default UpdateProduct;
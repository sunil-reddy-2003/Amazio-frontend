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
                    url: `${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/products/${id}`,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setProductInfo({
                    name: responce.data.data.name,
                    imageUrl: responce.data.data.imageUrl,
                    price: responce.data.data.price,
                    description: responce.data.data.description,
                    category: responce.data.data.category
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
                url: `${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/products/${id}`,
                data: productInfo,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            navigate("/viewallproducts")
            console.log("updated product successfully ", prodResp.data);
        } catch (error) {

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


    const inputCss = "peer w-full rounded-2xl border-2 p-3 text-base font-bold focus:outline-3 sm:p-4 sm:text-xl"
    const labelCSS = "absolute top-6 left-8 duration-200 font-extralight peer-focus:-translate-y-4 peer-focus:text-sm peer-focus:text-gray-700 peer-focus:tracking-widest peer-not-placeholder-shown:-translate-y-4 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-white peer-not-placeholder-shown:tracking-widest peer-placeholder-shown:text-xl peer-placeholder-shown:text-white"
    return (
        <div className="flex min-h-screen items-center justify-center bg-linear-to-r from-gray-800 to-gray-400 px-4 py-8 sm:px-6">
            {!isAdmin && (<div className="w-full max-w-3xl rounded-2xl border p-6 text-white transition-all duration-1000 hover:scale-95 hover:bg-gray-800 sm:p-10 sm:rounded-full">
                <h1 className="text-3xl font-bold mb-4">Hello User!!</h1>
                <p className="w-full text-sm tracking-widest text-white">
                    This area is restricted to authorized administrators.
                    Please log in to access the dashboard and manage the platform.
                </p>
            </div>)}
            
            {isAdmin && (<div className="w-full max-w-2xl rounded-md">
                <h1 className="mx-2 rounded-md border-2 bg-gray-900 p-4 text-center text-xl font-bold tracking-widest text-white sm:mx-8 sm:text-2xl">Update Product : {id}</h1>
                <form
                    className="mx-auto flex w-full flex-col p-2 sm:p-4"
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
                        className="mx-4 rounded-full border-2 p-3 text-center text-base font-bold duration-300 hover:tracking-widest hover:bg-white hover:text-black hover:scale-98 sm:p-4 sm:text-xl"
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
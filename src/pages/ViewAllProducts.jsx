import api from "../api/api";
import { useState, useEffect, useCallback } from "react";
import Pagination from "../components/Pagination";
import CategoryBar from "../components/CategoryBar";
import { useOutletContext } from "react-router-dom";
import qs from "qs";
import AdminProductCard from "../components/AdminProductCard";
import { useAuth } from "../context/AuthContext";

const ViewAllProducts = () => {

    const { searchText } = useOutletContext();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(16);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState([]);
    const [adminCat, setAdminCat] = useState(true);
    const { isAdmin } = useAuth();

    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const response = await api({
                    method: "get",
                    url: `${import.meta.env.VITE_PRODUCT_BASE_URL}/api/v1/products/`,
                    params: {
                        page: currentPage,
                        size: pageSize,
                        search: searchText.trim() || undefined,
                        category: category.length ? category : undefined,
                    },
                    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
                });

                setProducts(response.data.content);
                setTotalPages(response.data.totalPages);

                console.log("inside getData: ", response.data);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };
        getAllProducts();
    }, [currentPage, pageSize, category, searchText]);

    useEffect(() => {
        setCurrentPage(0);
    }, [category]);

    const deleteProduct = useCallback(async (prodId) => {
        const oldProducts = [...products];
        const newProducts = products.filter(prod => prod.id !== prodId);
        setProducts(newProducts);
        try {
            const responce = await api({
                method: "delete",
                url: `${import.meta.env.VITE_PRODUCT_BASE_URL}/api/v1/admin/products/${prodId}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log("product deleted successfully", responce.data);
            if (newProducts.length === 0 && currentPage > 0) {
                setCurrentPage(prevPage => prevPage - 1);
            }
        } catch (error) {
            setProducts(oldProducts);
            console.error("error occurred while deleting the product", error);
        }
    }, [products, currentPage]
    )
    return (

        <div className="relative min-h-screen bg-gradient-to-r from-gray-800 to-gray-400 flex flex-col">

            {!isAdmin && (
                <div className="flex flex-col items-center justify-center p-20 m-20">
                    <div className="border p-10 rounded-full hover:scale-90 hover:bg-gray-800 duration-1000 transition-all">
                        <h1 className="text-3xl font-bold mb-4">Hello User!!</h1>
                        <p className="text-white text-sm tracking-widest w-200">
                            This area is restricted to authorized administrators.
                            Please log in to access the dashboard and manage the platform.
                        </p>
                    </div>
                </div>
            )}

            {isAdmin && (
                <>
                    <CategoryBar category={category} setCategory={setCategory} adminCat={adminCat} />

                    <div className="flex-1">
                        <div
                            className={
                                loading
                                    ? "flex items-center justify-center h-screen  "
                                    : `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full px-8 py-4`
                            }
                        >
                            {loading ? (
                                <div className="text-5xl font-bold text-white">
                                    Loading products...
                                </div>
                            ) : products.length ? (
                                products.map((product) => (
                                    <AdminProductCard product={product} key={product.id} onDelete={() => deleteProduct(product.id)} />
                                ))
                            ) : (
                                <div className="col-span-full flex items-center justify-center h-screen text-gray-300 text-3xl">
                                    {`No products found for ${searchText}`}
                                </div>
                            )}
                        </div>
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages}
                    />
                </>
            )}

        </div>
    )
}

export default ViewAllProducts;
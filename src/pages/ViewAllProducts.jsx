import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import Pagination from "../components/Pagination";
import CategoryBar from "../components/CategoryBar";
import { useOutletContext } from "react-router-dom";
import qs from "qs";
import AdminProductCard from "../components/AdminProductCard";

const ViewAllProducts = () => {

    const { searchText } = useOutletContext();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(16);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState([]);
    const [adminCat, setAdminCat] = useState(true);

    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const response = await axios({
                    method: "get",
                    url: "http://localhost:9090/api/admin/viewallproducts",
                    params: {
                        page: currentPage,
                        size: pageSize,
                        search: searchText.trim() || undefined,
                        category: category.length ? category : undefined,
                    },
                    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
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
            const responce = await axios({
                method: "delete",
                url: `http://localhost:9090/api/admin/deleteProduct/${prodId}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            alert("product deleted successfully");
            console.log("product deleted successfully", responce.data);
            if (newProducts.length === 0 && currentPage > 0) {
                setCurrentPage(prevPage => prevPage - 1);
            }
        } catch (error) {
            setProducts(oldProducts);
            alert("Failed to delete product!");
            console.error("error occurred while deleting the product", error);
        }
    },[products,currentPage]
)
    return (

        <div className="relative min-h-screen bg-gradient-to-r from-gray-800 to-gray-400 flex flex-col">
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

        </div>
    )
}

export default ViewAllProducts;
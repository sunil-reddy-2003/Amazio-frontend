import ProductCard from "./ProductCard";
import CategoryBar from "./CategoryBar";
import Pagination from "./Pagination";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import React, { useMemo, useState, useEffect, useCallback } from "react";

const MainContent = () => {
  const { searchText } = useOutletContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);

  const [currentPage,setCurrentPage]=useState(0);
  const [pageSize,setPageSize]=useState(16);
  const [totalPages,setTotalPages]=useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`http://localhost:9090/api/admin/getAllProducts?page=${currentPage}&size=${pageSize}${category.length>0 ? `&category=${category.join(",")}`:""}`);
        setProducts(response.data.content);
        setTotalPages(response.data.totalPages);

        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [currentPage,pageSize,category]);


  useEffect(()=>{
    setCurrentPage(0);
  },[category])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        searchText.trim() === "" ||
        product.name.toLowerCase().includes(searchText.trim().toLowerCase());
      const matchesCategory =
        category.length === 0 ||
        category.some((cat) => cat === product.category);
      return matchesSearch && matchesCategory;
    });
  }, [products, searchText, category]);

  return (
    <>
      <CategoryBar category={category} setCategory={setCategory} />
      <div
        className={
          loading
            ? "flex items-center justify-center h-90  "
            : `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full px-8 py-4`
        }
      >
        {loading ? (
          <div className="text-5xl font-bold text-white">
            Loading products...
          </div>
        ) : filteredProducts.length ? (
          filteredProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))
        ) : (
          <div className="col-span-full flex items-center justify-center h-full text-gray-300 text-3xl">
            {`No products found for ${searchText}`}
          </div>
        )}
      </div>
      <Pagination
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        totalPages={totalPages}
        />
    </>
  );
};

export default MainContent;

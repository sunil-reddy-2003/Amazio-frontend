import ProductCard from "./ProductCard";
import CategoryBar from "./CategoryBar";
import Pagination from "./Pagination";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import React, { useMemo, useState, useEffect, useCallback } from "react";
import qs from "qs";

const MainContent = () => {
  const { searchText } = useOutletContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(16);
  const [totalPages, setTotalPages] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        // const response = await axios.get(`http://localhost:9090/api/admin/getAllProducts?page=${currentPage}&size=${pageSize}${category.length>0 ? `&category=${category.join(",")}` : ""}`);
        const response = await axios({
          method: "get",
          url: "http://localhost:9090/api/admin/getAllProducts",
          params: {
            page: currentPage,
            size: pageSize,
            search: searchText.trim() || undefined,
            category: category.length ? category : undefined,
          },
          paramsSerializer: (params) => qs.stringify(params, {arrayFormat: "repeat"})});

        setProducts(response.data.content);
        setTotalPages(response.data.totalPages);

        console.log("inside getData: ", response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [currentPage, pageSize, category, searchText]);

  useEffect(() => {
    setCurrentPage(0);
  }, [category]);

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
        ) : products.length ? (
          products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))
        ) : (
          <div className="col-span-full flex items-center justify-center h-100 text-gray-300 text-3xl">
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

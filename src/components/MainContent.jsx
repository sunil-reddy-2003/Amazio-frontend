import ProductCard from "./ProductCard";
import CategoryBar from "./CategoryBar";
import Pagination from "./Pagination";
import { useOutletContext } from "react-router-dom";
import api from "../api/api";
import React, { useMemo, useState, useEffect, useCallback } from "react";
import qs from "qs";
import { useAuth } from "../context/AuthContext";


const MainContent = () => {
  const { searchText } = useOutletContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(16);
  const [totalPages, setTotalPages] = useState(1);






  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api({
          method: "get",
          url: `${import.meta.env.VITE_API_BASE_URL}/api/v1/products/`,
          params: {
            page: currentPage,
            size: pageSize,
            search: searchText.trim() || undefined,
            category: category.length ? category : undefined,
          },
          paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" })
        });

        const content = response.data.content;
        const reportedPages = Number(response.data.page.totalPages);
        const totalElements = Number(response.data.page.totalElements);
        const inferredPages = Number.isFinite(totalElements) && totalElements > 0
          ? Math.ceil(totalElements / pageSize)
          : content.length >= pageSize
            ? currentPage + 2
            : currentPage + 1;
        const validReportedPages = Number.isFinite(reportedPages) && reportedPages > 0
          ? reportedPages
          : 1;

        setProducts(content);
        setTotalPages(Math.max(validReportedPages, inferredPages, 1));

        // console.log("inside getData: ", response.data);
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
  }, [category, searchText]);

  return (
    <div className="flex flex-1 flex-col">
      <CategoryBar category={category} setCategory={setCategory} />
      <div
        className={
          loading
            ? "flex items-center justify-center h-80 sm:h-90 md:h-full"
            : `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 w-full px-2 sm:px-4 md:px-8 py-3 sm:py-4 md:py-6`
        }
      >
        {loading ? (
          <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Loading products...
          </div>
        ) : products.length ? (
          products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))
        ) : (
          <div className="col-span-full flex items-center justify-center h-80 sm:h-90 md:h-100 text-gray-300 text-lg sm:text-2xl md:text-3xl px-2 text-center">
            {`No products found for ${searchText}`}
          </div>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default MainContent;

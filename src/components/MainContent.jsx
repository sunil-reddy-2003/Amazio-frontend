import ProductCard from "./ProductCard";
import CategoryBar from "./CategoryBar";
import Pagination from "./Pagination";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
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
  const [totalPages, setTotalPages] = useState();

  const { user, justLoggedIn,setJustLoggedIn } = useAuth();
  const [show, setShow] = useState(false);

  useEffect(()=>{
    if(justLoggedIn){
      setShow(true);
      setJustLoggedIn(false);
    }
  },[justLoggedIn]);

  useEffect(() => {
    const timer = setTimeout(()=>{
      setShow(false);
    },
      1500)
    return () => clearTimeout(timer);
  }, [show]);


  useEffect(() => {
    const getData = async () => {
      try {
        // const response = await axios.get(`http://localhost:9090/api/admin/getAllProducts?page=${currentPage}&size=${pageSize}${category.length>0 ? `&category=${category.join(",")}` : ""}`);
        const response = await axios({
          method: "get",
          // url: "http://localhost:9090/api/admin/getAllProducts",
          url: `${import.meta.env.VITE_API_BASE_URL}/api/admin/getAllProducts`,
          params: {
            page: currentPage,
            size: pageSize,
            search: searchText.trim() || undefined,
            category: category.length ? category : undefined,
          },
          paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" })
        });

        setProducts(response.data.content);
        setTotalPages(response.data.totalPages);

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
  }, [category]);

  return (
    <>

      {show && (<div className=" w-full absolute top-30 z-1 flex items-center justify-center">
        <div className=" flex items-center justify-center gap-2  rounded-full bg-white px-10 py-2">
          <h3 className="text-xl font-bold text-green-500">Welcome back, {user.fname}!! </h3>
        </div>
      </div>)}



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

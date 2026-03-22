import LogIn from "./pages/LogIn";
import { Routes, Route } from "react-router-dom";
import MainContent from "./components/MainContent";
import PageNotExist from "./pages/PageNotExist";
import Layout from "./layouts/Layout";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import Shipping from "./pages/Shipping";
import ProtectedRoute from "./components/ProtectedRoute";
import Payment from "./pages/Payment";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import OrderInfo from "./components/OrderInfo";
import AddProduct from "./pages/AddProduct";
import AdminLayout from "./layouts/AdminLayout";
import AdminLogin from "./pages/AdminLogin";
import AdminContent from "./pages/AdminContent";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import ViewAllProducts from "./pages/ViewAllProducts";
import UpdateProduct from "./pages/UpdateProduct";

import { useEffect,useState } from "react";
import axios from "axios";

const App = () => {
  
  const getHealthMsg = async () => {
    try {
      const data = await axios({
        method: "get",
        url: `${import.meta.env.VITE_API_BASE_URL}/api/health`
      })
      // console.log( data.data);
    }
    catch (error) {
      console.error("error occurred while checking the health: ", error);
    }
  }

  useEffect(() => {
    let isRunning = false;
    
    const timer = setInterval(async () => {
      if (!isRunning) {
        isRunning = true;
        try {
          await getHealthMsg();
        } finally {
          isRunning = false;
        }
      }
    }, 300000);

    getHealthMsg();

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainContent />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/log-in" element={<LogIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route
            path="/shipping"
            element={
              <ProtectedRoute>
                <Shipping />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/order-success"
            element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/orders/:orderId"
            element={
              <ProtectedRoute>
                <OrderInfo />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          ></Route>
        </Route>


        <Route element={<AdminLayout />}>
          <Route path="/admin" element={
            <AdminProtectedRoute>
              <AdminContent />
            </AdminProtectedRoute>
          }></Route>
          <Route path="/adminlogin" element={<AdminLogin />}></Route>
          <Route path="/add-product" element={
            <AdminProtectedRoute>
              <AddProduct />
            </AdminProtectedRoute>
          }>
          </Route>
          <Route path="/viewallproducts" element={
            <AdminProtectedRoute>
              <ViewAllProducts />
            </AdminProtectedRoute>
          }>
          </Route>
          <Route path="/updateproduct/:id" element={
            <AdminProtectedRoute>
              <UpdateProduct />
            </AdminProtectedRoute>
          }>
          </Route>
        </Route>

        <Route path="*" element={<PageNotExist />} />
      </Routes>
    </>
  );
};

export default App;

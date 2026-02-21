import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";
import { useState, useMemo, useCallback } from "react";

import axios from "axios";

const Layout = () => {
  const [searchText, setSearchText] = useState("");


  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState({});

  const addToCart = useCallback((product) => {
    setCartItems((prevCart) => {
      const existingProduct = prevCart.find((p) => p.id === product.id);

      if (existingProduct) {
        return prevCart.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p,
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  }, []);

  const increaseQty = useCallback((id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }, []);

  const decreaseQty = useCallback((id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  }, []);

  const deleteItem = useCallback((id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

    

  const createOrder = useCallback(
    async (selectedPaymentMethod) => {
    const products = cartItems.map((prod) => {
      return { productId: prod.id, quantity: prod.quantity };
    });
    const newOrder = {
      orderItem: products,
      address: address,
      paymentMethod: selectedPaymentMethod,
    };

    try {
      const response = await axios.post(
        "http://localhost:9090/api/order/createOrder",
        newOrder,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      console.log("inside newOrder: ",response);
      setCartItems([]);
      return true;
    } catch (error) {
      console.error("Error creating order:", error);
      return false;
    }
  },[cartItems, address,paymentLabels]);

  const cartTotals = useMemo(() => {
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const fees = 0; // 5% fee example
    return { totalItems, totalPrice, fees };
  }, [cartItems]);

  const { totalItems, totalPrice, fees } = cartTotals;

  const outletContext = useMemo(
    () => ({
      searchText,
      addToCart,
      cartItems,
      increaseQty,
      decreaseQty,
      deleteItem,
      address,
      setAddress,
      createOrder,
      totalItems,
      totalPrice,
      fees,
    }),
    [searchText, cartItems, address, totalItems, totalPrice, fees,createOrder],
  );



  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-black/20 via-black/50 to-black/20">
      <NavBar onSearch={setSearchText} cartTotal={totalItems} />
      <main className="flex-1 ">
        <Outlet context={outletContext} />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Layout;

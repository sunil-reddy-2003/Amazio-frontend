import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";
import { useState, useMemo, useCallback, useEffect } from "react";

import axios from "axios";

const getProductId = (product) => product?.id ?? product?._id ?? product?.productId;

const Layout = () => {
  const [searchText, setSearchText] = useState("");
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem("cartItems");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch {
      return [];
    }
  });
  const [address, setAddress] = useState({});
  const [addressList, setAddressList] = useState([]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((product) => {
    const productId = getProductId(product);
    if (!productId) return;

    setCartItems((prevCart) => {
      const existingProduct = prevCart.find((p) => getProductId(p) === productId);

      if (existingProduct) {
        return prevCart.map((p) =>
          getProductId(p) === productId ? { ...p, quantity: (p.quantity || 0) + 1 } : p,
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  }, []);

  const increaseQty = useCallback((id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        getProductId(item) === id ? { ...item, quantity: (item.quantity || 0) + 1 } : item,
      ),
    );
  }, []);

  const decreaseQty = useCallback((id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        getProductId(item) === id && (item.quantity || 1) > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  }, []);

  const deleteItem = useCallback((id) => {
    setCartItems((prev) => prev.filter((item) => getProductId(item) !== id));
  }, []);

    

  const createOrder = useCallback(
    async (selectedPaymentMethod) => {
      const products = cartItems.map((prod) => {
        return { productId: getProductId(prod), quantity: prod.quantity };
      });
      const newOrder = {
        orderItem: products,
        address: address,
        paymentMethod: selectedPaymentMethod,
      };

      try {
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/order/createOrder`,
          newOrder,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        setCartItems([]);
        return true;
      } catch (error) {
        console.error("Error creating order:", error);
        return false;
      }
    },
    [cartItems, address],
  );

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
      addressList,
      setAddressList
    }),
    [searchText, cartItems, address, totalItems, totalPrice, fees,createOrder,addressList],
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

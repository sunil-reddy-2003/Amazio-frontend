import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import BackToTop from "../components/BackToTop";
import axios from "axios";

const Layout = () => {
  const [searchText, setSearchText] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState({});


  const addToCart = (product) => {
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
  };

  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const deleteItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce((sum, item) => {
    return (sum += item.price * item.quantity);
  }, 0);

  const totalItems = cartItems.reduce((sum, item) => {
    return (sum += item.quantity);
  }, 0);

  const paymentLabels = {
    cod: "Cash on Delivery",
    creditCard: "Credit/Debit Card",
    upi: "UPI",
    netBanking: "Net Banking",
    wallet: "Wallet",
    emi: "EMI",
  };


  const createOrder = async (selectedPaymentMethod) => {
    const products = cartItems.map((prod) => {
      return { productId: prod.id, quantity: prod.quantity };
    });
    const newOrder = {
      orderItem: products,
      address: address,
      paymentMethod:paymentLabels[selectedPaymentMethod]
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
      setCartItems([]);
      console.log("Order created with id:", response.data);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-black/20 via-black/50 to-black/20">
      <NavBar onSearch={setSearchText} cartTotal={totalItems} />
      <main className="flex-1 ">
        <Outlet
          context={{
            searchText,
            addToCart,
            cartItems,
            increaseQty,
            decreaseQty,
            deleteItem,
            address,
            setAddress,
            createOrder
          }}
        />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Layout;

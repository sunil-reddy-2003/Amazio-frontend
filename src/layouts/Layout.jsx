import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import BackToTop from "../components/BackToTop";

const Layout = () => {
  const [searchText, setSearchText] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

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
  const orderComplete = () => {
    setOrders((prevOrders) => {
      const uniqueId = "SUPE" + Math.floor(Math.random() * 100000);

      const newOrder = {
        orderId: uniqueId,
        items: cartItems,
        quantity: totalItems,
        price: totalPrice,
      };
      const updatedOrders = [...prevOrders, newOrder];

      localStorage.setItem("orders", JSON.stringify(updatedOrders));
      return updatedOrders;
    });
    setCartItems([]);
  };
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-black/10 via-black/60 to-black/10">
      <NavBar 
        onSearch={setSearchText}
        cartTotal={totalItems}/>
      <main className="flex-1 ">
        <Outlet
          context={{
            searchText,
            addToCart,
            cartItems,
            increaseQty,
            decreaseQty,
            deleteItem,
            orderComplete,
            orders,
          }}
        />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Layout;

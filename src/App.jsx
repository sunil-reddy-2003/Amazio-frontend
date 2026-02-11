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
import Profile  from "./pages/Profile";

const App = () => {
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
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          ></Route>
        </Route>

        <Route path="*" element={<PageNotExist />} />
      </Routes>
    </>
  );
};

export default App;

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  AccountActivationPage,
  CartPage,
  HomePage,
  LoginPage,
  ProductDetailsPage,
  ProductPage,
  ProfilePage,
  SignupPage,
} from "./pages";

import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import "react-toastify/dist/ReactToastify.css";
import { ProtectedRoute } from "./components";
import { useEffect } from "react";
import { fetchAllProduct, fetchCategories } from "./redux/actions";
import { fetchCartItems } from "./redux/actions";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {

    dispatch(fetchAllProduct());
    dispatch(fetchCategories());
    dispatch(fetchCartItems());
    
  }, []);

  return (
    <BrowserRouter>
      <ToastContainer draggable pauseOnHover />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route
          path="/activation/:activation_token"
          element={<AccountActivationPage />}
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route path="/products" element={<ProductPage />} />
        <Route path="/product/:name" element={<ProductDetailsPage />} />

        <Route path="/my-cart" element={<CartPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

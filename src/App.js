import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import LandingPage from "./Pages/LandingPage";
import Register from "./Pages/Register";
import { Routes, Route } from "react-router-dom"; // untuk management routing page
// CSS
import "./Supports/Stylesheets/Utils.css";
import ProductsPage from "./Pages/Products";
import DetailProduct from "./Pages/Detail";
import ManageProducts from "./Pages/ManageProduct";
import PageNotFound from "./Pages/404";
import React from "react";
import axios from "axios";
import { API_URL } from "./Supports/helper";
import { useDispatch, useSelector } from "react-redux";
import { keepLoginAction } from "./Redux/Actions/UserAction";

function App() {
  const dispatch = useDispatch();

  const { role } = useSelector(({ userReducer }) => {
    return {
      role: userReducer.role,
    };
  });

  const keepLogin = () => {
    dispatch(keepLoginAction());
  };

  React.useEffect(() => {
    keepLogin();
  }, []);

  return (
    <div className="container-fluid">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/detail" element={<DetailProduct />} />
        <Route path="*" element={<PageNotFound />} />
        {role == "Admin" ? (
          <Route path="/manage-product" element={<ManageProducts />} />
        ) : (
          ""
        )}
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;

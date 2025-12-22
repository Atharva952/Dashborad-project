import SignUp from "./components/SignUp";
import SideBar from "./components/SideBar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Category from "./components/Category";
import Product from "./components/Product";
import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import Categorylist from "./components/Categorylist";
import { AddCategory } from "./components/AddCategory";
import { useState, useEffect } from "react";
import { PrivateRoutes } from "./components/PrivateRoutes";
import { Outlet } from "react-router-dom";
import { AddProduct } from "./components/AddProduct";
import { ProductLsit } from "./components/ProductList";
import { Counter } from "./components/Counter";
import { CounterContext } from "./components/Context/CounterContext";

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [newData, setNewData] = useState([]);
  const token = sessionStorage.getItem("token");

  return (
    <>
      <Routes>
        <Route path="/signUp" element={<SignUp />} />

        <Route element={<PrivateRoutes />}>
          <Route
            element={
              <Layout collapsed={collapsed} setCollapsed={setCollapsed} />
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/product" element={<Product />} />
            <Route path="/category" element={<Category />} />
            <Route path="/category-list" element={<Categorylist />} />
            <Route path="/counter" element={<Counter/>} />
            <Route path="/counter-counter" element={<CounterContext/>} />
            <Route
              path="/category-add"
              element={
                <AddCategory newData={newData} setNewData={setNewData} />
              }
            />
            <Route path="/product-list" element={<ProductLsit />} />
            <Route path="/product-add" element={<AddProduct />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/signUp" />} />
      </Routes>
    </>
  );
}

export default App;

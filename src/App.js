import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ProtectedRoute from "./Auth/ProtectedRoute";
import Login from "./Components/Public/Login";
import PageNotFound from "./Components/Public/PageNotFount";
import ProductForm from "./Components/Private/ProductForm";
import ProductGrid from "./Components/Private/ProductGrid";
import NavbarCommon from "./Components/Private/Navbar";
import UserList from "./Components/Private/UserList";
import UserForm from "./Components/Private/UserForm";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/create-product"
            element={
              <ProtectedRoute>
                <NavbarCommon />
                <ProductForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-product"
            element={
              <ProtectedRoute>
                <NavbarCommon />
                <ProductForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <NavbarCommon />
                <ProductGrid />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <NavbarCommon />
                <UserList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-user"
            element={
              <ProtectedRoute>
                <NavbarCommon />
                <UserForm />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

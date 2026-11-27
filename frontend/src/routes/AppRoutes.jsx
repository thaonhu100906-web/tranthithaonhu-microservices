import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ClientLayout from "../layouts/ClientLayout";
import AdminLayout from "../layouts/AdminLayout";
import HomePage from "../pages/client/HomePage";
import ProductListPage from "../pages/client/ProductListPage";
import OrderSuccessPage from "../pages/client/OrderSuccessPage";
import DashboardPage from "../pages/admin/DashboardPage";

export default function AppRoutes() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <Routes>
      {/* Client Routes */}
      <Route path="/" element={<ClientLayout cartCount={cartCount} />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductListPage onCartChange={setCartCount} />} />
        <Route path="order-success" element={<OrderSuccessPage />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
      </Route>
    </Routes>
  );
}

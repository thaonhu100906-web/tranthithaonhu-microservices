import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { productService } from "../../services/productService";
import { orderService } from "../../services/orderService";
import ProductCard from "../../components/ProductCard";
import Cart from "../../components/Cart";

export default function ProductListPage({ onCartChange }) {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setFetching(true);
      const data = await productService.getAll();
      setProducts(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Không thể tải danh sách sản phẩm từ Product Service (Port 8081). Hãy đảm bảo Backend đang chạy!");
    } finally {
      setFetching(false);
    }
  };

  const handleAddToCart = (product, quantity) => {
    setSelectedProducts((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      let updated;
      if (existing) {
        updated = prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updated = [...prev, { ...product, quantity }];
      }
      if (onCartChange) onCartChange(updated.length);
      return updated;
    });
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    setSelectedProducts((prev) => {
      const updated = prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
      return updated;
    });
  };

  const handleRemove = (productId) => {
    setSelectedProducts((prev) => {
      const updated = prev.filter((item) => item.id !== productId);
      if (onCartChange) onCartChange(updated.length);
      return updated;
    });
  };

  const handleCreateOrder = async () => {
    if (selectedProducts.length === 0) {
      alert("Vui lòng chọn sản phẩm!");
      return;
    }

    const orderData = {
      items: selectedProducts.map((p) => ({
        productId: p.id,
        quantity: Number(p.quantity)
      }))
    };

    try {
      setLoading(true);
      const result = await orderService.create(orderData);
      console.log("Order created:", result);
      setSelectedProducts([]);
      if (onCartChange) onCartChange(0);
      navigate("/order-success", { state: { order: result } });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Không thể đặt hàng!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 style={{ color: "#3e2723", marginBottom: "20px" }}>
        📋 Menu Quán & Đặt món trực tuyến
      </h2>

      {error && (
        <div style={{ background: "#ffebee", color: "#c62828", padding: "12px 16px", borderRadius: "8px", marginBottom: "20px" }}>
          ⚠️ {error}
        </div>
      )}

      {fetching ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#8d6e63" }}>
          Đang tải danh sách đồ uống...
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "24px", alignItems: "start" }}>
          {/* Danh sach san pham */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>
            {products.map((p) => (
              <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} />
            ))}
          </div>

          {/* Gio hang */}
          <div>
            <Cart
              items={selectedProducts}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemove}
              onOrder={handleCreateOrder}
              loading={loading}
            />
          </div>
        </div>
      )}
    </div>
  );
}

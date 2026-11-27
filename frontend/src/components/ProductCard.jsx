import React, { useState } from "react";

export default function ProductCard({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    if (quantity < 1) return;
    onAddToCart(product, Number(quantity));
  };

  return (
    <div style={{
      border: "1px solid #e0e0e0",
      borderRadius: "12px",
      padding: "16px",
      background: "#fff",
      boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      transition: "transform 0.2s",
      minHeight: "220px"
    }}>
      <div>
        <div style={{
          height: "100px",
          background: "#efebe9",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2.5rem",
          marginBottom: "12px"
        }}>
          ☕
        </div>
        <h4 style={{ margin: "0 0 6px", color: "#3e2723", fontSize: "1.1rem" }}>
          {product.name}
        </h4>
        <div style={{ color: "#d84315", fontWeight: "bold", fontSize: "1.1rem", marginBottom: "8px" }}>
          {Number(product.price).toLocaleString("vi-VN")} đ
        </div>
      </div>

      <div style={{ marginTop: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
          <label style={{ fontSize: "0.85rem", color: "#616161" }}>Số lượng:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            style={{
              width: "55px",
              padding: "4px 8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              textAlign: "center"
            }}
          />
        </div>
        <button
          onClick={handleAdd}
          style={{
            width: "100%",
            background: "#4caf50",
            color: "#fff",
            border: "none",
            padding: "9px 12px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "0.9rem"
          }}
        >
          🛒 Thêm vào giỏ
        </button>
      </div>
    </div>
  );
}

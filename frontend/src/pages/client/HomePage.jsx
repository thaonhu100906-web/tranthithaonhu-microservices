import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div style={{ textAlign: "center", padding: "60px 20px" }}>
      <h1 style={{ fontSize: "2.5rem", color: "#3e2723", marginBottom: "16px" }}>
        Chào mừng đến với Coffee Shop! ☕
      </h1>
      <p style={{ fontSize: "1.15rem", color: "#5d4037", maxWidth: "600px", margin: "0 auto 32px" }}>
        Thưởng thức hương vị cà phê đậm đà nguyên chất cùng các thức uống thanh mát tươi ngon mỗi ngày.
      </p>
      <Link
        to="/products"
        style={{
          display: "inline-block",
          background: "#6d4c41",
          color: "#fff",
          padding: "14px 28px",
          borderRadius: "30px",
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: "1.1rem",
          boxShadow: "0 4px 12px rgba(109,76,65,0.3)"
        }}
      >
        👉 Xem Menu & Đặt món ngay
      </Link>
    </div>
  );
}

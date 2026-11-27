import React from "react";
import { Link } from "react-router-dom";

export default function Header({ cartCount = 0 }) {
  return (
    <header style={{
      width: "100%",
      background: "#3e2723",
      color: "#fff",
      boxShadow: "0 2px 10px rgba(0,0,0,0.15)"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "16px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <Link to="/" style={{ color: "#fff", textDecoration: "none", fontSize: "1.4rem", fontWeight: "bold", display: "flex", alignItems: "center", gap: "8px" }}>
            <span>☕</span> Coffee Shop
          </Link>
          <nav style={{ display: "flex", gap: "20px" }}>
            <Link to="/" style={{ color: "#efebe9", textDecoration: "none", fontWeight: 500, fontSize: "1rem" }}>
              Trang chủ
            </Link>
            <Link to="/products" style={{ color: "#efebe9", textDecoration: "none", fontWeight: 500, fontSize: "1rem" }}>
              Menu Quán
            </Link>
            <Link to="/admin" style={{ color: "#ffcc80", textDecoration: "none", fontWeight: 600, fontSize: "1rem" }}>
              Quản trị Admin
            </Link>
          </nav>
        </div>
        <div>
          <Link to="/products" style={{
            background: "#6d4c41",
            color: "#fff",
            padding: "8px 18px",
            borderRadius: "24px",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "0.95rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
          }}>
            <span>🛒</span> Giỏ hàng ({cartCount})
          </Link>
        </div>
      </div>
    </header>
  );
}

import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", width: "100%", background: "#f4f6f8" }}>
      <header style={{
        width: "100%",
        background: "#1a237e",
        color: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "16px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div style={{ fontSize: "1.25rem", fontWeight: "bold", display: "flex", alignItems: "center", gap: "8px" }}>
            <span>⚡</span> Trang Quản Trị Hệ Thống (Admin)
          </div>
          <Link to="/" style={{
            color: "#fff",
            background: "rgba(255,255,255,0.15)",
            padding: "8px 16px",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: 500,
            fontSize: "0.9rem"
          }}>
            ← Về phía Khách hàng
          </Link>
        </div>
      </header>
      <main style={{ flex: 1, padding: "32px 24px", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
        <Outlet />
      </main>
    </div>
  );
}

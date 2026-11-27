import React from "react";

export default function Footer() {
  return (
    <footer style={{
      width: "100%",
      background: "#271916",
      color: "#d7ccc8",
      textAlign: "center",
      padding: "24px 16px",
      marginTop: "auto",
      fontSize: "0.9rem"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <p style={{ margin: 0, fontWeight: 500 }}>
          © 2026 Hệ thống Quản lý Quán Cà Phê - Microservices & ReactJS
        </p>
        <p style={{ margin: "8px 0 0", fontSize: "0.85rem", color: "#a1887f" }}>
          Sinh viên: Trần Thị Thảo Như - MSSV: 2124110075
        </p>
      </div>
    </footer>
  );
}

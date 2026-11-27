import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function OrderSuccessPage() {
  const location = useLocation();
  const order = location.state?.order;

  return (
    <div style={{ textAlign: "center", padding: "50px 20px", maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ fontSize: "4rem", marginBottom: "16px" }}>🎉</div>
      <h2 style={{ color: "#2e7d32", marginBottom: "12px" }}>
        Đặt hàng thành công!
      </h2>
      <p style={{ color: "#616161", fontSize: "1.05rem" }}>
        Đơn hàng của bạn đã được tiếp nhận và chuyển đến quầy pha chế.
      </p>

      {order && (
        <div style={{
          background: "#fff",
          border: "1px solid #c8e6c9",
          borderRadius: "12px",
          padding: "20px",
          margin: "24px 0",
          textAlign: "left",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
        }}>
          <p style={{ margin: "8px 0" }}>
            <strong>Mã đơn hàng (Order ID):</strong> <code>{order.id}</code>
          </p>
          <p style={{ margin: "8px 0" }}>
            <strong>Tổng số tiền thanh toán:</strong>{" "}
            <span style={{ color: "#d84315", fontWeight: "bold", fontSize: "1.2rem" }}>
              {Number(order.totalAmount).toLocaleString("vi-VN")} đ
            </span>
          </p>
          <p style={{ margin: "8px 0", color: "#616161", fontSize: "0.9rem" }}>
            Trạng thái: <span style={{ color: "#f57c00", fontWeight: "bold" }}>PENDING (Chờ xử lý)</span>
          </p>
        </div>
      )}

      <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
        <Link
          to="/products"
          style={{
            background: "#6d4c41",
            color: "#fff",
            padding: "10px 22px",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "bold"
          }}
        >
          ← Tiếp tục gọi món
        </Link>
        <Link
          to="/"
          style={{
            background: "#efebe9",
            color: "#3e2723",
            padding: "10px 22px",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "bold"
          }}
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}

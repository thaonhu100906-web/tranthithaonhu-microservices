import React, { useEffect, useState } from "react";
import { orderService } from "../../services/orderService";
import { productService } from "../../services/productService";

export default function DashboardPage() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      orderService.getAll().catch(() => []),
      productService.getAll().catch(() => [])
    ]).then(([ordersData, productsData]) => {
      setOrders(ordersData);
      setProducts(productsData);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h2 style={{ color: "#1a237e", marginBottom: "20px" }}>
        📊 Bảng Quản Trị Hệ Thống (Admin Dashboard)
      </h2>

      {loading ? (
        <p>Đang tải dữ liệu tổng quan...</p>
      ) : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "32px" }}>
            <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 6px rgba(0,0,0,0.06)", borderLeft: "5px solid #1976d2" }}>
              <div style={{ color: "#757575", fontSize: "0.9rem" }}>Tổng sản phẩm (Product Service)</div>
              <div style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#1976d2", marginTop: "6px" }}>{products.length}</div>
            </div>
            <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 6px rgba(0,0,0,0.06)", borderLeft: "5px solid #388e3c" }}>
              <div style={{ color: "#757575", fontSize: "0.9rem" }}>Tổng đơn hàng (Order Service)</div>
              <div style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#388e3c", marginTop: "6px" }}>{orders.length}</div>
            </div>
            <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 6px rgba(0,0,0,0.06)", borderLeft: "5px solid #f57c00" }}>
              <div style={{ color: "#757575", fontSize: "0.9rem" }}>Tổng doanh thu dự kiến</div>
              <div style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#f57c00", marginTop: "6px" }}>
                {orders.reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0).toLocaleString("vi-VN")} đ
              </div>
            </div>
          </div>

          <h3 style={{ color: "#37474f", marginBottom: "14px" }}>Danh sách đơn hàng gần đây (MongoDB):</h3>
          <div style={{ background: "#fff", borderRadius: "8px", overflow: "hidden", boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.95rem" }}>
              <thead style={{ background: "#f5f5f5", borderBottom: "2px solid #e0e0e0" }}>
                <tr>
                  <th style={{ padding: "12px 16px" }}>Mã đơn (Code)</th>
                  <th style={{ padding: "12px 16px" }}>Số món</th>
                  <th style={{ padding: "12px 16px" }}>Tổng tiền</th>
                  <th style={{ padding: "12px 16px" }}>Trạng thái</th>
                  <th style={{ padding: "12px 16px" }}>Thời gian</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                    <td style={{ padding: "12px 16px", fontWeight: "500" }}>{o.orderCode || o.id}</td>
                    <td style={{ padding: "12px 16px" }}>{o.items?.length || 0} món</td>
                    <td style={{ padding: "12px 16px", color: "#d84315", fontWeight: "bold" }}>
                      {Number(o.totalAmount || 0).toLocaleString("vi-VN")} đ
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{
                        background: o.status === "CONFIRMED" ? "#e8f5e9" : "#fff3e0",
                        color: o.status === "CONFIRMED" ? "#2e7d32" : "#e65100",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "0.85rem",
                        fontWeight: "bold"
                      }}>
                        {o.status || "PENDING"}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px", color: "#757575" }}>{o.createdAt ? String(o.createdAt).replace("T", " ").substring(0, 19) : "Vừa tạo"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

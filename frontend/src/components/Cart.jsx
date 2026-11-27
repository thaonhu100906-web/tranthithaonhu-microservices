import React from "react";

export default function Cart({ items, onUpdateQuantity, onRemove, onOrder, loading }) {
  const totalAmount = items.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  return (
    <div style={{
      border: "1px solid #e0e0e0",
      borderRadius: "12px",
      padding: "20px",
      background: "#fff",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      position: "sticky",
      top: "20px"
    }}>
      <h3 style={{ margin: "0 0 16px", color: "#3e2723", borderBottom: "2px solid #efebe9", paddingBottom: "10px" }}>
        🛒 Giỏ hàng ({items.length})
      </h3>

      {items.length === 0 ? (
        <div style={{ textAlign: "center", color: "#9e9e9e", padding: "24px 0" }}>
          Chưa có món nào trong giỏ.<br/>Hãy chọn món từ menu bên trái!
        </div>
      ) : (
        <>
          <div style={{ maxHeight: "320px", overflowY: "auto", marginBottom: "16px" }}>
            {items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 0",
                  borderBottom: "1px solid #f5f5f5"
                }}
              >
                <div style={{ flex: 1, paddingRight: "8px" }}>
                  <div style={{ fontWeight: 600, color: "#3e2723", fontSize: "0.95rem" }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#757575" }}>
                    {Number(item.price).toLocaleString("vi-VN")} đ
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    style={{
                      width: "26px",
                      height: "26px",
                      border: "1px solid #ccc",
                      background: "#f5f5f5",
                      cursor: item.quantity <= 1 ? "not-allowed" : "pointer",
                      borderRadius: "4px"
                    }}
                  >
                    -
                  </button>
                  <span style={{ minWidth: "22px", textAlign: "center", fontWeight: "bold" }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    style={{
                      width: "26px",
                      height: "26px",
                      border: "1px solid #ccc",
                      background: "#f5f5f5",
                      cursor: "pointer",
                      borderRadius: "4px"
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => onRemove(item.id)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#e53935",
                      cursor: "pointer",
                      marginLeft: "6px",
                      fontSize: "1rem"
                    }}
                    title="Xóa món"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "14px 0",
            borderTop: "2px solid #efebe9",
            marginBottom: "16px"
          }}>
            <span style={{ fontWeight: 600, fontSize: "1.05rem" }}>Tổng tiền:</span>
            <span style={{ fontWeight: "bold", fontSize: "1.25rem", color: "#d84315" }}>
              {totalAmount.toLocaleString("vi-VN")} đ
            </span>
          </div>

          <button
            onClick={onOrder}
            disabled={loading}
            style={{
              width: "100%",
              background: loading ? "#9e9e9e" : "#2e7d32",
              color: "#fff",
              border: "none",
              padding: "12px",
              borderRadius: "8px",
              cursor: loading ? "wait" : "pointer",
              fontWeight: "bold",
              fontSize: "1rem",
              boxShadow: "0 2px 6px rgba(46,125,50,0.3)"
            }}
          >
            {loading ? "Đang xử lý đặt món..." : "☕ Đặt hàng ngay"}
          </button>
        </>
      )}
    </div>
  );
}

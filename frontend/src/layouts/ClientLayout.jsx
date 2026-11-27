import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ClientLayout({ cartCount = 0 }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", width: "100%", background: "#fbf9f8" }}>
      <Header cartCount={cartCount} />
      <main style={{ flex: 1, padding: "32px 24px", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

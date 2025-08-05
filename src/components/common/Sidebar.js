import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import './liquidGlass.css';

function Sidebar() {
  const location = useLocation();
  const navLinks = [
    { to: "/dashboard", label: "Dashboard", icon: "fa-solid fa-gauge" },
    { to: "/orders", label: "Orders", icon: "fa-solid fa-bag-shopping" },
    { to: "/wishlist", label: "Wishlist", icon: "fa-solid fa-heart" },
    { to: "/profile", label: "Profile", icon: "fa-solid fa-user" },
    { to: "/addresses", label: "Addresses", icon: "fa-solid fa-location-dot" },
    { to: "/changepassword", label: "Change Password", icon: "fa-solid fa-key" }
  ];
  const [showSidebar, setShowSidebar] = useState(window.innerWidth > 600);

  React.useEffect(() => {
    function handleResize() {
      setShowSidebar(window.innerWidth > 600);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Hamburger for mobile */}
      <button
        className="btn btn-glass d-md-none mb-2"
        style={{ position: "fixed", top: 12, left: 12, zIndex: 1001 }}
        onClick={() => setShowSidebar(s => !s)}
        aria-label="Toggle sidebar"
      >
        <i className="fa fa-bars"></i>
      </button>
      {/* Sidebar */}
      <div
        className={`col-md-3 mb-4 mb-md-0 sidebar-glass ${showSidebar ? "show" : "hide"}`}
        style={{
          position: window.innerWidth <= 600 ? "fixed" : "static",
          top: window.innerWidth <= 600 ? 0 : undefined,
          left: window.innerWidth <= 600 ? 0 : undefined,
          zIndex: window.innerWidth <= 600 ? 1000 : undefined,
          width: window.innerWidth <= 600 ? "70vw" : undefined,
          height: window.innerWidth <= 600 ? "100vh" : undefined,
          background: window.innerWidth <= 600 ? "rgba(255,255,255,0.97)" : undefined,
          boxShadow: window.innerWidth <= 600 ? "0 0 24px rgba(0,0,0,0.15)" : undefined,
          transition: "left 0.2s, opacity 0.2s"
        }}
      >
        <div className="list-group glass-card shadow-sm">
          {navLinks.map((link, idx) => {
            const isActive = location.pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`list-group-item list-group-item-action${isActive ? " active" : ""}`}
                style={{
                  background: isActive ? "#2563eb" : "transparent",
                  color: isActive ? "#fff" : "#222",
                  fontWeight: isActive ? "bold" : "normal",
                  borderRadius: 0,
                  transition: "background 0.2s, color 0.2s",
                  cursor: "pointer",
                }}
                onClick={() => window.innerWidth <= 600 && setShowSidebar(false)}
              >
                <i className={`${link.icon} me-2`} style={{ fontSize: 20, color: isActive ? "#fff" : "#222" }}></i>
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
      {/* Overlay for mobile sidebar */}
      {window.innerWidth <= 600 && showSidebar && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.15)",
            zIndex: 999
          }}
          onClick={() => setShowSidebar(false)}
        />
      )}
    </>
  );
}

export default Sidebar;
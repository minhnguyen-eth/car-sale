import { useState, useEffect } from "react";
import { CONFIG } from "../config.js";

export default function Navbar({ cars = [], onSelectCar }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");

  
  useEffect(() => {
    const sections = ["#hero", "#cars", "#promo", "#news", "#contact"];
    const onScroll = () => {
      const scrollPosition = window.scrollY + 130;
      let current = sections[0];
      sections.forEach((id) => {
        const el = document.querySelector(id);
        if (el && el.offsetTop <= scrollPosition) current = id;
      });
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (id) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.querySelector(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleSelectCar = (e, car) => {
    e.preventDefault();
    if (onSelectCar) onSelectCar(car.slug);
    else window.location.hash = `car-${car.slug}`;
  };

  return (
    <header className="byd-header nav-glass fixed top-0 left-0 right-0 z-50" style={{ padding: "12px 0" }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
        {/* Logo */}
        <a href="#hero" onClick={(e) => { e.preventDefault(); goTo("#hero"); }} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 42, height: 42, background: "var(--red)", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 4 }}>
            <span style={{ color: "#fff", fontSize: 13, fontWeight: 900, letterSpacing: ".05em" }}>BYD</span>
          </div>
          <div style={{ lineHeight: 1.15 }}>
            <div style={{ fontWeight: 800, fontSize: 15, color: "#fff", letterSpacing: ".05em" }}>{CONFIG.showroomName}</div>
            <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.6)", letterSpacing: ".18em", textTransform: "uppercase" }}>{CONFIG.tagline}</div>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex" style={{ alignItems: "center", gap: 28 }}>
          <a href="#hero" onClick={(e) => { e.preventDefault(); goTo("#hero"); }} className={`byd-nav-link ${activeSection === "#hero" ? "active" : ""}`}>TRANG CHỦ</a>
          <a href="#cars" onClick={(e) => { e.preventDefault(); goTo("#cars"); }} className={`byd-nav-link ${activeSection === "#cars" ? "active" : ""}`}>
            MẪU XE
          </a>
          <a href="#promo" onClick={(e) => { e.preventDefault(); goTo("#promo"); }} className={`byd-nav-link ${activeSection === "#promo" ? "active" : ""}`}>KHUYẾN MÃI</a>
          <a href="#news" onClick={(e) => { e.preventDefault(); goTo("#news"); }} className={`byd-nav-link ${activeSection === "#news" ? "active" : ""}`}>TIN TỨC</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); goTo("#contact"); }} className={`byd-nav-link ${activeSection === "#contact" ? "active" : ""}`}>LIÊN HỆ</a>
        </nav>

        {/* CTA + hotline */}
        <div className="hidden md:flex" style={{ alignItems: "center", gap: 14 }}>
          <a href={`tel:${CONFIG.phoneRaw}`} style={{ display: "flex", alignItems: "center", gap: 8, color: "#fff" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
            <div style={{ lineHeight: 1.1 }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", letterSpacing: ".1em", textTransform: "uppercase" }}>Hotline</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{CONFIG.phone}</div>
            </div>
          </a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); goTo("#contact"); }} className="btn-primary" style={{ padding: "11px 18px", fontSize: 12.5 }}>
            Báo giá lăn bánh
          </a>
        </div>

        {/* Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu" className="md:hidden" style={{ background: "none", border: "none", color: "#fff", padding: 8, cursor: "pointer" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            {menuOpen ? <path d="M18 6L6 18M6 6l12 12"/> : <path d="M3 12h18M3 6h18M3 18h18"/>}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="fade-in" style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.1)", padding: "12px 20px" }}>
          {[
            { label: "Trang chủ", href: "#hero" },
            { label: "MẪU XE", href: "#cars" },
            { label: "Khuyến mãi", href: "#promo" },
            { label: "Tin tức", href: "#news" },
            { label: "Liên hệ", href: "#contact" },
          ].map((l) => (
            <a key={l.label} href={l.href} onClick={(e) => { e.preventDefault(); goTo(l.href); }}
              style={{ display: "block", padding: "14px 4px", borderBottom: "1px solid rgba(255,255,255,0.08)", fontSize: 14, fontWeight: 600, color: "#fff" }}>
              {l.label}
            </a>
          ))}
          <a href={`tel:${CONFIG.phoneRaw}`} className="btn-primary" style={{ marginTop: 14, width: "100%", justifyContent: "center" }}>
            Gọi ngay {CONFIG.phone}
          </a>
        </div>
      )}
    </header>
  );
}
import { useState, useEffect } from "react";
import { CONFIG } from "../config.js";

export default function FloatingCTA() {
  const [showTop, setShowTop] = useState(false);
  const [showPhonePopup, setShowPhonePopup] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div style={{ position: "fixed", right: 18, bottom: 22, zIndex: 60, display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Zalo */}
      <a
        href={CONFIG.zaloUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat Zalo: ${CONFIG.zaloPhone}`}
        title={`Chat Zalo: ${CONFIG.zaloPhone}`}
        style={fabStyle("#0068FF")}
      >
        <span style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "2px solid #0068FF", animation: "fab-ping 1.6s ease-out infinite", opacity: 0.55 }} />
        <img src={CONFIG.ZALO_ICON_URL} alt="Zalo" style={{ width: 24, height: 24, display: "block", position: "relative", zIndex: 1 }} />
      </a>

      {/* Hotline */}
      <button
        type="button"
        aria-label={`Hiển thị thông tin hotline ${CONFIG.phone}`}
        title={`Hiển thị thông tin hotline ${CONFIG.phone}`}
        onClick={() => setShowPhonePopup((prev) => !prev)}
        style={fabStyle("var(--red)")}
      >
        <span style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "2px solid var(--red)", animation: "fab-ping 1.6s ease-out infinite", opacity: 0.55 }} />
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
          <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
        </svg>
      </button>
      {showPhonePopup && (
        <div style={{ position: "absolute", right: 0, bottom: 86, width: 260, background: "#fff", color: "#111", borderRadius: 18, boxShadow: "0 24px 60px rgba(0,0,0,0.18)", padding: 16, zIndex: 70 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <span style={{ fontSize: 18 }}>📞</span>
            <strong style={{ fontSize: 14 }}>Hotline BYD Đồng Nai</strong>
          </div>
          <p style={{ margin: 0, fontSize: 13, color: "#475569", lineHeight: 1.7 }}>
            Anh/chị vui lòng liên hệ số điện thoại để được tư vấn nhanh nhất.
          </p>
          <a href={`tel:${CONFIG.phoneRaw}`} style={{ display: "block", marginTop: 12, background: "var(--red)", color: "#fff", textDecoration: "none", borderRadius: 12, textAlign: "center", padding: "11px 12px", fontWeight: 700 }}>
            Gọi ngay {CONFIG.phone}
          </a>
        </div>
      )}

      {/* Back to top */}
      <button
        type="button"
        onClick={scrollTop}
        aria-label="Lên đầu trang"
        title="Lên đầu trang"
        style={{
          ...fabStyle("#1f2937"),
          opacity: showTop ? 1 : 0,
          transform: showTop ? "translateY(0)" : "translateY(12px)",
          pointerEvents: showTop ? "auto" : "none",
          transition: "opacity .25s ease, transform .25s ease",
          border: "none", cursor: "pointer",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>

      <style>{`@keyframes fab-ping { 0% { transform: scale(1); opacity: .6 } 80%,100% { transform: scale(1.7); opacity: 0 } }`}</style>
    </div>
  );
}

function fabStyle(bg) {
  return {
    position: "relative",
    width: 52, height: 52, borderRadius: "50%",
    background: bg, color: "#fff",
    display: "flex", alignItems: "center", justifyContent: "center",
    boxShadow: "0 8px 22px rgba(0,0,0,0.22)",
    textDecoration: "none",
  };
}

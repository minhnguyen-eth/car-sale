import { CONFIG, SAMPLE_CARS } from "../config.js";

export default function Footer() {
  return (
    <footer style={{ background: "#0a0a0a", color: "rgba(255,255,255,0.7)", paddingTop: 60, paddingBottom: 24 }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 36, marginBottom: 36 }}>
          {/* Brand & Address */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
              <div style={{ width: 42, height: 42, background: "var(--red)", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 4 }}>
                <span style={{ color: "#fff", fontSize: 13, fontWeight: 900, letterSpacing: ".05em" }}>BYD</span>
              </div>
              <div>
                <div style={{ color: "#fff", fontSize: 15, fontWeight: 800 }}>{CONFIG.showroomName}</div>
                <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.5)", letterSpacing: ".18em", textTransform: "uppercase" }}>{CONFIG.tagline}</div>
              </div>
            </div>
            <p style={{ fontSize: 13.5, lineHeight: 1.65, color: "rgba(255,255,255,0.55)", marginBottom: 18 }}>
              Đại lý ủy quyền BYD chính hãng — chuyên cung cấp đầy đủ các dòng xe điện BEV và hybrid PHEV với giá tốt nhất thị trường.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <SocialBtn href={CONFIG.facebook} label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0022 12z"/></svg>
              </SocialBtn>
              <SocialBtn href={CONFIG.youtube} label="YouTube">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23 7s-.2-1.5-.9-2.2c-.8-.9-1.7-.9-2.2-.9C16.5 3.6 12 3.6 12 3.6s-4.5 0-7.9.3c-.4 0-1.3 0-2.2.9C1.2 5.5 1 7 1 7S.8 8.7.8 10.5v1.7C.8 14 1 15.8 1 15.8s.2 1.5.9 2.2c.8.9 1.9.9 2.4 1 1.8.2 7.7.3 7.7.3s4.5 0 7.9-.3c.4 0 1.3 0 2.2-.9.7-.7.9-2.2.9-2.2s.2-1.7.2-3.5v-1.7C23.2 8.7 23 7 23 7zM9.7 14.4V8.1l5.8 3.2-5.8 3.1z"/></svg>
              </SocialBtn>
              <SocialBtn href={CONFIG.zaloUrl} label={`Zalo: ${CONFIG.zaloPhone}`}>
                <img src={CONFIG.ZALO_ICON_URL} alt="Zalo" style={{ width: 20, height: 20, display: "block" }} />
              </SocialBtn>
            </div>
          </div>

          {/* Models */}
          <div>
            <h4 style={footerHeading}>Dòng xe BYD</h4>
            <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {SAMPLE_CARS.map((c) => (
                <li key={c.id}>
                  <a href="#cars" style={footerLink}>{c.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 style={footerHeading}>Hỗ trợ khách hàng</h4>
            <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <li><a href="#cars" style={footerLink}>Báo giá lăn bánh</a></li>
              <li><a href="#contact" style={footerLink}>Đặt lịch lái thử</a></li>
              <li><a href="#promo" style={footerLink}>Chương trình khuyến mãi</a></li>
              <li><a href="#contact" style={footerLink}>Hỗ trợ trả góp</a></li>
              <li><a href="#contact" style={footerLink}>Bảo hành & bảo dưỡng</a></li>
              <li><a href="#news" style={footerLink}>Tin tức BYD</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={footerHeading}>Liên hệ showroom</h4>
            <ul style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 13.5 }}>
              <li style={{ display: "flex", gap: 10 }}>
                <span style={{ color: "var(--red)" }}>📍</span>
                <span style={{ color: "rgba(255,255,255,0.7)" }}>{CONFIG.address}</span>
              </li>
              <li style={{ display: "flex", gap: 10 }}>
                <span style={{ color: "var(--red)" }}>📞</span>
                <a href={`tel:${CONFIG.phoneRaw}`} style={{ color: "#fff", fontWeight: 600 }}>{CONFIG.phone}</a>
              </li>
              <li style={{ display: "flex", gap: 10 }}>
                <span style={{ color: "var(--red)" }}>✉️</span>
                <a href={`mailto:${CONFIG.email}`} style={{ color: "rgba(255,255,255,0.7)" }}>{CONFIG.email}</a>
              </li>
              <li style={{ display: "flex", gap: 10 }}>
                <span style={{ color: "var(--red)" }}>⏰</span>
                <span style={{ color: "rgba(255,255,255,0.7)" }}>{CONFIG.workingHours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 20, display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 14, fontSize: 12, color: "rgba(255,255,255,0.45)" }}>
          <div>© {new Date().getFullYear()} {CONFIG.showroomName}. All rights reserved.</div>
          <div style={{ letterSpacing: ".22em", textTransform: "uppercase", fontWeight: 600 }}>BYD — Build Your Dreams</div>
        </div>
      </div>
    </footer>
  );
}

const footerHeading = {
  color: "#fff", fontSize: 13, fontWeight: 700, letterSpacing: ".12em",
  textTransform: "uppercase", marginBottom: 18, paddingBottom: 10,
  borderBottom: "1px solid rgba(255,255,255,0.1)",
};

const footerLink = {
  fontSize: 13.5, color: "rgba(255,255,255,0.6)", transition: "color 0.2s",
};

function SocialBtn({ href, label, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}
      style={{ width: 38, height: 38, borderRadius: 6, border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--red)"; e.currentTarget.style.color = "var(--red)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
    >
      {children}
    </a>
  );
}

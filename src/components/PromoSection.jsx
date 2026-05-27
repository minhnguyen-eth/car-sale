import { CONFIG } from "../config.js";
import useScrollReveal from "../hooks/useScrollReveal.js";

const PROMOS = [
  "Tặng tiền mặt lên đến 100 triệu đồng cho khách hàng đặt cọc trong tháng",
  "Hỗ trợ vay ngân hàng tối đa 80% giá trị xe — lãi suất 0% trong 12 tháng đầu",
  "Tặng gói bảo hiểm thân vỏ 1 năm chính hãng",
  "Miễn phí gói phụ kiện trị giá 30 triệu đồng (film cách nhiệt, thảm 6D, camera 360)",
  "Tặng bộ sạc tại nhà chính hãng BYD Wallbox 7kW",
  "Lái thử miễn phí tận nơi tại Đồng Nai & các tỉnh lân cận",
  "Bảo hành pin 8 năm / 160.000 km — chính sách tốt nhất phân khúc",
];

export default function PromoSection() {
  const revealRef = useScrollReveal({ deps: [] });

  return (
    <section id="promo" className="section" ref={revealRef} style={{ background: "var(--surface-2)" }}>
      <div className="container">
        <div className="reveal" style={{ textAlign: "center", marginBottom: 44 }}>
          <div className="eyebrow" style={{ justifyContent: "center", marginBottom: 14 }}>Khuyến mãi</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, color: "var(--text)", marginBottom: 10 }}>
            CHƯƠNG TRÌNH <span style={{ color: "var(--red)" }}>ƯU ĐÃI</span>
          </h2>
          <p style={{ color: "var(--text-2)", maxWidth: 600, margin: "0 auto", fontSize: 15 }}>
            7 đặc quyền dành riêng cho khách hàng đặt xe BYD tại showroom Đồng Nai trong tháng này.
          </p>
        </div>

        <div className="reveal one-column-mobile" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 28, alignItems: "start" }}>
          {/* Left: checklist */}
          <div className="promo-list">
            {PROMOS.map((p, i) => (
              <div key={i} className="promo-item">
                <span className="check">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg>
                </span>
                <span>{p}</span>
              </div>
            ))}
          </div>

          {/* Right: CTA card */}
          <div className="promo-cta-card" style={{ position: "sticky", top: 100, background: "var(--byd-blue)", color: "#fff", borderRadius: 12, padding: "40px 32px", boxShadow: "var(--shadow-md)", overflow: "hidden", position: "relative" }}>
            <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
            <div style={{ position: "relative" }}>
              <div style={{ fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", opacity: 0.7, marginBottom: 14 }}>Liên hệ ngay</div>
              <h3 style={{ fontSize: 26, fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: 14 }}>
                Nhận báo giá lăn bánh & ưu đãi tốt nhất
              </h3>
              <p style={{ fontSize: 14.5, color: "rgba(255,255,255,0.85)", lineHeight: 1.6, marginBottom: 26 }}>
                Gọi trực tiếp hotline để được tư vấn chi tiết về giá xe, gói tài chính và lịch lái thử miễn phí.
              </p>
              <a href={`tel:${CONFIG.phoneRaw}`} style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "var(--red)", color: "#fff", padding: "14px 26px", borderRadius: 6, fontWeight: 700, fontSize: 14, letterSpacing: ".05em" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
                Hotline: {CONFIG.phone}
              </a>
              <div style={{ marginTop: 24, paddingTop: 22, borderTop: "1px solid rgba(255,255,255,0.15)", fontSize: 13, color: "rgba(255,255,255,0.75)" }}>
                📍 {CONFIG.address}<br />
                ⏰ {CONFIG.workingHours}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

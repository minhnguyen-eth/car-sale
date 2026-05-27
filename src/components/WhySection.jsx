import useScrollReveal from "../hooks/useScrollReveal.js";

const ITEMS = [
  {
    title: "Showroom ủy quyền chính hãng",
    description: "Đảm bảo xe mới, đầy đủ bảo hành và chính sách hỗ trợ sau bán hàng từ BYD.",
    icon: "🏁",
  },
  {
    title: "Tư vấn vay trả góp ưu đãi",
    description: "Hỗ trợ hồ sơ nhanh chóng, vay đến 80% và lãi suất cạnh tranh cho dòng xe BYD.",
    icon: "💼",
  },
  {
    title: "Lái thử mọi lúc",
    description: "Đặt lịch lái thử miễn phí tại Đồng Nai hoặc tại nhà theo yêu cầu.",
    icon: "🚘",
  },
  {
    title: "Bảo hành pin 8 năm",
    description: "Chính sách bảo hành pin dài hạn và dịch vụ sau bán hàng chuyên nghiệp.",
    icon: "🛡️",
  },
];

export default function WhySection() {
  const revealRef = useScrollReveal({ deps: [] });

  return (
    <section className="section section-sm" ref={revealRef} style={{ background: "var(--surface)" }}>
      <div className="container">
        <div className="reveal" style={{ maxWidth: 760, margin: "0 auto 44px", textAlign: "center" }}>
          <div className="eyebrow" style={{ justifyContent: "center", marginBottom: 14 }}>Tại sao chọn BYD Đồng Nai</div>
          <h2 style={{ fontSize: "clamp(30px, 4vw, 42px)", fontWeight: 800, color: "var(--text)", marginBottom: 14 }}>
            Trải nghiệm mua xe chất lượng cao, dịch vụ chuyên nghiệp và minh bạch.
          </h2>
          <p style={{ color: "var(--text-2)", fontSize: 15.5, maxWidth: 620, margin: "0 auto" }}>
            Chúng tôi kết hợp tư vấn tận tâm, chương trình ưu đãi hấp dẫn và hỗ trợ sau bán hàng để giúp khách hàng an tâm khi chọn xe điện BYD.
          </p>
        </div>

        <div className="reveal one-column-mobile" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 22 }}>
          {ITEMS.map((item) => (
            <div key={item.title} className="card trust-card">
              <div style={{ width: 54, height: 54, borderRadius: 18, background: "rgba(214,0,0,0.1)", display: "grid", placeItems: "center", fontSize: 24, marginBottom: 18 }}>
                {item.icon}
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 10, color: "var(--text)" }}>{item.title}</h3>
              <p style={{ margin: 0, color: "var(--text-2)", lineHeight: 1.8 }}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

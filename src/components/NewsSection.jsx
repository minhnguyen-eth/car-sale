import useScrollReveal from "../hooks/useScrollReveal.js";

const NEWS = [
  {
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=900&q=85",
    date: "15/03/2025",
    title: "BYD Sealion 7 chính thức ra mắt thị trường Việt Nam",
    excerpt: "SUV điện cỡ D thế hệ mới với công nghệ DiPilot L2+, giá khởi điểm từ 1,199 tỷ đồng.",
  },
  {
    image: "https://www.doktermobil.com/wp-content/uploads/2024/11/Review-dan-Spesifikasi-BYD-Seal-jpg.webp",
    date: "08/03/2025",
    title: "Ưu đãi lãi suất 0% cho khách hàng mua BYD Seal trong tháng 3",
    excerpt: "Chương trình hỗ trợ tài chính độc quyền — vay tối đa 80% giá trị xe, kỳ hạn lên tới 8 năm.",
  },
  {
    image: "https://cdn.shopifycdn.net/s/files/1/0558/3332/9831/files/What_you_need_to_know_about_blade_battery.jpg?v=1664417886",
    date: "27/02/2025",
    title: "Trải nghiệm Blade Battery — Công nghệ pin an toàn nhất thế giới",
    excerpt: "Pin LFP cell-to-pack đặc trưng của BYD đã vượt qua thử nghiệm xuyên đinh, đảm bảo an toàn tuyệt đối.",
  },
];

export default function NewsSection() {
  const revealRef = useScrollReveal({ deps: [] });

  return (
    <section id="news" className="section" ref={revealRef} style={{ background: "var(--surface)" }}>
      <div className="container">
        <div className="reveal" style={{ textAlign: "center", marginBottom: 44 }}>
          <div className="eyebrow" style={{ justifyContent: "center", marginBottom: 14 }}>Cập nhật mới</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, color: "var(--text)", marginBottom: 10 }}>
            TIN TỨC & SỰ KIỆN
          </h2>
          <p style={{ color: "var(--text-2)", maxWidth: 560, margin: "0 auto", fontSize: 15 }}>
            Cập nhật những thông tin mới nhất về xe BYD, chương trình khuyến mãi và sự kiện ra mắt sản phẩm.
          </p>
        </div>

        <div className="one-column-mobile" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 22 }}>
          {NEWS.map((n, i) => (
            <a key={i} href="#contact" className="news-card reveal" data-reveal-delay={i * 80}>
              <div className="img-wrap">
                <img src={n.image} alt={n.title} loading="lazy"
                  onError={(e) => { e.currentTarget.src = "https://placehold.co/800x500/EAEAEA/054a85?text=BYD+News"; }}
                />
              </div>
              <div className="body">
                <div className="date">{n.date}</div>
                <div className="title">{n.title}</div>
                <p style={{ fontSize: 13.5, color: "var(--text-2)", lineHeight: 1.55 }}>{n.excerpt}</p>
                <div className="read-more">Xem chi tiết →</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

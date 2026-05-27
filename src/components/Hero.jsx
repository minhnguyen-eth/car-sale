import { useState, useEffect, useRef } from "react";
import { CONFIG } from "../config.js";

const SLIDES = [
  {
    image: "https://owaybienhoa.com/assets/sealion-6-Dhix6XsD.webp",
    eyebrow: "DM-I SUPER HYBRID · SUV",
    title: "BYD Sealion 6",
    subtitle: "SUV hybrid — 1,4L/100km, 80km thuần điện",
    cta: "Đặt lịch lái thử",
  },
  {
    image: "https://owaybienhoa.com/assets/seal-C2p1gMzm.webp",
    eyebrow: "EV · SEDAN",
    title: "BYD Seal",
    subtitle: "Sedan điện thể thao — công nghệ CTB độc quyền",
    cta: "Khám phá ngay",
  },
  {
    image: "https://img.tinxe.vn/resize/1000x-/2024/12/01/0MQViQLm/byd-sealion-7-11-8502.webp",
    eyebrow: "MỚI 2025",
    title: "BYD Sealion 7",
    subtitle: "SUV điện cỡ D thế hệ mới — hiệu suất AWD vượt trội",
    cta: "Tìm hiểu thêm",
  },
  {
    image: "https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?w=1920&q=90",
    eyebrow: "BÁN CHẠY",
    title: "BYD Dolphin",
    subtitle: "Hatchback điện thông minh cho đô thị Việt Nam",
    cta: "Xem chi tiết",
  },

  // BYD HAN
  {
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=90",
    eyebrow: "EV · FLAGSHIP SEDAN",
    title: "BYD HAN",
    subtitle: "Sedan điện cao cấp — tăng tốc mạnh mẽ, nội thất sang trọng",
    cta: "Khám phá ngay",
  },

  // BYD M9
  {
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1920&q=90",
    eyebrow: "MPV · CAO CẤP",
    title: "BYD M9",
    subtitle: "MPV gia đình rộng rãi — tiện nghi cho mọi hành trình",
    cta: "Tìm hiểu thêm",
  },

  // BYD DOLPHIN
  {
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1920&q=90",
    eyebrow: "EV · HATCHBACK",
    title: "BYD DOLPHIN",
    subtitle: "Xe điện đô thị linh hoạt — trẻ trung và tiết kiệm",
    cta: "Xem chi tiết",
  },

  // BYD ATTO 2
  {
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=90",
    eyebrow: "COMPACT SUV · EV",
    title: "BYD ATTO 2",
    subtitle: "SUV điện nhỏ gọn — phù hợp di chuyển trong đô thị",
    cta: "Đặt lịch lái thử",
  },

  // BYD SEAL 5
  {
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=90",
    eyebrow: "HYBRID · SEDAN",
    title: "BYD SEAL 5",
    subtitle: "Sedan hiện đại — vận hành êm ái và tiết kiệm nhiên liệu",
    cta: "Khám phá ngay",
  },

  // BYD M6
  {
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1920&q=90",
    eyebrow: "MPV · EV",
    title: "BYD M6",
    subtitle: "MPV điện đa dụng — không gian rộng cho gia đình",
    cta: "Xem chi tiết",
  },

  // BYD ATTO 3
  {
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1920&q=90",
    eyebrow: "SUV ĐIỆN QUỐC DÂN",
    title: "BYD ATTO 3",
    subtitle: "SUV điện nổi bật — công nghệ hiện đại, pin Blade Battery",
    cta: "Tìm hiểu thêm",
  },

  // BYD SEALION 8
  {
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1920&q=90",
    eyebrow: "SUV FULL-SIZE · EV",
    title: "BYD SEALION 8",
    subtitle: "SUV điện cỡ lớn — thiết kế mạnh mẽ và công nghệ tiên phong",
    cta: "Khám phá ngay",
  },
];

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const timer = useRef(null);

  const next = () => setIdx((i) => (i + 1) % SLIDES.length);
  const prev = () => setIdx((i) => (i - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    timer.current = setInterval(next, 40000); // Thời gian tự động chuyển sang xe khác
    return () => clearInterval(timer.current);
  }, []);

  const handleDot = (i) => {
    setIdx(i);
    clearInterval(timer.current);
    timer.current = setInterval(next, 40000);// Thời gian tự động chuyển sang xe khác
  };

  return (
    <section id="hero" className="slider" style={{ height: "100vh", minHeight: 560, marginTop: 0 }}>
      <div className="slider-track" style={{ transform: `translateX(-${idx * 100}%)`, height: "100%" }}>
        {SLIDES.map((s, i) => (
          <div key={i} className="slider-slide">
            <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${s.image})`, backgroundSize: "cover", backgroundPosition: "center" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.15) 100%)" }} />
            <div className="container" style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", color: "#fff", zIndex: 2 }}>
              <div style={{ maxWidth: 640 }}>
                <div className="fade-up" style={{ display: "inline-block", padding: "6px 14px", background: "var(--red)", color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: ".18em", borderRadius: 4, marginBottom: 22 }}>
                  {s.eyebrow}
                </div>
                <h1 className="fade-up delay-1" style={{ fontSize: "clamp(40px, 6vw, 76px)", fontWeight: 800, color: "#fff", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: 18 }}>
                  {s.title}
                </h1>
                <p className="fade-up delay-2" style={{ fontSize: 18, color: "rgba(255,255,255,0.88)", lineHeight: 1.7, marginBottom: 24, maxWidth: 520 }}>
                  {s.subtitle}
                </p>
                <div className="hero-feature-row fade-up delay-2" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, maxWidth: 560, marginBottom: 30 }}>
                  {[
                    "Tư vấn lăn bánh rõ ràng",
                    "Lái thử miễn phí tại Đồng Nai",
                    "Hỗ trợ vay lên đến 80%",
                    "Bảo hành pin 8 năm",
                  ].map((text) => (
                    <div key={text} className="hero-feature-pill">
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
                <div className="fade-up delay-3" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                  <a href="#cars" className="btn-primary">
                    {s.cta}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </a>
                  <a href="#contact" className="btn-outline" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.5)" }}>
                    Đăng ký lái thử
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button className="slider-arrow prev" onClick={prev} aria-label="Trước">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
      </button>
      <button className="slider-arrow next" onClick={next} aria-label="Sau">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 6l6 6-6 6" /></svg>
      </button>

      {/* Dots */}
      <div className="slider-dots">
        {SLIDES.map((_, i) => (
          <button key={i} className={`slider-dot ${i === idx ? "active" : ""}`} onClick={() => handleDot(i)} aria-label={`Slide ${i + 1}`} />
        ))}
      </div>
    </section>
  );
}

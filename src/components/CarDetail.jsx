import { useState, useEffect } from "react";
import { CONFIG } from "../config.js";

export default function CarDetail({ car, onBack }) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showPhoneInfo, setShowPhoneInfo] = useState(false);

  useEffect(() => {
    setSelectedVariantIndex(0);
    setSelectedImageIndex(0);
    setShowPhoneInfo(false);
  }, [car]);

  const currentImage = car.gallery?.[selectedImageIndex] || car.heroImage || car.image;

  const getSizedImage = (url, width = 1200, height = 900) => {
    if (!url) return url;
    const [base, query] = url.split("?");
    const params = new URLSearchParams(query || "");
    params.set("w", width);
    params.set("h", height);
    if (!params.get("q")) params.set("q", "90");
    return `${base}?${params.toString()}`;
  };

  const handlePrevImage = () => {
    if (!car.gallery?.length) return;
    setSelectedImageIndex((prev) => (prev - 1 + car.gallery.length) % car.gallery.length);
  };

  const handleNextImage = () => {
    if (!car.gallery?.length) return;
    setSelectedImageIndex((prev) => (prev + 1) % car.gallery.length);
  };

  const showGallery = car.gallery?.length > 1;

  return (
    <section className="section" style={{ background: "var(--surface-2)", paddingTop: 140 }}>
      <div className="container">
        <button type="button" className="btn-outline" onClick={onBack} style={{ marginBottom: 24 }}>
          ← Quay lại danh sách xe
        </button>

        <div className="car-detail-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.35fr) minmax(0, 0.85fr)", gap: 32, alignItems: "flex-start" }}>
          <div>
            <div style={{ position: "relative", borderRadius: 24, overflow: "hidden", boxShadow: "var(--shadow-lg)", background: "#000" }}>
              <img
                src={getSizedImage(currentImage, 1200, 900)}
                alt={car.name}
                style={{ width: "100%", display: "block", objectFit: "cover", aspectRatio: "4 / 3", maxHeight: 900 }}
              />

              {showGallery && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: 14,
                      transform: "translateY(-50%)",
                      border: "none",
                      background: "rgba(0,0,0,0.45)",
                      color: "#fff",
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      cursor: "pointer",
                      fontSize: 22,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImage}
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: 14,
                      transform: "translateY(-50%)",
                      border: "none",
                      background: "rgba(0,0,0,0.45)",
                      color: "#fff",
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      cursor: "pointer",
                      fontSize: 22,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            {showGallery && (
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 16 }}>
                {car.gallery.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setSelectedImageIndex(index)}
                    style={{
                      border: selectedImageIndex === index ? "2px solid var(--red)" : "1px solid var(--border)",
                      borderRadius: 16,
                      padding: 0,
                      background: "#fff",
                      cursor: "pointer",
                      width: 112,
                      height: 84,
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={getSizedImage(image, 280, 210)}
                      alt={`${car.name} ${index + 1}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div style={{ borderRadius: 24, background: "#fff", padding: 28, boxShadow: "var(--shadow-sm)" }}>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 18 }}>
                {car.type && <span className="chip" style={{ background: "#f8fafc", color: "#0f172a" }}>{car.type}</span>}
                {car.category && <span className="chip" style={{ background: "#f8fafc", color: "#0f172a" }}>{car.category}</span>}
                {car.badge && (
                  <span className="chip" style={{ background: `${car.badgeColor}22`, color: car.badgeColor }}>{car.badge}</span>
                )}
              </div>
              <h1 style={{ fontSize: "clamp(36px, 4vw, 48px)", margin: 0 }}>{car.name}</h1>
              <p style={{ margin: "18px 0 24px", color: "var(--text-2)", lineHeight: 1.8 }}>{car.description}</p>
              <div style={{ fontSize: 20, fontWeight: 800, color: "var(--text)" }}>{car.price}</div>

              <div className="car-detail-specs" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12, marginTop: 26 }}>
                {car.range && renderSpec("Đầm hành", car.range)}
                {car.power && renderSpec("Công suất", car.power)}
                {car.battery && renderSpec("Pin", car.battery)}
                {car.charging && renderSpec("Sạc", car.charging)}
                {car.seats && renderSpec("Số chỗ", car.seats)}
                {car.warranty && renderSpec("Bảo hành", car.warranty)}
                {car.dimensions && renderSpec("Kích thước", car.dimensions)}
                {car.weight && renderSpec("Trọng lượng", car.weight)}
              </div>
            </div>

            <div style={{ borderRadius: 24, background: "#fff", padding: 28, boxShadow: "var(--shadow-sm)" }}>
              <h2 style={{ marginTop: 0, marginBottom: 18 }}>Đặc điểm nổi bật</h2>
              <ul style={{ display: "grid", gap: 10, listStyle: "none", padding: 0, margin: 0 }}>
                {car.features?.map((feature) => (
                  <li key={feature} style={{ padding: "14px 18px", borderRadius: 16, background: "var(--surface-2)", color: "var(--text)", fontWeight: 600 }}>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {car.variants?.length > 0 ? (
              <div style={{ borderRadius: 24, background: "#fff", padding: 28, boxShadow: "var(--shadow-sm)" }}>
                <h2 style={{ marginTop: 0, marginBottom: 18 }}>Phiên bản</h2>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 18 }}>
                  {car.variants.map((variant, idx) => (
                    <button
                      key={variant.name}
                      type="button"
                      onClick={() => setSelectedVariantIndex(idx)}
                      style={{
                        padding: "12px 16px",
                        borderRadius: 14,
                        border: selectedVariantIndex === idx ? "2px solid var(--red)" : "1px solid var(--border)",
                        background: selectedVariantIndex === idx ? "var(--red)" : "#fff",
                        color: selectedVariantIndex === idx ? "#fff" : "var(--text)",
                        cursor: "pointer",
                        fontWeight: 700,
                      }}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 14, fontSize: 16, fontWeight: 700, letterSpacing: ".04em", color: "var(--text-3)" }}>
                  <span>GIÁ THAM KHẢO:</span>
                  <strong style={{ color: "var(--text)", fontWeight: 800 }}>{car.variants[selectedVariantIndex]?.price}</strong>
                  <span style={{ color: "var(--text-2)", fontWeight: 600 }}>hoặc</span>
                  <span>TRẢ TRƯỚC 10%:</span>
                  <strong style={{ color: "var(--text)", fontWeight: 800 }}>{formatMoney(parsePrice(car.variants[selectedVariantIndex]?.price) * 0.1)}</strong>
                </div>
              </div>
            ) : null}

            {car.promotion && (
              <div style={{ borderRadius: 24, background: "#fff", padding: 28, boxShadow: "var(--shadow-sm)", fontWeight: 700, color: "#92400e", backgroundColor: "#fffbf0", whiteSpace: "pre-line" }}>
                Khuyến mãi: {car.promotion}
              </div>
            )}

            <div style={{ borderRadius: 24, background: "#fff", padding: 28, boxShadow: "var(--shadow-sm)" }}>
              <h2 style={{ marginTop: 0, marginBottom: 16 }}>Liên hệ ngay</h2>
              <p style={{ margin: 0, color: "var(--text-2)", lineHeight: 1.75 }}>Hotline và Zalo luôn sẵn sàng. Anh/chị có thể gọi trực tiếp hoặc chat qua Zalo để được tư vấn nhanh nhất.</p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 20 }}>
                <button
                  type="button"
                  onClick={() => setShowPhoneInfo((prev) => !prev)}
                  style={{ padding: "14px 18px", borderRadius: 16, border: "1px solid var(--red)", background: showPhoneInfo ? "var(--red)" : "#fff", color: showPhoneInfo ? "#fff" : "var(--red)", cursor: "pointer", fontWeight: 700 }}
                >
                  📞 Hotline
                </button>
                <a
                  href={CONFIG.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Chat Zalo: ${CONFIG.zaloPhone}`}
                  style={{ padding: "14px 18px", borderRadius: 16, background: "var(--zalo)", color: "#fff", textDecoration: "none", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 8 }}
                >
                  <img src={CONFIG.ZALO_ICON_URL} alt="Zalo" style={{ width: 20, height: 20, display: "block" }} />
                  Chat Zalo
                </a>
              </div>
              {showPhoneInfo && (
                <div style={{ marginTop: 18, padding: 18, borderRadius: 16, border: "1px solid var(--border)", background: "var(--surface-2)" }}>
                  <div style={{ fontWeight: 700, marginBottom: 10 }}>Anh/chị vui lòng liên hệ số:</div>
                  <a href={`tel:${CONFIG.phoneRaw}`} style={{ color: "var(--red)", fontWeight: 800, display: "block", marginBottom: 10 }}>{CONFIG.phone}</a>
                  <p style={{ margin: 0, color: "var(--text-2)", lineHeight: 1.75 }}>Chúng tôi sẽ tư vấn chi tiết cho anh/chị ngay khi kết nối.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function parsePrice(value) {
  return Number(String(value || "").replace(/[^0-9]/g, "")) || 0;
}

function formatMoney(value) {
  return value ? new Intl.NumberFormat("vi-VN").format(value) : "";
}

function renderSpec(label, value) {
  return (
    <div style={{ background: "var(--surface-2)", borderRadius: 16, padding: 18 }}>
      <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: ".12em", color: "var(--text-3)", marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text)" }}>{value}</div>
    </div>
  );
}

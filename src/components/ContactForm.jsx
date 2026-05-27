import { useState, useEffect } from "react";
import { CONFIG, FORM_OPTIONS, SAMPLE_CARS } from "../config.js";
import { PhoneIcon } from "./Icons.jsx";
import useScrollReveal from "../hooks/useScrollReveal.js";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  budget: "",
  paymentType: "Trả thẳng",
  carModelSelect: "",
  customCarModel: "",
  carModel: "",
  interest: "Báo giá lăn bánh",
  note: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [hasInteractedWithContactForm, setHasInteractedWithContactForm] = useState(false);
  const revealRef = useScrollReveal({ deps: [] });

  // Listen for prefill events from CarCard
  useEffect(() => {
    const handler = (e) => {
      const { carModel, interest } = e.detail || {};
      const knownCarNames = SAMPLE_CARS.map((c) => c.name);
      const isKnown = carModel && knownCarNames.includes(carModel);
      setForm((prev) => ({
        ...prev,
        ...(interest ? { interest } : {}),
        ...(carModel ? {
          carModelSelect: isKnown ? carModel : "Khác",
          customCarModel: isKnown ? "" : carModel,
          carModel,
        } : {}),
      }));
    };
    window.addEventListener("byd:prefillForm", handler);
    return () => window.removeEventListener("byd:prefillForm", handler);
  }, []);

  useEffect(() => {
    if (status === "success" || hasInteractedWithContactForm) return undefined;
    const intervalId = window.setInterval(() => {
      setShowPopup(true);
    }, 20000); // Thời gian hiện form nhận tư vấn ngay
    return () => window.clearInterval(intervalId);
  }, [status, hasInteractedWithContactForm]);

  useEffect(() => {
    const showHandler = () => setShowPopup(true);
    window.addEventListener("byd:showContactPopup", showHandler);
    return () => window.removeEventListener("byd:showContactPopup", showHandler);
  }, []);

  useEffect(() => {
    if (status === "success") {
      setShowPopup(false);
    }
  }, [status]);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Vui lòng nhập họ tên";
    if (!form.phone.trim()) errs.phone = "Vui lòng nhập số điện thoại";
    else if (!/^[0-9]{9,11}$/.test(form.phone.replace(/\s/g, "")))
      errs.phone = "Số điện thoại không hợp lệ";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      if (name === "carModelSelect") {
        return {
          ...prev,
          carModelSelect: value,
          carModel: value === "Khác" ? "" : value,
          customCarModel: value === "Khác" ? prev.customCarModel : "",
        };
      }
      if (name === "customCarModel") {
        return {
          ...prev,
          customCarModel: value,
          carModel: value,
        };
      }
      return { ...prev, [name]: value };
    });
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setStatus("loading");
    const payload = {
      ...form,
      submittedAt: new Date().toLocaleString("vi-VN"),
      source: window.location.href,
    };

    if (!CONFIG.LEADS_API_URL || CONFIG.LEADS_API_URL === "YOUR_LEADS_API_URL_HERE") {
      console.log("📋 Form data (chưa có API):", payload);
      await new Promise((r) => setTimeout(r, 900));
      setStatus("success");
      setForm(initialForm);
      return;
    }

    try {
      await fetch(CONFIG.LEADS_API_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      console.error("Form submission error:", err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section" ref={revealRef} style={{ background: "var(--surface)" }}>
      <div className="container">
        <div className="reveal" style={{ textAlign: "center", marginBottom: 44 }}>
          <div className="eyebrow" style={{ justifyContent: "center", marginBottom: 14 }}>Liên hệ</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, color: "var(--text)", marginBottom: 10 }}>
            ĐĂNG KÝ <span style={{ color: "var(--red)" }}>BÁO GIÁ & LÁI THỬ</span>
          </h2>
          <p style={{ color: "var(--text-2)", maxWidth: 600, margin: "0 auto", fontSize: 15 }}>
            Để lại thông tin, chuyên viên BYD Đồng Nai sẽ liên hệ trong vòng 15 phút để tư vấn chi tiết và hỗ trợ đặt lịch lái thử miễn phí.
          </p>
        </div>

        <div className="reveal" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.2fr)", gap: 36, alignItems: "start", maxWidth: 1000, margin: "0 auto" }}>
          {/* Left: contact info */}
          <div style={{ background: "var(--byd-blue)", color: "#fff", borderRadius: 12, padding: "36px 28px", position: "sticky", top: 100, boxShadow: "var(--shadow-md)" }}>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 18 }}>Showroom BYD Đồng Nai</h3>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.6, marginBottom: 24 }}>
              Đại lý ủy quyền chính hãng — tư vấn chuyên nghiệp, lái thử miễn phí tận nơi.
            </p>
            <InfoLine icon={<PhoneIcon />} iconStyle={{ animation: "shake 1.8s ease-in-out infinite" }} label="Hotline" value={CONFIG.phone} href={`tel:${CONFIG.phoneRaw}`} />
            <InfoLine icon={<img src={CONFIG.ZALO_ICON_URL} alt="Zalo" style={{ width: 20, height: 20, display: "block" }} />} iconStyle={{ animation: "shake 1.8s ease-in-out infinite" }} label="Zalo" value={CONFIG.zaloPhone} href={CONFIG.zaloUrl} />
            <InfoLine icon="📍" label="Showroom" value={CONFIG.address} />
            <InfoLine icon="⏰" label="Giờ làm việc" value={CONFIG.workingHours} />
            <InfoLine icon="✉️" label="Email" value={CONFIG.email} href={`mailto:${CONFIG.email}`} />
            <div style={{ marginTop: 26, paddingTop: 22, borderTop: "1px solid rgba(255,255,255,0.18)", display: "flex", gap: 10 }}>
              <a href={`tel:${CONFIG.phoneRaw}`} style={{ flex: 1, background: "var(--red)", color: "#fff", padding: "12px", textAlign: "center", borderRadius: 6, fontSize: 13, fontWeight: 700 }}>Gọi ngay</a>
              <a href={CONFIG.zaloUrl} target="_blank" rel="noopener noreferrer" title={`Chat Zalo: ${CONFIG.zaloPhone}`} style={{ flex: 1, background: "var(--zalo)", color: "#fff", padding: "12px", textAlign: "center", borderRadius: 6, fontSize: 13, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <img src={CONFIG.ZALO_ICON_URL} alt="Zalo" style={{ width: 18, height: 18, display: "block" }} />
                Chat Zalo
              </a>
            </div>
          </div>

          {/* Right: form */}
          <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 12, padding: "32px 28px", boxShadow: "var(--shadow-sm)" }}>
            {status === "success" ? (
              <SuccessMessage onReset={() => setStatus("idle")} />
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }} onFocus={() => setHasInteractedWithContactForm(true)}>
                {/* Payment toggle */}
                <div>
                  <label style={labelStyle}>Hình thức thanh toán</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    {FORM_OPTIONS.paymentTypes.map((p) => (
                      <button
                        key={p} type="button"
                        onClick={() => setForm((prev) => ({ ...prev, paymentType: p }))}
                        style={{
                          padding: "12px 14px", border: "1.5px solid",
                          borderColor: form.paymentType === p ? "var(--red)" : "var(--border-strong)",
                          background: form.paymentType === p ? "var(--red-muted)" : "#fff",
                          color: form.paymentType === p ? "var(--red)" : "var(--text)",
                          fontWeight: 600, fontSize: 14, borderRadius: 6, cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {form.carModel && (
                  <div style={{ marginBottom: 18, padding: 18, borderRadius: 16, background: "rgba(214,0,0,0.06)", border: "1px solid rgba(214,0,0,0.12)", color: "var(--text)" }}>
                    <strong>Đã chọn mẫu xe:</strong> {form.carModel}. Chúng tôi sẽ ưu tiên liên hệ nhanh nhất.
                  </div>
                )}

                <div>
                  <label style={labelStyle}>Họ và tên <span style={{ color: "var(--red)" }}>*</span></label>
                  <input name="name" value={form.name} onChange={handleChange} className="field" placeholder="Nhập họ tên" />
                  {errors.name && <p style={errStyle}>{errors.name}</p>}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={labelStyle}>Số điện thoại <span style={{ color: "var(--red)" }}>*</span></label>
                    <input name="phone" value={form.phone} onChange={handleChange} className="field" placeholder="Nhập số điện thoại" inputMode="tel" />
                    {errors.phone && <p style={errStyle}>{errors.phone}</p>}
                  </div>
                  <div>
                    <label style={labelStyle}>Email</label>
                    <input name="email" value={form.email} onChange={handleChange} className="field" placeholder="email@example.com" type="email" />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={labelStyle}>Ngân sách dự kiến</label>
                    <select name="budget" value={form.budget} onChange={handleChange} className="field" style={{ appearance: "none", backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2'><path d='M6 9l6 6 6-6'/></svg>\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center", paddingRight: 40 }}>
                      <option value="">-- Chọn ngân sách --</option>
                      {FORM_OPTIONS.budgets.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Dòng xe quan tâm</label>
                    <select name="carModelSelect" value={form.carModelSelect} onChange={handleChange} className="field" style={{ appearance: "none", backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2'><path d='M6 9l6 6 6-6'/></svg>\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center", paddingRight: 40 }}>
                      <option value="">-- Chọn dòng xe --</option>
                      {SAMPLE_CARS.map((c) => (
                        <option key={c.id} value={c.name}>{c.name} ({c.type})</option>
                      ))}
                      <option value="Khác">Khác</option>
                    </select>
                    {form.carModelSelect === "Khác" && (
                      <input
                        name="customCarModel"
                        value={form.customCarModel}
                        onChange={handleChange}
                        className="field"
                        placeholder="Nhập tên mẫu xe khác"
                        style={{ marginTop: 12 }}
                      />
                    )}
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Nhu cầu</label>
                  <select name="interest" value={form.interest} onChange={handleChange} className="field" style={{ appearance: "none", backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2'><path d='M6 9l6 6 6-6'/></svg>\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center", paddingRight: 40 }}>
                    {FORM_OPTIONS.interests.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Ghi chú</label>
                  <textarea name="note" value={form.note} onChange={handleChange} rows={3} className="field" placeholder="Thời gian liên hệ, yêu cầu khác..." style={{ resize: "vertical" }} />
                </div>

                <button type="submit" disabled={status === "loading"} className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "15px 24px", marginTop: 4, opacity: status === "loading" ? 0.6 : 1, cursor: status === "loading" ? "not-allowed" : "pointer" }}>
                  {status === "loading" ? (
                    <>
                      <span style={{ display: "inline-block", width: 14, height: 14, border: "2px solid #fff", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      Gửi đăng ký
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </>
                  )}
                </button>

                {status === "error" && (
                  <p style={{ color: "var(--red)", fontSize: 13, textAlign: "center" }}>
                    Có lỗi xảy ra. Vui lòng gọi trực tiếp <a href={`tel:${CONFIG.phoneRaw}`} style={{ textDecoration: "underline" }}>{CONFIG.phone}</a>
                  </p>
                )}

                <p style={{ fontSize: 12, color: "var(--text-3)", textAlign: "center", marginTop: -4 }}>
                  🔒 Thông tin của bạn được bảo mật và chỉ dùng để liên hệ tư vấn.
                </p>
              </form>
            )}
          </div>
        </div>

        <div style={{ marginTop: 32, maxWidth: 1000, margin: "32px auto 0", borderRadius: 18, overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
          <iframe
            title="Bản đồ BYD Đồng Nai"
            src={`https://www.google.com/maps?q=${encodeURIComponent("Số 108, Xa lộ Hà Nội, Khu phố 31, Phường Tam Hiệp, Tỉnh Đồng Nai")}&output=embed`}
            width="100%"
            height="360"
            style={{ border: 0, minHeight: 360 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
      {showPopup && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.42)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 18 }}>
          <div style={{ width: "100%", maxWidth: 540, background: "#fff", borderRadius: 20, boxShadow: "0 24px 80px rgba(0,0,0,0.18)", overflow: "hidden", position: "relative" }}>
            <button
              type="button"
              onClick={() => setShowPopup(false)}
              style={{ position: "absolute", top: 16, right: 16, width: 36, height: 36, borderRadius: "50%", border: "none", background: "rgba(0,0,0,0.08)", color: "#111", fontSize: 20, cursor: "pointer" }}
              aria-label="Đóng form"
            >
              ×
            </button>
            <div style={{ padding: "28px 24px 20px", maxHeight: "calc(100vh - 80px)", overflowY: "auto" }}>
              <div style={{ marginBottom: 20 }}>
                <div className="eyebrow" style={{ justifyContent: "flex-start", marginBottom: 10 }}>Thông báo</div>
                <h3 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "var(--text)" }}>Nhận tư vấn ngay</h3>
              </div>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label style={labelStyle}>Họ và tên <span style={{ color: "var(--red)" }}>*</span></label>
                  <input name="name" value={form.name} onChange={handleChange} className="field" placeholder="Nhập họ tên" />
                  {errors.name && <p style={errStyle}>{errors.name}</p>}
                </div>
                <div>
                  <label style={labelStyle}>Số điện thoại <span style={{ color: "var(--red)" }}>*</span></label>
                  <input name="phone" value={form.phone} onChange={handleChange} className="field" placeholder="Nhập số điện thoại" inputMode="tel" />
                  {errors.phone && <p style={errStyle}>{errors.phone}</p>}
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input name="email" value={form.email} onChange={handleChange} className="field" placeholder="email@example.com" type="email" />
                </div>
                <div>
                  <label style={labelStyle}>Nhu cầu</label>
                  <select name="interest" value={form.interest} onChange={handleChange} className="field" style={{ appearance: "none", backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2'><path d='M6 9l6 6 6-6'/></svg>\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center", paddingRight: 40 }}>
                    {FORM_OPTIONS.interests.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
                <button type="submit" disabled={status === "loading"} className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "14px 22px", opacity: status === "loading" ? 0.6 : 1, cursor: status === "loading" ? "not-allowed" : "pointer" }}>
                  {status === "loading" ? (
                    <>
                      <span style={{ display: "inline-block", width: 14, height: 14, border: "2px solid #fff", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                      Đang gửi...
                    </>
                  ) : (
                    "Gửi thông tin"
                  )}
                </button>
                <button type="button" onClick={() => setShowPopup(false)} className="btn-outline" style={{ width: "100%", justifyContent: "center", padding: "12px 22px" }}>
                  Đóng
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } } @keyframes shake { 0%,100% { transform: translateX(0); } 20%,60% { transform: translateX(-1px); } 40%,80% { transform: translateX(1px); } } @media (max-width: 768px) { #contact .container > div:last-child { grid-template-columns: 1fr !important; } #contact .container > div:last-child > div:first-child { position: static !important; } }`}</style>
    </section>
  );
}

const labelStyle = { display: "block", fontSize: 12.5, fontWeight: 600, color: "var(--text)", marginBottom: 8, letterSpacing: ".02em" };
const errStyle = { color: "var(--red)", fontSize: 12, marginTop: 6 };

function InfoLine({ icon, iconStyle, label, value, href }) {
  const inner = (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 0" }}>
      <span style={{ fontSize: 18, lineHeight: 1, marginTop: 2, display: "inline-flex", alignItems: "center", justifyContent: "center", ...iconStyle }}>{icon}</span>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 3 }}>{label}</div>
        <div style={{ fontSize: 14, color: "#fff", fontWeight: 600, wordBreak: "break-word" }}>{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href} style={{ display: "block" }}>{inner}</a> : inner;
}

function SuccessMessage({ onReset }) {
  return (
    <div style={{ textAlign: "center", padding: "40px 20px" }}>
      <div style={{ width: 72, height: 72, borderRadius: "50%", background: "var(--red-muted)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 22px" }}>
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg>
      </div>
      <h3 style={{ fontSize: 22, fontWeight: 800, color: "var(--text)", marginBottom: 10 }}>Gửi thành công!</h3>
      <p style={{ color: "var(--text-2)", fontSize: 14, lineHeight: 1.6, maxWidth: 320, margin: "0 auto 26px" }}>
        Cảm ơn bạn đã đăng ký. Chuyên viên BYD Đồng Nai sẽ liên hệ trong vòng 15 phút.
      </p>
      <button onClick={onReset} className="btn-outline">Gửi yêu cầu khác</button>
    </div>
  );
}


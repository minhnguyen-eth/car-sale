import { useState } from "react";
import CarCard from "./CarCard.jsx";
import useScrollReveal from "../hooks/useScrollReveal.js";

export default function CarsSection({ cars = [], loading = false, onViewDetails }) {
  const [filter, setFilter] = useState("TẤT CẢ");
  const categories = ["TẤT CẢ", "EV", "SEDAN", "SUV", "MPV", "DM-I SUPER HYBRID"];
  const filtered = filter === "TẤT CẢ" ? cars : cars.filter((c) => String(c.type || "").toUpperCase() === filter);
  const sorted = [...filtered].reverse();
  const visibleCars = sorted;

  const revealRef = useScrollReveal({ deps: [cars.length, filter, loading] });

  
  return (
    <section id="cars" className="section" style={{ background: "var(--surface-2)" }} ref={revealRef}>
      <div className="container">
        <div className="reveal" style={{ textAlign: "center", marginBottom: 18 }}>
          <div className="eyebrow" style={{ justifyContent: "center", marginBottom: 14 }}>Sản phẩm</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, color: "var(--text)", marginBottom: 10 }}>
            MẪU XE
          </h2>
          <p style={{ color: "var(--text-2)", maxWidth: 620, margin: "0 auto", fontSize: 15 }}>
            Đại lý ủy quyền BYD chính hãng — đầy đủ các dòng xe BEV thuần điện và PHEV hybrid.
          </p>
        </div>

        <div className="reveal" style={{ display: "flex", justifyContent: "center", gap: 10, margin: "32px 0 36px", flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`filter-tab ${filter === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{ display: "inline-block", width: 36, height: 36, border: "3px solid var(--red)", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
          </div>
        )}

        {!loading && (
          <>
            <div className="one-column-mobile" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 22 }}>
              {visibleCars.map((car, i) => (
                <CarCard key={car.slug || i} car={car} index={i} onViewDetails={onViewDetails} />
              ))}
            </div>
          </>
        )}

        {!loading && filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-3)" }}>
            Không có xe trong danh mục này.
          </div>
        )}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}

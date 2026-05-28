import { useState } from "react";

export default function CarCard({
  car,
  index = 0,
  onQuote,
  onTestDrive,
  onViewDetails,
}) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  const imageSrc = car.image || car.heroImage;
  const priceClass = car.type === "PHEV" ? "phev" : "bev";

  const variants = Array.isArray(car.variants) ? car.variants : [];
  const selectedVariant = variants[selectedVariantIndex] || null;

  const variantLabel = [car.type, car.category]
    .filter(Boolean)
    .join(" - ");

  const handleQuote = () => {
    if (onQuote) onQuote(car);
    else showContactPopup(car, "Báo giá lăn bánh");
  };

  const handleDrive = () => {
    if (onTestDrive) onTestDrive(car);
    else showContactPopup(car, "Đặt lịch lái thử");
  };

  const handleDetails = () => {
    if (onViewDetails) onViewDetails(car);
    else {
      window.location.hash = `car-${
        car.slug || car.name?.toLowerCase().replace(/\s+/g, "-")
      }`;
    }
  };

  return (
    <div
      className="byd-car-card reveal"
      data-reveal-delay={(index % 3) * 80}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="img-wrap">
        <img
          src={imageSource(imageSrc, car.name)}
          alt={car.name}
          loading="lazy"
        />
      </div>

      <div className="body">
        {/* TÊN XE CĂN TRÁI */}
        <h3
          className="name"
          style={{
            textAlign: "left",
            width: "100%",
            marginBottom: 8,
          }}
        >
          {car.name}
        </h3>

        {variantLabel && (
          <div
            style={{
              marginBottom: 10,
              color: "var(--text-3)",
              fontSize: 13,
              fontWeight: 700,
              textAlign: "left",
            }}
          >
            {variantLabel}
          </div>
        )}

        {variants.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginBottom: 12,
            }}
          >
            {variants.map((variant, idx) => (
              <button
                key={variant.name}
                type="button"
                onClick={() => setSelectedVariantIndex(idx)}
                style={{
                  padding: "10px 14px",
                  borderRadius: 12,
                  border:
                    selectedVariantIndex === idx
                      ? "2px solid var(--red)"
                      : "1px solid var(--border)",
                  background:
                    selectedVariantIndex === idx
                      ? "var(--red)"
                      : "#fff",
                  color:
                    selectedVariantIndex === idx
                      ? "#fff"
                      : "var(--text)",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                {variant.name}
              </button>
            ))}
          </div>
        )}

        {selectedVariant ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 10,
              marginBottom: 10,
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: ".05em",
              color: "var(--text-3)",
              textAlign: "left",
            }}
          >
            <span>GIÁ THAM KHẢO:</span>

            <strong
              style={{
                color: "var(--text)",
                fontWeight: 800,
              }}
            >
              {selectedVariant.price}
            </strong>

            <span
              style={{
                color: "var(--text-2)",
                fontWeight: 600,
              }}
            >
              hoặc
            </span>

            <span>TRẢ TRƯỚC 10%:</span>

            <strong
              style={{
                color: "var(--text)",
                fontWeight: 800,
              }}
            >
              {formatMoney(parsePrice(selectedVariant.price) * 0.1)}
            </strong>
          </div>
        ) : (
          <div
            className={`price ${priceClass}`}
            style={{ textAlign: "left" }}
          >
            Giá niêm yết: <strong>{car.price}</strong>
          </div>
        )}

        {car.promotion && (
          <div
            style={{
              marginTop: 14,
              padding: "14px 16px",
              borderRadius: 16,
              background: "#fffbf0",
              color: "#92400e",
              fontWeight: 700,
              fontSize: 13,
              whiteSpace: "pre-line",
              textAlign: "left",
            }}
          >
            {car.promotion}
          </div>
        )}

        <div className="actions">
          <button
            type="button"
            className="btn-quote"
            onClick={handleQuote}
          >
            Báo giá lăn bánh
          </button>

          <button
            type="button"
            className="btn-drive"
            onClick={handleDrive}
          >
            Lái thử xe
          </button>
        </div>

        <button
          type="button"
          className="details-link"
          onClick={handleDetails}
        >
          Xem chi tiết
        </button>
      </div>
    </div>
  );
}

function imageSource(imageSrc, name) {
  return (
    imageSrc ||
    `https://placehold.co/800x500/EAEAEA/054a85?text=${encodeURIComponent(
      name || "BYD"
    )}`
  );
}

function parsePrice(value) {
  return Number(String(value || "").replace(/[^0-9]/g, "")) || 0;
}

function formatMoney(value) {
  return value
    ? new Intl.NumberFormat("vi-VN").format(value)
    : "";
}

function showContactPopup(car, interest) {
  try {
    window.dispatchEvent(
      new CustomEvent("byd:prefillForm", {
        detail: {
          carModel: car.name,
          interest,
        },
      })
    );

    window.dispatchEvent(
      new CustomEvent("byd:showContactPopup")
    );
  } catch {}
}
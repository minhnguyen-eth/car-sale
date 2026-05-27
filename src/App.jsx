import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import WhySection from "./components/WhySection.jsx";
import CarsSection from "./components/CarsSection.jsx";
import NewsSection from "./components/NewsSection.jsx";
import PromoSection from "./components/PromoSection.jsx";
import ContactForm from "./components/ContactForm.jsx";
import Footer from "./components/Footer.jsx";
import FloatingCTA from "./components/FloatingCTA.jsx";
import CarDetail from "./components/CarDetail.jsx";
import { CONFIG, SAMPLE_CARS } from "./config.js";

const getCarSlugFromHash = () => {
  const hash = window.location.hash || "";
  if (!hash.startsWith("#car-")) return null;
  return hash.replace("#car-", "");
};

const buildCarUrl = (url) => {
  if (!url) return "";
  try {
    const parsed = new URL(url);
    parsed.searchParams.set("sheet", "Xe");
    return parsed.toString();
  } catch {
    return url;
  }
};

const parseCarRow = (row, index) => {
  const data = Object.entries(row).reduce((acc, [key, value]) => {
    const normalizedKey = String(key || "").trim().toLowerCase();
    acc[normalizedKey] = value;
    return acc;
  }, {});

  const name = String(data.name || "").trim();
  if (!name) return null;

  const category = String(data.category || "").trim();
  const badgeColor = String(data.badgecolor || "").trim() || "#e4002b";
  const colors = String(data.colors || "").split(",").map((value) => value.trim()).filter(Boolean);
  const features = String(data.features || "").split(",").map((value) => value.trim()).filter(Boolean);
  const promotion = String(data.promotion || data.promo || "").trim();

  const slug = String(name).toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  const imageUrl = String(data.image || "").trim();
  const rawGallery = String(data.images || data.gallery || data.image || "").trim();
  const gallery = rawGallery
    ? rawGallery
        .split(/[\n,;]+/)
        .map((item) => item.trim())
        .filter(Boolean)
    : [];
  const heroImage = gallery[0] || imageUrl;

  const rawType = String(data.type || "").trim();
  const normalizedCategory = category.toUpperCase();
  const type = rawType
    ? rawType.toUpperCase()
    : normalizedCategory.includes("DM-I") || normalizedCategory.includes("SUPER HYBRID")
      ? "DM-I SUPER HYBRID"
      : normalizedCategory.includes("SUV")
        ? "SUV"
        : normalizedCategory.includes("SEDAN")
          ? "SEDAN"
          : normalizedCategory.includes("MPV")
            ? "MPV"
            : normalizedCategory.includes("EV")
              ? "EV"
              : "EV";

  const variants = [];
  const advName = String(data.variantadvancedname || data.variant1name || "ADVANCED").trim() || "ADVANCED";
  const advPrice = String(data.variantadvancedprice || data.variant1price || "").trim();
  if (advPrice) variants.push({ name: advName.toUpperCase(), price: advPrice });

  const premName = String(data.variantpremiumname || data.variant2name || "PREMIUM").trim() || "PREMIUM";
  const premPrice = String(data.variantpremiumprice || data.variant2price || "").trim();
  if (premPrice) variants.push({ name: premName.toUpperCase(), price: premPrice });

  if (!variants.length && String(data.variants || "").trim()) {
    const parsedVariants = String(data.variants)
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => {
        const parts = item.split(/[:|=]/).map((v) => v.trim());
        return parts[0] && parts[1] ? { name: parts[0].toUpperCase(), price: parts[1] } : null;
      })
      .filter(Boolean);
    variants.push(...parsedVariants);
  }

  return {
    id: index + 1,
    slug,
    name,
    type,
    category,
    price: String(data.price || "").trim(),
    promotion,
    range: String(data.range || "").trim(),
    power: String(data.power || "").trim(),
    acceleration: String(data.acceleration || "").trim(),
    battery: String(data.battery || "").trim(),
    charging: String(data.charging || "").trim(),
    seats: String(data.seats || "").trim(),
    warranty: String(data.warranty || "").trim(),
    badge: String(data.badge || "").trim(),
    badgeColor,
    description: String(data.description || "").trim(),
    features,
    variants,
    colorOptions: colors.map((hex) => ({ name: "", hex, image: heroImage })),
    gallery,
    heroImage,
    topSpeed: String(data.topspeed || "").trim(),
    dimensions: String(data.dimensions || "").trim(),
    weight: String(data.weight || "").trim(),
  };
};

export default function App() {
  const [cars, setCars] = useState(SAMPLE_CARS);
  const [loadingCars, setLoadingCars] = useState(true);
  const [selectedHash, setSelectedHash] = useState(getCarSlugFromHash());

  useEffect(() => {
    const loadCars = async () => {
      if (!CONFIG.CARS_API_URL || CONFIG.CARS_API_URL.includes("YOUR_CARS_API_URL_HERE")) {
        setCars(SAMPLE_CARS);
        setLoadingCars(false);
        return;
      }

      try {
        const response = await fetch(buildCarUrl(CONFIG.CARS_API_URL));
        const data = await response.json();
        const mapped = Array.isArray(data)
          ? data.map((row, index) => parseCarRow(row, index)).filter(Boolean)
          : [];

        setCars(mapped.length > 0 ? mapped : SAMPLE_CARS);
      } catch (error) {
        console.error("Lỗi tải dữ liệu xe:", error);
        setCars(SAMPLE_CARS);
      } finally {
        setLoadingCars(false);
      }
    };

    loadCars();
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setSelectedHash(getCarSlugFromHash());
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const selectedCar = selectedHash ? cars.find((car) => car.slug === selectedHash) : null;

  const handleSelectCar = (slug) => {
    if (!slug) return;
    window.location.hash = `car-${slug}`;
  };

  const handleBackToHome = () => {
    window.location.hash = "#hero";
  };

  return (
    <>
      <Navbar cars={cars} onSelectCar={handleSelectCar} />
      {selectedCar ? (
        <CarDetail car={selectedCar} onBack={handleBackToHome} />
      ) : (
        <>
          <Hero />
          <WhySection />
          <CarsSection cars={cars} loading={loadingCars} onViewDetails={(car) => handleSelectCar(car.slug)} />
          <NewsSection />
          <PromoSection />
        </>
      )}
      <ContactForm cars={cars} />
      <Footer cars={cars} />
      <FloatingCTA />
    </>
  );
}
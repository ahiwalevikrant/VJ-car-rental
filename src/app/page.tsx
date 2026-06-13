"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CallUsButton } from "@/components/CallUsButton";

const withBasePath = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

// ===== FLEET DATA =====
const cars = [
  { id: 1, name: "Fortuner", brand: "Toyota", type: "suv", category: "SUV", price: 3999, fuel: "Petrol", seats: 7, trans: "Auto", emoji: "🏔️", img: "/assets/fortuner.jpg" },
  { id: 2, name: "Thar", brand: "Mahindra", type: "offroad", category: "Off-Road", price: 2999, fuel: "Diesel", seats: 4, trans: "Manual", emoji: "🌲", img: "/assets/thar.jpg" },
  { id: 3, name: "Swift", brand: "Maruti Suzuki", type: "hatchback", category: "Hatchback", price: 799, fuel: "Petrol", seats: 5, trans: "Manual", emoji: "⚡", img: "/assets/swift.jpg" },
  { id: 4, name: "Creta", brand: "Hyundai", type: "suv", category: "SUV", price: 1699, fuel: "Petrol", seats: 5, trans: "Auto", emoji: "🚗", img: "/assets/creta.jpg" },
  { id: 5, name: "Innova Crysta", brand: "Toyota", type: "suv", category: "MUV", price: 2499, fuel: "Diesel", seats: 8, trans: "Manual", emoji: "👨‍👩‍👧‍👦", img: "/assets/innova.jpg" },
  { id: 6, name: "Baleno", brand: "Maruti Suzuki", type: "hatchback", category: "Hatchback", price: 899, fuel: "Petrol", seats: 5, trans: "Auto", emoji: "🌟", img: "/assets/baleno.jpg" },
  { id: 7, name: "Seltos", brand: "Kia", type: "suv", category: "SUV", price: 1899, fuel: "Petrol", seats: 5, trans: "Auto", emoji: "💎", img: "/assets/seltos.jpg" },
  { id: 8, name: "Glanza", brand: "Toyota", type: "hatchback", category: "Hatchback", price: 849, fuel: "Petrol", seats: 5, trans: "Manual", emoji: "✨", img: "/assets/glanza.jpg" },
  { id: 9, name: "Scorpio N", brand: "Mahindra", type: "suv", category: "SUV", price: 2299, fuel: "Diesel", seats: 7, trans: "Auto", emoji: "🦁", img: "/assets/scorpio.jpg" },
  { id: 10, name: "Dzire", brand: "Maruti Suzuki", type: "sedan", category: "Sedan", price: 999, fuel: "CNG", seats: 5, trans: "Auto", emoji: "🏙️", img: "/assets/dzire.jpg" },
  { id: 11, name: "City", brand: "Honda", type: "sedan", category: "Sedan", price: 1299, fuel: "Petrol", seats: 5, trans: "Auto", emoji: "🔥", img: "/assets/city.jpg" },
  { id: 12, name: "Nexon EV", brand: "Tata", type: "suv", category: "SUV", price: 1999, fuel: "Electric", seats: 5, trans: "Auto", emoji: "⚡", img: "/assets/nexon.jpg" },
  { id: 13, name: "Punch", brand: "Tata", type: "suv", category: "SUV", price: 1099, fuel: "Petrol", seats: 5, trans: "Manual", emoji: "👊", img: "/assets/punch.jpg" },
  { id: 14, name: "WagonR", brand: "Maruti Suzuki", type: "hatchback", category: "Hatchback", price: 699, fuel: "CNG", seats: 5, trans: "Manual", emoji: "🌈", img: "/assets/wagonr.jpg" },
  { id: 15, name: "XUV700", brand: "Mahindra", type: "suv", category: "SUV", price: 2799, fuel: "Diesel", seats: 7, trans: "Auto", emoji: "🚀", img: "/assets/xuv700.jpg" },
  { id: 16, name: "Fortuner Legender", brand: "Toyota", type: "luxury", category: "Luxury", price: 4999, fuel: "Diesel", seats: 7, trans: "Auto", emoji: "👑", img: "/assets/legender.jpg" },
];

const requestedCars = [
  { id: 1, name: "Thar", brand: "Mahindra", type: "offroad", category: "Off-Road", price: 4500, fuel: "Diesel", seats: 4, trans: "Manual", emoji: "4x4", img: "/assets/thar.jpg" },
  { id: 2, name: "CRETA", brand: "Hyundai", type: "suv", category: "SUV", price: 3500, fuel: "Petrol", seats: 5, trans: "Manual", emoji: "SUV", img: "/assets/creta.jpg" },
  { id: 3, name: "Fronx", brand: "Maruti Suzuki", type: "hatchback", category: "Hatchback", price: 2500, fuel: "Petrol", seats: 5, trans: "Manual", emoji: "AT", img: "/assets/fronx.jpg" },
  { id: 4, name: "New i20", brand: "Hyundai", type: "hatchback", category: "Hatchback", price: 2400, fuel: "Petrol", seats: 5, trans: "Manual", emoji: "HB", img: "/assets/new-i20.jpg" },
  { id: 5, name: "Grand i10 nios", brand: "Hyundai", type: "hatchback", category: "Hatchback", price: 2100, fuel: "Petrol", seats: 5, trans: "Manual", emoji: "HB", img: "/assets/grand-i10-nios.jpg" },
  { id: 6, name: "New Swift", brand: "Maruti Suzuki", type: "hatchback", category: "Hatchback", price: 2200, fuel: "Petrol", seats: 5, trans: "Manual", emoji: "HB", img: "/assets/new-swift.jpg" },
  { id: 7, name: "Baleno", brand: "Maruti Suzuki", type: "hatchback", category: "Hatchback", price: 2300, fuel: "Petrol", seats: 5, trans: "Manual", emoji: "HB", img: "/assets/baleno.jpg" },
  { id: 8, name: "Venue", brand: "Hyundai", type: "suv", category: "SUV", price: 2800, fuel: "Petrol", seats: 5, trans: "Manual", emoji: "SUV", img: "/assets/venue.jpg" },
  { id: 9, name: "Breeza", brand: "Maruti Suzuki", type: "suv", category: "SUV", price: 2700, fuel: "Petrol", seats: 5, trans: "Manual", emoji: "SUV", img: "/assets/brezza.jpg" },
  { id: 10, name: "Innova CRYSTA", brand: "Toyota", type: "muv", category: "MUV", price: 4500, fuel: "Diesel", seats: 7, trans: "Manual", emoji: "MUV", img: "/assets/innova-crysta.jpg" },
  { id: 11, name: "Ertiga", brand: "Maruti Suzuki", type: "muv", category: "MUV", price: 3200, fuel: "Petrol", seats: 7, trans: "Manual", emoji: "MUV", img: "/assets/ertiga.jpg" },
  { id: 12, name: "Dzire cng", brand: "Maruti Suzuki", type: "sedan", category: "Sedan", price: 2600, fuel: "CNG", seats: 5, trans: "Manual", emoji: "CNG", img: "/assets/dzire-cng.jpg" },
  { id: 13, name: "Fronx cng", brand: "Maruti Suzuki", type: "hatchback", category: "Hatchback", price: 2600, fuel: "CNG", seats: 5, trans: "Manual", emoji: "CNG", img: "/assets/fronx-cng.jpg" },
  { id: 14, name: "Baleno cng", brand: "Maruti Suzuki", type: "hatchback", category: "Hatchback", price: 2600, fuel: "CNG", seats: 5, trans: "Manual", emoji: "CNG", img: "/assets/baleno-cng.jpg" },
  { id: 15, name: "Fronx petrol", brand: "Maruti Suzuki", type: "hatchback", category: "Hatchback", price: 2500, fuel: "Petrol", seats: 5, trans: "Manual", emoji: "PTL", img: "/assets/fronx-petrol.jpg" },
  { id: 16, name: "Altroz", brand: "Tata", type: "hatchback", category: "Hatchback", price: 2400, fuel: "Petrol", seats: 5, trans: "Manual", emoji: "HB", img: "/assets/altroz.jpg" },
];

const termCommands: Record<string, () => string[]> = {
  help: () => ["Available commands:", "  book    — Start a booking", "  prices  — Show pricing", "  cars    — List fleet", "  status  — System status", "  hubs    — Show pickup hubs", "  clear   — Clear terminal"],
  book: () => ["→ Opening booking wizard...", "✓ Select your car → Select dates → Confirm → Done!", "💳 Payment via UPI, Card, or Cash"],
  prices: () => ["💰 VJ Car Rental Pricing:", "  Hatchback  — ₹699–₹999/day", "  Sedan      — ₹999–₹1,499/day", "  SUV        — ₹1,699–₹2,799/day", "  Luxury     — ₹3,999+/day", "  Off-Road   — ₹2,999/day"],
  cars: () => ["🚗 Available Now (Pune):", "  ✓ Toyota Fortuner · SUV · ₹3,999", "  ✓ Maruti Swift · Hatchback · ₹799", "  ✓ Mahindra Thar · Off-Road · ₹2,999", "  ✓ Hyundai Creta · SUV · ₹1,699", "  ✓ Tata Nexon EV · SUV · ₹1,999", "  ✓ 11 more cars available →"],
  status: () => ["System Status:", "  ✓ API — 99.98% uptime", "  ✓ Booking engine — Active", "  ✓ GPS tracker — Active", "  ✓ Payment gateway — Active", "  ℹ 34 cars available in Pune"],
  hubs: () => ["📍 VJ Pick-Up Hubs:", "  → Koregaon Park, Pune"],
  clear: () => ["__CLEAR__"],
};

termCommands.prices = () => [
  "VJ Car Rental Pricing:",
  "  Hatchback  - Rs. 2,100-Rs. 2,600/day",
  "  Sedan      - Rs. 2,600/day",
  "  SUV        - Rs. 2,700-Rs. 3,500/day",
  "  MUV        - Rs. 3,200-Rs. 4,500/day",
  "  Off-Road   - Rs. 4,500/day",
];

termCommands.cars = () => [
  "Available Now (Pune):",
  ...requestedCars.slice(0, 8).map((car) => `  - ${car.brand} ${car.name} - Rs. ${car.price.toLocaleString()}`),
  `  - ${requestedCars.length - 8} more cars available`,
];

termCommands.status = () => [
  "System Status:",
  "  Booking engine - Active",
  "  GPS tracker - Active",
  "  Payment gateway - Active",
  `  ${requestedCars.length} cars available in Pune`,
];

export default function Home() {
  const [filter, setFilter] = useState("all");
  const [favs, setFavs] = useState<Set<number>>(new Set());
  const [toast, setToast] = useState<string | null>(null);
  const [theme, setTheme] = useState("midnight");
  const [bookingInquiry, setBookingInquiry] = useState({
    location: "Pune - Koregaon Park Hub",
    carType: "All Types",
    pickupDate: "",
    returnDate: "",
  });
  const [termLines, setTermLines] = useState<{ type: string; text: string }[]>([
    { type: "info", text: "VJ Terminal v2.0 — Type help to start" },
    { type: "output", text: "$ _" },
  ]);
  const [termInput, setTermInput] = useState("");
  const termBodyRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Loader
  useEffect(() => {
    const t = setTimeout(() => {
      if (loaderRef.current) {
        loaderRef.current.style.opacity = "0";
        setTimeout(() => {
          if (loaderRef.current) loaderRef.current.style.display = "none";
        }, 500);
      }
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  // Scroll reveal
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    reveals.forEach((r) => observer.observe(r));
    return () => observer.disconnect();
  }, []);

  // Navbar scroll shadow
  useEffect(() => {
    const nav = document.getElementById("navbar");
    const onScroll = () => {
      if (nav) nav.style.boxShadow = window.scrollY > 50 ? "0 8px 40px rgba(0,0,0,0.3)" : "none";
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filteredCars = filter === "all" ? requestedCars : requestedCars.filter((c) => c.type === filter);

  const toggleFav = (id: number) => {
    setFavs((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleWhatsAppBook = (carName: string, carPrice: number) => {
    const phoneNumber = "918788561680";
    const message = `Hi VJ Rentals! I want to book ${carName} for ₹${carPrice}/day. Please provide available dates and confirm booking.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleSearchRidesInquiry = () => {
    const phoneNumber = "918788561680";
    const location = bookingInquiry.location.includes("Koregaon")
      ? "Pune - Koregaon Park Hub"
      : bookingInquiry.location;
    const message = [
      "Hi VJ Rentals! I want to check car availability.",
      `Pick-up location: ${location}`,
      `Car type: ${bookingInquiry.carType}`,
      `Pick-up date: ${bookingInquiry.pickupDate || "Not selected"}`,
      `Return date: ${bookingInquiry.returnDate || "Not selected"}`,
      "Please share available cars and pricing.",
    ].join("\n");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    showToast("Sending your ride inquiry on WhatsApp...");
  };

  const handleTerminal = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    const cmd = termInput.trim().toLowerCase();
    if (!cmd) return;
    const newLines: { type: string; text: string }[] = [
      ...termLines,
      { type: "cmd", text: `$ ${cmd}` },
    ];
    const fn = termCommands[cmd];
    if (fn) {
      const lines = fn();
      if (lines[0] === "__CLEAR__") {
        setTermLines([{ type: "info", text: "Terminal cleared." }]);
      } else {
        lines.forEach((l) => {
          newLines.push({
            type: l.startsWith("✓") ? "success" : l.startsWith("✗") ? "error" : l.startsWith("→") || l.startsWith("ℹ") ? "info" : "output",
            text: l,
          });
        });
        setTermLines(newLines);
      }
    } else {
      newLines.push({ type: "error", text: `✗ Command not found: "${cmd}". Type "help" to see commands.` });
      setTermLines(newLines);
    }
    setTermInput("");
    setTimeout(() => {
      if (termBodyRef.current) termBodyRef.current.scrollTop = termBodyRef.current.scrollHeight;
    }, 50);
  };

  return (
    <>
      {/* Loader */}
      <div className="page-loader" ref={loaderRef}>
        <div className="loader-logo">VJ RENTAL</div>
        <div className="loader-bar"><div className="loader-progress"></div></div>
        <div className="loader-text">LOADING YOUR RIDE...</div>
      </div>

      {/* NAVBAR */}
      <nav id="navbar">
        <div className="logo">
          <div className="logo-dot"></div>
          VJ RENTALS
        </div>
        <ul className="nav-links">
          <li><a href="#fleet">Fleet</a></li>
          <li><a href="#routes">Routes</a></li>
          <li><a href="#why">Why VJ</a></li>
          <li><a href="#reviews">Reviews</a></li>
          <li><a href="#" className="nav-cta">Book Now →</a></li>
        </ul>
        <div className="theme-switcher">
          {["midnight", "solar", "emerald", "crimson", "chrome"].map((t) => (
            <button
              key={t}
              className={`theme-btn${theme === t ? " active" : ""}`}
              data-t={t}
              title={t.charAt(0).toUpperCase() + t.slice(1)}
              onClick={() => setTheme(t)}
            />
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-road-bg">
          <Image
            src={withBasePath("/assets/legender.jpg")}
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-road-img"
          />
        </div>
        {/* Full-screen car video background */}
        <div className="hero-video-bg">
          <video
            preload="none"
            muted
            loop
            playsInline
            poster={withBasePath("/assets/legender.jpg")}
          >
            {/* Free Pexels car driving video — license: pexels.com/license */}
            <source src="https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4" type="video/mp4" />
            <source src="https://videos.pexels.com/video-files/2053855/2053855-hd_1920_1080_30fps.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Cinematic dark overlay */}
        <div className="hero-video-overlay" />

        {/* Subtle orbs still layered over video for accent glow */}
        <div className="hero-orb orb1" />
        <div className="hero-orb orb2" />

        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            Pune City· Now Open
          </div>
          <h1>DRIVE<span>YOUR VIBE</span>YOUR RULES</h1>
          <p>Premium self-drive car rentals built for Pune&apos;s youth. Hit the expressway in style — from weekend Goa trips to Mumbai meetups.</p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => document.getElementById("fleet")?.scrollIntoView({ behavior: "smooth" })}>
              Explore Fleet 🚗
            </button>
            <button className="btn-ghost">How It Works</button>
          </div>
          <div className="hero-stats">
            <div><div className="stat-num">16</div><div className="stat-label">Cars Available</div></div>
            <div><div className="stat-num">1</div><div className="stat-label">City Hub</div></div>
            <div><div className="stat-num">4.9★</div><div className="stat-label">Avg Rating</div></div>
          </div>
        </div>

        {/* Hero Car Visual */}
        <div className="hero-visual">
          <div className="car-stage">
         
            {/* Hero image: Fortuner Legender as flagship */}
            <Image
              src={withBasePath("/assets/legender.jpg")}
              alt="Toyota Fortuner Legender — VJ Car Rental"
              width={650}
              height={370}
              className="hero-car-img"
              priority
              style={{ objectFit: "contain" }}
            />
            <div className="car-glow-ring"></div>
            <div className="car-tags tags-right">
              <div className="car-tag" style={{ animationDelay: "0.5s" }}><span className="car-tag-icon">📍</span> Pune Hub</div>
              <div className="car-tag" style={{ animationDelay: "1.5s" }}><span className="car-tag-icon">💳</span> Zero Deposit</div>
            </div>
          </div>
        </div>
      </section>


      {/* MARQUEE */}
      <div className="marquee-strip">
        <div className="marquee-inner">
          {["PUNE TO MUMBAI", "TOYOTA FORTUNER", "MARUTI SWIFT", "MAHINDRA THAR", "SELF DRIVE", "24/7 SUPPORT", "PUNE TO LONAVALA", "HYUNDAI CRETA", "NO HIDDEN CHARGES",
            "PUNE TO MUMBAI", "TOYOTA FORTUNER", "MARUTI SWIFT", "MAHINDRA THAR", "SELF DRIVE", "24/7 SUPPORT", "PUNE TO LONAVALA", "HYUNDAI CRETA", "NO HIDDEN CHARGES"].map((item, i) => (
            <span key={i} className={item === "•" ? "marquee-sep" : "marquee-item"}>{item} <span className="marquee-sep">•</span></span>
          ))}
        </div>
      </div>

      {/* BOOKING BAR */}
      <div className="booking-bar reveal">
        <div className="book-field">
          <label>📍 Pick-up Location</label>
          <select
            onChange={(e) => setBookingInquiry((prev) => ({ ...prev, location: e.target.value }))}
          >
            <option>Pune — Koregaon Park Hub</option>
            <option value="Pune - Hinjewadi Hub">Pune - Hinjewadi Hub</option>
            <option value="Pune - Shivajinagar Hub">Pune - Shivajinagar Hub</option>
            <option value="Mumbai - Andheri Hub">Mumbai - Andheri Hub</option>
            <option value="Mumbai - Thane Hub">Mumbai - Thane Hub</option>
          </select>
        </div>
        <div className="book-field">
          <label>🚗 Car Type</label>
          <select
            value={bookingInquiry.carType}
            onChange={(e) => setBookingInquiry((prev) => ({ ...prev, carType: e.target.value }))}
          >
            <option value="All Types">All Types</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="MUV">MUV</option>
            <option value="Off-Road">Off-Road</option>
            <option value="Luxury">Luxury</option>
          </select>
        </div>
        <div className="book-field">
          <label>📅 Pick-up Date</label>
          <input
            type="date"
            value={bookingInquiry.pickupDate}
            onChange={(e) => setBookingInquiry((prev) => ({ ...prev, pickupDate: e.target.value }))}
          />
        </div>
        <div className="book-field">
          <label>📅 Return Date</label>
          <input
            type="date"
            value={bookingInquiry.returnDate}
            onChange={(e) => setBookingInquiry((prev) => ({ ...prev, returnDate: e.target.value }))}
          />
        </div>
        <button className="book-search-btn" onClick={handleSearchRidesInquiry}>
          Search Rides →
        </button>
      </div>

      {/* FLEET SECTION */}
      <section className="fleet" id="fleet">
        <div className="split-header reveal">
          <div>
            <div className="section-tag">OUR FLEET</div>
            <h2 className="section-title">PICK YOUR<br />PERFECT RIDE</h2>
            <p className="section-sub" style={{ marginBottom: 0 }}>
              From city zips to mountain escapes — every car is GPS-fitted, fully insured, and ready to roll.
            </p>
          </div>
          <div className="filter-tabs">
            {[["all", "All"], ["hatchback", "Hatchback"], ["sedan", "Sedan"], ["suv", "SUV"], ["muv", "MUV"], ["offroad", "Off-Road"]].map(([val, label]) => (
              <button
                key={val}
                className={`filter-tab${filter === val ? " active" : ""}`}
                onClick={() => setFilter(val)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="cars-grid">
          {filteredCars.map((car) => (
            <div className="car-card" key={car.id} data-type={car.type}>
              <div className="car-img-wrap">
                <span className="car-type-pill">{car.category}</span>
                <span
                  className="car-fav"
                  onClick={() => toggleFav(car.id)}
                  style={{ color: favs.has(car.id) ? "#ef4444" : undefined }}
                >
                  {favs.has(car.id) ? "♥" : "♡"}
                </span>
                <Image
                  src={withBasePath(car.img)}
                  alt={`${car.brand} ${car.name}`}
                  width={320}
                  height={180}
                  style={{ objectFit: "contain", width: "100%", height: "100%" }}
                />
              </div>
              <div className="car-info">
                <div className="car-name">{car.name}</div>
                <div className="car-brand">{car.brand} · {car.emoji}</div>
                <div className="car-specs">
                  <div className="spec"><span className="spec-icon">⛽</span><span className="spec-val">{car.fuel}</span><span>Fuel</span></div>
                  <div className="spec"><span className="spec-icon">👥</span><span className="spec-val">{car.seats}</span><span>Seats</span></div>
                  <div className="spec"><span className="spec-icon">⚙️</span><span className="spec-val">{car.trans}</span><span>Trans</span></div>
                </div>
                <div className="car-footer">
                  <div className="car-price">
                    <div className="per">Starting from</div>
                    <div className="amount">₹{car.price.toLocaleString()}</div>
                    <div className="unit">per day</div>
                  </div>
                  <button className="book-btn" onClick={() => handleWhatsAppBook(car.name, car.price)}>
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY VJ */}
      <section id="why">
        <div className="reveal" style={{ textAlign: "center", maxWidth: "560px", margin: "0 auto 60px" }}>
          <div className="section-tag">WHY VJ</div>
          <h2 className="section-title">MORE THAN<br />JUST A CAR</h2>
          <p className="section-sub" style={{ margin: "0 auto" }}>
            We built VJ Car Rental for people like us — young, moving fast, with places to be and stories to create.
          </p>
        </div>
        <div className="why-grid">
          {[
            { icon: "⚡", title: "Instant Booking", desc: "Book in under 60 seconds. No calls, no waiting, no drama. Just pick, pay, drive." },
            { icon: "🛡️", title: "Zero Hidden Charges", desc: "Price shown = price paid. No surprise fuel surcharges or late billing tricks." },
            { icon: "📍", title: "Doorstep Delivery", desc: "Get the car delivered to your home, hotel, or hostel. And picked back up too." },
            { icon: "🔒", title: "Fully Insured", desc: "Every ride covered under comprehensive insurance. Drive worry-free, literally." },
            { icon: "🌙", title: "24/7 Support", desc: "3 AM flat tire? Roadside emergency? Our crew is always one call away." },
            { icon: "🎵", title: "Premium Interiors", desc: "Clean cars, Bluetooth audio, phone mounts — set the vibe before you even leave Pune." },
          ].map((w) => (
            <div className="why-card reveal" key={w.title}>
              <span className="why-icon">{w.icon}</span>
              <div className="why-title">{w.title}</div>
              <div className="why-desc">{w.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ROUTES */}
      <section id="routes" style={{ background: "var(--bg2)", transition: "background 0.5s" }}>
        <div className="reveal">
          <div className="section-tag">POPULAR ROUTES</div>
          <h2 className="section-title">WHERE WILL<br />YOU GO?</h2>
          <p className="section-sub">Most-loved road trips our customers take.</p>
        </div>
        <div className="routes-grid reveal">
          {[
            { icon: "🏙️", name: "Pune → Mumbai", dist: "148 km · ~2.5 hrs" },
            { icon: "⛰️", name: "Pune → Lonavala", dist: "65 km · ~1.5 hrs" },
            { icon: "🌊", name: "Pune → Alibaug", dist: "142 km · ~3 hrs" },
            { icon: "🏖️", name: "Pune → Goa", dist: "458 km · ~8 hrs" },
            { icon: "🗻", name: "Pune → Mahabaleshwar", dist: "120 km · ~3 hrs" },
            { icon: "🏔️", name: "Pune → Nashik", dist: "210 km · ~4 hrs" },
            { icon: "🌴", name: "Mumbai → Pune", dist: "148 km · ~2.5 hrs" },
            { icon: "🎡", name: "Pune → Aurangabad", dist: "237 km · ~4.5 hrs" },
          ].map((r) => (
            <div className="route-card" key={r.name}>
              <span className="route-icon">{r.icon}</span>
              <div>
                <div className="route-name">{r.name}</div>
                <div className="route-dist">{r.dist}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials" id="reviews">
        <div className="split-header reveal">
          <div>
            <div className="section-tag">REVIEWS</div>
            <h2 className="section-title">WHAT THE<br />CREW SAYS</h2>
          </div>
          <div style={{ color: "var(--text2)", fontSize: "0.85rem", textAlign: "right" }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "3rem", color: "var(--accent)", lineHeight: 1 }}>4.9</div>
            <div>⭐⭐⭐⭐⭐</div>
            <div>Based on 1,200+ rides</div>
          </div>
        </div>
        <div className="testi-grid">
          {[
            { avatar: "👦", name: "Arjun M.", loc: "Koregaon Park, Pune", text: "Booked a Fortuner for our Goa trip last minute. Clean car, delivered on time, and the roads were unreal. VJ made it happen!" },
            { avatar: "👧", name: "Priya S.", loc: "Hinjewadi, Pune", text: "Rented the Thar for a group trip to Mahabaleshwar — honestly better than any cab experience. Will always book with VJ now." },
            { avatar: "👨‍💼", name: "Rohit K.", loc: "Andheri, Mumbai", text: "Used VJ for a Mumbai business trip. Swift was spotless, Bluetooth worked perfectly, and pricing was transparent. 10/10." },
            { avatar: "🧑", name: "Dev P.", loc: "Baner, Pune", text: "The Creta was my pick for a weekend drive with my girlfriend. Smooth ride, great AC, and zero hassle with the app booking." },
            { avatar: "👩", name: "Sneha V.", loc: "Viman Nagar, Pune", text: "3 AM roadside help when we had a tyre issue near Lonavala. Support picked up instantly and sorted everything. Legends." },
            { avatar: "🎓", name: "Kabir T.", loc: "Kothrud, Pune", text: "College road trip culture but make it elite. Booked an Innova Crysta for 7 of us — comfortable, affordable, unforgettable." },
          ].map((t) => (
            <div className="testi-card reveal" key={t.name}>
              <div className="testi-stars">★★★★★</div>
              <div className="testi-text">{t.text}</div>
              <div className="testi-author">
                <div className="testi-avatar">{t.avatar}</div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-loc">{t.loc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>



      {/* CTA BAND */}
      <div className="cta-band">
        <div className="cta-text">
          <h2>READY TO HIT<br />THE ROAD?</h2>
          <p>Your next adventure is one click away. No fuss, just drive.</p>
        </div>
        <button className="btn-white" onClick={() => showToast("🎉 Redirecting to booking...")}>
          Book Your Ride Now →
        </button>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo"><div className="logo-dot"></div>VJ RENTALS</div>
            <p>Pune&apos;s coolest self-drive car rental. Built for the youth who want to move on their own terms.</p>
            <div className="social-links" style={{ marginTop: "20px" }}>
              <div className="social-link">📸</div>
              <div className="social-link">🐦</div>
              <div className="social-link">💼</div>
              <div className="social-link">📱</div>
            </div>
          </div>
          <div className="footer-col">
            <h4>Fleet</h4>
            <ul>
              {["Hatchbacks", "Sedans", "SUVs", "MUVs", "Off-Road", "Luxury"].map((i) => <li key={i}>{i}</li>)}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Routes</h4>
            <ul>
              {["Pune → Mumbai", "Pune → Goa", "Pune → Lonavala", "Pune → Alibaug", "Pune → Nashik", "All Routes"].map((i) => <li key={i}>{i}</li>)}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              {["About VJ", "Careers", "Terms", "Privacy", "Contact", "Blog"].map((i) => <li key={i}>{i}</li>)}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2025 VJ Car Rental Pvt. Ltd. · Pune, Maharashtra</div>
          <div>Designed with 🔥 for Pune&apos;s youth</div>
        </div>
      </footer>

      {/* Toast */}
      <div className={`toast${toast ? " show" : ""}`}>{toast}</div>

      {/* WhatsApp Floating Button */}
      <WhatsAppButton />

      {/* Call Us Floating Button */}
      <CallUsButton />
    </>
  );
}

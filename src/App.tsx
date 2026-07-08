/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { 
  Zap, 
  ShieldCheck, 
  Award, 
  Phone, 
  Mail, 
  MapPin, 
  Users, 
  Clock, 
  Camera, 
  Wind, 
  Wrench, 
  FileCheck, 
  Menu, 
  X, 
  ArrowRight, 
  Check, 
  Sparkles,
  ChevronRight,
  Eye,
  Settings,
  Shield,
  ThumbsUp,
  Sliders,
  Play
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Types
interface ServiceItem {
  id: string;
  title: string;
  icon: any;
  shortDesc: string;
  details: string[];
  specs: string;
}

interface GalleryProjectItem {
  id: number;
  src: string;
  title: string;
  category: string;
  location: string;
  desc: string;
}

const galleryProjects: GalleryProjectItem[] = [
  {
    id: 1,
    src: "/image-1.jpg",
    title: "Conduit House Wiring",
    category: "wiring",
    location: "East Legon, Accra",
    desc: "Rigorous conduit routing and electrical pipe layout for a luxury residential build."
  },
  {
    id: 2,
    src: "/image-2.jpg",
    title: "4K HD Security Camera",
    category: "cctv",
    location: "Airport Residential Area",
    desc: "Weatherproof dome CCTV camera mount with clean wiring and stream integration."
  },
  {
    id: 3,
    src: "/image-3.jpg",
    title: "Main Distribution Board",
    category: "wiring",
    location: "Dzorwulu, Accra",
    desc: "Symmetrically wired distribution board with smart surge protection breakers."
  },
  {
    id: 4,
    src: "/image-4.jpg",
    title: "AC Power Connection",
    category: "ac",
    location: "Cantonments, Accra",
    desc: "Dedicated power isolation breaker installation for a split inverter air conditioning unit."
  },
  {
    id: 5,
    src: "/image-5.jpg",
    title: "System Earth Electrode",
    category: "wiring",
    location: "Spintex, Accra",
    desc: "Standard grounding earthing rods installation guaranteeing lightning safety."
  },
  {
    id: 6,
    src: "/image-6.jpg",
    title: "Fault Diagnosis & Tracing",
    category: "troubleshoot",
    location: "Osu, Accra",
    desc: "Industrial troubleshooting session to resolve transient phase loading trips."
  },
  {
    id: 7,
    src: "/image-7.jpg",
    title: "Perimeter Bullet Cameras",
    category: "cctv",
    location: "Labone, Accra",
    desc: "Outdoor long-range night vision camera array securing commercial compound walls."
  },
  {
    id: 8,
    src: "/image-8.jpg",
    title: "Structured Cable Looming",
    category: "wiring",
    location: "Roman Ridge, Accra",
    desc: "Neatly organized cable dressing for a multi-zone home automation rack."
  },
  {
    id: 9,
    src: "/image-9.jpg",
    title: "Safety Audit Signoff",
    category: "wiring",
    location: "Legon, Accra",
    desc: "Energy Commission compliance insulation tests performed by certified engineer."
  }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"electrical" | "cctv">("electrical");
  const [galleryFilter, setGalleryFilter] = useState<string>("all");
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryProjectItem | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState("");
  const [estimateProject, setEstimateProject] = useState({
    type: "electrical",
    scope: "medium"
  });
  const [estimateResult, setEstimateResult] = useState<string>("");

  // Live clock overlay for the premium "Command Center" graphic
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toUTCString().replace("GMT", "UTC"));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Tally Embed Script Integration
  useEffect(() => {
    const d = document;
    const w = "https://tally.so/widgets/embed.js";
    const v = () => {
      // @ts-ignore
      if (typeof Tally !== "undefined") {
        // @ts-ignore
        Tally.loadEmbeds();
      } else {
        d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((e: any) => {
          e.src = e.dataset.tallySrc;
        });
      }
    };
    
    // @ts-ignore
    if (typeof Tally !== "undefined") {
      v();
    } else if (d.querySelector(`script[src="${w}"]`) === null) {
      const s = d.createElement("script");
      s.src = w;
      s.onload = v;
      s.onerror = v;
      d.body.appendChild(s);
    }
  }, []);

  // Project Estimator Calculation
  useEffect(() => {
    let rec = "";
    if (estimateProject.type === "electrical") {
      if (estimateProject.scope === "small") {
        rec = "Recommended: Phase 1 Electrical Safety Inspection & Minor Wiring Upgrades. Direct quote after on-site check.";
      } else if (estimateProject.scope === "medium") {
        rec = "Recommended: Premium Certified Conduit Wiring & Circuit Board Optimization Package.";
      } else {
        rec = "Recommended: Complete Heavy-Duty Full House Rewiring with Custom Distribution Boards & Multi-Zone Protection.";
      }
    } else if (estimateProject.type === "cctv") {
      if (estimateProject.scope === "small") {
        rec = "Recommended: 4-Channel Ultra-HD Security Camera Kit (Indoor/Outdoor weatherproof with Mobile App Integration).";
      } else if (estimateProject.scope === "medium") {
        rec = "Recommended: 8-Channel Smart IP Camera Array with AI Motion Tracking & Long-Term DVR Vault Backup.";
      } else {
        rec = "Recommended: Multi-Tier Commercial Surveillance Matrix including PTZ dome control, high-zoom perimeter lenses & monitoring screen.";
      }
    } else {
      rec = "Recommended: Smart Climate Comfort & Safety Combo (Multi-Zone Inverter AC Mounts + Dedicated Backup Overload Breakers).";
    }
    setEstimateResult(rec);
  }, [estimateProject]);

  const services: ServiceItem[] = [
    {
      id: "wiring",
      title: "House Wiring",
      icon: Zap,
      shortDesc: "Complete, safe, and neat residential and commercial conduit wiring solutions.",
      details: [
        "Internal conduit & surface wiring styled flawlessly",
        "Overload protection & smart distribution boards setup",
        "Implementation matching exact Energy Commission specifications",
        "High-grade fire-retardant cables & accessories"
      ],
      specs: "Fully Tested & Certified | Copper Conduit Grade A"
    },
    {
      id: "cctv",
      title: "CCTV Installation",
      icon: Camera,
      shortDesc: "Ultra-HD remote surveillance arrays to keep your property watched and protected 24/7.",
      details: [
        "IP cameras & Analog systems with remote streaming to mobile devices",
        "Night vision, smart motion triggers & alarm logging alerts",
        "Neat cable management preventing wire tampering",
        "Expert blind-spot layout planning for maximal area security coverage"
      ],
      specs: "4K High-Res | Weatherproof IP67 | Cloud & Offline Backup"
    },
    {
      id: "ac",
      title: "Air Conditioner Installation",
      icon: Wind,
      shortDesc: "Expert AC mounting and dedicated power wiring for clean, optimal, and safe indoor cooling.",
      details: [
        "Split & multi-split energy-efficient system installation",
        "Dedicated power isolation breaker boxes to prevent circuit overload",
        "Environmentally responsible coolant lines vacuum testing",
        "Vibration-damping wall brackets & optimal placement"
      ],
      specs: "Inverter Compatible | Heavy-Duty Breakers Included"
    },
    {
      id: "trouble",
      title: "Troubleshooting",
      icon: Wrench,
      shortDesc: "Diagnostic tracing, short-circuit restoration, and lightning-fast electrical repairs.",
      details: [
        "Digital insulation and loop impedance fault tracing",
        "Short-circuit and earth-leakage tripping resolution",
        "Quick restoration of power outages in critical zones",
        "Emergency circuit bypass & component replacements"
      ],
      specs: "Quick Response | Accurate Digital Calibration"
    },
    {
      id: "maintenance",
      title: "System Maintenance",
      icon: Settings,
      shortDesc: "Routine performance checks, camera tuning, and preventative wiring safety audits.",
      details: [
        "Camera lens detailing, angle alignment, and firmware patches",
        "Wiring insulation integrity logs & board tightening",
        "Backup power battery status diagnostic audits",
        "AC system pressure tests and filter cleanings"
      ],
      specs: "Scheduled Visits | Complete Report Generation"
    },
    {
      id: "inspection",
      title: "Certified Electrician Inspections",
      icon: FileCheck,
      shortDesc: "Official safety assessments and compliance certifications under Energy Commission standards.",
      details: [
        "Official pre-connection inspection logs",
        "Earth electrode resistance and insulation megger validation",
        "Formal paperwork submission & clearance support",
        "Expert advisory on upgrading unsafe legacy systems"
      ],
      specs: "Regulatory Approved | Energy Commission Standards"
    }
  ];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-brand-blue-deep text-slate-100 font-sans antialiased overflow-x-hidden">
      
      {/* HEADER SECTION */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-brand-blue-deep/90 backdrop-blur-md border-b border-brand-blue-light/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection("home")} id="logo-header">
            <div className="relative flex items-center justify-center w-12 h-12 rounded-lg overflow-hidden border border-brand-amber/30 bg-brand-blue-deep hover:border-brand-amber transition-all">
              <img 
                src="/logo.jpeg" 
                className="w-full h-full object-cover" 
                alt="Jamends Logo" 
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="text-xl font-extrabold font-display tracking-tight text-white block leading-none">
                JAMENDS
              </span>
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-brand-amber leading-none block mt-1">
                Electricals
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection("home")} 
              className="text-sm font-semibold text-slate-300 hover:text-brand-amber transition-colors duration-200"
              id="nav-home"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection("about")} 
              className="text-sm font-semibold text-slate-300 hover:text-brand-amber transition-colors duration-200"
              id="nav-about"
            >
              Why Us
            </button>
            <button 
              onClick={() => scrollToSection("services")} 
              className="text-sm font-semibold text-slate-300 hover:text-brand-amber transition-colors duration-200"
              id="nav-services"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection("estimator")} 
              className="text-sm font-semibold text-slate-300 hover:text-brand-amber transition-colors duration-200"
              id="nav-estimator"
            >
              Estimator
            </button>
            <button 
              onClick={() => scrollToSection("booking")} 
              className="text-sm font-semibold text-slate-300 hover:text-brand-amber transition-colors duration-200"
              id="nav-booking"
            >
              Appointment
            </button>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <a 
              href="tel:0599490591" 
              className="flex items-center space-x-2 text-sm font-bold text-white bg-brand-blue-light border border-slate-700/60 hover:border-brand-amber/50 px-4 py-2 rounded-lg transition-all"
              id="btn-call-header"
            >
              <Phone className="w-4 h-4 text-brand-amber" />
              <span>0599490591</span>
            </a>
            <button 
              onClick={() => scrollToSection("booking")} 
              className="text-sm font-bold bg-brand-amber text-brand-blue-deep hover:bg-brand-yellow px-5 py-2.5 rounded-lg shadow-[0_4px_14px_rgba(255,179,0,0.3)] transition-all transform active:scale-95 cursor-pointer"
              id="btn-book-header"
            >
              Book Appointment
            </button>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-300 hover:text-white p-2 focus:outline-none"
            aria-label="Toggle Menu"
            id="btn-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* MOBILE NAV DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-0 right-0 z-40 bg-brand-blue-card border-b border-brand-blue-light/80 block md:hidden shadow-xl"
            id="mobile-drawer"
          >
            <div className="px-4 pt-4 pb-6 space-y-4">
              <button 
                onClick={() => scrollToSection("home")}
                className="w-full text-left py-2 px-3 rounded-lg text-slate-200 hover:bg-brand-blue-light hover:text-brand-amber font-semibold"
                id="mob-nav-home"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection("about")}
                className="w-full text-left py-2 px-3 rounded-lg text-slate-200 hover:bg-brand-blue-light hover:text-brand-amber font-semibold"
                id="mob-nav-about"
              >
                Why Us
              </button>
              <button 
                onClick={() => scrollToSection("services")}
                className="w-full text-left py-2 px-3 rounded-lg text-slate-200 hover:bg-brand-blue-light hover:text-brand-amber font-semibold"
                id="mob-nav-services"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection("estimator")}
                className="w-full text-left py-2 px-3 rounded-lg text-slate-200 hover:bg-brand-blue-light hover:text-brand-amber font-semibold"
                id="mob-nav-estimator"
              >
                Estimator
              </button>
              <button 
                onClick={() => scrollToSection("booking")}
                className="w-full text-left py-2 px-3 rounded-lg text-slate-200 hover:bg-brand-blue-light hover:text-brand-amber font-semibold"
                id="mob-nav-booking"
              >
                Appointment
              </button>
              
              <div className="pt-4 border-t border-slate-700/60 flex flex-col space-y-3">
                <a 
                  href="tel:0599490591" 
                  className="flex items-center justify-center space-x-2 text-sm font-bold text-white bg-brand-blue-light py-3 rounded-lg border border-slate-700"
                  id="mob-call"
                >
                  <Phone className="w-4 h-4 text-brand-amber" />
                  <span>0599490591</span>
                </a>
                <button 
                  onClick={() => scrollToSection("booking")}
                  className="w-full text-center py-3 bg-brand-amber text-brand-blue-deep font-bold rounded-lg shadow-md"
                  id="mob-book"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-20">
        
        {/* 1. HERO SECTION */}
        <section id="home" className="relative min-h-[90vh] flex items-center py-12 lg:py-20 overflow-hidden bg-radial from-brand-blue-light/40 via-brand-blue-deep to-brand-blue-deep">
          
          {/* Ambient Lighting Gradients */}
          <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-brand-amber/10 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-10 w-[450px] h-[450px] rounded-full bg-blue-500/10 blur-[150px] pointer-events-none" />
          
          {/* Grid Blueprint Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#172a4533_1px,transparent_1px),linear-gradient(to_bottom,#172a4533_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Text Left Column */}
              <div className="lg:col-span-7 space-y-6 lg:space-y-8">
                
                {/* Badges */}
                <div className="flex flex-wrap gap-3 items-center" id="hero-badges">
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="inline-flex items-center space-x-2 bg-brand-amber/10 border border-brand-amber/35 px-3.5 py-1.5 rounded-full text-brand-amber font-semibold text-xs tracking-wider uppercase shadow-inner"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>CERTIFIED & QUALIFIED</span>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/30 px-3.5 py-1.5 rounded-full text-blue-300 font-medium text-xs shadow-inner"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-amber" />
                    <span>Tested and certified by the Energy Commission</span>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="inline-flex items-center space-x-2.5 bg-red-500/10 border border-red-500/40 px-3.5 py-1.5 rounded-full text-red-400 font-extrabold text-xs tracking-wider uppercase shadow-inner animate-pulse"
                  >
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    <span>24/7 Emergency Service Available</span>
                  </motion.div>
                </div>

                {/* Headline & Sub-headline */}
                <div className="space-y-4">
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-[1.1]"
                  >
                    Your Trusted,{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-amber via-brand-yellow to-white drop-shadow-[0_2px_10px_rgba(255,179,0,0.25)]">
                      Certified Electrical
                    </span>{" "}
                    & CCTV Installation Experts
                  </motion.h1>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.55 }}
                    className="text-lg sm:text-xl text-slate-300 font-medium italic border-l-4 border-brand-amber pl-4 max-w-xl"
                  >
                    "We are the secret behind beauty and quality."
                  </motion.p>
                </div>

                {/* Quick features short-list */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-300 border-t border-slate-800/80 pt-6"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-5 h-5 rounded-full bg-brand-amber/10 flex items-center justify-center text-brand-amber">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>Ghana Energy Commission Compliant</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <div className="w-5 h-5 rounded-full bg-brand-amber/10 flex items-center justify-center text-brand-amber">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>Accra & East Legon Primary Coverage</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <div className="w-5 h-5 rounded-full bg-brand-amber/10 flex items-center justify-center text-brand-amber">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>HD Surveillance with Mobile Remote Access</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <div className="w-5 h-5 rounded-full bg-brand-amber/10 flex items-center justify-center text-brand-amber">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>Transparent Pricing & Dedicated Support</span>
                  </div>
                </motion.div>

                {/* CTA Action Block */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
                >
                  <button 
                    onClick={() => scrollToSection("booking")}
                    className="inline-flex items-center justify-center space-x-3 bg-brand-amber text-brand-blue-deep hover:bg-brand-yellow font-bold text-base px-8 py-4 rounded-xl shadow-[0_10px_25px_rgba(255,179,0,0.35)] hover:shadow-[0_12px_30px_rgba(255,179,0,0.5)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                    id="btn-hero-cta"
                  >
                    <span>Book an Appointment Now</span>
                    <ArrowRight className="w-5 h-5 animate-bounce-horizontal" />
                  </button>

                  <button 
                    onClick={() => scrollToSection("services")}
                    className="inline-flex items-center justify-center space-x-2 border border-slate-700 hover:border-brand-amber bg-brand-blue-light/40 hover:bg-brand-blue-light/80 text-white font-bold text-base px-6 py-4 rounded-xl transition-all"
                    id="btn-hero-secondary"
                  >
                    <span>Explore Our Services</span>
                  </button>
                </motion.div>
                
              </div>

              {/* Dynamic Interactive SVG Graphic Column */}
              <div className="lg:col-span-5 relative">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  className="bg-brand-blue-card rounded-2xl border border-brand-blue-light/90 shadow-[0_15px_35px_rgba(2,12,27,0.8)] overflow-hidden"
                  id="hero-dashboard-panel"
                >
                  
                  {/* Top Header of panel */}
                  <div className="bg-brand-blue-light/80 px-4 py-3 border-b border-brand-blue-light/50 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center space-x-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-slate-300 font-semibold uppercase tracking-wider">JAMENDS TECH LAB</span>
                    </div>
                    <span className="text-brand-amber font-medium">{currentTime || "SECURE STREAM"}</span>
                  </div>

                  {/* Selector Tabs */}
                  <div className="grid grid-cols-2 bg-brand-blue-deep/60 p-1.5 border-b border-brand-blue-light/40">
                    <button 
                      onClick={() => setActiveTab("electrical")}
                      className={`flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-xs font-bold tracking-wide transition-all ${
                        activeTab === "electrical" 
                        ? "bg-brand-amber text-brand-blue-deep shadow-md" 
                        : "text-slate-400 hover:text-white hover:bg-brand-blue-light/40"
                      }`}
                      id="tab-select-electrical"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Electrical System Board</span>
                    </button>
                    
                    <button 
                      onClick={() => setActiveTab("cctv")}
                      className={`flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-xs font-bold tracking-wide transition-all ${
                        activeTab === "cctv" 
                        ? "bg-brand-amber text-brand-blue-deep shadow-md" 
                        : "text-slate-400 hover:text-white hover:bg-brand-blue-light/40"
                      }`}
                      id="tab-select-cctv"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Live CCTV Surveillance</span>
                    </button>
                  </div>

                  {/* Panel Content Screen */}
                  <div className="p-6 h-72 flex flex-col justify-between relative bg-radial from-brand-blue-card to-brand-blue-deep/90 overflow-hidden">
                    
                    {/* Background grids */}
                    <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-35" />

                    {/* ELECTRICAL SCHEMATIC INTERACTIVE VIEW */}
                    {activeTab === "electrical" && (
                      <div className="relative w-full h-full flex flex-col justify-between z-10">
                        {/* Title overlay */}
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-[10px] text-brand-amber uppercase font-mono tracking-widest leading-none">System Status</p>
                            <h4 className="text-sm font-bold font-display text-white mt-1">Conduit Wiring Grid Live</h4>
                          </div>
                          <span className="bg-brand-amber/10 border border-brand-amber/30 text-brand-amber text-[9px] font-mono px-2 py-0.5 rounded uppercase">
                            99.9% Power Continuity
                          </span>
                        </div>

                        {/* Interactive Circuit Schematic Visualizer */}
                        <div className="my-auto py-2 flex justify-center items-center">
                          <svg className="w-full h-32" viewBox="0 0 400 120" fill="none">
                            {/* Circuit lines */}
                            <path d="M 20,60 L 100,60 L 140,20 L 260,20 L 300,60 L 380,60" stroke="#1e293b" strokeWidth="4" />
                            <path d="M 100,60 L 140,100 L 260,100 L 300,60" stroke="#1e293b" strokeWidth="4" />
                            
                            {/* Glowing Active Path */}
                            <path d="M 20,60 L 100,60 L 140,20 L 260,20 L 300,60 L 380,60" stroke="#FFB300" strokeWidth="2" className="animate-dash-circuit" strokeDasharray="10, 100" />
                            <path d="M 100,60 L 140,100 L 260,100 L 300,60" stroke="#FFB300" strokeWidth="2" className="animate-dash-circuit" strokeDasharray="15, 120" />
                            
                            {/* Main Power Node */}
                            <circle cx="100" cy="60" r="6" fill="#FFB300" className="animate-ping" />
                            <circle cx="100" cy="60" r="4" fill="#FFB300" />
                            
                            {/* Split Junction Nodes */}
                            <circle cx="140" cy="20" r="4" fill="#FACC15" />
                            <circle cx="260" cy="20" r="4" fill="#FACC15" />
                            <circle cx="140" cy="100" r="4" fill="#FACC15" />
                            <circle cx="260" cy="100" r="4" fill="#FACC15" />
                            
                            {/* End consumer grid point */}
                            <g transform="translate(300, 60)" className="animate-pulse">
                              <circle cx="0" cy="0" r="8" fill="rgba(255,179,0,0.2)" />
                              <circle cx="0" cy="0" r="4" fill="#FFB300" />
                            </g>
                          </svg>
                        </div>

                        {/* Controller switches */}
                        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                          <span className="flex items-center gap-1"><Check className="w-3 h-3 text-brand-amber" /> Voltage Stabilized</span>
                          <span className="flex items-center gap-1"><Check className="w-3 h-3 text-brand-amber" /> Earthing Standard</span>
                          <span className="text-brand-yellow font-bold animate-pulse">● LOAD NORMAL</span>
                        </div>
                      </div>
                    )}

                    {/* CCTV LIVE SURVEILLANCE VIEW */}
                    {activeTab === "cctv" && (
                      <div className="relative w-full h-full flex flex-col justify-between z-10">
                        {/* Camera Info Overlay */}
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-[10px] text-red-500 uppercase font-mono tracking-widest leading-none flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping inline-block" />
                              REC FEED 01
                            </p>
                            <h4 className="text-sm font-bold font-display text-white mt-1">East Legon Zone Block B</h4>
                          </div>
                          <span className="bg-red-500/10 border border-red-500/30 text-red-400 text-[9px] font-mono px-2 py-0.5 rounded uppercase">
                            FPS: 60 // HD 4K
                          </span>
                        </div>

                        {/* Interactive Camera Target HUD Graphic */}
                        <div className="my-auto relative flex justify-center items-center w-full h-24 border border-slate-800/80 rounded bg-slate-950/40">
                          {/* CCTV Camera scanning element */}
                          <div className="absolute top-2 left-2 text-[8px] font-mono text-brand-amber/80 uppercase">
                            ZOOM: 2.4X | INFRARED: AUTO
                          </div>
                          <div className="absolute bottom-2 right-2 text-[8px] font-mono text-slate-400">
                            COORD: 5.6037° N, 0.1498° W
                          </div>
                          
                          {/* Corner brackets */}
                          <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-brand-amber" />
                          <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-brand-amber" />
                          <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-brand-amber" />
                          <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-brand-amber" />

                          {/* Radar Scan overlay */}
                          <div className="absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-brand-amber/15 to-transparent border-r border-brand-amber/30 animate-scan-line" />

                          {/* Floating Box - CCTV detection box */}
                          <div className="absolute border border-red-500/60 bg-red-500/5 px-2 py-1 rounded text-[7px] font-mono text-red-400 animate-[pulse_1.5s_infinite] top-6 left-[40%] flex items-center space-x-1">
                            <span className="inline-block w-1 h-1 bg-red-500 rounded-full animate-ping" />
                            <span>CCTV CAM SECURE_</span>
                          </div>
                        </div>

                        {/* Camera Control Footer */}
                        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                          <span className="flex items-center gap-1 text-green-400">● REMOTE ONLINE</span>
                          <span className="flex items-center gap-1">ANGLE: 110° WIDE</span>
                          <span className="text-slate-300">AUTO-TRACKER ACTIVE</span>
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Trust Footer of Panel */}
                  <div className="bg-brand-blue-deep/80 p-4 border-t border-brand-blue-light/50 grid grid-cols-2 text-center text-xs text-slate-300 divide-x divide-slate-800">
                    <div>
                      <span className="block text-brand-amber font-bold text-lg leading-none">0%</span>
                      <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block mt-1">Safety Compromise</span>
                    </div>
                    <div>
                      <span className="block text-brand-amber font-bold text-lg leading-none">Accra</span>
                      <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block mt-1">Region Covered</span>
                    </div>
                  </div>

                </motion.div>
                
                {/* Floating graphic tags */}
                <div className="absolute -bottom-5 -right-5 bg-brand-blue-light/95 border border-brand-amber/30 p-3 rounded-lg flex items-center space-x-2 shadow-lg hidden sm:flex">
                  <div className="w-8 h-8 rounded bg-brand-amber/10 flex items-center justify-center text-brand-amber">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[9px] text-slate-400 uppercase font-bold leading-none">Guaranteed</p>
                    <p className="text-xs font-extrabold text-white">100% Secure Wiring</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 2. VALUE PROPS / TRUST BANNER */}
        <section className="relative z-20 -mt-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-brand-blue-card border border-brand-blue-light rounded-2xl p-6 lg:p-8 shadow-[0_12px_24px_rgba(2,12,27,0.5)]">
              
              {/* Pillar 1 */}
              <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-brand-blue-light/30 transition-all group" id="pillar-experienced">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-brand-amber/10 border border-brand-amber/20 flex items-center justify-center text-brand-amber group-hover:bg-brand-amber group-hover:text-brand-blue-deep transition-all duration-300">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-brand-amber transition-colors">Experienced Team</h3>
                  <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                    Professional, reliable and experienced experts.
                  </p>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-brand-blue-light/30 transition-all group" id="pillar-fast">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-brand-amber/10 border border-brand-amber/20 flex items-center justify-center text-brand-amber group-hover:bg-brand-amber group-hover:text-brand-blue-deep transition-all duration-300">
                  <Clock className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-brand-amber transition-colors">Fast & Reliable Service</h3>
                  <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                    On time, every time.
                  </p>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-brand-blue-light/30 transition-all group" id="pillar-quality">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-brand-amber/10 border border-brand-amber/20 flex items-center justify-center text-brand-amber group-hover:bg-brand-amber group-hover:text-brand-blue-deep transition-all duration-300">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-brand-amber transition-colors">Quality Work</h3>
                  <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                    We deliver safe, neat and long-lasting solutions.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* EXTRA BUSINESS BIO BANNER (Ties with "We are the secret behind beauty and quality") */}
        <section id="about" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Visual branding block */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-amber/20 via-transparent to-blue-500/15 rounded-2xl blur-lg group-hover:scale-105 transition-all duration-500" />
              <div className="relative bg-brand-blue-card border border-brand-blue-light rounded-2xl p-8 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-amber/5 rounded-full blur-xl" />
                
                <h4 className="text-xs text-brand-amber font-bold uppercase tracking-widest font-mono">Company Creed</h4>
                <blockquote className="text-2xl sm:text-3xl font-extrabold font-display text-white mt-4 leading-tight">
                  "Excellence isn't just about making connections; it's about building safe, neat systems that elevate your space."
                </blockquote>
                
                <div className="mt-8 flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-brand-amber/30 bg-brand-blue-deep flex items-center justify-center">
                    <img 
                      src="/logo.jpeg" 
                      className="w-full h-full object-cover" 
                      alt="Jamends Logo" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Jamends Electricals Management</p>
                    <p className="text-xs text-brand-amber">Energy Commission Certified Operator</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-800 text-center">
                  <div>
                    <span className="text-xl font-bold text-white block">Accra</span>
                    <span className="text-[9px] text-slate-400 uppercase tracking-widest font-mono">Headquarters</span>
                  </div>
                  <div>
                    <span className="text-xl font-bold text-brand-amber block">100%</span>
                    <span className="text-[9px] text-slate-400 uppercase tracking-widest font-mono">Compliant</span>
                  </div>
                  <div>
                    <span className="text-xl font-bold text-white block">Certified</span>
                    <span className="text-[9px] text-slate-400 uppercase tracking-widest font-mono">Technicians</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Structured details block */}
            <div className="space-y-6">
              <div className="inline-block bg-brand-amber/10 border border-brand-amber/20 px-3 py-1 rounded text-brand-amber font-mono text-xs uppercase tracking-wider">
                About Jamends Electricals
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white leading-tight">
                Accra's Standard for Safe Energy & Flawless Security
              </h2>
              
              <p className="text-slate-300 leading-relaxed text-base">
                At <strong>Jamends Electricals</strong>, we believe that reliable power is the backbone of every safe home and successful business. We are a professional electrical services company based in Accra, Ghana, dedicated to delivering high-quality, efficient, and standardized electrical solutions.
              </p>

              <div className="bg-brand-blue-light/50 border border-brand-blue-light p-5 rounded-xl space-y-2">
                <h3 className="text-sm font-bold text-brand-amber uppercase tracking-wider font-mono">Our Expertise</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Led by a certified professional electrician accredited by the <strong>Energy Commission of Ghana</strong>, we bring technical precision to every project we undertake. Whether you are dealing with a complex commercial electrical fault, planning a new residential installation, or requiring routine system maintenance, we have the expertise to get the job done right, the first time.
                </p>
              </div>

              {/* Why Choose Us Items */}
              <div className="space-y-4 pt-2">
                <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-brand-amber rounded-full block" />
                  Why Choose Us?
                </h3>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-start space-x-3 bg-brand-blue-card/50 p-4 rounded-xl border border-slate-800/80 hover:border-brand-amber/30 transition-all">
                    <div className="mt-1 w-6 h-6 rounded bg-brand-amber/10 flex items-center justify-center text-brand-amber flex-shrink-0">
                      <ShieldCheck className="w-4 h-4 stroke-[3.5]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Certified Professionals</h4>
                      <p className="text-xs text-slate-400 mt-1">We operate in strict adherence to Ghana’s Electrical Wiring Regulations, ensuring that every wire, circuit, and installation meets the highest safety standards.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 bg-brand-blue-card/50 p-4 rounded-xl border border-slate-800/80 hover:border-brand-amber/30 transition-all">
                    <div className="mt-1 w-6 h-6 rounded bg-brand-amber/10 flex items-center justify-center text-brand-amber flex-shrink-0">
                      <Clock className="w-4 h-4 stroke-[3.5]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Reliability</h4>
                      <p className="text-xs text-slate-400 mt-1">We know that electrical issues can disrupt your life or business. We pride ourselves on fast response times, meticulous troubleshooting, and long-lasting results.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 bg-brand-blue-card/50 p-4 rounded-xl border border-slate-800/80 hover:border-brand-amber/30 transition-all">
                    <div className="mt-1 w-6 h-6 rounded bg-brand-amber/10 flex items-center justify-center text-brand-amber flex-shrink-0">
                      <Sliders className="w-4 h-4 stroke-[3.5]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Versatility</h4>
                      <p className="text-xs text-slate-400 mt-1">From residential homes and high-end hotels to commercial construction sites, we adapt our services to meet the unique power needs of our clients.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 bg-brand-blue-card/50 p-4 rounded-xl border border-slate-800/80 hover:border-brand-amber/30 transition-all">
                    <div className="mt-1 w-6 h-6 rounded bg-brand-amber/10 flex items-center justify-center text-brand-amber flex-shrink-0">
                      <ThumbsUp className="w-4 h-4 stroke-[3.5]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Quality Assurance</h4>
                      <p className="text-xs text-slate-400 mt-1">We don’t just "fix" problems; we provide technical consultancy and system upgrades designed to prevent future issues and improve the efficiency of your electrical infrastructure.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Our Commitment */}
              <div className="bg-gradient-to-r from-brand-blue-light/30 to-brand-blue-card border-l-4 border-brand-amber p-5 rounded-r-xl">
                <h4 className="text-xs font-bold text-brand-amber font-mono uppercase tracking-wider">Our Commitment</h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  Our mission is simple: To provide professional electrical work that clients can trust. At <strong>Jamends Electricals</strong>, your safety and satisfaction are our top priorities. We are constantly updating our skills and adopting the latest industry technologies to ensure that we remain at the forefront of electrical service excellence in Ghana.
                </p>
              </div>

              <div className="pt-4">
                <button 
                  onClick={() => scrollToSection("booking")}
                  className="inline-flex items-center space-x-2 text-brand-amber font-bold text-sm hover:text-brand-yellow group cursor-pointer"
                  id="btn-learn-more"
                >
                  <span>Book inspection or consultancy</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* 3. SERVICES SECTION */}
        <section id="services" className="py-20 bg-brand-blue/30 border-y border-brand-blue-light/50 relative">
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-15" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <span className="text-xs text-brand-amber uppercase font-mono font-bold tracking-[0.2em] bg-brand-amber/10 border border-brand-amber/20 px-3 py-1 rounded-full">
                Professional Scope
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white">
                Our Core Services
              </h2>
              <p className="text-slate-400 text-sm sm:text-base">
                Whether you are wiring a newly constructed smart home or reinforcing security cameras for your business, we deliver tested, neat, and certified engineering solutions.
              </p>
            </div>

            {/* 24/7 Emergency Callout Banner */}
            <div className="mb-12 bg-linear-to-r from-red-950/40 via-brand-blue-card to-red-950/40 border border-red-500/40 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
              <div className="flex items-center space-x-4 text-left">
                <div className="w-14 h-14 rounded-xl bg-red-500/10 border border-red-500/35 flex items-center justify-center text-red-500 animate-pulse flex-shrink-0">
                  <Zap className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-400">URGENT DISPATCH SERVICE</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mt-1">24/7 Emergency Service Available</h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                    Dealing with a dangerous short-circuit, sudden power failure, or urgent security camera breakdown? Our response crew is on-call 24 hours a day to restore safety and power.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <a 
                  href="tel:0599490591" 
                  className="inline-flex items-center justify-center space-x-2.5 bg-red-600 hover:bg-red-500 text-white font-extrabold px-6 py-3.5 rounded-xl text-sm tracking-wide shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Phone className="w-4 h-4 animate-bounce" />
                  <span>Call Emergency: 0599490591</span>
                </a>
              </div>
            </div>

            {/* Grid of Service Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => {
                const IconComponent = service.icon;
                const isExpanded = selectedService === service.id;

                return (
                  <div 
                    key={service.id}
                    className={`bg-brand-blue-card rounded-2xl border transition-all duration-300 overflow-hidden group flex flex-col justify-between ${
                      isExpanded 
                      ? "border-brand-amber ring-1 ring-brand-amber shadow-[0_0_20px_rgba(255,179,0,0.15)] scale-[1.02]" 
                      : "border-brand-blue-light/80 hover:border-brand-amber/40 shadow-md hover:-translate-y-1"
                    }`}
                    id={`service-card-${service.id}`}
                  >
                    {/* Card Body */}
                    <div className="p-6 sm:p-8">
                      {/* Icon header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
                          isExpanded 
                          ? "bg-brand-amber text-brand-blue-deep" 
                          : "bg-brand-blue-light text-brand-amber group-hover:bg-brand-amber group-hover:text-brand-blue-deep"
                        }`}>
                          <IconComponent className="w-7 h-7" />
                        </div>
                        <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest bg-brand-blue-deep/60 px-2.5 py-1 rounded-full">
                          Certified
                        </span>
                      </div>

                      {/* Info */}
                      <h3 className="text-xl font-bold text-white group-hover:text-brand-amber transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                        {service.shortDesc}
                      </p>

                      {/* Dropdown details drawer */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-6 pt-6 border-t border-slate-800/80 space-y-3"
                          >
                            <h4 className="text-xs font-bold font-mono uppercase text-brand-amber tracking-wider">
                              What's Included:
                            </h4>
                            <ul className="space-y-2">
                              {service.details.map((detail, idx) => (
                                <li key={idx} className="flex items-start space-x-2 text-xs text-slate-300 leading-relaxed">
                                  <Check className="w-3.5 h-3.5 text-brand-amber flex-shrink-0 mt-0.5 stroke-[3]" />
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                            
                            <div className="bg-brand-blue-deep/60 p-2.5 rounded-lg border border-brand-blue-light/30 mt-4">
                              <span className="text-[10px] font-mono font-semibold text-slate-400 block uppercase">Technical Standard:</span>
                              <span className="text-[11px] font-bold text-white block mt-0.5">{service.specs}</span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Card Footer / Toggle Button */}
                    <div className="bg-brand-blue-light/30 px-6 py-4 border-t border-slate-800/50 flex items-center justify-between">
                      <button 
                        onClick={() => setSelectedService(isExpanded ? null : service.id)}
                        className="text-xs font-bold text-brand-amber hover:text-brand-yellow flex items-center space-x-1.5 transition-all focus:outline-none"
                        id={`btn-toggle-details-${service.id}`}
                      >
                        <span>{isExpanded ? "Close Scope Specs" : "Explore Technical Scope"}</span>
                        <ChevronRight className={`w-3.5 h-3.5 transform transition-transform ${isExpanded ? "rotate-90 text-brand-yellow" : ""}`} />
                      </button>

                      <button 
                        onClick={() => scrollToSection("booking")}
                        className="text-xs font-semibold text-white hover:text-brand-amber flex items-center space-x-1 transition-all"
                        id={`btn-order-service-${service.id}`}
                      >
                        <span>Request Service</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Bottom Note */}
            <div className="mt-12 text-center bg-brand-blue-card/60 border border-brand-blue-light/50 p-6 rounded-2xl max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3 text-left">
                <div className="w-10 h-10 rounded-full bg-brand-amber/10 flex items-center justify-center text-brand-amber flex-shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Need a custom technical layout setup?</h4>
                  <p className="text-xs text-slate-400">Our engineers build custom systems matching precise site maps.</p>
                </div>
              </div>
              <button 
                onClick={() => scrollToSection("booking")}
                className="bg-brand-amber text-brand-blue-deep hover:bg-brand-yellow text-xs font-bold px-5 py-3 rounded-lg transition-all"
                id="btn-custom-consult"
              >
                Get Custom Quote
              </button>
            </div>

          </div>
        </section>

        {/* PROJECT GALLERY SECTION */}
        <section id="gallery" className="py-20 relative border-b border-brand-blue-light/40">
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
              <span className="text-xs text-brand-amber uppercase font-mono font-bold tracking-[0.2em] bg-brand-amber/10 border border-brand-amber/20 px-3 py-1 rounded-full">
                Professional Portfolio
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white">
                Our Installation Showcase
              </h2>
              <p className="text-slate-400 text-sm sm:text-base">
                Explore real field photographs from our actual certified electrical wiring, neat power routing, and high-definition smart CCTV camera installations across Accra, Ghana.
              </p>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              {[
                { filter: "all", label: "Show All" },
                { filter: "wiring", label: "Electrical Wiring" },
                { filter: "cctv", label: "CCTV Cameras" },
                { filter: "ac", label: "A/C Solutions" },
                { filter: "troubleshoot", label: "Troubleshooting" }
              ].map((btn) => (
                <button
                  key={btn.filter}
                  onClick={() => setGalleryFilter(btn.filter)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                    galleryFilter === btn.filter
                      ? "bg-brand-amber text-brand-blue-deep border-brand-amber shadow-lg shadow-brand-amber/15"
                      : "bg-brand-blue-card hover:bg-brand-blue-light border-slate-800 text-slate-400 hover:text-white"
                  }`}
                  id={`btn-gallery-filter-${btn.filter}`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Project Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryProjects
                .filter((p) => galleryFilter === "all" || p.category === galleryFilter)
                .map((project) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    key={project.id}
                    className="group bg-brand-blue-card rounded-2xl border border-brand-blue-light/60 overflow-hidden shadow-lg hover:border-brand-amber/50 hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between"
                    onClick={() => setSelectedGalleryItem(project)}
                    id={`gallery-card-${project.id}`}
                  >
                    {/* Image Area */}
                    <div className="relative aspect-4/3 overflow-hidden bg-brand-blue-deep">
                      <img
                        src={project.src}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-deep via-brand-blue-deep/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-yellow bg-brand-blue-deep/80 border border-brand-amber/30 px-2 py-1 rounded-md">
                          Click to View Details
                        </span>
                      </div>
                      
                      {/* Location Tag */}
                      <span className="absolute top-3 right-3 bg-brand-blue-deep/85 backdrop-blur-sm border border-slate-800/80 text-[10px] font-mono text-slate-300 px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-md">
                        <MapPin className="w-3 h-3 text-brand-amber" />
                        {project.location}
                      </span>
                    </div>

                    {/* Content Area */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-amber">
                          {project.category === "wiring" ? "Electrical Wiring" : project.category === "cctv" ? "CCTV Surveillance" : project.category === "ac" ? "A/C Solutions" : "Technical Support"}
                        </span>
                        <h3 className="text-lg font-bold text-white group-hover:text-brand-amber transition-colors line-clamp-1">
                          {project.title}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                          {project.desc}
                        </p>
                      </div>
                      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold text-slate-300 group-hover:text-brand-yellow transition-colors">
                        <span>Inspect Field Work</span>
                        <Eye className="w-4 h-4 text-brand-amber group-hover:scale-110 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>

          </div>
        </section>

        {/* 4. ESTIMATOR / INTERACTIVE QUESTIONNAIRE */}
        <section id="estimator" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-blue-card border border-brand-blue-light rounded-3xl p-8 lg:p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-amber/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Estimator details */}
              <div className="lg:col-span-5 space-y-6">
                <span className="text-xs font-mono font-bold text-brand-amber uppercase tracking-widest bg-brand-amber/10 px-3 py-1 rounded-full border border-brand-amber/20">
                  Interactive Advisor
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight leading-tight">
                  Estimate Your Installation Package
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Select your desired service sector and property size below. Our automated planning engine immediately checks common Energy Commission safety layouts and recommends an actionable installation outline.
                </p>

                <div className="space-y-4 pt-4">
                  <div className="flex items-center space-x-3 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-brand-amber" />
                    <span>Instant recommendation breakdown</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-brand-amber" />
                    <span>Ties with our East Legon field crew dispatch</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-brand-amber" />
                    <span>Completely free to use, no signups required</span>
                  </div>
                </div>
              </div>

              {/* Interactive Widget Box */}
              <div className="lg:col-span-7 bg-brand-blue-deep/60 p-6 sm:p-8 rounded-2xl border border-brand-blue-light/60 space-y-6">
                
                {/* Selector 1 */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono block mb-3">
                    1. Select Service Category:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { key: "electrical", label: "Electrical" },
                      { key: "cctv", label: "CCTV Camera" },
                      { key: "ac", label: "AC Cooling" }
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        onClick={() => setEstimateProject({ ...estimateProject, type: opt.key })}
                        className={`py-3 px-2 rounded-lg text-xs font-bold border transition-all text-center ${
                          estimateProject.type === opt.key 
                          ? "bg-brand-amber/15 border-brand-amber text-brand-amber" 
                          : "bg-brand-blue-card border-slate-800 text-slate-400 hover:text-white"
                        }`}
                        id={`btn-est-type-${opt.key}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selector 2 */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono block mb-3">
                    2. Approximate Location Size:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { key: "small", label: "Small (Apartment)" },
                      { key: "medium", label: "Medium (Duplex/Office)" },
                      { key: "large", label: "Large (Mansion/Estate)" }
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        onClick={() => setEstimateProject({ ...estimateProject, scope: opt.key })}
                        className={`py-3 px-2 rounded-lg text-xs font-bold border transition-all text-center ${
                          estimateProject.scope === opt.key 
                          ? "bg-brand-amber/15 border-brand-amber text-brand-amber" 
                          : "bg-brand-blue-card border-slate-800 text-slate-400 hover:text-white"
                        }`}
                        id={`btn-est-scope-${opt.key}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Estimate Outputs Panel */}
                <div className="bg-brand-blue-card/80 border border-slate-800 p-4 rounded-xl space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase font-mono tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-brand-amber" />
                    <span>System Outline Recommendation:</span>
                  </div>
                  <p className="text-sm font-semibold text-white leading-relaxed">
                    {estimateResult}
                  </p>
                </div>

                {/* CTA Action link to Tally Booking */}
                <div className="pt-2">
                  <button
                    onClick={() => scrollToSection("booking")}
                    className="w-full py-4 bg-brand-amber text-brand-blue-deep font-bold rounded-xl shadow-lg hover:bg-brand-yellow transition-all flex items-center justify-center space-x-2 cursor-pointer"
                    id="btn-apply-est"
                  >
                    <span>Proceed with this Outline & Book Appointment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* 5. APPOINTMENT / CONTACT SECTION */}
        <section id="booking" className="py-20 relative bg-linear-to-b from-brand-blue-deep to-brand-blue-deep/95">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-amber/5 rounded-full blur-[180px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* Left Column: Business Info */}
              <div className="lg:col-span-5 space-y-8">
                
                <div className="space-y-4">
                  <span className="text-xs text-brand-amber font-mono font-bold uppercase tracking-[0.2em] bg-brand-amber/10 border border-brand-amber/20 px-3 py-1 rounded-full">
                    Direct Booking Center
                  </span>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white tracking-tight leading-none">
                    Let's Connect
                  </h2>
                  <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                    Fill out the appointment request form, or contact our central office lines directly. Our certified engineers based in East Legon are ready to coordinate site visits quickly.
                  </p>
                </div>

                {/* Contact list cards */}
                <div className="space-y-4">
                  
                  {/* Phone */}
                  <a 
                    href="tel:0599490591"
                    className="flex items-center space-x-4 p-4 rounded-xl bg-brand-blue-card border border-brand-blue-light/50 hover:border-brand-amber/40 transition-all group"
                    id="contact-phone"
                  >
                    <div className="w-12 h-12 rounded-lg bg-brand-amber/10 flex items-center justify-center text-brand-amber group-hover:bg-brand-amber group-hover:text-brand-blue-deep transition-all">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 font-mono block uppercase">Direct Call Hotline</span>
                      <span className="text-lg font-extrabold text-white group-hover:text-brand-amber transition-colors">0599490591</span>
                    </div>
                  </a>

                  {/* Email */}
                  <a 
                    href="mailto:jamereal292@gmail.com"
                    className="flex items-center space-x-4 p-4 rounded-xl bg-brand-blue-card border border-brand-blue-light/50 hover:border-brand-amber/40 transition-all group"
                    id="contact-email"
                  >
                    <div className="w-12 h-12 rounded-lg bg-brand-amber/10 flex items-center justify-center text-brand-amber group-hover:bg-brand-amber group-hover:text-brand-blue-deep transition-all">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 font-mono block uppercase">Official Email</span>
                      <span className="text-base sm:text-lg font-extrabold text-white group-hover:text-brand-amber transition-colors break-all">jamereal292@gmail.com</span>
                    </div>
                  </a>

                  {/* Location */}
                  <div 
                    className="flex items-center space-x-4 p-4 rounded-xl bg-brand-blue-card border border-brand-blue-light/50 transition-all"
                    id="contact-location"
                  >
                    <div className="w-12 h-12 rounded-lg bg-brand-amber/10 flex items-center justify-center text-brand-amber">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 font-mono block uppercase">Base Location</span>
                      <span className="text-lg font-extrabold text-white">Accra - East Legon</span>
                    </div>
                  </div>

                </div>

                {/* Operational Details Map Visual Card */}
                <div className="bg-brand-blue-card border border-brand-blue-light/60 rounded-2xl p-6 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono flex items-center gap-2">
                    <Clock className="w-4 h-4 text-brand-amber" />
                    <span>Operational Availability</span>
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 block font-semibold">Operational Hours:</span>
                      <span className="text-white font-bold text-sm block mt-1">Available Every Day (24 Hours)</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-semibold">Accra Dispatch Range:</span>
                      <span className="text-brand-amber font-bold text-sm block mt-1">Greater Accra Area</span>
                    </div>
                  </div>

                  {/* Accra Service Map Graphic */}
                  <div className="relative h-24 bg-brand-blue-deep rounded-lg border border-slate-800 overflow-hidden flex items-center justify-center">
                    {/* SVG Map grid decoration */}
                    <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path d="M0,50 Q25,30 50,50 T100,50" fill="none" stroke="#FFB300" strokeWidth="1" />
                      <path d="M0,20 Q40,60 80,20" fill="none" stroke="#1e293b" strokeWidth="2" />
                      <line x1="50" y1="0" x2="50" y2="100" stroke="#1e293b" strokeWidth="1" />
                      <line x1="0" y1="50" x2="100" y2="50" stroke="#1e293b" strokeWidth="1" />
                    </svg>
                    
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="relative">
                        <MapPin className="w-6 h-6 text-brand-amber animate-bounce" />
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-brand-yellow rounded-full animate-ping" />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-white uppercase mt-1 tracking-wider">
                        EAST LEGON STATION
                      </span>
                    </div>
                  </div>

                  <a 
                    href="https://wa.me/233599490591" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded-lg text-xs tracking-wider uppercase transition-all"
                    id="btn-whatsapp"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.964 9.964 0 001.333 4.993L2 22l5.135-1.347a9.932 9.932 0 004.873 1.277h.005c5.505 0 9.988-4.478 9.99-9.985a9.983 9.983 0 00-9.991-9.959zm5.82 14.195c-.24.675-1.2 1.245-1.65 1.29-.405.045-.915.075-2.61-.585-2.19-.87-3.585-3.09-3.69-3.24-.105-.15-.84-1.125-.84-2.16 0-1.035.54-1.545.735-1.755.195-.21.435-.27.585-.27h.42c.135 0 .315-.015.48.375.18.435.615 1.515.675 1.635.06.12.09.255.015.405-.075.15-.12.24-.24.375-.12.135-.255.3-.36.39-.12.105-.24.225-.105.465.135.225.585.975 1.26 1.575.87.765 1.59 1.005 1.815 1.125.225.12.36.105.495-.045.135-.15.585-.675.735-.9.15-.225.3-.18.51-.105.21.075 1.335.63 1.56.735.225.105.375.15.435.255.06.105.06.6-.18 1.275z" />
                    </svg>
                    <span>Message WhatsApp Hotline</span>
                  </a>

                </div>

              </div>

              {/* Right Column: Tally Form Iframe Card Wrapper */}
              <div className="lg:col-span-7">
                <div className="bg-brand-blue-card border-2 border-brand-amber/35 rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(2,12,27,0.7)]" id="tally-form-card">
                  
                  {/* Form Header */}
                  <div className="bg-gradient-to-r from-brand-blue-light to-brand-blue-card px-6 py-5 border-b border-brand-blue-light/80 flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white font-display">Appointment Form</h3>
                      <p className="text-xs text-brand-yellow font-mono mt-0.5 uppercase tracking-wider">Fast-Response Booking System</p>
                    </div>
                    <div className="hidden sm:flex items-center space-x-1.5 text-[10px] font-bold uppercase tracking-wider font-mono text-slate-400 bg-brand-blue-deep/60 px-3 py-1.5 rounded-full border border-slate-800">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>SECURE SERVER READY</span>
                    </div>
                  </div>

                  {/* Form Container */}
                  <div className="p-1 sm:p-2 bg-brand-blue-card">
                    {/* Tally Iframe Element as requested */}
                    <iframe 
                      data-tally-src="https://tally.so/embed/RGlDZP?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" 
                      src="https://tally.so/embed/RGlDZP?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                      loading="lazy" 
                      width="100%" 
                      height="747" 
                      frameBorder="0" 
                      marginHeight={0} 
                      marginWidth={0} 
                      title="Appointment Request"
                      className="w-full bg-transparent rounded-2xl"
                    />
                  </div>

                  {/* Form Footer info */}
                  <div className="bg-brand-blue-deep/60 px-6 py-4 border-t border-brand-blue-light/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400">
                    <span>* Form is encrypted and submitted safely to Jamends</span>
                    <span className="font-semibold text-brand-amber">Avg. response time: Under 1 hour</span>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* 6. FOOTER */}
      <footer className="bg-brand-blue-deep border-t border-brand-blue-light/80 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-slate-800/80">
            
            {/* Branding Column */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded overflow-hidden border border-brand-amber/30 bg-brand-blue-deep flex items-center justify-center">
                  <img 
                    src="/logo.jpeg" 
                    className="w-full h-full object-cover" 
                    alt="Jamends Logo" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-xl font-extrabold font-display tracking-tight text-white uppercase">
                  JAMENDS ELECTRICALS
                </span>
              </div>
              <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
                Ghana Energy Commission certified engineering service. We install, troubleshoot and maintain heavy electrical arrays and high-definition smart CCTV security cameras.
              </p>
              <div className="text-xs text-slate-400 font-mono">
                Primary station: Accra, East Legon, Ghana.
              </div>
            </div>

            {/* Services Links Column */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-brand-amber font-mono">
                Our Capabilities
              </h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><button onClick={() => scrollToSection("services")} className="hover:text-white transition-all text-left">Internal & External House Wiring</button></li>
                <li><button onClick={() => scrollToSection("services")} className="hover:text-white transition-all text-left">4K Smart CCTV Installation & Streaming</button></li>
                <li><button onClick={() => scrollToSection("services")} className="hover:text-white transition-all text-left">Air Conditioner Mounting & Breakers</button></li>
                <li><button onClick={() => scrollToSection("services")} className="hover:text-white transition-all text-left">Short-Circuit Troubleshooting & Audits</button></li>
                <li><button onClick={() => scrollToSection("services")} className="hover:text-white transition-all text-left">Energy Commission Compliance Inspections</button></li>
              </ul>
            </div>

            {/* Quick Contact Link column */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-brand-amber font-mono">
                Booking
              </h4>
              <p className="text-sm text-slate-400">
                Ready to wire your house beautifully or log HD feeds?
              </p>
              <button 
                onClick={() => scrollToSection("booking")}
                className="w-full py-2.5 px-4 bg-brand-blue-light border border-slate-700 hover:border-brand-amber text-xs font-bold text-white rounded-lg transition-all"
                id="footer-btn-book"
              >
                Go to Booking Form
              </button>
            </div>

          </div>

          {/* Social Links Row as requested */}
          <div className="pt-12 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono text-center md:text-left">
                Follow Jamends Electricals on Social Media:
              </h4>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3" id="social-links-container">
                
                {/* Facebook */}
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-brand-blue-light/40 hover:bg-brand-blue-light border border-slate-800 hover:border-brand-amber/40 px-3 py-1.5 rounded-lg text-xs text-slate-300 hover:text-brand-amber transition-all"
                  id="social-facebook"
                  title="Facebook - Jamends Electricals"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h3V1h-4c-2.5 0-5 1.5-5 5v2z" />
                  </svg>
                  <span className="font-semibold text-[11px]">Jamends Electricals</span>
                </a>

                {/* Instagram */}
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-brand-blue-light/40 hover:bg-brand-blue-light border border-slate-800 hover:border-brand-amber/40 px-3 py-1.5 rounded-lg text-xs text-slate-300 hover:text-brand-amber transition-all"
                  id="social-instagram"
                  title="Instagram - Jamends Electricals"
                >
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  <span className="font-semibold text-[11px]">Jamends Electricals</span>
                </a>

                {/* LinkedIn */}
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-brand-blue-light/40 hover:bg-brand-blue-light border border-slate-800 hover:border-brand-amber/40 px-3 py-1.5 rounded-lg text-xs text-slate-300 hover:text-brand-amber transition-all"
                  id="social-linkedin"
                  title="LinkedIn - Jamends Electricals"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <span className="font-semibold text-[11px]">Jamends Electricals</span>
                </a>

                {/* YouTube */}
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-brand-blue-light/40 hover:bg-brand-blue-light border border-slate-800 hover:border-brand-amber/40 px-3 py-1.5 rounded-lg text-xs text-slate-300 hover:text-brand-amber transition-all"
                  id="social-youtube"
                  title="YouTube - Jamends Electricals"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  <span className="font-semibold text-[11px]">Jamends Electricals</span>
                </a>

                {/* TikTok */}
                <a 
                  href="https://tiktok.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-brand-blue-light/40 hover:bg-brand-blue-light border border-slate-800 hover:border-brand-amber/40 px-3 py-1.5 rounded-lg text-xs text-slate-300 hover:text-brand-amber transition-all"
                  id="social-tiktok"
                  title="TikTok - Jamends Electricals"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.18 1.02 1.22 2.5 2.04 4.07 2.25V9.75c-1.89-.07-3.75-.82-5.13-2.12v8.06c.01 4.34-3.6 8.3-8.12 8.31-4.75-.1-8.77-4.47-8.31-9.28.39-4.14 4.09-7.56 8.35-7.14V11.1c-1.89-.13-3.73.96-4.39 2.76-.75 2.04.14 4.54 2.05 5.41 1.94.88 4.47-.07 5.03-2.17.15-.55.15-1.12.15-1.69V.02z" />
                  </svg>
                  <span className="font-semibold text-[11px]">Jamends Electricals</span>
                </a>

              </div>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-xs text-slate-500 font-mono">
                © 2026 Jamends Electricals. All rights reserved.
              </p>
              <p className="text-[10px] text-slate-600 mt-1 font-mono">
                Accra - East Legon | Ghana Energy Commission Approved
              </p>
            </div>

          </div>
        </div>
      </footer>

      {/* GALLERY LIGHTBOX POPUP MODAL */}
      <AnimatePresence>
        {selectedGalleryItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-blue-deep/90 backdrop-blur-md"
            onClick={() => setSelectedGalleryItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-brand-blue-card border border-brand-blue-light rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedGalleryItem(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-brand-blue-deep/80 border border-slate-800 text-slate-300 hover:text-white hover:border-brand-amber flex items-center justify-center transition-all cursor-pointer"
                id="btn-lightbox-close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image Frame */}
              <div className="relative aspect-16/10 bg-black overflow-hidden border-b border-brand-blue-light/50">
                <img
                  src={selectedGalleryItem.src}
                  alt={selectedGalleryItem.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Location Badge */}
                <div className="absolute bottom-4 left-4 bg-brand-blue-deep/90 backdrop-blur-sm border border-brand-blue-light/80 px-3.5 py-1.5 rounded-xl flex items-center gap-2 shadow-lg">
                  <MapPin className="w-4 h-4 text-brand-amber" />
                  <span className="text-xs font-mono font-bold text-white">{selectedGalleryItem.location}</span>
                </div>
              </div>

              {/* Information Panel */}
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-mono font-bold text-brand-amber uppercase tracking-widest bg-brand-amber/10 border border-brand-amber/20 px-3 py-1 rounded-full">
                      {selectedGalleryItem.category === "wiring" ? "Certified Wiring" : selectedGalleryItem.category === "cctv" ? "Smart Camera Array" : selectedGalleryItem.category === "ac" ? "Climate Integration" : "Expert Troubleshooting"}
                    </span>
                    <h3 className="text-2xl font-black font-display text-white mt-2 leading-none">
                      {selectedGalleryItem.title}
                    </h3>
                  </div>
                  
                  <button
                    onClick={() => {
                      setSelectedGalleryItem(null);
                      scrollToSection("booking");
                    }}
                    className="px-5 py-3 bg-brand-amber text-brand-blue-deep font-bold rounded-xl text-xs tracking-wider uppercase hover:bg-brand-yellow transition-all"
                    id="btn-lightbox-inquire"
                  >
                    Inquire About This Setup
                  </button>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedGalleryItem.desc}
                </p>

                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-4">
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-brand-amber" />
                    <span>Energy Commission Safety Certified</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-brand-amber" />
                    <span>Complies with Ghana wiring regulations</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

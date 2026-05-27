"use client";

import React, { useState, useEffect, useRef } from "react";

// ==========================================================================
// 1. DATA AND METADATA DEFINITIONS
// ==========================================================================
const PARTS_DATABASE = {
  receiver: {
    "receiver-polymer": {
      name: "Nylon Polymer V2 Receiver",
      price: 49.99,
      desc: "Lightweight high-durability polymer case. Perfect general platform.",
      mods: { firepower: 0, accuracy: -2, firerate: 0, range: 0, weight: -0.2 },
      keyword: "nylon+polymer+v2+receiver+gearbox"
    },
    "receiver-cnc": {
      name: "CNC Split-Alloy Frame",
      price: 119.99,
      desc: "Full metal premium alloy frame. Gold accents with modular rail brackets.",
      mods: { firepower: 25, accuracy: 8, firerate: 0, range: 0, weight: 0.5 },
      keyword: "cnc+split+metal+receiver+airsoft"
    }
  },
  optics: {
    "optics-iron": {
      name: "Standard Iron Sights",
      price: 0.00,
      desc: "Default factory folding steel front & rear posts.",
      mods: { firepower: 0, accuracy: 0, firerate: 0, range: 0, weight: 0.05 },
      keyword: "folding+iron+sights+picatinny"
    },
    "optics-reddot": {
      name: "P2X Holographic Red Dot",
      price: 24.99,
      desc: "Ultra-clear solar tactical red dot with 2MOA reticle and lens protector.",
      mods: { firepower: 0, accuracy: 15, firerate: 0, range: 5, weight: 0.15 },
      keyword: "holographic+red+dot+sight+airsoft"
    },
    "optics-acog": {
      name: "ACOG 4X Combat Scope",
      price: 44.99,
      desc: "Prismatic magnifier rifle scope with glowing fiber optics bar.",
      mods: { firepower: 0, accuracy: 28, firerate: 0, range: 20, weight: 0.4 },
      keyword: "acog+4x+scope+fiber+optic"
    }
  },
  muzzle: {
    "muzzle-flash": {
      name: "Birdcage Flash Hider",
      price: 8.50,
      desc: "Steel threaded standard flash dispersion tip.",
      mods: { firepower: 0, accuracy: 0, firerate: 0, range: 0, weight: 0.05 },
      keyword: "birdcage+flash+hider+14mm+ccw"
    },
    "muzzle-suppress": {
      name: "Whisper QD Suppressor",
      price: 29.99,
      desc: "Large mock suppressor with inner acoustic baffling. Looks industrial.",
      mods: { firepower: -5, accuracy: 10, firerate: 0, range: -3, weight: 0.3 },
      keyword: "suppressor+silencer+14mm+ccw"
    },
    "muzzle-tracer": {
      name: "Spitfire RGB Tracer Unit",
      price: 39.99,
      desc: "Flares glow-in-the-dark gel balls on firing. Simulated exhaust flash.",
      mods: { firepower: 10, accuracy: 3, firerate: 0, range: 2, weight: 0.2 },
      keyword: "spitfire+tracer+unit+gel+blaster"
    }
  },
  magazine: {
    "magazine-standard": {
      name: "30-Rnd Polymer Magazine",
      price: 14.99,
      desc: "Standard window-sided standard mag. Quick reloading tabs.",
      mods: { firepower: 0, accuracy: 0, firerate: 0, range: 0, weight: -0.1 },
      keyword: "polymer+30rd+magazine+gel+blaster"
    },
    "magazine-drum": {
      name: "100-Rnd Tactical Drum Mag",
      price: 34.99,
      desc: "Dual electric winding drum magazine. Non-stop suppression.",
      mods: { firepower: 15, accuracy: -3, firerate: 8, range: 0, weight: 0.7 },
      keyword: "electric+drum+magazine+gel+blaster"
    },
    "magazine-fast": {
      name: "Fast-Mag Dual-Coupler",
      price: 22.50,
      desc: "Two standard mags clipped together with tension loops for speed-reloads.",
      mods: { firepower: 5, accuracy: 0, firerate: 3, range: 0, weight: 0.15 },
      keyword: "dual+coupled+magazines+airsoft"
    }
  },
  foregrip: {
    "grip-none": {
      name: "Bare RIS Rail Guard",
      price: 0.00,
      desc: "Bare guard rails. Low drag, clean front frame.",
      mods: { firepower: 0, accuracy: -3, firerate: 0, range: 0, weight: -0.1 },
      keyword: "picatinny+handguard+rail+covers"
    },
    "grip-angled": {
      name: "AFG-2 Angled Foregrip",
      price: 18.99,
      desc: "Ergonomic triangular foregrip. Dramatically reduces hand fatigue.",
      mods: { firepower: 0, accuracy: 12, firerate: 0, range: 0, weight: 0.08 },
      keyword: "angled+foregrip+afg2"
    },
    "grip-vertical": {
      name: "Combat Pod Vertical Grip & Laser",
      price: 27.99,
      desc: "Rigid vertical tactical handle containing a quick-toggle red laser sight.",
      mods: { firepower: 0, accuracy: 18, firerate: 0, range: 4, weight: 0.25 },
      keyword: "vertical+grip+red+laser+airsoft"
    }
  },
  stock: {
    "stock-standard": {
      name: "Collapsible M4 Stock",
      price: 15.00,
      desc: "Standard 6-position sliding buffer tube stock.",
      mods: { firepower: 0, accuracy: 0, firerate: 0, range: 0, weight: 0.25 },
      keyword: "collapsible+m4+buffer+stock"
    },
    "stock-cqb": {
      name: "CQB Folding Stock brace",
      price: 27.50,
      desc: "Skeletonized folding tactical hinge stock. Fits compact scenarios.",
      mods: { firepower: -5, accuracy: -6, firerate: 0, range: -3, weight: -0.2 },
      keyword: "folding+cqb+stock+brace"
    },
    "stock-alpha": {
      name: "Alpha PRS Ergonomic Stock",
      price: 39.99,
      desc: "Sniper-grade tactical stock. Rubber buttpad, cheek riser dial.",
      mods: { firepower: 0, accuracy: 22, firerate: 0, range: 0, weight: 0.55 },
      keyword: "alpha+prs+precision+rifle+stock"
    }
  }
};

const PRESET_BUILDS = {
  factory: {
    receiver: "receiver-polymer",
    optics: "optics-iron",
    muzzle: "muzzle-flash",
    magazine: "magazine-standard",
    foregrip: "grip-none",
    stock: "stock-standard"
  },
  cqb: {
    receiver: "receiver-polymer",
    optics: "optics-reddot",
    muzzle: "muzzle-suppress",
    magazine: "magazine-fast",
    foregrip: "grip-angled",
    stock: "stock-cqb"
  },
  assault: {
    receiver: "receiver-cnc",
    optics: "optics-reddot",
    muzzle: "muzzle-tracer",
    magazine: "magazine-drum",
    foregrip: "grip-vertical",
    stock: "stock-standard"
  },
  sniper: {
    receiver: "receiver-cnc",
    optics: "optics-acog",
    muzzle: "muzzle-suppress",
    magazine: "magazine-standard",
    foregrip: "grip-angled",
    stock: "stock-alpha"
  }
};

// ==========================================================================
// 2. MAIN COMPONENT EXPORT
// ==========================================================================
export default function CustomizerPage() {
  // --- States ---
  const [currentBuild, setCurrentBuild] = useState(PRESET_BUILDS.factory);
  const [activePreset, setActivePreset] = useState("factory");
  const [theme, setTheme] = useState("stealth");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isExploded, setIsExploded] = useState(false);
  const [activeCategory, setActiveCategory] = useState("magazine");
  const [showCheckout, setShowCheckout] = useState(false);
  const [invoiceId, setInvoiceId] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);

  // HUD Stats values states for tween ticker animations
  const [animatedStats, setAnimatedStats] = useState({
    firepower: 240,
    accuracy: 70,
    firerate: 12,
    range: 20,
    mobility: 80
  });

  const [activeDeltas, setActiveDeltas] = useState({
    firepower: 0,
    accuracy: 0,
    firerate: 0,
    range: 0,
    weight: 0
  });

  // --- Refs ---
  const audioCtxRef = useRef(null);
  const toastTimeoutRef = useRef(null);

  // --- Theme Syncing ---
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  // --- Real-time Stats Ticker Math Solver ---
  useEffect(() => {
    let fpMod = 0;
    let acMod = 0;
    let frMod = 0;
    let rgMod = 0;
    let wtMod = 0;

    for (const [cat, partKey] of Object.entries(currentBuild)) {
      const partData = PARTS_DATABASE[cat][partKey];
      fpMod += partData.mods.firepower;
      acMod += partData.mods.accuracy;
      frMod += partData.mods.firerate;
      rgMod += partData.mods.range;
      wtMod += partData.mods.weight;
    }

    const baseFp = 240;
    const baseAc = 70;
    const baseFr = 12;
    const baseRg = 20;
    const baseWt = 2.0;

    const targetFp = Math.max(180, Math.min(320, baseFp + fpMod));
    const targetAc = Math.max(40, Math.min(98, baseAc + acMod));
    const targetFr = Math.max(8, Math.min(24, baseFr + frMod));
    const targetRg = Math.max(15, Math.min(45, baseRg + rgMod));
    
    const finalWeight = Math.max(1.2, baseWt + wtMod);
    const targetMb = Math.max(40, Math.min(100, Math.round(100 - (finalWeight - 1.2) * 18)));

    setActiveDeltas({
      firepower: fpMod,
      accuracy: acMod,
      firerate: frMod,
      range: rgMod,
      weight: finalWeight
    });

    // Tween ticker frames using requestAnimationFrame
    let startTimestamp = null;
    const duration = 400; // ms
    const initialStats = { ...animatedStats };

    const animateStep = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      setAnimatedStats({
        firepower: Math.round(initialStats.firepower + progress * (targetFp - initialStats.firepower)),
        accuracy: Math.round(initialStats.accuracy + progress * (targetAc - initialStats.accuracy)),
        firerate: Math.round(initialStats.firerate + progress * (targetFr - initialStats.firerate)),
        range: Math.round(initialStats.range + progress * (targetRg - initialStats.range)),
        mobility: Math.round(initialStats.mobility + progress * (targetMb - initialStats.mobility))
      });

      if (progress < 1) {
        window.requestAnimationFrame(animateStep);
      }
    };

    window.requestAnimationFrame(animateStep);
  }, [currentBuild]);

  // --- Dynamic Receipts Math ---
  const currentTotalPartsPrice = Object.entries(currentBuild).reduce((sum, [cat, key]) => {
    return sum + PARTS_DATABASE[cat][key].price;
  }, 0);

  // --- Web Audio Synthetic Click Engines ---
  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
  };

  const playClickSound = () => {
    if (!soundEnabled) return;
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.type = "sine";
      osc.frequency.setValueAtTime(1800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.03);

      gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.035);
    } catch (e) {
      console.warn("Synth failed to play:", e);
    }
  };

  const playAttachSound = () => {
    if (!soundEnabled) return;
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc1.type = "triangle";
      osc1.frequency.setValueAtTime(220, ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.08);

      osc2.type = "sine";
      osc2.frequency.setValueAtTime(1200, ctx.currentTime);
      osc2.frequency.setValueAtTime(800, ctx.currentTime + 0.015);
      osc2.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.06);

      gainNode.gain.setValueAtTime(0.12, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.04, ctx.currentTime + 0.015);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc1.start(ctx.currentTime);
      osc2.start(ctx.currentTime);
      
      osc1.stop(ctx.currentTime + 0.095);
      osc2.stop(ctx.currentTime + 0.095);
    } catch (e) {
      console.warn("Synth snap failed to play:", e);
    }
  };

  // --- Feedback notifications ---
  const triggerNotification = (msg) => {
    setToastMsg(msg);
    setShowToast(true);

    if (soundEnabled) {
      try {
        initAudio();
        const ctx = audioCtxRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(950, ctx.currentTime);
        gain.gain.setValueAtTime(0.012, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.09);
      } catch(e){}
    }

    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    
    toastTimeoutRef.current = setTimeout(() => {
      setShowToast(false);
    }, 3500);
  };

  // --- Action Handlers ---
  const handlePartSelect = (category, partKey) => {
    setCurrentBuild(prev => ({
      ...prev,
      [category]: partKey
    }));
    setActivePreset("custom");
    playAttachSound();
  };

  const handlePresetSelect = (presetKey) => {
    setCurrentBuild(PRESET_BUILDS[presetKey]);
    setActivePreset(presetKey);
    playAttachSound();
    triggerNotification(`Preset Loadout loaded: ${presetKey.toUpperCase()}`);
  };

  const toggleCategory = (category) => {
    playClickSound();
    setActiveCategory(prev => prev === category ? "" : category);
  };

  const toggleExploded = () => {
    setIsExploded(!isExploded);
    playAttachSound();
    if (!isExploded) {
      triggerNotification("Exploded layout activated. Displaying modular mounts.");
    } else {
      triggerNotification("System components locked into snapped configurations.");
    }
  };

  const handleThemeChange = (e) => {
    const nextTheme = e.target.value;
    setTheme(nextTheme);
    playClickSound();

    let themeName = "Stealth Dark";
    if (nextTheme === "draft") themeName = "Technical Blueprint";
    if (nextTheme === "cyber") themeName = "Cybernetic Warning";

    triggerNotification(`HUD Scenery Mode: ${themeName}`);
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) {
      // Plays click sound using next state immediately
      setTimeout(() => {
        triggerNotification("Synthesized audio calibrated and ONLINE.");
      }, 50);
    }
  };

  const openCheckout = () => {
    playAttachSound();
    setInvoiceId(`INV-${Math.floor(10000000 + Math.random() * 90000000)}-X`);
    setShowCheckout(true);
  };

  const copyBuildHash = () => {
    playClickSound();
    const buildHash = btoa(JSON.stringify(currentBuild)).substring(0, 16).toUpperCase();
    navigator.clipboard.writeText(`GELFORGE-${buildHash}`).then(() => {
      triggerNotification("Build footprint copied to clipboard!");
    });
  };

  const confirmCompilation = () => {
    playAttachSound();
    setShowCheckout(false);
    triggerNotification("System compile successful! Assembly ready.");
  };

  // --- E-Commerce outbound URL queries builders ---
  const activePartData = PARTS_DATABASE[activeCategory]?.[currentBuild[activeCategory]] || {};
  const searchKeyword = activePartData.keyword || "gel+blaster+upgrade";
  
  const shopeeUrl = `https://shopee.com/search?keyword=gel+blaster+${searchKeyword}`;
  const aliexpressUrl = `https://www.aliexpress.com/wholesale?SearchText=airsoft+${searchKeyword}`;
  const amazonUrl = `https://www.amazon.com/s?k=gel+blaster+${searchKeyword}`;
  const evikeUrl = `https://www.evike.com/s/?q=airsoft+${searchKeyword}`;

  // Batch Receipt queries
  const batchQuery = "gel+blaster+parts+upgrade";
  const shopeeBatchUrl = `https://shopee.com/search?keyword=${batchQuery}`;
  const amazonBatchUrl = `https://www.amazon.com/s?k=airsoft+custom+parts+kit`;

  // --- Combat Synergy grades solver ---
  const totalPercent = (
    (animatedStats.firepower - 180) / (320 - 180) +
    (animatedStats.accuracy - 40) / (98 - 40) +
    (animatedStats.range - 15) / (45 - 15) +
    (animatedStats.mobility - 40) / (100 - 40)
  ) / 4;

  let grade = "C";
  let gradeDesc = "Average stock components assembly. Performance uncalibrated.";
  
  if (totalPercent > 0.82) {
    grade = "S";
    gradeDesc = "Apex loadout synergy. Precision engineering yields legendary fire capabilities.";
  } else if (totalPercent > 0.65) {
    grade = "A";
    gradeDesc = "Advanced tactical blueprint. High response accuracy and stabilized range scaling.";
  } else if (totalPercent > 0.50) {
    grade = "B";
    gradeDesc = "Balanced operation setup. Standard field deployment configurations.";
  }

  const ringCircumference = 264;
  const ringDashOffset = ringCircumference - (ringCircumference * Math.max(0, Math.min(1, totalPercent)));

  return (
    <div className="app-container">
      <div className="hud-scanline"></div>

      {/* ==========================================
          HEADER SECTION
          ========================================== */}
      <header className="hud-header">
        <div className="logo-area">
          <span className="glitch-text" data-text="GEL-FORGE">GEL-FORGE</span>
          <span className="sub-logo">SYSTEM V.2.6</span>
        </div>

        {/* Preset Builds */}
        <div className="preset-section">
          <span className="section-label">LOADOUT PRESETS:</span>
          <div className="preset-buttons">
            <button 
              className={`preset-btn ${activePreset === "factory" ? "active" : ""}`}
              onClick={() => handlePresetSelect("factory")}
            >
              FACTORY MOCK
            </button>
            <button 
              className={`preset-btn ${activePreset === "cqb" ? "active" : ""}`}
              onClick={() => handlePresetSelect("cqb")}
            >
              CQB STEALTH
            </button>
            <button 
              className={`preset-btn ${activePreset === "assault" ? "active" : ""}`}
              onClick={() => handlePresetSelect("assault")}
            >
              HEAVY ASSAULT
            </button>
            <button 
              className={`preset-btn ${activePreset === "sniper" ? "active" : ""}`}
              onClick={() => handlePresetSelect("sniper")}
            >
              RECON SNIPER
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="sys-controls">
          <div className="control-group">
            <label htmlFor="theme-select">HUD MODE:</label>
            <select 
              id="theme-select" 
              className="hud-dropdown"
              value={theme}
              onChange={handleThemeChange}
            >
              <option value="stealth">🌑 STEALTH DARK</option>
              <option value="draft">📐 BLUEPRINT LIGHT</option>
              <option value="cyber">☣️ CYBER WARNING</option>
            </select>
          </div>

          <button 
            className={`control-btn ${soundEnabled ? "active" : ""}`}
            onClick={toggleSound}
          >
            <span className="icon">{soundEnabled ? "🔊" : "🔇"}</span>
            <span className="text">{soundEnabled ? "AUDIO ON" : "AUDIO MUTED"}</span>
          </button>

          <button 
            className={`control-btn ${isExploded ? "active" : ""}`}
            onClick={toggleExploded}
          >
            <span className="icon">🧩</span>
            <span className="text">{isExploded ? "SNAP TOGETHER" : "DETACH PARTS"}</span>
          </button>
        </div>
      </header>

      {/* ==========================================
          MAIN AREA
          ========================================== */}
      <main className="hud-main">
        
        {/* LEFT SIDEBAR: Categories & Choices */}
        <section className="sidebar-left">
          <div className="panel-header">
            <h2>ATTACHMENTS LIST</h2>
            <span className="panel-status">ONLINE</span>
          </div>

          <div className="categories-accordion">
            {Object.keys(PARTS_DATABASE).map((category, idx) => {
              const catNum = String(idx + 1).padStart(2, "0");
              const labelMap = {
                receiver: "RECEIVER (CORE FRAME)",
                optics: "OPTICS (SIGHT / SCOPE)",
                muzzle: "MUZZLE ATTACHMENTS",
                magazine: "MAGAZINE MODULES",
                foregrip: "UNDERBARREL GRIPS",
                stock: "REAR STOCKS"
              };

              const isActive = activeCategory === category;
              return (
                <div key={category} className={`accordion-item ${isActive ? "active" : ""}`}>
                  <button 
                    className="accordion-header"
                    onClick={() => toggleCategory(category)}
                  >
                    <span className="cat-num">{catNum}</span> {labelMap[category]}
                  </button>
                  <div className="accordion-content">
                    {Object.entries(PARTS_DATABASE[category]).map(([partKey, data]) => {
                      const isPartSelected = currentBuild[category] === partKey;
                      return (
                        <div 
                          key={partKey} 
                          className={`part-option ${isPartSelected ? "active" : ""}`}
                          onClick={() => handlePartSelect(category, partKey)}
                        >
                          <div className="part-meta">
                            <span className="part-name">{data.name}</span>
                            <span className="part-price">${data.price.toFixed(2)}</span>
                          </div>
                          <p className="part-desc">{data.desc}</p>
                          <div className="part-stats-delta">
                            {Object.entries(data.mods).map(([stat, val]) => {
                              if (val === 0) return null;
                              const isWeight = stat === "weight";
                              const sign = val > 0 ? "+" : "";
                              const suffix = isWeight ? "kg" : (stat === "accuracy" ? "%" : "");
                              const prefix = isWeight ? "Weight " : (stat === "firepower" ? "Fire Power " : stat.charAt(0).toUpperCase() + stat.slice(1) + " ");
                              
                              // Weight behaves inverted (less weight is positive, more weight negative)
                              let deltaType = "neutral";
                              if (isWeight) {
                                deltaType = val < 0 ? "positive" : "negative";
                              } else {
                                deltaType = val > 0 ? "positive" : "negative";
                              }

                              return (
                                <span key={stat} className={`delta ${deltaType}`}>
                                  {prefix}{sign}{val}{suffix}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CENTER INTERACTIVE Customizer Canvas */}
        <section className="customizer-stage">
          <div className="stage-hud-meta">
            <div className="hud-tag">BUILD STATUS: <span className="pulse-cyan">PROTOTYPE ASSEMBLY</span></div>
            <div className="hud-coordinates">X: 184.22 // Y: 320.19 // ROT: 0.0</div>
          </div>

          <div className="canvas-viewport">
            <svg 
              id="blaster-svg" 
              className={isExploded ? "exploded" : ""} 
              viewBox="0 0 1000 500" 
              width="100%" 
              height="100%" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="neon-glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="neon-glow-gold" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                
                <pattern id="grid-subdiv" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--grid-line-minor)" strokeWidth="0.5"/>
                </pattern>
                <pattern id="grid-main" width="100" height="100" patternUnits="userSpaceOnUse">
                  <rect width="100" height="100" fill="url(#grid-subdiv)" />
                  <path d="M 100 0 L 0 0 0 100" fill="none" stroke="var(--grid-line-major)" strokeWidth="1.2"/>
                </pattern>

                <radialGradient id="stage-vignette" cx="50%" cy="50%" r="70%">
                  <stop offset="0%" stopColor="var(--vignette-center)" stopOpacity="1" />
                  <stop offset="100%" stopColor="var(--vignette-outer)" stopOpacity="1" />
                </radialGradient>
              </defs>

              <rect width="1000" height="500" fill="url(#stage-vignette)" />
              <rect width="1000" height="500" fill="url(#grid-main)" opacity="0.6" />

              {/* Vector Assembly Guides */}
              <g 
                id="alignment-lines" 
                className="alignment-vectors" 
                stroke="var(--accent-glow)" 
                strokeWidth="1.5" 
                strokeDasharray="4,4" 
                fill="none" 
                style={{ opacity: isExploded ? 0.85 : 0, transition: "opacity 0.5s ease" }}
              >
                <line x1="330" y1="210" x2="160" y2="210" />
                <line x1="480" y1="180" x2="430" y2="70" />
                <line x1="680" y1="215" x2="840" y2="215" />
                <line x1="465" y1="270" x2="465" y2="390" />
                <line x1="570" y1="240" x2="610" y2="340" />
              </g>

              {/* 1. STOCKS */}
              <g id="stock-group" className="svg-modular-part">
                {currentBuild.stock === "stock-standard" && (
                  <g id="svg-stock-standard" className="svg-sub-part active">
                    <path d="M 330 195 L 300 195 L 290 200 L 210 200 L 210 230 L 280 230 L 285 220 L 330 220 Z" fill="var(--gun-matte)" stroke="var(--gun-stroke)" strokeWidth="2"/>
                    <path d="M 210 200 L 160 200 L 155 210 L 155 260 L 175 265 L 180 250 L 195 240 L 210 240 Z" fill="var(--gun-polymer)" stroke="var(--gun-stroke)" strokeWidth="2"/>
                    <line x1="155" y1="215" x2="170" y2="215" stroke="var(--gun-stroke)" strokeWidth="2" />
                    <line x1="155" y1="230" x2="170" y2="230" stroke="var(--gun-stroke)" strokeWidth="2" />
                    <line x1="155" y1="245" x2="170" y2="245" stroke="var(--gun-stroke)" strokeWidth="2" />
                    <circle cx="250" cy="215" r="4" fill="var(--gun-accent)" />
                  </g>
                )}
                {currentBuild.stock === "stock-cqb" && (
                  <g id="svg-stock-cqb" className="svg-sub-part active">
                    <path d="M 330 195 L 290 195 L 280 215 L 330 215 Z" fill="var(--gun-matte)" stroke="var(--gun-stroke)" strokeWidth="2" />
                    <circle cx="280" cy="205" r="7" fill="var(--gun-accent)" stroke="var(--gun-stroke)" strokeWidth="2"/>
                    <path d="M 280 205 L 190 205 L 170 215 L 170 255 L 195 255 L 205 245 L 205 220 L 280 220 Z" fill="var(--gun-polymer)" stroke="var(--gun-stroke)" strokeWidth="2" opacity="0.9" />
                    <polygon points="195,215 260,215 205,245" fill="none" stroke="var(--gun-stroke)" strokeWidth="2"/>
                  </g>
                )}
                {currentBuild.stock === "stock-alpha" && (
                  <g id="svg-stock-alpha" className="svg-sub-part active">
                    <rect x="290" y="195" width="40" height="25" fill="var(--gun-matte)" stroke="var(--gun-stroke)" strokeWidth="2" />
                    <path d="M 290 195 L 200 195 L 160 210 L 160 270 L 190 275 L 200 250 L 235 250 L 245 270 L 290 270 Z" fill="var(--gun-matte)" stroke="var(--gun-stroke)" strokeWidth="2" />
                    <path d="M 205 185 L 270 185 L 280 195 L 195 195 Z" fill="var(--gun-accent)" stroke="var(--gun-stroke)" strokeWidth="2" />
                    <circle cx="220" cy="210" r="5" fill="var(--accent-neon)" />
                    <circle cx="255" cy="210" r="5" fill="var(--accent-neon)" />
                    <rect x="210" y="225" width="55" height="18" rx="4" fill="none" stroke="var(--gun-stroke)" strokeWidth="2" />
                  </g>
                )}
              </g>

              {/* 2. MAIN RECEIVER */}
              <g id="receiver-group" className="svg-modular-part">
                {currentBuild.receiver === "receiver-polymer" && (
                  <g id="svg-receiver-polymer" className="svg-sub-part active">
                    <rect x="330" y="180" width="220" height="12" fill="var(--gun-matte)" stroke="var(--gun-stroke)" strokeWidth="2" />
                    <path d="M 330 192 L 550 192 L 550 225 L 330 230 Z" fill="var(--gun-matte)" stroke="var(--gun-stroke)" strokeWidth="2" />
                    <path d="M 330 230 L 440 228 L 450 265 L 485 265 L 490 225 L 530 225 L 530 205" fill="none" stroke="var(--gun-stroke)" strokeWidth="2"/>
                    <path d="M 330 230 L 445 228 L 455 270 L 480 270 L 485 230 L 530 230 L 535 220 L 535 192 L 330 192 Z" fill="var(--gun-polymer)" stroke="var(--gun-stroke)" strokeWidth="2" />
                    <path d="M 370 230 L 390 230 L 415 315 L 380 320 L 360 255 Z" fill="var(--gun-polymer)" stroke="var(--gun-stroke)" strokeWidth="2" />
                    <line x1="380" y1="255" x2="395" y2="305" stroke="var(--gun-stroke)" strokeWidth="2.5" strokeDasharray="2,6" />
                    <path d="M 400 230 C 400 260 435 260 435 230" fill="none" stroke="var(--gun-stroke)" strokeWidth="2" />
                    <path d="M 408 232 Q 415 255 425 240" fill="none" stroke="var(--gun-accent)" strokeWidth="3" />
                    <rect x="430" y="200" width="45" height="15" rx="2" fill="var(--gun-matte-dark)" stroke="var(--gun-stroke)" strokeWidth="1.5" />
                    <line x1="435" y1="208" x2="470" y2="208" stroke="var(--gun-stroke)" strokeWidth="2" />
                    <circle cx="390" cy="242" r="5" fill="var(--gun-accent)" stroke="var(--gun-stroke)" strokeWidth="1.5" />
                    <line x1="390" y1="242" x2="395" y2="245" stroke="var(--accent-neon)" strokeWidth="2" />
                    <rect x="550" y="205" width="130" height="10" fill="var(--gun-matte)" stroke="var(--gun-stroke)" strokeWidth="1.5" />
                    <rect x="640" y="195" width="20" height="25" fill="var(--gun-accent)" stroke="var(--gun-stroke)" strokeWidth="2"/>
                  </g>
                )}
                {currentBuild.receiver === "receiver-cnc" && (
                  <g id="svg-receiver-cnc" className="svg-sub-part active">
                    <rect x="330" y="180" width="220" height="12" fill="var(--gun-accent)" stroke="var(--gun-stroke)" strokeWidth="2" />
                    <path d="M 330 192 L 550 192 L 550 225 L 330 230 Z" fill="var(--gun-matte-dark)" stroke="var(--gun-stroke)" strokeWidth="2" />
                    <path d="M 350 200 Q 400 190 430 215 T 510 205" fill="none" stroke="var(--accent-neon)" strokeWidth="2.5" />
                    <path d="M 370 210 Q 420 205 450 220 T 530 210" fill="none" stroke="var(--accent-neon)" strokeWidth="1.5" />
                    <rect x="420" y="200" width="20" height="18" rx="2" fill="var(--accent-neon)" opacity="0.3" stroke="var(--accent-neon)" strokeWidth="1" />
                    <rect x="450" y="200" width="20" height="18" rx="2" fill="var(--accent-neon)" opacity="0.3" stroke="var(--accent-neon)" strokeWidth="1" />
                    <path d="M 330 230 L 445 228 L 455 270 L 480 270 L 485 230 L 530 230 L 535 220 L 535 192 L 330 192 Z" fill="var(--gun-matte)" stroke="var(--gun-stroke)" strokeWidth="2" />
                    <path d="M 370 230 L 390 230 L 415 315 L 380 320 L 360 255 Z" fill="var(--gun-matte)" stroke="var(--gun-stroke)" strokeWidth="2" />
                    <polygon points="378,245 395,245 398,285 382,295" fill="none" stroke="var(--accent-neon)" strokeWidth="1.5" />
                    <path d="M 400 230 C 400 260 435 260 435 230" fill="none" stroke="var(--gun-stroke)" strokeWidth="2" />
                    <path d="M 412 232 L 420 255" stroke="#ff3b30" strokeWidth="3.5" />
                    <rect x="550" y="203" width="130" height="14" fill="var(--gun-accent)" stroke="var(--gun-stroke)" strokeWidth="1.5" />
                    <circle cx="580" cy="210" r="3" fill="#ff3b30" />
                    <circle cx="610" cy="210" r="3" fill="#ff3b30" />
                    <circle cx="640" cy="210" r="3" fill="#ff3b30" />
                  </g>
                )}
              </g>

              {/* 3. OPTICS */}
              <g id="optics-group" className="svg-modular-part">
                {currentBuild.optics === "optics-iron" && (
                  <g id="svg-optics-iron" className="svg-sub-part active">
                    <path d="M 360 180 L 350 180 L 350 160 L 355 155 L 360 165 Z" fill="var(--gun-matte)" stroke="var(--gun-stroke)" strokeWidth="1.5"/>
                    <path d="M 530 180 L 525 180 L 520 155 L 525 150 L 530 158 Z" fill="var(--gun-matte)" stroke="var(--gun-stroke)" strokeWidth="1.5"/>
                  </g>
                )}
                {currentBuild.optics === "optics-reddot" && (
                  <g id="svg-optics-reddot" className="svg-sub-part active">
                    <rect x="420" y="168" width="60" height="12" fill="var(--gun-matte)" stroke="var(--gun-stroke)" strokeWidth="2"/>
                    <circle cx="435" cy="174" r="3" fill="var(--gun-accent)"/>
                    <circle cx="465" cy="174" r="3" fill="var(--gun-accent)"/>
                    <path d="M 430 168 L 435 150 L 475 150 L 480 168 Z" fill="var(--gun-matte-dark)" stroke="var(--gun-stroke)" strokeWidth="2"/>
                    <rect x="415" y="128" width="75" height="22" rx="3" fill="var(--gun-polymer)" stroke="var(--gun-stroke)" strokeWidth="2" />
                    <path d="M 415 128 L 415 150" stroke="var(--accent-glow)" strokeWidth="2" />
                    <path d="M 490 128 L 490 150" stroke="var(--accent-glow)" strokeWidth="2" />
                    <circle cx="452" cy="139" r="2" fill="#ff3b30" />
                    <rect x="445" y="122" width="12" height="6" fill="var(--gun-accent)" stroke="var(--gun-stroke)" strokeWidth="1" />
                  </g>
                )}
                {currentBuild.optics === "optics-acog" && (
                  <g id="svg-optics-acog" className="svg-sub-part active">
                    <rect x="420" y="168" width="80" height="12" fill="var(--gun-matte-dark)" stroke="var(--gun-stroke)" strokeWidth="2" />
                    <circle cx="440" cy="174" r="4" fill="var(--gun-accent)" />
                    <circle cx="480" cy="174" r="4" fill="var(--gun-accent)" />
                    <path d="M 430 168 L 435 150 L 485 150 L 490 168 Z" fill="var(--gun-matte)" stroke="var(--gun-stroke)" strokeWidth="2"/>
                    <path d="M 410 135 L 435 130 L 480 130 L 510 120 L 525 120 L 525 152 L 485 152 L 475 145 L 420 145 Z" fill="var(--gun-polymer)" stroke="var(--gun-stroke)" strokeWidth="2" />
                    <path d="M 410 135 L 398 127 L 398 153 L 415 145 Z" fill="var(--gun-matte)" stroke="var(--gun-stroke)" strokeWidth="2" />
                    <path d="M 470 128 L 495 120" stroke="#ff3b30" strokeWidth="3" strokeLinecap="round" />
                    <rect x="450" y="124" width="10" height="6" fill="var(--gun-accent)" stroke="var(--gun-stroke)" strokeWidth="1" />
                  </g>
                )}
              </g>

              {/* 4. MUZZLE */}
              <g id="muzzle-group" className="svg-modular-part">
                {currentBuild.muzzle === "muzzle-flash" && (
                  <g id="svg-muzzle-flash" className="svg-sub-part active">
                    <path d="M 680 206 L 710 206 L 715 202 L 720 202 L 720 214 L 715 214 L 710 210 L 680 210 Z" fill="var(--gun-matte)" stroke="var(--gun-stroke)" strokeWidth="1.5" />
                    <line x1="695" y1="208" x2="705" y2="208" stroke="var(--gun-stroke)" strokeWidth="1" />
                    <line x1="695" y1="212" x2="705" y2="212" stroke="var(--gun-stroke)" strokeWidth="1" />
                  </g>
                )}
                {currentBuild.muzzle === "muzzle-suppress" && (
                  <g id="svg-muzzle-suppress" className="svg-sub-part active">
                    <rect x="680" y="205" width="10" height="10" fill="var(--gun-accent)" stroke="var(--gun-stroke)" strokeWidth="1" />
                    <rect x="690" y="193" width="170" height="34" rx="4" fill="var(--gun-polymer)" stroke="var(--gun-stroke)" strokeWidth="2" />
                    <circle cx="715" cy="200" r="3.5" fill="var(--gun-matte-dark)" />
                    <circle cx="735" cy="200" r="3.5" fill="var(--gun-matte-dark)" />
                    <circle cx="755" cy="200" r="3.5" fill="var(--gun-matte-dark)" />
                    <circle cx="775" cy="200" r="3.5" fill="var(--gun-matte-dark)" />
                    <circle cx="795" cy="200" r="3.5" fill="var(--gun-matte-dark)" />
                    <circle cx="815" cy="200" r="3.5" fill="var(--gun-matte-dark)" />
                    <circle cx="835" cy="200" r="3.5" fill="var(--gun-matte-dark)" />
                    <circle cx="715" cy="218" r="3.5" fill="var(--gun-matte-dark)" />
                    <circle cx="735" cy="218" r="3.5" fill="var(--gun-matte-dark)" />
                    <circle cx="755" cy="218" r="3.5" fill="var(--gun-matte-dark)" />
                    <circle cx="775" cy="218" r="3.5" fill="var(--gun-matte-dark)" />
                    <circle cx="795" cy="218" r="3.5" fill="var(--gun-matte-dark)" />
                    <circle cx="815" cy="218" r="3.5" fill="var(--gun-matte-dark)" />
                    <circle cx="835" cy="218" r="3.5" fill="var(--gun-matte-dark)" />
                    <line x1="696" y1="193" x2="696" y2="227" stroke="var(--gun-stroke)" strokeWidth="2" />
                    <line x1="701" y1="193" x2="701" y2="227" stroke="var(--gun-stroke)" strokeWidth="2" />
                  </g>
                )}
                {currentBuild.muzzle === "muzzle-tracer" && (
                  <g id="svg-muzzle-tracer" className="svg-sub-part active">
                    <rect x="680" y="206" width="6" height="8" fill="var(--gun-accent)" stroke="var(--gun-stroke)" strokeWidth="1" />
                    <path d="M 686 198 L 745 198 L 750 203 L 750 217 L 745 222 L 686 222 Z" fill="var(--gun-matte-dark)" stroke="var(--gun-stroke)" strokeWidth="2" />
                    <line x1="700" y1="202" x2="730" y2="202" stroke="var(--gun-stroke)" strokeWidth="1.5" />
                    <text x="702" y="213" fontFamily="monospace" fontSize="7" fill="var(--accent-neon)" opacity="0.8">SPITFIRE</text>
                    <path d="M 750 205 L 750 215" stroke="var(--accent-glow)" strokeWidth="3" />
                  </g>
                )}
              </g>

              {/* 5. MAGAZINE */}
              <g id="magazine-group" className="svg-modular-part">
                {currentBuild.magazine === "magazine-standard" && (
                  <g id="svg-magazine-standard" className="svg-sub-part active">
                    <path d="M 458 266 L 485 264 L 475 350 L 442 346 Z" fill="var(--gun-polymer)" stroke="var(--gun-stroke)" strokeWidth="2" />
                    <path d="M 442 346 L 475 350 L 472 360 L 449 358 Z" fill="var(--gun-accent)" stroke="var(--gun-stroke)" strokeWidth="1.5"/>
                    <line x1="453" y1="280" x2="475" y2="280" stroke="var(--gun-stroke)" strokeWidth="2" />
                    <line x1="451" y1="295" x2="472" y2="295" stroke="var(--gun-stroke)" strokeWidth="2" />
                    <line x1="449" y1="310" x2="470" y2="310" stroke="var(--gun-stroke)" strokeWidth="2" />
                    <line x1="447" y1="325" x2="467" y2="325" stroke="var(--gun-stroke)" strokeWidth="2" />
                  </g>
                )}
                {currentBuild.magazine === "magazine-drum" && (
                  <g id="svg-magazine-drum" className="svg-sub-part active">
                    <path d="M 458 266 L 485 264 L 480 295 L 452 295 Z" fill="var(--gun-polymer)" stroke="var(--gun-stroke)" strokeWidth="2" />
                    <circle cx="466" cy="345" r="45" fill="var(--gun-polymer)" stroke="var(--gun-stroke)" strokeWidth="2.5" />
                    <circle cx="466" cy="345" r="30" fill="var(--gun-matte)" stroke="var(--gun-stroke)" strokeWidth="1.5" />
                    <circle cx="466" cy="345" r="10" fill="var(--gun-accent)" stroke="var(--gun-stroke)" strokeWidth="2" />
                    <path d="M 466 300 L 466 310" stroke="var(--gun-stroke)" strokeWidth="2" />
                    <path d="M 466 380 L 466 390" stroke="var(--gun-stroke)" strokeWidth="2" />
                    <path d="M 421 345 L 431 345" stroke="var(--gun-stroke)" strokeWidth="2" />
                    <path d="M 501 345 L 511 345" stroke="var(--gun-stroke)" strokeWidth="2" />
                    <rect x="458" y="325" width="16" height="8" rx="2" fill="var(--accent-neon)" opacity="0.3" stroke="var(--accent-neon)" strokeWidth="1" />
                    <circle cx="462" cy="329" r="2.5" fill="var(--accent-neon)" />
                    <circle cx="470" cy="329" r="2.5" fill="var(--accent-neon)" />
                  </g>
                )}
                {currentBuild.magazine === "magazine-fast" && (
                  <g id="svg-magazine-fast" className="svg-sub-part active">
                    <path d="M 458 266 L 485 264 L 475 350 L 442 346 Z" fill="var(--gun-polymer)" stroke="var(--gun-stroke)" strokeWidth="2" />
                    <rect x="443" y="285" width="55" height="15" fill="var(--gun-accent)" stroke="var(--gun-stroke)" strokeWidth="1.5" />
                    <path d="M 470 290 L 497 288 L 487 374 L 454 370 Z" fill="var(--gun-polymer)" stroke="var(--gun-stroke)" strokeWidth="2" opacity="0.85" />
                    <path d="M 442 346 C 442 355 475 359 475 350" fill="none" stroke="var(--accent-neon)" strokeWidth="2" />
                    <path d="M 454 370 C 454 379 487 383 487 374" fill="none" stroke="var(--accent-neon)" strokeWidth="2" opacity="0.8" />
                  </g>
                )}
              </g>

              {/* 6. FOREGRIPS */}
              <g id="foregrip-group" className="svg-modular-part">
                {currentBuild.foregrip === "grip-none" && (
                  <g id="svg-grip-none" className="svg-sub-part active">
                    <line x1="550" y1="228" x2="620" y2="228" stroke="var(--gun-stroke)" strokeWidth="2.5" strokeDasharray="2,4" />
                  </g>
                )}
                {currentBuild.foregrip === "grip-angled" && (
                  <g id="svg-grip-angled" className="svg-sub-part active">
                    <path d="M 552 230 L 615 230 L 610 248 L 575 270 L 560 270 L 565 252 Z" fill="var(--gun-polymer)" stroke="var(--gun-stroke)" strokeWidth="2" />
                    <polygon points="572,238 602,238 580,255" fill="none" stroke="var(--gun-stroke)" strokeWidth="2" />
                    <circle cx="560" cy="235" r="3" fill="var(--gun-accent)"/>
                    <circle cx="605" cy="235" r="3" fill="var(--gun-accent)"/>
                  </g>
                )}
                {currentBuild.foregrip === "grip-vertical" && (
                  <g id="svg-grip-vertical" className="svg-sub-part active">
                    <rect x="560" y="230" width="40" height="8" rx="1" fill="var(--gun-accent)" stroke="var(--gun-stroke)" strokeWidth="1.5" />
                    <path d="M 568 238 L 592 238 L 587 300 C 587 305 573 305 573 300 Z" fill="var(--gun-polymer)" stroke="var(--gun-stroke)" strokeWidth="2" />
                    <line x1="570" y1="250" x2="590" y2="250" stroke="var(--gun-stroke)" strokeWidth="2" />
                    <line x1="571" y1="265" x2="589" y2="265" stroke="var(--gun-stroke)" strokeWidth="2" />
                    <line x1="572" y1="280" x2="588" y2="280" stroke="var(--gun-stroke)" strokeWidth="2" />
                    <rect x="585" y="236" width="18" height="12" rx="2" fill="var(--gun-matte)" stroke="var(--gun-stroke)" strokeWidth="1.5" />
                    <circle cx="600" cy="242" r="2.5" fill="#ff3b30" />
                    <line x1="602" y1="242" x2="800" y2="242" stroke="#ff3b30" strokeWidth="1.5" strokeDasharray="8,20" opacity="0.6" />
                  </g>
                )}
              </g>

              {/* HOTSPOTS */}
              <g id="stage-hotspots" className="hud-hotspots">
                {/* Optics */}
                <g className="hotspot-trigger" onClick={() => { setActiveCategory("optics"); playClickSound(); }} transform="translate(450, 135)">
                  <circle cx="0" cy="0" r="16" fill="var(--accent-glow)" opacity="0.1" />
                  <circle cx="0" cy="0" r="8" fill="var(--accent-neon)" className="hotspot-pulse" />
                  <circle cx="0" cy="0" r="3" fill="var(--bg-card)" />
                </g>
                {/* Muzzle */}
                <g className="hotspot-trigger" onClick={() => { setActiveCategory("muzzle"); playClickSound(); }} transform="translate(710, 208)">
                  <circle cx="0" cy="0" r="16" fill="var(--accent-glow)" opacity="0.1" />
                  <circle cx="0" cy="0" r="8" fill="var(--accent-neon)" className="hotspot-pulse" />
                  <circle cx="0" cy="0" r="3" fill="var(--bg-card)" />
                </g>
                {/* Magazine */}
                <g className="hotspot-trigger" onClick={() => { setActiveCategory("magazine"); playClickSound(); }} transform="translate(465, 335)">
                  <circle cx="0" cy="0" r="16" fill="var(--accent-glow)" opacity="0.1" />
                  <circle cx="0" cy="0" r="8" fill="var(--accent-neon)" className="hotspot-pulse" />
                  <circle cx="0" cy="0" r="3" fill="var(--bg-card)" />
                </g>
                {/* Foregrip */}
                <g className="hotspot-trigger" onClick={() => { setActiveCategory("foregrip"); playClickSound(); }} transform="translate(585, 260)">
                  <circle cx="0" cy="0" r="16" fill="var(--accent-glow)" opacity="0.1" />
                  <circle cx="0" cy="0" r="8" fill="var(--accent-neon)" className="hotspot-pulse" />
                  <circle cx="0" cy="0" r="3" fill="var(--bg-card)" />
                </g>
                {/* Stock */}
                <g className="hotspot-trigger" onClick={() => { setActiveCategory("stock"); playClickSound(); }} transform="translate(230, 220)">
                  <circle cx="0" cy="0" r="16" fill="var(--accent-glow)" opacity="0.1" />
                  <circle cx="0" cy="0" r="8" fill="var(--accent-neon)" className="hotspot-pulse" />
                  <circle cx="0" cy="0" r="3" fill="var(--bg-card)" />
                </g>
                {/* Receiver */}
                <g className="hotspot-trigger" onClick={() => { setActiveCategory("receiver"); playClickSound(); }} transform="translate(410, 215)">
                  <circle cx="0" cy="0" r="16" fill="var(--accent-glow)" opacity="0.1" />
                  <circle cx="0" cy="0" r="8" fill="var(--accent-neon)" className="hotspot-pulse" />
                  <circle cx="0" cy="0" r="3" fill="var(--bg-card)" />
                </g>
              </g>
            </svg>

            {/* Floating Labels (Positioned based on snapped coordinate overlays) */}
            <div className="hud-slot-label label-optics" style={{ left: "45%", top: "12%" }}>
              <div className="pointer-dot">1</div>
              <div className="label-box">
                <span className="lbl-tag">OPTICS SYSTEM</span>
                <span className="lbl-val">{PARTS_DATABASE.optics[currentBuild.optics].name.replace(" Tactical", "").replace(" Ergonomic", "")}</span>
              </div>
            </div>

            <div className="hud-slot-label label-muzzle" style={{ left: "72%", top: "32%" }}>
              <div className="pointer-dot">2</div>
              <div className="label-box">
                <span className="lbl-tag">BARREL MUZZLE</span>
                <span className="lbl-val">{PARTS_DATABASE.muzzle[currentBuild.muzzle].name.replace(" Tactical", "").replace(" Ergonomic", "")}</span>
              </div>
            </div>

            <div className="hud-slot-label label-magazine" style={{ left: "48%", top: "76%" }}>
              <div className="pointer-dot">3</div>
              <div className="label-box">
                <span className="lbl-tag">MAGAZINE UNIT</span>
                <span className="lbl-val">{PARTS_DATABASE.magazine[currentBuild.magazine].name.replace(" Tactical", "").replace(" Ergonomic", "")}</span>
              </div>
            </div>

            <div className="hud-slot-label label-foregrip" style={{ left: "62%", top: "58%" }}>
              <div className="pointer-dot">4</div>
              <div className="label-box">
                <span className="lbl-tag">FOREGRIP SUPPORT</span>
                <span className="lbl-val">{PARTS_DATABASE.foregrip[currentBuild.foregrip].name.replace(" Tactical", "").replace(" Ergonomic", "")}</span>
              </div>
            </div>

            <div className="hud-slot-label label-stock" style={{ left: "18%", top: "35%" }}>
              <div className="pointer-dot">5</div>
              <div className="label-box">
                <span className="lbl-tag">REAR STOCK</span>
                <span className="lbl-val">{PARTS_DATABASE.stock[currentBuild.stock].name.replace(" Tactical", "").replace(" Ergonomic", "")}</span>
              </div>
            </div>
          </div>

          {/* E-COMMERCE CARDS procurement Drawer */}
          <div className="ecommerce-quick-buy">
            <div className="drawer-header">
              <h3>CURRENT MODULE PROCUREMENT</h3>
              <span className="sub-header">CLICK COMPONENT ON THE LEFT OR THE STAGE TO SWAP DETAILS</span>
            </div>

            <div className="procure-card">
              <div className="part-preview-details">
                <div className="part-type-tag">{activeCategory.toUpperCase()}</div>
                <h4>{activePartData.name}</h4>
                <p>{activePartData.desc}</p>
                <div className="buy-part-pricing">
                  UNIT COST: <span className="highlight-cyan">${activePartData.price?.toFixed(2)}</span>
                </div>
              </div>

              {/* Platforms buys search redirects */}
              <div className="outbound-platforms">
                <span className="platform-label">BUY ATTACHMENT FROM OUTBOUND E-COMMERCE PLATFORMS:</span>
                <div className="platform-links-grid">
                  <a href={shopeeUrl} target="_blank" rel="noopener noreferrer" className="platform-link link-shopee">
                    <span className="p-icon">🛍️</span>
                    <span className="p-name">Shopee</span>
                    <span className="p-action">Search Deals</span>
                  </a>
                  <a href={aliexpressUrl} target="_blank" rel="noopener noreferrer" className="platform-link link-aliexpress">
                    <span className="p-icon">✈️</span>
                    <span className="p-name">AliExpress</span>
                    <span className="p-action">Global Ship</span>
                  </a>
                  <a href={amazonUrl} target="_blank" rel="noopener noreferrer" className="platform-link link-amazon">
                    <span className="p-icon">📦</span>
                    <span className="p-name">Amazon</span>
                    <span className="p-action">Prime Delivery</span>
                  </a>
                  <a href={evikeUrl} target="_blank" rel="noopener noreferrer" className="platform-link link-evike">
                    <span className="p-icon">🎯</span>
                    <span className="p-name">Evike Airsoft</span>
                    <span className="p-action">Superstore</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT SIDEBAR: Stats Parameters HUD & Receipt total */}
        <section className="sidebar-right">
          <div className="panel-header">
            <h2>GUNSMITH HUD STATS</h2>
            <span className="panel-status">CONNECTED</span>
          </div>

          {/* Grade indicator */}
          <div className="grade-container">
            <div className="grade-circle">
              <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" stroke="var(--bg-element)" strokeWidth="8" fill="none" />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="42" 
                  stroke="var(--accent-neon)" 
                  strokeWidth="8" 
                  fill="none" 
                  strokeDasharray={ringCircumference} 
                  strokeDashoffset={ringDashOffset} 
                  className="grade-ring-fill" 
                />
              </svg>
              <div className="grade-label">
                <span className="sub-grade">CLASS</span>
                <span className="grade-char">{grade}</span>
              </div>
            </div>
            <div className="grade-meta">
              <h3>LOADOUT SYNERGY</h3>
              <p>{gradeDesc}</p>
            </div>
          </div>

          {/* Progress gauges */}
          <div className="stats-parameters">
            {/* Fire Power */}
            <div className="stat-row">
              <div className="stat-meta">
                <span className="stat-title">FIRE POWER (FPS)</span>
                <span className="stat-value">{animatedStats.firepower} FPS</span>
              </div>
              <div className="stat-progress-bar">
                <div className="progress-fill" style={{ width: `${((animatedStats.firepower - 180) / (320 - 180)) * 100}%` }}></div>
              </div>
              <span className={`stat-delta ${activeDeltas.firepower > 0 ? "positive" : (activeDeltas.firepower < 0 ? "negative" : "")}`}>
                {activeDeltas.firepower > 0 ? `+${activeDeltas.firepower} FPS` : (activeDeltas.firepower < 0 ? `${activeDeltas.firepower} FPS` : "Baseline")}
              </span>
            </div>

            {/* Accuracy */}
            <div className="stat-row">
              <div className="stat-meta">
                <span className="stat-title">ACCURACY (%)</span>
                <span className="stat-value">{animatedStats.accuracy}%</span>
              </div>
              <div className="stat-progress-bar">
                <div className="progress-fill" style={{ width: `${((animatedStats.accuracy - 40) / (98 - 40)) * 100}%` }}></div>
              </div>
              <span className={`stat-delta ${activeDeltas.accuracy > 0 ? "positive" : (activeDeltas.accuracy < 0 ? "negative" : "")}`}>
                {activeDeltas.accuracy > 0 ? `+${activeDeltas.accuracy}% Accuracy` : (activeDeltas.accuracy < 0 ? `${activeDeltas.accuracy}% Accuracy` : "Baseline")}
              </span>
            </div>

            {/* Fire Rate */}
            <div className="stat-row">
              <div className="stat-meta">
                <span className="stat-title">FIRE RATE (RPS)</span>
                <span className="stat-value">{animatedStats.firerate} RPS</span>
              </div>
              <div className="stat-progress-bar">
                <div className="progress-fill" style={{ width: `${((animatedStats.firerate - 8) / (24 - 8)) * 100}%` }}></div>
              </div>
              <span className={`stat-delta ${activeDeltas.firerate > 0 ? "positive" : (activeDeltas.firerate < 0 ? "negative" : "")}`}>
                {activeDeltas.firerate > 0 ? `+${activeDeltas.firerate} RPS` : (activeDeltas.firerate < 0 ? `${activeDeltas.firerate} RPS` : "Baseline")}
              </span>
            </div>

            {/* Effective Range */}
            <div className="stat-row">
              <div className="stat-meta">
                <span className="stat-title">EFFECTIVE RANGE</span>
                <span className="stat-value">{animatedStats.range}m</span>
              </div>
              <div className="stat-progress-bar">
                <div className="progress-fill" style={{ width: `${((animatedStats.range - 15) / (45 - 15)) * 100}%` }}></div>
              </div>
              <span className={`stat-delta ${activeDeltas.range > 0 ? "positive" : (activeDeltas.range < 0 ? "negative" : "")}`}>
                {activeDeltas.range > 0 ? `+${activeDeltas.range}m Effective` : (activeDeltas.range < 0 ? `${activeDeltas.range}m Effective` : "Baseline")}
              </span>
            </div>

            {/* Mobility */}
            <div className="stat-row">
              <div className="stat-meta">
                <span className="stat-title">MOBILITY (WEIGHT)</span>
                <span className="stat-value">{animatedStats.mobility}%</span>
              </div>
              <div className="stat-progress-bar">
                <div className="progress-fill" style={{ width: `${((animatedStats.mobility - 40) / (100 - 40)) * 100}%` }}></div>
              </div>
              <span className="stat-delta">
                {activeDeltas.weight.toFixed(2)} kg Total
              </span>
            </div>
          </div>

          {/* Pricing receipt trigger */}
          <div className="hud-billing-box">
            <div className="billing-header">CONFIGURATION SUMMARY</div>
            <div className="billing-rows">
              <div className="bill-row">
                <span>Selected Parts Count:</span>
                <strong>6 / 6</strong>
              </div>
              <div className="bill-row">
                <span>Total Assembly Cost:</span>
                <strong className="highlight-gold">${currentTotalPartsPrice.toFixed(2)}</strong>
              </div>
            </div>
            <button className="order-kit-btn" onClick={openCheckout}>
              <span className="btn-glow-effects"></span>
              ORDER SYSTEM ASSEMBLY KIT
            </button>
          </div>
        </section>
      </main>

      {/* ==========================================
          CHECKOUT MODAL RECEIPT SCREEN
          ========================================== */}
      {showCheckout && (
        <div className="modal-overlay" style={{ display: "flex" }}>
          <div className="modal-box">
            <div className="modal-border-accent"></div>
            <button className="modal-close" onClick={() => { playClickSound(); setShowCheckout(false); }}>×</button>
            
            <div className="modal-header">
              <span className="warning-hazard-stripe"></span>
              <h2>CUSTOM BUILD INVOICE</h2>
              <span className="invoice-number">{invoiceId}</span>
            </div>

            <div className="modal-body">
              <p className="invoice-notice">The custom gel blaster / airsoft build has been registered. Below is the procurement catalog with aggregated shopping links to purchase each individual part from your preferred marketplace.</p>
              
              <table className="receipt-table">
                <thead>
                  <tr>
                    <th>MODULE</th>
                    <th>SELECTED COMPONENT</th>
                    <th className="text-right">PRICE</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(currentBuild).map(([cat, key]) => {
                    const data = PARTS_DATABASE[cat][key];
                    return (
                      <tr key={cat}>
                        <td style={{ fontFamily: "Orbitron", fontWeight: 700, color: "var(--accent-neon)" }}>{cat.toUpperCase()}</td>
                        <td style={{ color: "var(--text-primary)", fontWeight: 500 }}>{data.name}</td>
                        <td className="text-right" style={{ fontFamily: "monospace", fontWeight: 700 }}>${data.price.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="receipt-total-row">
                    <td colSpan="2">ESTIMATED KIT TOTAL</td>
                    <td className="text-right highlight-gold">${currentTotalPartsPrice.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>

              {/* Batch marketplace consolidated queries */}
              <div className="consolidated-procurement">
                <h3>CONSOLIDATED MARKETPLACE DISPATCH</h3>
                <p>Instantly search all active build components across preferred platforms in one click:</p>
                <div className="quick-batch-links">
                  <a href={shopeeBatchUrl} target="_blank" rel="noopener noreferrer" className="batch-btn batch-shopee">
                    🎒 SEARCH ALL ON SHOPEE
                  </a>
                  <a href={amazonBatchUrl} target="_blank" rel="noopener noreferrer" className="batch-btn batch-amazon">
                    📦 SEARCH ALL ON AMAZON
                  </a>
                </div>
              </div>

              <div className="modal-actions">
                <button className="action-btn-secondary" onClick={copyBuildHash}>
                  💾 COPY BUILD HASH
                </button>
                <button className="action-btn-primary" onClick={confirmCompilation}>
                  🛠️ COMPILE SYSTEM SCHEMATIC
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cyber Toast Alerts feedback banner */}
      <div className={`toast-notification ${showToast ? "show" : ""}`}>
        <span>{toastMsg}</span>
      </div>
    </div>
  );
}

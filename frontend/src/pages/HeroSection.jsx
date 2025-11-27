// src/components/HeroSection.jsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/*
  Uses local image path from your session:
  If you want to use a different image, change HERO_IMAGE_PATH.
*/
const HERO_IMAGE_PATH = "/mnt/data/Screenshot (122).png";

const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));

const HeroSection = () => {
  const containerRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [animatePulse, setAnimatePulse] = useState(false);

  // get user from localStorage if present
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (e) {
    user = null;
  }
  const name = user?.name || "";

  // replay micro-animation on mount/visibility
  useEffect(() => {
    const t = setTimeout(() => setAnimatePulse(true), 250);
    const t2 = setTimeout(() => setAnimatePulse(false), 1800);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, []);

  // mouse move / parallax
  const onMove = useCallback((e) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clamp((e.clientX - rect.left) / rect.width, 0, 1);
    const y = clamp((e.clientY - rect.top) / rect.height, 0, 1);
    setMouse({ x, y });
  }, []);

  // touch support: track center of touches
  const onTouchMove = useCallback(
    (e) => {
      if (!e.touches || e.touches.length === 0) return;
      const t = e.touches[0];
      onMove(t);
    },
    [onMove]
  );

  // subtle ambient particles generator (pure DOM)
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const container = root.querySelector(".hp-particles");
    if (!container) return;

    // create a small pool of particles
    const COUNT = 18;
    const created = [];
    for (let i = 0; i < COUNT; i++) {
      const p = document.createElement("div");
      p.className = "hp-particle";
      // random initial position and size
      p.style.left = `${Math.random() * 100}%`;
      p.style.top = `${Math.random() * 100}%`;
      p.style.width = `${6 + Math.random() * 14}px`;
      p.style.height = p.style.width;
      p.style.opacity = `${0.06 + Math.random() * 0.15}`;
      container.appendChild(p);
      created.push(p);
    }

    // gently animate positions
    let raf = true;
    const animate = () => {
      if (!raf) return;
      created.forEach((p, i) => {
        const dx = Math.sin(Date.now() / 2000 + i) * 6;
        const dy = Math.cos(Date.now() / 1600 + i * 1.3) * 6;
        p.style.transform = `translate(${dx}px, ${dy}px) rotate(${
          (i * 37) % 360
        }deg)`;
      });
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    return () => {
      raf = false;
      created.forEach((p) => p.remove());
    };
  }, []);

  // compute parallax transforms for blobs
  const blobTransform = (mx, my, intensity = 30) => {
    // center normalized [-0.5 .. 0.5]
    const cx = mx - 0.5;
    const cy = my - 0.5;
    return `translate3d(${cx * intensity}px, ${cy * intensity}px, 0)`;
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={onMove}
      onTouchMove={onTouchMove}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero"
      style={{
        WebkitTapHighlightColor: "transparent",
        // fallback background color while image loads
        backgroundColor: "#0f172a",
      }}
    >
      {/* Inline critical keyframes & tiny styles so this works without CSS files */}
      <style>{`
        @keyframes hp-slide-in { from { transform: translateY(12px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        @keyframes hp-glow { 0% { filter: blur(18px) saturate(1.1); opacity: 0.25 } 50% { filter: blur(28px) saturate(1.25); opacity: 0.45 } 100% { filter: blur(18px) saturate(1.1); opacity: 0.25 } }
        .hp-particles { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
        .hp-particle { position: absolute; border-radius: 50%; background: linear-gradient(135deg, rgba(255,255,255,0.12), rgba(160,200,255,0.06)); box-shadow: 0 8px 30px rgba(14, 165, 233, 0.06); transform-origin: center; will-change: transform; }
        .hp-blob { position: absolute; border-radius: 48%; filter: blur(48px); opacity: 0.6; will-change: transform, opacity;}
        .hp-glass { backdrop-filter: blur(8px) saturate(120%); -webkit-backdrop-filter: blur(8px) saturate(120%); background: linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02)); border: 1px solid rgba(255,255,255,0.06); }
        .hp-button { transition: transform 200ms ease, box-shadow 200ms ease; }
        .hp-button:active { transform: translateY(1px) scale(0.995); }
        .hp-floating { animation: hp-floating 6s ease-in-out infinite; }
        @keyframes hp-floating { 0% { transform: translateY(0); } 50% { transform: translateY(-6px); } 100% { transform: translateY(0); } }
        .hp-spot { mix-blend-mode: overlay; filter: blur(60px); opacity: 0.38; }
      `}</style>

      {/* Background image layer - uses provided local path */}
      <div
        aria-hidden
        className="absolute inset-0 bg-center bg-cover -z-20"
        style={{
          backgroundImage: `url("${HERO_IMAGE_PATH}")`,
          transform: `scale(${1 + 0.015 * (mouse.x - 0.5)})`,
          transition: "transform 300ms linear",
          backgroundPosition: `${50 + (mouse.x - 0.5) * 8}% ${
            50 + (mouse.y - 0.5) * 6
          }%`,
        }}
      />

      {/* Cool ambient gradient overlay (spotlight + color wash) */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(600px 300px at 10% 20%, rgba(59,130,246,0.12), transparent 20%), radial-gradient(700px 400px at 90% 80%, rgba(139,92,246,0.08), transparent 20%), linear-gradient(180deg, rgba(255,255,255,0.02), rgba(8,10,27,0.45))",
          mixBlendMode: "soft-light",
        }}
      />

      {/* Animated blurred blobs (parallax) */}
      <div
        className="hp-blob"
        style={{
          width: 560,
          height: 420,
          background:
            "linear-gradient(135deg, rgba(59,130,246,0.22), rgba(99,102,241,0.14))",
          left: "6%",
          top: "12%",
          transform: blobTransform(mouse.x, mouse.y, 36),
          zIndex: -5,
          animation: animatePulse
            ? "hp-glow 6s ease-in-out infinite"
            : undefined,
        }}
      />
      <div
        className="hp-blob"
        style={{
          width: 460,
          height: 360,
          background:
            "linear-gradient(135deg, rgba(99,102,241,0.18), rgba(139,92,246,0.12))",
          right: "6%",
          bottom: "6%",
          transform: blobTransform(1 - mouse.x, 1 - mouse.y, 28),
          zIndex: -5,
          animation: animatePulse
            ? "hp-glow 6s ease-in-out infinite"
            : undefined,
        }}
      />
      {/* small spotlight */}
      <div
        className="hp-spot"
        style={{
          position: "absolute",
          left: `${20 + (mouse.x - 0.5) * 30}%`,
          top: `${8 + (mouse.y - 0.5) * 12}%`,
          width: 600,
          height: 300,
          borderRadius: "40%",
          background:
            "radial-gradient(closest-side, rgba(255,255,255,0.06), rgba(255,255,255,0))",
          zIndex: -4,
        }}
      />

      {/* Particles container */}
      <div className="hp-particles -z-10" aria-hidden />

      {/* CONTENT WRAPPER */}
      <div className="relative z-10 max-w-6xl w-full px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left: Text */}
          <div className="text-white">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="rounded-full p-2 bg-white/10 border border-white/6">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 12h18"
                    stroke="white"
                    strokeOpacity="0.9"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 3v18"
                    stroke="white"
                    strokeOpacity="0.6"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span className="text-sm font-semibold tracking-wide text-white/80 uppercase">
                TherapyHub • Care & Tech
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg">
              Find{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-indigo-300 to-violet-300">
                calm
              </span>
              , get{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-200 via-emerald-300 to-cyan-200">
                support
              </span>
              , & build resilience.
            </h1>

            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl">
              Connect with certified therapists, track progress, and access
              evidence-based tools — all with empathy and privacy in mind.
            </p>

            {/* Personalized greeting */}
            {name ? (
              <div className="mb-6 text-sm text-white/85">
                Hey <strong className="text-white">{name}</strong> — welcome
                back. Ready to explore what feels right for you today?
              </div>
            ) : null}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/therapists"
                className="hp-button hp-floating inline-flex items-center gap-3 justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                Find a Therapist
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to={
                  name
                    ? user?.role === "Therapist"
                      ? "/therapist/dashboard"
                      : "/client-dashboard"
                    : "/register"
                }
                className="hp-button inline-flex items-center gap-3 justify-center px-6 py-3 rounded-xl border border-white/10 bg-white/6 text-white font-semibold hover:bg-white/12 focus:outline-none focus:ring-4 focus:ring-white/10"
                aria-label="Get started"
              >
                {name ? "Go to Dashboard" : "Get Started"}
              </Link>
            </div>

            {/* micro features */}
            <div className="mt-6 flex flex-wrap gap-3 text-xs text-white/80">
              <div className="px-3 py-2 bg-white/6 rounded-md">
                Secure & private
              </div>
              <div className="px-3 py-2 bg-white/6 rounded-md">Teletherapy</div>
              <div className="px-3 py-2 bg-white/6 rounded-md">
                Evidence-based
              </div>
            </div>
          </div>

          {/* Right: glass card with highlights */}
          <div className="w-full flex items-center justify-center">
            <div
              className="hp-glass rounded-3xl p-6 md:p-8 w-full max-w-md shadow-xl border border-white/6"
              role="region"
              aria-label="Quick actions"
              style={{
                transform: `translate3d(${(mouse.x - 0.5) * 18}px, ${
                  (mouse.y - 0.5) * 10
                }px, 0)`,
                transition: "transform 220ms linear",
              }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm text-white/80">Start by</div>
                  <div className="text-xl font-bold text-white">
                    Exploring available sessions
                  </div>
                </div>
                <div className="text-xs text-white/70">Avg wait • 1–3 days</div>
              </div>

              <ul className="mt-5 space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white font-bold">
                    T
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">
                      Talk Therapy
                    </div>
                    <div className="text-xs text-white/70">
                      Flexible scheduling & secure video
                    </div>
                  </div>
                </li>

                <li className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-emerald-500 to-cyan-400 flex items-center justify-center text-white font-bold">
                    G
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">
                      Guided Programs
                    </div>
                    <div className="text-xs text-white/70">
                      Self-paced courses for anxiety & sleep
                    </div>
                  </div>
                </li>
              </ul>

              <div className="mt-6">
                <Link
                  to="/careers"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-white text-slate-900 font-semibold hover:brightness-105"
                >
                  We're hiring — Explore Careers
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-44 pointer-events-none -z-5"
        style={{
          background: "linear-gradient(180deg, transparent, rgba(8,10,27,0.9))",
        }}
      />
    </section>
  );
};

export default HeroSection;

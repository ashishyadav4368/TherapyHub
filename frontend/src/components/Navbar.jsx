import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  Menu,
  X,
  Heart,
  ChevronRight,
  ChevronDown,
  Activity,
  Zap,
  Feather,
  Users,
  SunMedium,
  Coffee,
  Brain,
  LifeBuoy,
  Star,
  BookOpen,
} from "lucide-react";

/**
 * Mega Navbar with:
 * - Mega dropdown (glassmorphism)
 * - Category tiles with images & icons
 * - Submenus + recommended therapies
 * - No hover-gap (top-full + tiny negative margin / immediate placement)
 * - Keyboard accessible (focus/blur)
 *
 * Copy this file as Navbar.jsx. Replace image URLs and route links later.
 */

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false); // mobile menu
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [megaFocused, setMegaFocused] = useState(false); // keyboard focus keep-open
  const megaRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // close mega when clicking outside
  useEffect(() => {
    function onDocClick(e) {
      if (megaRef.current && !megaRef.current.contains(e.target)) {
        setMegaOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  // Full category+submenu data for mega menu
  const servicesData = [
    {
      id: "mood",
      title: "Mood & Depression",
      icon: Brain,
      image:
        "https://images.pexels.com/photos/4056531/pexels-photo-4056531.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Evidence-based therapy for depression and low mood.",
      links: [
        { title: "Depression Counseling", to: "/depression-counseling" },
        {
          title: "Behavioral Activation",
          to: "/services/behavioral-activation",
        },
        { title: "CBT for Depression", to: "/services/cbt-depression" },
      ],
      recommended: [
        { title: "Mood Tracking", to: "/tools/mood-tracker" },
        { title: "Group Support", to: "/groups/mood" },
      ],
    },
    {
      id: "anxiety",
      title: "Anxiety & Stress",
      icon: Zap,
      image:
        "https://images.pexels.com/photos/4056530/pexels-photo-4056530.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Tools to reduce worry, panic, and chronic stress.",
      links: [
        { title: "Anxiety Counseling", to: "/anxiety-counseling" },
        { title: "Mindfulness-Based CBT", to: "/services/mb-cbt" },
        { title: "Panic Management", to: "/services/panic" },
      ],
      recommended: [
        { title: "Guided Breathing", to: "/tools/breathing" },
        { title: "Stress Toolkit", to: "/resources/stress" },
      ],
    },
    {
      id: "relationships",
      title: "Relationships & Couples",
      icon: Users,
      image:
        "https://images.pexels.com/photos/3771110/pexels-photo-3771110.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Couples counseling and relationship coaching.",
      links: [
        { title: "Couples Counseling", to: "/services/couples" },
        { title: "Communication Skills", to: "/services/communication" },
        { title: "Family Therapy", to: "/services/family" },
      ],
      recommended: [{ title: "Workshops", to: "/workshops/relationships" }],
    },
    {
      id: "crisis",
      title: "Trauma & Crisis",
      icon: LifeBuoy,
      image:
        "https://images.pexels.com/photos/5208236/pexels-photo-5208236.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Specialized trauma and crisis-informed care.",
      links: [
        { title: "PTSD Therapy", to: "/ptsd-counseling" },
        { title: "EMDR-Informed Care", to: "/services/emdr" },
        { title: "Crisis Support", to: "/services/crisis" },
      ],
      recommended: [{ title: "24/7 Hotline", to: "/hotline" }],
    },
    {
      id: "wellness",
      title: "Wellness & Prevention",
      icon: SunMedium,
      image:
        "https://images.pexels.com/photos/3810796/pexels-photo-3810796.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Workshops, coaching, and preventive programs.",
      links: [
        { title: "Stress Management", to: "/stress-counseling" },
        { title: "Workplace Wellness", to: "/services/workplace" },
        { title: "Life Coaching", to: "/services/life-coach" },
      ],
      recommended: [{ title: "Courses", to: "/courses/wellness" }],
    },
  ];

  // recommended across site
  const globalRecommended = [
    { title: "Find a Therapist", to: "/therapists", icon: Activity },
    { title: "Resources & Articles", to: "/articles", icon: BookOpen },
    { title: "Why TherapyWorks", to: "/about", icon: Star },
  ];

  // small helper for ARIA id
  const servicesId = "mega-services-panel";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-lg">
                <Heart className="w-5 h-5" />
              </div>
              <div className="hidden sm:block">
                <span className="text-lg font-bold text-slate-900">
                  TherapyConnect
                </span>
                <div className="text-xs text-slate-400 -mt-0.5">
                  Compassionate care, anytime
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/"
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                isActive("/")
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
              }`}
            >
              Home
            </Link>

            <Link
              to="/therapists"
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                isActive("/therapists")
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
              }`}
            >
              Therapists
            </Link>

            {/* MEGA DROPDOWN TRIGGER */}
            <div
              className="relative"
              onMouseEnter={() => {
                setMegaOpen(true);
              }}
              onMouseLeave={() => {
                if (!megaFocused) setMegaOpen(false);
              }}
              onFocus={() => {
                setMegaFocused(true);
                setMegaOpen(true);
              }}
              onBlur={() => {
                setMegaFocused(false);
                setMegaOpen(false);
              }}
              ref={megaRef}
            >
              <button
                aria-haspopup="true"
                aria-expanded={megaOpen}
                aria-controls={servicesId}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  megaOpen
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                }`}
                onClick={() => setMegaOpen((s) => !s)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setMegaOpen(false);
                }}
              >
                Services{" "}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    megaOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* MEGA PANEL (no gap: top-full with mt-0.5) */}
              <div
                id={servicesId}
                role="menu"
                className={`absolute left-1/2 transform -translate-x-1/2 top-full mt-0.5 w-[86vw] md:w-[84rem] max-w-[1100px] z-50 pointer-events-auto`}
                style={{ perspective: 1000 }}
              >
                {megaOpen && (
                  <div
                    className="rounded-2xl overflow-hidden border border-white/30 bg-white/60 backdrop-blur-md shadow-2xl"
                    onMouseEnter={() => setMegaOpen(true)}
                    onMouseLeave={() => setMegaOpen(false)}
                  >
                    <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
                      {/* Left: categories grid */}
                      <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {servicesData.map((cat) => (
                          <div
                            key={cat.id}
                            className="relative rounded-xl overflow-hidden bg-white/80 border border-white/40 hover:scale-[1.02] transition-transform duration-300 shadow-sm flex"
                            role="group"
                          >
                            {/* category image */}
                            <div className="w-36 hidden sm:block flex-shrink-0 relative">
                              <img
                                src={cat.image}
                                alt={cat.title}
                                className="object-cover w-full h-full brightness-90"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            </div>

                            <div className="p-4 flex-1 flex flex-col justify-between">
                              <div>
                                <div className="flex items-center gap-3 mb-2">
                                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 inline-flex">
                                    <cat.icon className="w-5 h-5" />
                                  </div>
                                  <h4 className="text-lg font-bold text-slate-900">
                                    {cat.title}
                                  </h4>
                                </div>
                                <p className="text-sm text-slate-600 mb-3">
                                  {cat.description}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                  {cat.links.map((l, i) => (
                                    <Link
                                      key={i}
                                      to={l.to}
                                      role="menuitem"
                                      onClick={() => setMegaOpen(false)}
                                      className="text-sm px-3 py-1 rounded-md bg-white/80 border border-white/30 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                                    >
                                      {l.title}
                                    </Link>
                                  ))}
                                </div>
                              </div>

                              <div className="mt-3 flex items-center justify-between">
                                <div className="text-xs text-slate-500">
                                  Recommended
                                </div>
                                <div className="flex gap-2">
                                  {cat.recommended.slice(0, 2).map((r, idx) => (
                                    <Link
                                      key={idx}
                                      to={r.to}
                                      onClick={() => setMegaOpen(false)}
                                      className="text-xs text-blue-600 font-semibold hover:underline"
                                    >
                                      {r.title}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Right: Spotlight & Recommended */}
                      <aside className="md:col-span-4 bg-gradient-to-b from-white/30 to-white/10 rounded-xl p-4 border border-white/20">
                        <div className="mb-4">
                          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                            Quick picks
                          </h3>
                          <p className="text-xs text-slate-500 mt-1">
                            Popular therapies & resources
                          </p>
                        </div>

                        <div className="space-y-3">
                          {globalRecommended.map((g, i) => {
                            const Icon = g.icon;
                            return (
                              <Link
                                key={i}
                                to={g.to}
                                onClick={() => setMegaOpen(false)}
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 transition-colors"
                              >
                                <div className="w-10 h-10 rounded-lg bg-white/80 flex items-center justify-center">
                                  <Icon className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                  <div className="font-semibold text-slate-900">
                                    {g.title}
                                  </div>
                                  <div className="text-xs text-slate-500">
                                    Explore →
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>

                        <div className="mt-6 pt-4 border-t border-white/10">
                          <h4 className="text-xs font-bold text-slate-700 uppercase">
                            Need help?
                          </h4>
                          <p className="text-xs text-slate-500 mt-1">
                            If you're unsure where to start, try our guided quiz
                            or speak to support.
                          </p>
                          <div className="mt-3 flex gap-2">
                            <Link
                              to="/help/quiz"
                              onClick={() => setMegaOpen(false)}
                              className="flex-1 text-center py-2 rounded-md bg-blue-600 text-white font-semibold"
                            >
                              Take the Quiz
                            </Link>
                            <Link
                              to="/contact"
                              onClick={() => setMegaOpen(false)}
                              className="px-3 py-2 rounded-md border border-white/20 text-sm text-slate-900 bg-white/70"
                            >
                              Contact
                            </Link>
                          </div>
                        </div>
                      </aside>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Link
              to="/about"
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                isActive("/about")
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
              }`}
            >
              About
            </Link>

            <Link
              to="/careers"
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                isActive("/careers")
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
              }`}
            >
              Careers
            </Link>
            <Link
              to="/pricing"
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                isActive("/pricing")
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
              }`}
            >
              Pricing
            </Link>

            <Link
              to="/contact"
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                isActive("/contact")
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="hidden md:flex items-center gap-3">
                <Link to="/client-dashboard" className="text-sm text-slate-700">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-full bg-red-50 text-red-600 text-sm font-semibold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to="/login"
                  className="text-sm px-3 py-2 rounded-full hover:bg-slate-50"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="text-sm px-3 py-2 rounded-full bg-slate-900 text-white"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 rounded-lg bg-white/60"
              onClick={() => setIsOpen((s) => !s)}
              aria-label="Menu"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile expanded menu */}
      <div
        className={`md:hidden bg-white/95 border-t border-slate-100 transition-all ${
          isOpen ? "max-h-screen" : "max-h-0 overflow-hidden"
        }`}
      >
        <div className="px-4 py-6 space-y-3">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md"
          >
            Home
          </Link>
          <Link
            to="/therapists"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md"
          >
            Therapists
          </Link>

          <details className="group bg-white/40 rounded-lg p-2">
            <summary className="flex items-center justify-between cursor-pointer px-2 py-2">
              <span className="font-medium">Services</span>
              <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
            </summary>
            <div className="mt-2 grid grid-cols-1 gap-2">
              {servicesData.map((cat) => (
                <div
                  key={cat.id}
                  className="px-2 py-1 rounded-md hover:bg-slate-50"
                >
                  <Link
                    to={cat.links[0]?.to || "/"}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2"
                  >
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                      <cat.icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{cat.title}</div>
                      <div className="text-xs text-slate-500">
                        {cat.description}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </details>

          <Link
            to="/articles"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md"
          >
            Articles
          </Link>
          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md"
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md"
          >
            Contact
          </Link>

          <div className="pt-4 border-t border-slate-100">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-md text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md bg-slate-900 text-white text-center"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

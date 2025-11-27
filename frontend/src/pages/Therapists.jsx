// src/pages/Therapists.jsx
import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import {
  Search,
  Filter,
  MessageCircle,
  Video,
  Star,
  ArrowRight,
  Languages,
  Sparkles,
  X,
  CheckCircle2,
  CalendarDays,
} from "lucide-react";

// Optional star rating component placeholder import (if you have one).
// If you don't have it, the UI still shows numeric rating.
import StarRating from "../components/StarRating"; // keep, or remove if not available
import Footer from "./FooterPage";

/* -------------------------------------------------------------------------- */
/* ============================== Therapists Page =========================== */
/* -------------------------------------------------------------------------- */
/* Single-file, production-friendly component with:
   - fetch therapists + fetch ratings per therapist
   - sticky filter bar
   - animated cards: reveal on scroll + hover elevation
   - graceful image handling (absolute URLs or server relative)
   - skeleton loader
   - accessible buttons + clear filters
*/

// TOP OF FILE (just after imports)
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

const Therapists = () => {
  const [therapists, setTherapists] = useState([]);
  const [filteredTherapists, setFilteredTherapists] = useState([]);
  const [therapistRatings, setTherapistRatings] = useState({});
  const [loading, setLoading] = useState(true);

  // filter/search states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  useEffect(() => {
    fetchTherapists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [therapists, searchTerm, selectedSpecialization, selectedLanguage]);

  /* ----------------------------- Data fetching ---------------------------- */
  async function fetchTherapists() {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/api/therapists`);
      const data = Array.isArray(res.data) ? res.data : [];

      setTherapists(data);

      // fetch ratings in parallel
      const ratingPromises = data.map((t) =>
        axios
          .get(`${API_BASE}/api/ratings/therapist/${t._id}`)
          .then((r) => ({ therapistId: t._id, ...r.data }))
          .catch(() => ({
            therapistId: t._id,
            averageRating: 0,
            totalRatings: 0,
          }))
      );

      const ratingResults = await Promise.all(ratingPromises);
      const map = {};
      ratingResults.forEach((r) => {
        map[r.therapistId] = {
          averageRating:
            typeof r.averageRating === "number" ? r.averageRating : 0,
          totalRatings: typeof r.totalRatings === "number" ? r.totalRatings : 0,
        };
      });
      setTherapistRatings(map);
    } catch (err) {
      console.error("Error fetching therapists:", err);
    } finally {
      setLoading(false);
    }
  }

  /* ------------------------------- Filtering ------------------------------ */
  function applyFilters() {
    let list = Array.isArray(therapists) ? [...therapists] : [];
    list = list.filter((t) => t.status !== "inactive"); // default show active (or not explicitly inactive)

    if (searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase();
      list = list.filter(
        (t) =>
          (t.name || "").toLowerCase().includes(q) ||
          (t.specialization || "").toLowerCase().includes(q) ||
          (t.bio || "").toLowerCase().includes(q)
      );
    }

    if (selectedSpecialization) {
      const q = selectedSpecialization.toLowerCase();
      list = list.filter((t) =>
        (t.specialization || "").toLowerCase().includes(q)
      );
    }

    if (selectedLanguage) {
      const q = selectedLanguage.toLowerCase();
      list = list.filter((t) =>
        Array.isArray(t.languages)
          ? t.languages.some((l) => l.toLowerCase().includes(q))
          : false
      );
    }

    setFilteredTherapists(list);
  }

  /* ----------------------------- Utilities -------------------------------- */
  const uniqueSpecializations = useMemo(() => {
    const arr = therapists.map((t) => t.specialization || "").filter(Boolean);
    return Array.from(new Set(arr));
  }, [therapists]);

  const uniqueLanguages = useMemo(() => {
    const arr = therapists.flatMap((t) =>
      Array.isArray(t.languages) ? t.languages : []
    );
    return Array.from(new Set(arr));
  }, [therapists]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedSpecialization("");
    setSelectedLanguage("");
    setIsFilterPanelOpen(false);
  };

  const hasActiveFilters = Boolean(
    searchTerm || selectedSpecialization || selectedLanguage
  );

  /* ------------------------------ Subcomponents --------------------------- */

  const SkeletonCard = () => (
    <div className="bg-white rounded-[1.5rem] p-6 border border-slate-100 shadow-md h-full animate-pulse">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-16 h-16 bg-slate-200 rounded-2xl" />
        <div className="flex-1">
          <div className="h-4 bg-slate-200 rounded w-3/4 mb-3" />
          <div className="h-3 bg-slate-200 rounded w-1/2" />
        </div>
      </div>
      <div className="space-y-3 mb-6">
        <div className="h-3 bg-slate-200 rounded" />
        <div className="h-3 bg-slate-200 rounded" />
        <div className="h-3 bg-slate-200 rounded w-2/3" />
      </div>
      <div className="mt-auto">
        <div className="h-12 bg-slate-200 rounded" />
      </div>
    </div>
  );

  // Card component — each card uses useInView hook to reveal on scroll
  function TherapistCard({ therapist, ratingObj, index }) {
    const [ref, inView] = useInView({ threshold: 0.18, triggerOnce: true });

    // smart photo handling:
    const resolvedPhoto = (() => {
      const p = therapist.photo;
      if (!p) return null;
      if (p.startsWith("http") || p.startsWith("https")) return p;
      // if stored with a leading slash or without, resolve relative to API_BASE
      const clean = p.startsWith("/") ? p.slice(1) : p;
      return `${API_BASE}/${clean}`;
    })();

    return (
      <motion.article
        ref={ref}
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{
          duration: 0.6,
          delay: index * 0.05,
          ease: [0.2, 0.9, 0.2, 1],
        }}
        whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.22 } }}
        className="group relative bg-white rounded-[2rem] p-6 md:p-8 border border-white/80 shadow-lg hover:shadow-[0_25px_50px_-12px_rgba(59,130,246,0.12)] transition-all"
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-start gap-4">
            <div className="relative">
              {resolvedPhoto ? (
                <img
                  src={resolvedPhoto}
                  alt={therapist.name || "Therapist"}
                  className="w-20 h-20 rounded-2xl object-cover shadow-md border-2 border-white"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
                  {therapist.name?.charAt(0) || "T"}
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-sm border border-slate-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">
                {therapist.name}
              </h3>
              <div className="inline-block text-xs font-semibold uppercase tracking-wide text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">
                {therapist.specialization}
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-center justify-end gap-2 mb-1">
              <div className="bg-amber-50 px-3 py-1 rounded-xl inline-flex items-center gap-2 border border-amber-100">
                <Star className="w-4 h-4 text-amber-500" />
                <span className="font-bold text-amber-900">
                  {ratingObj?.averageRating?.toFixed(1) ?? "0.0"}
                </span>
              </div>
            </div>
            <div className="text-xs text-slate-400">
              {ratingObj?.totalRatings ?? 0} reviews
            </div>
          </div>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {therapist.bio}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {Array.isArray(therapist.languages) &&
          therapist.languages.length > 0 ? (
            therapist.languages.map((lang, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200"
              >
                {lang}
              </span>
            ))
          ) : (
            <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              English
            </span>
          )}
        </div>

        <div className="mt-auto grid grid-cols-5 gap-3 pt-4 border-t border-slate-100">
          <Link
            to={`/book-session/${therapist._id}`}
            className="col-span-4 inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-blue-600 transition"
            aria-label={`Book session with ${therapist.name}`}
          >
            <CalendarDays className="w-4 h-4" />
            Book Session
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>

          <a
            href={`https://wa.me/${therapist.whatsapp || ""}`}
            target="_blank"
            rel="noreferrer"
            className="col-span-1 inline-flex items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-500 hover:text-white transition"
            title="Contact on WhatsApp"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
        </div>

        {/* floating small icon */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-white p-1 rounded-full shadow-sm">
            <Video className="w-4 h-4 text-slate-600" />
          </div>
        </div>
      </motion.article>
    );
  }

  /* ------------------------------- Render --------------------------------- */
  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-500 selection:text-white">
      {/* ambient blobs */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-200/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100 shadow-sm mb-6">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-semibold tracking-wide text-blue-900 uppercase">
              Verified Professionals
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Find your{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              healing partner
            </span>
          </h1>
          <p className="text-lg text-slate-600">
            Browse licensed therapists, filter by specialty & language, and book
            secure sessions.
          </p>
        </div>

        {/* sticky control bar */}
        <div className="sticky top-4 z-30 mb-6">
          <div className="bg-white/90 backdrop-blur-md border border-white/70 shadow-lg rounded-xl p-4">
            <div className="flex flex-col md:flex-row gap-3 items-center">
              <div className="flex-1 relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Search className="w-5 h-5 text-slate-400" />
                </div>
                <input
                  className="w-full pl-11 pr-4 py-3 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                  placeholder="Search by name, condition, or keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex gap-3 items-center">
                <button
                  onClick={() => setIsFilterPanelOpen((s) => !s)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                    isFilterPanelOpen || hasActiveFilters
                      ? "bg-blue-600 text-white"
                      : "bg-blue-50 text-blue-600"
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  Filters
                  {hasActiveFilters && (
                    <span className="ml-2 w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                  )}
                </button>

                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="px-3 py-2 rounded-lg bg-red-50 text-red-600 font-semibold"
                  >
                    <X className="w-4 h-4 inline-block mr-1" /> Clear
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* expandable filter panel */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isFilterPanelOpen ? "max-h-[400px] mb-6" : "max-h-0"
          }`}
        >
          <div className="bg-white rounded-xl border border-white/70 shadow-lg p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">
                Specialization
              </label>
              <select
                className="w-full px-4 py-2 rounded-lg border"
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
              >
                <option value="">All Specialties</option>
                {uniqueSpecializations.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">
                Language
              </label>
              <select
                className="w-full px-4 py-2 rounded-lg border"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
              >
                <option value="">All Languages</option>
                {uniqueLanguages.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => setIsFilterPanelOpen(false)}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition w-full"
              >
                Apply & Close
              </button>
            </div>
          </div>
        </div>

        {/* results info */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-slate-600">
              Showing{" "}
              <span className="font-bold text-slate-900">
                {filteredTherapists.length}
              </span>{" "}
              professionals
            </p>
          </div>
          <div className="text-sm text-slate-500">
            Tip: Hover a card for quick actions
          </div>
        </div>

        {/* grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            // skeletons
            Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          ) : filteredTherapists.length > 0 ? (
            filteredTherapists.map((t, i) => (
              <TherapistCard
                key={t._id}
                therapist={t}
                ratingObj={
                  therapistRatings[t._id] ?? {
                    averageRating: 0,
                    totalRatings: 0,
                  }
                }
                index={i}
              />
            ))
          ) : (
            // empty state
            <div className="col-span-full bg-white rounded-2xl p-8 text-center border border-dashed border-slate-200">
              <h3 className="text-2xl font-bold mb-2">No results</h3>
              <p className="text-slate-500 mb-4">
                Try broadening your search or clearing filters.
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-2 rounded-lg bg-blue-600 text-white"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Therapists;

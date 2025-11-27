// src/pages/Careers.jsx
import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Briefcase,
  Sparkles,
  ArrowRight,
  Users,
  HeartHandshake,
  Rocket,
  Coffee,
  GraduationCap,
  ShieldCheck,
  Zap,
  Tag,
  MapPin,
  Clock,
  Minus,
  MessageCircle,
  Loader2, // Using Loader2 for professional spinner
} from "lucide-react";

// Use environment variable for API base path
const API_BASE = import.meta?.env?.VITE_API_BASE || "http://localhost:5000";

// --- Framer Motion Variants ---
const containerVariants = {
  visible: { transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
};
// --- End Framer Motion Variants ---

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const jobsGridRef = useRef(null);
  const navigate = useNavigate();

  // --- 1. Fetch jobs from backend ---
  useEffect(() => {
    let mounted = true;
    const fetchJobs = async () => {
      try {
        setLoading(true);
        // Simulate a slight delay to show the awesome loader
        await new Promise((resolve) => setTimeout(resolve, 500));

        const res = await axios.get(`${API_BASE}/api/jobs`);

        let data = Array.isArray(res.data) ? res.data : res.data?.jobs;

        // Diagnostic/Mock Data fallback (Crucial for testing filter logic)
        if (!data || !Array.isArray(data) || data.length === 0) {
          console.warn(
            "API returned no jobs or invalid data structure. Using mock data."
          );
          data = [
            {
              id: 1,
              title: "Senior Full-Stack Engineer (React/Node)",
              dept: "Engineering",
              type: "Full-time",
              location: "Remote (US/CAN)",
              level: "Senior",
              description:
                "Design, develop, and deploy scalable web applications leveraging modern JavaScript frameworks.",
            },
            {
              id: 2,
              title: "Clinical Onboarding Specialist",
              dept: "Therapists",
              type: "Part-time",
              location: "Remote",
              level: "Entry",
              description:
                "Guide new therapists through the platform credentialing and setup process.",
            },
            {
              id: 3,
              title: "Product Design Lead (UI/UX)",
              dept: "Design",
              type: "Full-time",
              location: "Hybrid (NYC)",
              level: "Lead",
              description:
                "Lead the design vision and execution for our core platform features.",
            },
            {
              id: 4,
              title: "Performance Marketing Manager",
              dept: "Marketing",
              type: "Full-time",
              location: "Remote",
              level: "Mid",
              description:
                "Drive user acquisition through paid search and social campaigns, optimizing for ROI.",
            },
          ];
        }

        // --- DIAGNOSTIC: Check fetched job properties ---
        if (data.length > 0 && !data[0].dept) {
          console.error(
            "CRITICAL: Fetched job object is missing the 'dept' property. Filtering will fail."
          );
        }
        // -------------------------------------------------

        if (mounted) setJobs(data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        // On API error, fall back to mock data
        setJobs([
          {
            id: 1,
            title: "Fallback Engineer Role",
            dept: "Engineering",
            type: "Full-time",
            location: "Remote",
            level: "Senior",
            description: "System fallback.",
          },
        ]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchJobs();
    return () => {
      mounted = false;
    };
  }, []);

  // --- 2. Dynamic Department List ---
  const departments = useMemo(() => {
    // Ensure all department names are capitalized consistently for filters
    const set = new Set(
      jobs
        .map((j) => j.dept)
        .filter(Boolean)
        .map((d) => d.charAt(0).toUpperCase() + d.slice(1))
    );
    return ["All", ...Array.from(set)];
  }, [jobs]);

  const [selectedDept, setSelectedDept] = useState("All");

  // Keep selectedDept valid when departments change
  useEffect(() => {
    if (!departments.includes(selectedDept)) {
      setSelectedDept("All");
    }
  }, [departments, selectedDept]);

  // --- 3. Filtered Jobs Logic (The FIX: Added case-insensitive matching) ---
  const filteredJobs = useMemo(() => {
    if (selectedDept === "All") {
      return jobs;
    }

    // Normalize filter key to match incoming job data (e.g., lowercasing both)
    const filterKey = selectedDept.toLowerCase();

    return jobs.filter((job) => {
      if (!job.dept) return false; // Skip jobs missing department info
      return job.dept.toLowerCase() === filterKey;
    });
  }, [jobs, selectedDept]);

  // --- 4. Handle Department Click & Scroll ---
  const handleDeptClick = (dept) => {
    setSelectedDept(dept);
    // Scroll function, allowing state to update first
    setTimeout(() => {
      if (jobsGridRef.current) {
        const el = jobsGridRef.current;
        // Use an offset that accounts for the sticky filter bar
        const top = el.getBoundingClientRect().top + window.scrollY - 180;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 80);
  };

  // --- COMPONENT RENDER FUNCTIONS ---
  const BenefitCard = ({ icon: Icon, title, desc, delay }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.45, delay }}
      whileHover={{ y: -6, boxShadow: "0 10px 20px rgba(59, 130, 246, 0.1)" }}
      className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-blue-100/50 transition-all duration-300 transform"
    >
      <Icon className="w-10 h-10 text-blue-600 fill-blue-50/50 mb-4" />
      <h3 className="text-xl font-extrabold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
    </motion.div>
  );

  const JobCard = ({ job }) => (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-3xl p-6 shadow-2xl shadow-blue-900/5 border border-slate-100 hover:shadow-blue-300/40 hover:-translate-y-1 transition-all duration-500 ease-out flex flex-col h-full group"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
            {job.title}
          </h3>
          <div className="text-sm text-slate-500 mt-1 flex items-center gap-1">
            <Tag className="w-3 h-3" />
            {job.dept || "Uncategorized"}
          </div>
        </div>
        <span className="text-xs font-semibold uppercase px-3 py-1 rounded-full bg-blue-100 text-blue-700 whitespace-nowrap">
          {job.type || "N/A"}
        </span>
      </div>

      <p className="text-sm text-slate-600 mb-4 line-clamp-3 leading-relaxed">
        {job.description ||
          "A mission-critical role helping us scale our platform and support our clinical team."}
      </p>

      <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-600 mb-6 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-indigo-500" />
          <span>{job.location || "Flexible"}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <GraduationCap className="w-4 h-4 text-violet-500" />
          <span>{job.level || "—"}</span>
        </div>
      </div>

      <div className="mt-auto">
        <button
          onClick={() =>
            navigate(
              `/careers/job/${
                job.slug || job.title.toLowerCase().replace(/ /g, "-")
              }`
            )
          }
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-slate-900 text-white font-extrabold hover:bg-blue-600 transition-all shadow-lg shadow-slate-900/10 group/btn"
        >
          Explore Role
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </button>
      </div>
    </motion.div>
  );

  const EmptyState = () => (
    <div className="col-span-full py-16 bg-white/70 backdrop-blur-md rounded-3xl border border-dashed border-blue-300/50 shadow-xl text-center">
      <MessageCircle className="w-14 h-14 text-blue-400 mx-auto mb-6" />
      <h3 className="text-3xl font-extrabold text-slate-900 mb-3">
        No Current Openings in {selectedDept}
      </h3>
      <p className="text-md text-slate-600 max-w-md mx-auto mb-8">
        We're not actively hiring for this specific department right now. Please
        view our general roles or submit your resume for future consideration.
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleDeptClick("All")}
        className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30"
      >
        <Zap className="w-4 h-4" /> View All Roles ({jobs.length})
      </motion.button>
    </div>
  );

  // --- Loading State Render ---
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="h-16 w-16 text-blue-600 animate-spin mb-4" />
        <p className="text-xl font-semibold text-slate-700">
          Loading Career Opportunities...
        </p>
      </div>
    );
  }

  // --- Main Render ---
  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24 relative overflow-x-hidden">
      {/* --- AMBIENT BACKGROUND --- */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-blue-50/70 to-transparent"></div>
        <div className="absolute top-[-5%] left-[-10%] w-[500px] h-[500px] bg-blue-300/30 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-5%] right-[-10%] w-[550px] h-[550px] bg-indigo-300/30 blur-[180px] rounded-full"></div>
      </div>

      {/* --- HERO --- */}
      <section className="pt-32 pb-24 text-center max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-3 px-6 py-2 bg-white border border-blue-200/50 rounded-full backdrop-blur-md shadow-md mb-6"
        >
          <Sparkles className="text-blue-600 w-4 h-4 fill-blue-200" />
          <span className="font-extrabold text-blue-800 tracking-widest text-xs uppercase">
            Careers at TherapyConnect
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-6xl md:text-8xl font-extrabold text-slate-900 leading-none tracking-tighter"
        >
          Build the{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
            Future
          </span>
          <br />
          of Wellness
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xl text-slate-600 max-w-4xl mx-auto mt-8"
        >
          Join a mission-driven team dedicated to making high-quality mental
          health support accessible to everyone, everywhere. Your work here
          truly matters.
        </motion.p>
      </section>

      {/* --- FILTERS & JOBS --- */}
      <section className="max-w-7xl mx-auto px-6">
        {/* Sticky Department Filter */}
        <div className="sticky top-0 z-20 pt-8 pb-6 mb-10 bg-slate-50/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
            Open Roles ({filteredJobs.length})
          </h2>
          <div className="flex flex-wrap gap-3">
            {departments.map((dept) => {
              const active = selectedDept === dept;
              return (
                <motion.button
                  key={dept}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDeptClick(dept)}
                  className={`px-5 py-2 rounded-full text-sm font-extrabold transition-all duration-300 ${
                    active
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                      : "bg-white border border-slate-200 text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  {dept}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Jobs Grid */}
        <motion.div
          ref={jobsGridRef}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          // We force the grid to render on key change to restart animations when filter changes
          key={selectedDept}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard key={job._id || job.id} job={job} />
            ))
          ) : (
            <EmptyState />
          )}
        </motion.div>
      </section>

      {/* --- BENEFITS SECTION --- */}
      <section className="mt-28 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
            A Culture That Cares
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto mt-4">
            We believe in supporting those who support others. Discover the
            comprehensive benefits we offer to foster growth, health, and
            happiness.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: HeartHandshake,
              title: "Mission-Driven Impact",
              desc: "Contribute directly to improving global mental health access and outcomes.",
            },
            {
              icon: Users,
              title: "Empathetic Culture",
              desc: "A safe, inclusive, and supportive environment built on trust and psychological safety.",
            },
            {
              icon: ShieldCheck,
              title: "Premium Wellness Package",
              desc: "Comprehensive health coverage, dedicated mental health days, and stipends for self-care.",
            },
            {
              icon: Rocket,
              title: "Career Acceleration",
              desc: "Clear paths for advancement, mentorship, and opportunities to lead large-scale projects.",
            },
            {
              icon: GraduationCap,
              title: "Continuous Learning Fund",
              desc: "Generous yearly budget for certifications, workshops, and higher education.",
            },
            {
              icon: Coffee,
              title: "Flexible & Remote-First",
              desc: "Work where you thrive. Full-time remote options and highly flexible schedules.",
            },
          ].map((item, index) => (
            <BenefitCard
              key={index}
              icon={item.icon}
              title={item.title}
              desc={item.desc}
              delay={index * 0.08}
            />
          ))}
        </div>
      </section>

      {/* --- JOIN US CTA (High-Contrast Footer) --- */}
      <section className="mt-32 max-w-7xl mx-auto px-6">
        <div className="bg-slate-900 text-white rounded-[2rem] p-12 md:p-16 text-center shadow-2xl shadow-slate-900/50">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Can't Find Your Role?
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-10">
            We’re always seeking exceptional talent in Tech, Design, and
            Clinical fields. Send us your resume for future opportunities that
            align with our mission.
          </p>

          <a
            href="mailto:careers@therapyconnect.com?subject=General Application: [Your Name]"
            className="inline-flex items-center gap-3 px-10 py-4 bg-blue-600 text-white rounded-xl font-extrabold text-lg hover:bg-blue-700 shadow-xl shadow-blue-500/30 transition-all transform hover:scale-[1.03]"
          >
            Submit General Application
            <ArrowRight className="w-5 h-5 ml-1" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Careers;

// src/pages/About.jsx (Enhanced)
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Sparkles,
  Target,
  Eye,
  Heart,
  Quote,
  Phone,
  Mail,
  GraduationCap,
  Briefcase,
  Languages,
  CheckCircle,
  Linkedin,
  Github,
} from "lucide-react";
import { motion } from "framer-motion";
// Ensure these components are updated to reflect the new design language
import TeamMemberModal from "../components/TeamMemberModal";
import Navbar from "../components/Navbar";

// Sample team data enriched for modal (include all fields)
const TEAM = [
  {
    name: "Dr. Sarah Johnson",
    role: "Clinical Director",
    image:
      "https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=600",
    bio: "Licensed clinical psychologist with 15+ years of experience in mental health care.",
    bio_long:
      "Dr. Sarah Johnson is a licensed clinical psychologist specialized in CBT and trauma-focused therapy. She has 15 years of clinical experience, published papers in clinical psychology, and regularly mentors junior therapists.",
    education: "PhD Clinical Psychology — Stanford University",
    experience: "15 years",
    specializations: ["Anxiety", "Depression", "Trauma"],
    certifications: ["CBT Certified", "Trauma Informed Practitioner"],
    languages: ["English", "Spanish"],
    contact: "sarah@therapyconnect.com",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Michael Chen",
    role: "Technology Director",
    image:
      "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600",
    bio: "Expert in healthcare technology and secure communication platforms.",
    bio_long:
      "Michael leads platform engineering and ensures patient data privacy and security. He has extensive experience building HIPAA-like compliant systems and scalable architectures.",
    education: "MSc Computer Science — MIT",
    experience: "10 years",
    specializations: ["Security", "Scalability"],
    certifications: ["AWS Certified Solutions Architect"],
    languages: ["English", "Mandarin"],
    contact: "michael@therapyconnect.com",
    social: { linkedin: "#", github: "#" },
  },
  {
    name: "Dr. Emily Rodriguez",
    role: "Head of Therapist Relations",
    image:
      "https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=600",
    bio: "Specialized in therapist training and quality assurance programs.",
    bio_long:
      "Emily builds training programs and ensures consistent therapy quality across the platform.",
    education: "MA Clinical Psychology — Columbia University",
    experience: "12 years",
    specializations: ["Supervision", "Quality Assurance"],
    certifications: ["Clinical Supervisor Certificate"],
    languages: ["English"],
    contact: "emily@therapyconnect.com",
    social: { linkedin: "#" },
  },
  {
    name: "David Kim",
    role: "Patient Experience Manager",
    image:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600",
    bio: "Dedicated to ensuring the best possible experience for our clients.",
    bio_long:
      "David improves patient experience, coordinates feedback, and leads UX research for empathetic design.",
    education: "BSc Psychology — UCLA",
    experience: "8 years",
    specializations: ["UX", "Patient Support"],
    certifications: ["Certified UX Researcher"],
    languages: ["English", "Korean"],
    contact: "david@therapyconnect.com",
    social: { linkedin: "#" },
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function AboutPage() {
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); // fetch stats logic (kept identical for functionality)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoadingStats(true);
        const res = await axios.get("/api/stats");
        setStats(res.data);
      } catch (err) {
        // fallback to local values if API fails
        setStats({
          sessions: 10000,
          therapists: 500,
          languages: 50,
          satisfaction: 98,
        });
        console.error("Could not fetch stats:", err);
      } finally {
        setLoadingStats(false);
      }
    };
    fetchStats();
  }, []);

  const openModal = (member) => {
    setSelectedMember(member);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedMember(null), 250);
  }; // Function to format large numbers

  const formatNumber = (num, fallback) => {
    if (num === undefined || num === null) return fallback;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}k+`;
    return num;
  };

  return (
    <>
            <Navbar />     {" "}
      <main className="relative bg-slate-50 min-h-screen pt-20 overflow-hidden">
        {/* --- Background Ambient Lighting/Gradient --- */}
        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-sky-50 to-transparent pointer-events-none -z-10"></div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-200/50 rounded-full mix-blend-multiply blur-3xl opacity-50 -z-10 animate-pulse-slow"></div>
               {" "}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                   {/* ## 🚀 Hero Section: Cinematic Typography */}         {" "}
          <div className="text-center max-w-4xl mx-auto mb-20">
                       {" "}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-lg border border-sky-100/50 backdrop-blur-sm"
            >
                           {" "}
              <Sparkles className="w-4 h-4 text-sky-600 fill-sky-200" />       
                   {" "}
              <span className="text-xs font-semibold text-slate-700 tracking-wider uppercase">
                                Human-Centered Technology              {" "}
              </span>
                         {" "}
            </motion.div>
                       {" "}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tighter leading-[1.1]"
            >
                            About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600">
                TherapyConnect
              </span>
                         {" "}
            </motion.h1>
                       {" "}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto"
            >
                            We combine **clinical excellence** with modern
              technology to make               therapy accessible, secure, and
              profoundly effective for everyone.            {" "}
            </motion.p>
                     {" "}
          </div>
          ---
          {/* ## 💎 Values & Principles: The Bento Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24"
          >
            {[
              {
                icon: Target,
                title: "Mission",
                text: "Remove barriers and deliver compassionate mental health care.",
                color: "sky",
              },
              {
                icon: Eye,
                title: "Vision",
                text: "A world where mental health care is approachable for all, without stigma.",
                color: "indigo",
              },
              {
                icon: Heart,
                title: "Values",
                text: "Compassion, privacy, professional quality and human-centered care.",
                color: "teal",
              },
            ].map((v, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.04)",
                }} // Enhanced shadow effect
                className={`p-8 rounded-3xl bg-white shadow-xl border border-white/50 group transition-all duration-300 backdrop-blur-sm hover:border-transparent`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`w-14 h-14 rounded-full bg-${v.color}-100 flex items-center justify-center transition-colors`}
                  >
                    <v.icon
                      className={`w-6 h-6 text-${v.color}-600 group-hover:scale-110 transition-transform`}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">
                    {v.title}
                  </h3>
                </div>
                <p className="text-base text-slate-700 leading-relaxed pl-2">
                  {v.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
          ---
          {/* ## 📖 Our Story: Editorial Layout */}         {" "}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl overflow-hidden bg-white/70 p-8 md:p-12 shadow-2xl shadow-sky-200/50 border border-white/80 backdrop-blur-lg mb-24"
          >
                       {" "}
            <div className="grid md:grid-cols-2 gap-12 items-center">
                           {" "}
              <div className="order-2 md:order-1">
                               {" "}
                <h2 className="text-3xl font-extrabold text-slate-900 mb-6 border-b pb-2 border-sky-100">
                                    Our Journey to Wellness                {" "}
                </h2>
                               {" "}
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  <Quote className="w-5 h-5 text-sky-400 inline mr-2 align-top" />
                                    Founded in 2020 by a team of mental health
                  experts and tech innovators, TherapyConnect was created to
                  bridge the gap                   between people and qualified
                  therapists using **secure, modern tools**. We recognized the
                  need for care that fits modern life.                {" "}
                </p>
                <p className="text-base text-slate-600 italic">
                  Our platform is built on the principle that the highest
                  quality care should be available at the tap of a screen,
                  eliminating geographical and stigma barriers.
                </p>
                             {" "}
              </div>
                           {" "}
              <div className="order-1 md:order-2">
                               {" "}
                <motion.img
                  initial={{ scale: 0.95 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.8 }}
                  src="https://images.pexels.com/photos/4050283/pexels-photo-4050283.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Founding team collaboration"
                  className="w-full h-72 object-cover rounded-3xl shadow-xl shadow-sky-400/20"
                  loading="lazy"
                />
                             {" "}
              </div>
                         {" "}
            </div>
                     {" "}
          </motion.div>
          ---
          {/* ## 🤝 Meet the Core Team: Interactive Cards */}         {" "}
          <div className="mt-10 mb-24">
                       {" "}
            <div className="text-center mb-12">
                           {" "}
              <h3 className="text-4xl font-extrabold text-slate-900 mb-2">
                The Leadership
              </h3>
                           {" "}
              <p className="text-xl text-slate-600">
                                Experienced clinicians, engineers, and patient
                advocates driving our mission.              {" "}
              </p>
                         {" "}
            </div>
                       {" "}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
                           {" "}
              {TEAM.map((m, index) => (
                <motion.button
                  key={m.name}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 15px 30px rgba(8, 145, 178, 0.2)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg border border-white/80 transition-all duration-300 cursor-pointer text-left focus:outline-none focus:ring-4 focus:ring-sky-300/50"
                  onClick={() => openModal(m)}
                >
                                   {" "}
                  <div className="aspect-[4/5] overflow-hidden relative">
                                       {" "}
                    <img
                      src={m.image}
                      alt={m.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" // Subtle image zoom on hover
                      loading="lazy"
                    />
                                       {" "}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                     {" "}
                  </div>
                                   {" "}
                  <div className="p-5">
                                       {" "}
                    <h4 className="text-xl font-bold text-slate-900">
                      {m.name}
                    </h4>
                                       {" "}
                    <p className="text-sm text-sky-600 font-medium mt-1">
                      {m.role}
                    </p>
                                       {" "}
                    <p className="text-sm text-slate-600 mt-3 line-clamp-2">
                                            {m.bio}                   {" "}
                    </p>
                                     {" "}
                  </div>
                                 {" "}
                </motion.button>
              ))}
                         {" "}
            </motion.div>
                     {" "}
          </div>
          ---
          {/* ## 📈 Impact & Stats: Dynamic Counters */}         {" "}
          <div className="mt-12 rounded-3xl overflow-hidden shadow-2xl shadow-sky-500/10">
                       {" "}
            <div className="bg-sky-700 text-white p-8 md:p-12">
              <h3 className="text-3xl font-extrabold text-center mb-8">
                Our Impact
              </h3>
                           {" "}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                               {" "}
                <div>
                                   {" "}
                  <div className="text-4xl md:text-5xl font-extrabold mb-1 tracking-tight">
                                       {" "}
                    {loadingStats ? "—" : formatNumber(stats?.sessions, "10k+")}
                                     {" "}
                  </div>
                                   {" "}
                  <div className="text-base font-medium opacity-80">
                    Sessions Completed
                  </div>
                                 {" "}
                </div>
                               {" "}
                <div>
                                   {" "}
                  <div className="text-4xl md:text-5xl font-extrabold mb-1 tracking-tight">
                                       {" "}
                    {loadingStats
                      ? "—"
                      : formatNumber(stats?.therapists, "500+")}
                                     {" "}
                  </div>
                                   {" "}
                  <div className="text-base font-medium opacity-80">
                    Licensed Therapists
                  </div>
                                 {" "}
                </div>
                               {" "}
                <div>
                                   {" "}
                  <div className="text-4xl md:text-5xl font-extrabold mb-1 tracking-tight">
                                       {" "}
                    {loadingStats ? "—" : formatNumber(stats?.languages, "50+")}
                                     {" "}
                  </div>
                                   {" "}
                  <div className="text-base font-medium opacity-80">
                    Languages Supported
                  </div>
                                 {" "}
                </div>
                               {" "}
                <div>
                                   {" "}
                  <div className="text-4xl md:text-5xl font-extrabold mb-1 tracking-tight">
                                       {" "}
                    {loadingStats ? "—" : `${stats?.satisfaction ?? 98}%`}     
                               {" "}
                  </div>
                                   {" "}
                  <div className="text-base font-medium opacity-80">
                    Client Satisfaction
                  </div>
                                 {" "}
                </div>
                             {" "}
              </div>
                         {" "}
            </div>
                     {" "}
          </div>
                 {" "}
        </section>
               {" "}
        {/* modal (Ensure the modal uses a modern, blurred background for the "best in world" feel) */}
                {/* ## 🧠 Our Therapy Philosophy */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-12 shadow-xl mb-24 border border-white/60 backdrop-blur-lg"
        >
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-6">
            Our Therapy Philosophy
          </h2>
          <p className="text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto text-center">
            Healing isn't instant. It's a process — filled with questions,
            emotions, challenges, progress, and victories. We walk with you
            through every step of that journey.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-10 text-center">
            {[
              {
                emoji: "💙",
                title: "Human First",
                text: "Every person is unique. We listen, adapt, and prioritize compassion over automation.",
              },
              {
                emoji: "🔒",
                title: "Confidential & Secure",
                text: "Your sessions are encrypted and private — your story stays safe with us.",
              },
              {
                emoji: "🎯",
                title: "Goal-Driven",
                text: "We partner with you and your therapist to track emotional, behavioral, and mental progress.",
              },
            ].map((item, i) => (
              <div key={i}>
                <div className="text-4xl mb-2">{item.emoji}</div>
                <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                <p className="text-slate-600 text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
        {/* ## 🛡️ Privacy & Medical Standards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-slate-900 text-white rounded-3xl p-12 shadow-2xl mb-24"
        >
          <h2 className="text-3xl font-extrabold text-center mb-6">
            Trust is Our Foundation
          </h2>
          <p className="text-center text-gray-300 max-w-2xl mx-auto mb-10">
            Confidentiality and safety are at the core of Solena. Every feature
            we build respects human dignity and mental health ethics.
          </p>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              "End-to-End Encryption",
              "Clinical Quality Standards",
              "Licensed Therapists Only",
              "Anonymous Option",
              "Consent-Based Data",
              "Secure Cloud Infrastructure",
            ].map((txt) => (
              <div key={txt} className="flex items-center justify-center gap-2">
                <CheckCircle className="text-green-400" />
                <span className="text-sm opacity-90">{txt}</span>
              </div>
            ))}
          </div>
        </motion.div>
        {/* ## 🌍 Our Global Reach */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-12 shadow-xl mb-24 border"
        >
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-6">
            Growing Every Day. Healing Together.
          </h2>
          <ul className="text-gray-700 text-lg space-y-3 max-w-3xl mx-auto">
            <li>✔ Clients across multiple countries</li>
            <li>✔ Multilingual therapists experienced in diverse cultures</li>
            <li>
              ✔ Peer-reviewed therapy techniques backed by scientific research
            </li>
            <li>✔ Strong local reach with empathy at heart</li>
          </ul>
        </motion.div>
        {/* ## 🌟 Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <h2 className="text-3xl font-extrabold text-center text-slate-900 mb-10">
            What Our Clients Say
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "My therapist helped me feel seen and understood after years of silence.",
                name: "Aarav",
              },
              {
                quote:
                  "Healing doesn’t happen alone — Solena gave me the courage to begin.",
                name: "Maya",
              },
              {
                quote:
                  "I never believed therapy could be so comfortable and accessible.",
                name: "Rohan",
              },
            ].map((t) => (
              <div
                key={t.name}
                className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200"
              >
                <Quote className="w-6 h-6 text-sky-500 mb-3" />
                <p className="text-slate-700 text-sm mb-4 italic">
                  “{t.quote}”
                </p>
                <p className="text-slate-900 font-semibold">{t.name}</p>
              </div>
            ))}
          </div>
        </motion.div>
        {/* ## 🏆 Partnerships (Placeholder) */}
        <div className="text-center mb-32">
          <p className="text-sm text-slate-500 tracking-wider uppercase mb-4">
            In Collaboration With
          </p>
          <div className="flex justify-center gap-10 opacity-70">
            <span className="font-bold text-xl">Mental Health Groups</span>
            <span className="font-bold text-xl">Wellness Clinics</span>
            <span className="font-bold text-xl">Research Labs</span>
          </div>
        </div>
        {/* ## 🎯 Call-to-Action */}
        <div className="text-center mb-40">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
            Your Healing Journey Starts Here
          </h2>
          <p className="text-gray-600 mb-6">
            Join thousands of clients finding peace and clarity on Solena.
          </p>
          <a
            href="/pricing"
            className="inline-block px-10 py-4 rounded-xl bg-sky-600 text-white font-semibold text-lg hover:bg-sky-700 transition-all"
          >
            Get Started
          </a>
        </div>
        <TeamMemberModal
          open={modalOpen}
          onClose={closeModal}
          member={selectedMember}
        />
             {" "}
      </main>
    </>
  );
}

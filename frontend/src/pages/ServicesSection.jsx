import React from "react";
import { motion } from "framer-motion";

// ---------------------------
// SERVICES DATA
// ---------------------------
const services = [
  {
    title: "Depression",
    desc: "Feeling sad, hopeless, or unmotivated most days? You're not alone. We're here to help you.",
    link: "/depression-counseling",
    icon: "https://cdn-icons-png.flaticon.com/512/4832/4832478.png",
  },
  {
    title: "Anxiety",
    desc: "Do you feel restless, keyed up, or on edge most of the time? Our therapists can help you manage anxiety symptoms and feel more in control.",
    link: "/anxiety-counseling",
    icon: "https://cdn-icons-png.flaticon.com/512/3953/3953222.png",
  },
  {
    title: "Stress",
    desc: "Do you find it difficult to relax or wind down, even when you have free time? Let us help you manage chronic stress and find lasting calm.",
    link: "/stress-counseling",
    icon: "https://cdn-icons-png.flaticon.com/512/992/992651.png",
  },
  {
    title: "Anger",
    desc: "Do you have difficulty controlling your temper, even in situations where it might be inappropriate? We can help.",
    link: "/anger-counseling",
    icon: "https://cdn-icons-png.flaticon.com/512/5726/5726909.png",
  },
  {
    title: "Grief",
    desc: "Do you find yourself feeling sad or empty most of the time since your loss? Let us help you cope better.",
    link: "/grief-counseling",
    icon: "https://cdn-icons-png.flaticon.com/512/2584/2584602.png",
  },
  {
    title: "PTSD",
    desc: "Reliving painful events or suffering from nightmares? You’re not alone—our PTSD therapy offers a path to healing.",
    link: "/ptsd-counseling",
    icon: "https://cdn-icons-png.flaticon.com/512/6194/6194029.png",
  },
];

// ---------------------------
// ANIMATION VARIANTS
// ---------------------------
const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function ServicesSection() {
  return (
    <section className="w-[90%] mx-auto py-20 text-center relative">
      {/* Decorative Blur Balls */}
      <div className="absolute top-0 left-[-10%] w-[300px] h-[300px] bg-blue-100/40 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-[-10%] w-[300px] h-[300px] bg-indigo-100/40 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <motion.h4
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-blue-600 font-semibold tracking-wide mb-2"
      >
        OUR SERVICES
      </motion.h4>

      <motion.h2
        initial={{ opacity: 0, y: -15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-gray-800 mb-12"
      >
        How Can We Support Your Mental Wellness?
      </motion.h2>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white/80 backdrop-blur-xl border border-blue-100 
              shadow-lg hover:shadow-2xl transition-all duration-300 
              p-8 rounded-3xl cursor-pointer relative overflow-hidden group"
          >
            {/* Glow hover effect */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
            ></div>

            <img
              src={service.icon}
              alt={service.title}
              className="w-20 mx-auto mb-6 opacity-90 transition-transform duration-300 group-hover:scale-110 relative z-10"
            />

            <h3 className="text-2xl font-semibold text-gray-800 mb-3 relative z-10">
              {service.title}
            </h3>

            <p className="text-gray-600 leading-relaxed mb-6 relative z-10">
              {service.desc}
            </p>

            <a
              href={service.link}
              className="text-blue-600 font-semibold hover:underline flex items-center justify-center gap-1 relative z-10 group/link"
            >
              {service.title} Counseling
              <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                →
              </span>
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

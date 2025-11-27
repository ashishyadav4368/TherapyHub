import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Brain,
  Wind,
  Quote,
  ArrowRight,
  CheckCircle2,
  CloudSun,
  Flower2,
  Activity,
} from "lucide-react";

export default function StressCounseling() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans relative overflow-hidden pt-24 pb-20">
      {/* --- BACKGROUND BLOBS FOR CALM VIBES --- */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-60">
        <div className="absolute top-[-20%] left-[-10%] w-[680px] h-[680px] rounded-full bg-blue-200/40 blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[680px] h-[680px] rounded-full bg-indigo-200/40 blur-[160px]" />
      </div>

      {/* --- PAGE CONTENT WRAPPER --- */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        {/* --- HEADER SECTION --- */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-snug">
            Stress & Burnout{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Counseling
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mt-4 leading-relaxed">
            Chronic stress drains your mind, body, and emotional energy. You
            deserve a calmer life — one where your nervous system feels steady,
            safe, and supported.
          </p>
        </motion.div>

        {/* --- MAIN INFORMATION CARD --- */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white/80 backdrop-blur-xl border border-white/70 shadow-xl rounded-3xl p-10 md:p-14 mb-20"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            What Exactly Is Stress?
          </h2>

          <p className="text-slate-600 text-lg leading-relaxed mb-4">
            Stress is your body's natural response to overwhelming emotional,
            mental, or physical pressure. But when stress becomes constant, it
            pushes your mind and body into exhaustion.
          </p>

          <p className="text-slate-600 text-lg leading-relaxed mb-8">
            Chronic stress can show up through:
          </p>

          <ul className="space-y-3 mb-10">
            {[
              "Difficulty relaxing even during free time",
              "Racing thoughts or inability to focus",
              "Irritability, anger, or emotional sensitivity",
              "Headaches, fatigue, or muscle tension",
              "Trouble sleeping or waking up tired",
              "Feeling overwhelmed by small tasks",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-lg text-slate-700"
              >
                <CheckCircle2 className="text-blue-600 w-6 h-6 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <div className="rounded-2xl bg-blue-50 p-6 border border-blue-100 shadow-inner">
            <Quote className="w-10 h-10 text-blue-400 mb-3" />
            <p className="text-lg text-slate-700 italic">
              “Your mind is not a machine — it needs rest, compassion, and space
              to reset.”
            </p>
          </div>
        </motion.section>

        {/* --- TWO COLUMN CARDS --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-2 gap-10 mb-20"
        >
          {/* CARD 1: Why Stress Happens */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
            <CloudSun className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              Why Stress Overwhelms Us
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Stress builds when your responsibilities, emotions, and
              surroundings exceed what your nervous system can comfortably
              manage. Work pressure, family tension, emotional trauma, financial
              worries — all contribute to long-term burnout.
            </p>
          </div>

          {/* CARD 2: How Therapy Helps */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
            <Brain className="w-12 h-12 text-indigo-600 mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              How Stress Therapy Helps
            </h3>
            <p className="text-slate-600 leading-relaxed">
              • Techniques to calm your nervous system
              <br />• Cognitive tools to manage overwhelming thoughts
              <br />• Structured routines to restore clarity
              <br />• Strategies to prevent burnout
              <br />• Emotional support without pressure or judgment
            </p>
          </div>
        </motion.div>

        {/* --- BENEFITS GRID --- */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-extrabold text-slate-900 mb-6 text-center">
            Benefits of Stress Counseling
          </h2>
          <p className="text-center text-lg text-slate-600 max-w-2xl mx-auto mb-10">
            With professional guidance, you can reshape your emotional landscape
            and reclaim a calmer, healthier mindset.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Wind,
                title: "Calmer Mind",
                desc: "Reduce anxiety and racing thoughts with proven therapeutic tools.",
              },
              {
                icon: Activity,
                title: "Balanced Lifestyle",
                desc: "Learn routines and boundaries that prevent emotional overwhelm.",
              },
              {
                icon: Flower2,
                title: "Emotional Strength",
                desc: "Become more resilient in handling stressful situations.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center"
              >
                <item.icon className="w-12 h-12 text-blue-600 mx-auto mb-5" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* --- CTA SECTION --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
            Take Back Control of Your Life
          </h2>
          <p className="text-lg text-slate-600 max-w-xl mx-auto mb-10">
            Stress doesn't have to dictate your days. You deserve emotional
            ease, stability, and peace. Let's rebuild from the inside out.
          </p>

          <a
            href="/therapists"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-10 py-4 rounded-2xl text-lg font-bold shadow-lg hover:bg-blue-700 hover:shadow-blue-300 transition-all duration-300"
          >
            Find a Therapist <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}

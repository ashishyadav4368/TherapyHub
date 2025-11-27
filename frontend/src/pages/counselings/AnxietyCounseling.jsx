import React from "react";
import { motion } from "framer-motion";
import {
  Wind,
  HeartHandshake,
  ArrowRight,
  CheckCircle2,
  Brain,
  ShieldAlert,
} from "lucide-react";

export default function AnxietyCounseling() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans relative overflow-hidden pt-24 pb-20">
      {/* --- BACKGROUND BLOBS --- */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-60">
        <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] bg-blue-200/40 blur-[130px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-200/40 blur-[130px] rounded-full"></div>
      </div>

      {/* --- MAIN WRAPPER --- */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        {/* --- HEADER SECTION --- */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
            Anxiety{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Therapy
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mt-4 leading-relaxed">
            Anxiety can feel overwhelming — racing thoughts, tension, fear, or
            constant worry. You’re not alone, and healing **is absolutely
            possible** with the right guidance.
          </p>
        </motion.div>

        {/* --- OVERVIEW CARD --- */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white/80 backdrop-blur-xl border border-white/70 shadow-xl rounded-3xl p-10 md:p-14 mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Understanding Anxiety
          </h2>

          <p className="text-slate-600 text-lg leading-relaxed mb-4">
            Anxiety is more than stress — it’s a constant emotional load that
            affects the body, mind, sleep, energy, and peace of mind. It often
            comes with:
          </p>

          <ul className="space-y-3 mt-6">
            {[
              "Racing or spiraling thoughts",
              "Restlessness, tension, or irritability",
              "Difficulty relaxing or sleeping",
              "Feeling overwhelmed or “on edge”",
              "Physical symptoms like tight chest, fast heartbeat, sweating",
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-lg text-slate-700"
              >
                <CheckCircle2 className="text-blue-600 w-6 h-6 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <p className="text-slate-600 text-lg leading-relaxed mt-6">
            With the right therapist, you can learn to manage anxiety, break
            negative cycles, and regain emotional control.
          </p>
        </motion.section>

        {/* --- WHY IT HAPPENS & HOW THERAPY HELPS --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-2 gap-10 mb-20"
        >
          {/* Card 1 */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
            <Wind className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              Why Anxiety Happens
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Anxiety often stems from accumulated stress, past trauma,
              overthinking, fear of loss, perfectionism, and emotional overload.
              Therapy helps identify these emotional triggers and calm them.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
            <ShieldAlert className="w-12 h-12 text-indigo-600 mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              What Therapy Helps With
            </h3>
            <p className="text-slate-600 leading-relaxed">
              • Breaking the anxiety–thought cycle
              <br />• Reducing panic, fear & worry
              <br />• Finding mental clarity
              <br />• Calming the nervous system
              <br />• Improving sleep & confidence
              <br />• Building long-term emotional resilience
            </p>
          </div>
        </motion.div>

        {/* --- CTA SECTION --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
            Calm Is Possible — And It Starts With Support
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
            Let a licensed therapist help you regain balance, control your
            thoughts, and reclaim your inner peace.
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

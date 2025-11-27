import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  SmilePlus,
} from "lucide-react";

export default function DepressionCounseling() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans relative overflow-hidden pt-24 pb-20">
      {/* Background Blobs */}
      <div className="fixed inset-0 opacity-60 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-200/40 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-200/40 blur-[120px] rounded-full"></div>
      </div>

      {/* Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        {/* HEADER SECTION */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-slate-900">
            Depression{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Counseling
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mt-4">
            You don’t have to go through this alone. Our certified therapists
            provide evidence-based support to help you regain hope, strength,
            and emotional balance.
          </p>
        </motion.div>

        {/* MAIN CARD */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl rounded-3xl p-10 md:p-14 mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Understanding Depression
          </h2>
          <p className="text-slate-600 leading-relaxed text-lg mb-6">
            Depression is more than feeling sad or low. It can drain your
            energy, affect your sleep, appetite, motivation, and make everyday
            tasks feel overwhelming. You may feel disconnected, unworthy, or
            emotionally exhausted — but **healing is absolutely possible**.
          </p>

          <p className="text-slate-600 leading-relaxed text-lg mb-4">
            Our licensed therapists use approaches like Cognitive Behavioral
            Therapy (CBT), mindfulness-based interventions, and supportive talk
            therapy to help you:
          </p>

          <ul className="space-y-3 mt-6">
            {[
              "Regain emotional stability and clarity",
              "Understand triggers and negative thinking patterns",
              "Reduce overwhelming sadness and hopelessness",
              "Build healthy habits and coping skills",
              "Restore self-worth and self-compassion",
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
        </motion.section>

        {/* WHAT TO EXPECT SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-10 mb-20"
        >
          {/* Card 1 */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all">
            <SmilePlus className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              What You Will Gain
            </h3>
            <p className="text-slate-600 leading-relaxed">
              • Emotional relief
              <br />• More control over thoughts
              <br />• Better mood and motivation
              <br />• Support from a licensed expert
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all">
            <Heart className="w-12 h-12 text-red-500 mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              You're Not Alone
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Depression affects millions worldwide, but **therapy significantly
              improves recovery**. Our approach is compassionate,
              non-judgmental, and tailored to your emotional needs.
            </p>
          </div>
        </motion.div>

        {/* CALL TO ACTION */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
            Ready to Start Your Healing Journey?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
            Book a session with a licensed therapist who specializes in
            depression and emotional recovery.
          </p>

          <a
            href="/therapists"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-10 py-4 rounded-2xl text-lg font-bold shadow-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-blue-300"
          >
            Find a Therapist <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}

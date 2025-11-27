import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Flower2,
  Quote,
  ArrowRight,
  CheckCircle2,
  Feather,
  HeartHandshake,
} from "lucide-react";

export default function GriefCounseling() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans relative overflow-hidden pt-24 pb-20">
      {/* --- BACKGROUND BLOBS --- */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-60">
        <div className="absolute top-[-20%] left-[-10%] w-[650px] h-[650px] rounded-full bg-blue-200/40 blur-[140px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[650px] h-[650px] rounded-full bg-indigo-200/40 blur-[160px]" />
      </div>

      {/* --- MAIN WRAPPER --- */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        {/* --- PAGE HEADER --- */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-snug">
            Grief & Loss{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Counseling
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mt-4 leading-relaxed">
            Losing someone or something meaningful changes everything. You don’t
            have to navigate this emotional journey alone — support, healing,
            and understanding are here for you.
          </p>
        </motion.div>

        {/* --- FEATURE/OVERVIEW CARD --- */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white/80 backdrop-blur-xl border border-white/70 shadow-xl rounded-3xl p-10 md:p-14 mb-20"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Understanding Grief
          </h2>

          <p className="text-slate-600 text-lg leading-relaxed mb-4">
            Grief is a deeply personal emotional response to loss — whether it’s
            the passing of a loved one, the end of a relationship, loss of
            identity, or any major emotional transition.
          </p>

          <p className="text-slate-600 text-lg leading-relaxed mb-8">
            There is no “right way” to grieve. Everyone experiences it
            differently. Common emotional patterns include:
          </p>

          <ul className="space-y-3">
            {[
              "Waves of sadness, numbness, or disbelief",
              "Feeling lost, disconnected, or overwhelmed",
              "Changes in sleep, appetite, or energy",
              "Guilt, regret, or unanswered questions",
              "Difficulty accepting the reality of the loss",
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

          <div className="mt-10 rounded-2xl bg-blue-50 p-6 border border-blue-100 shadow-inner">
            <Quote className="w-10 h-10 text-blue-400 mb-3" />
            <p className="text-lg text-slate-700 italic">
              “Healing doesn’t mean forgetting — it means finding ways to carry
              love, memory, and meaning forward.”
            </p>
          </div>
        </motion.section>

        {/* --- 2-COLUMN CONTENT CARDS --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-2 gap-10 mb-20"
        >
          {/* 1. Why we feel grief */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
            <Feather className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              Why Grief Happens
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Grief is a natural emotional reaction to losing something deeply
              meaningful. Our mind tries to adjust to a new reality — one that
              feels unfamiliar, painful, and incomplete.
            </p>
          </div>

          {/* 2. How therapy helps */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
            <HeartHandshake className="w-12 h-12 text-indigo-600 mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              How Therapy Helps
            </h3>
            <p className="text-slate-600 leading-relaxed">
              • Processing emotional waves safely
              <br />• Navigating guilt, regret, or unanswered questions
              <br />• Building emotional resilience
              <br />• Keeping memories while rebuilding life
              <br />• Finding meaning and balance again
            </p>
          </div>
        </motion.div>

        {/* --- CTA SECTION --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
            Healing Takes Time — And Support
          </h2>
          <p className="text-lg text-slate-600 max-w-xl mx-auto mb-10">
            A licensed therapist can help you navigate grief gently, safely, and
            at your own pace — you don’t have to face this journey alone.
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

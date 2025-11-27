import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  ShieldCheck,
  Brain,
  Quote,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Eye,
  Leaf,
  HeartPulse,
} from "lucide-react";

export default function PTSDCounseling() {
  return (
    <div className="min-h-screen bg-slate-50 relative font-sans overflow-hidden pt-24 pb-20">
      {/* --- CALM THERAPEUTIC BACKGROUND BLOBS --- */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-60">
        <div className="absolute top-[-10%] left-[-15%] w-[750px] h-[750px] bg-blue-200/40 rounded-full blur-[160px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[750px] h-[750px] bg-indigo-200/40 rounded-full blur-[180px]" />
      </div>

      {/* --- PAGE CONTAINER --- */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        {/* --- HEADER SECTION --- */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
            PTSD & Trauma{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Counseling
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mt-4 leading-relaxed">
            Trauma changes how your mind protects you. PTSD therapy helps you
            feel safe again — in your body, in your relationships, and in your
            life.
          </p>
        </motion.div>

        {/* --- MAIN INFO CARD --- */}
        <motion.section
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white/80 backdrop-blur-xl border border-white/70 shadow-xl rounded-3xl p-10 md:p-14 mb-20"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            What Is PTSD?
          </h2>

          <p className="text-slate-600 text-lg leading-relaxed mb-4">
            Post-Traumatic Stress Disorder (PTSD) is a deeply human response to
            a distressing or life-threatening experience — such as accidents,
            violence, abuse, medical trauma, heartbreak, or sudden loss.
          </p>

          <p className="text-slate-600 text-lg leading-relaxed mb-8">
            Trauma changes how your nervous system reacts to the world, causing:
          </p>

          <ul className="space-y-3 mb-10">
            {[
              "Flashbacks, nightmares or reliving the event",
              "Avoiding reminders of the trauma",
              "Feeling on-edge or easily startled",
              "Emotional numbness or disconnection",
              "Sleep problems or constant alertness",
              "Difficulty trusting or feeling safe",
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
              “Trauma is not what happened to you — it’s what happened inside
              you as a result. Healing is possible.”
            </p>
          </div>
        </motion.section>

        {/* --- TWO MAIN CARDS --- */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-2 gap-10 mb-20"
        >
          {/* WHY PTSD DEVELOPS */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
            <Eye className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              Why PTSD Develops
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Trauma overwhelms the brain’s ability to process danger. The event
              gets “stuck” in memory, causing the body to stay in survival mode
              long after the threat is gone.
            </p>
          </div>

          {/* HOW PTSD THERAPY HELPS */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
            <Brain className="w-12 h-12 text-indigo-600 mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              How Therapy Helps
            </h3>
            <p className="text-slate-600 leading-relaxed">
              • EMDR therapy to safely process trauma
              <br />• Grounding tools to calm flashbacks
              <br />• Nervous system regulation techniques
              <br />• Cognitive therapy to reframe painful beliefs
              <br />• Support for rebuilding safety and trust
            </p>
          </div>
        </motion.div>

        {/* --- BENEFITS GRID --- */}
        <motion.section
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-extrabold text-slate-900 mb-6 text-center">
            What You Gain Through PTSD Counseling
          </h2>

          <p className="text-center text-lg text-slate-600 max-w-2xl mx-auto mb-10">
            Healing from trauma is absolutely possible — and thousands have done
            it with compassionate, structured support.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "Feeling Safe Again",
                desc: "Rebuild a sense of inner and outer security.",
              },
              {
                icon: HeartPulse,
                title: "Emotional Balance",
                desc: "Reduce triggers, panic reactions, and emotional swings.",
              },
              {
                icon: Leaf,
                title: "Mind–Body Healing",
                desc: "Learn grounding techniques that calm trauma stored in the body.",
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

        {/* --- CALL TO ACTION --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
            You Deserve a Life Beyond Survival
          </h2>

          <p className="text-lg text-slate-600 max-w-xl mx-auto mb-10">
            Trauma may be part of your past, but it doesn't have to define your
            future. Let’s rebuild your sense of safety, strength, and inner
            peace — one step at a time.
          </p>

          <a
            href="/therapists"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-10 py-4 rounded-2xl text-lg font-bold shadow-lg hover:bg-blue-700 hover:shadow-blue-300 transition-all duration-300"
          >
            Find a Trauma Therapist <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}

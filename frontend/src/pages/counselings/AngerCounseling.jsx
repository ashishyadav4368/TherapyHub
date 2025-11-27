import React from "react";
import { motion } from "framer-motion";
import {
  Flame,
  HeartHandshake,
  ArrowRight,
  CheckCircle2,
  Brain,
  ShieldCheck,
} from "lucide-react";

export default function AngerCounseling() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans relative overflow-hidden pt-24 pb-20">
      {/* --- BACKGROUND MESH BLOBS --- */}
      <div className="fixed inset-0 opacity-50 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-15%] w-[550px] h-[550px] bg-orange-200/40 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[550px] h-[550px] bg-red-200/40 blur-[120px] rounded-full"></div>
      </div>

      {/* --- MAIN WRAPPER --- */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        {/* --- HEADER --- */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
            Anger{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
              Management Therapy
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mt-4">
            If anger feels overwhelming or hard to control, you're not alone.
            Our certified therapists help you regain balance, peace, and
            emotional control.
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
            Understanding Anger Issues
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-5">
            Anger is a natural emotion — but when it becomes intense, frequent,
            or uncontrollable, it can damage relationships, health,
            decision-making, and overall emotional well-being.
          </p>

          <p className="text-slate-600 text-lg leading-relaxed mb-5">
            Anger management therapy helps you understand the root causes of
            your anger, regulate your emotional responses, and develop healthy
            coping strategies.
          </p>

          <p className="text-slate-600 text-lg mb-6">
            Our licensed therapists use evidence-based approaches such as CBT,
            emotional regulation techniques, conflict resolution strategies, and
            mindfulness-based practices to help you:
          </p>

          <ul className="space-y-3 mt-6">
            {[
              "Reduce emotional outbursts and reactivity",
              "Identify triggers and unresolved emotions",
              "Build healthy communication and expression",
              "Improve relationships and confidence",
              "Develop long-term emotional control skills",
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-lg text-slate-700"
              >
                <CheckCircle2 className="text-orange-600 w-6 h-6 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </motion.section>

        {/* --- 2-CARD SECTION --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-10 mb-20"
        >
          {/* Card 1 */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
            <Brain className="w-12 h-12 text-orange-600 mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              Why Anger Happens
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Anger often comes from deeper emotional pain — stress, fear,
              frustration, trauma, unmet needs, or feeling unheard. Therapy
              helps uncover these layers and heal them.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
            <ShieldCheck className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              What Therapy Helps With
            </h3>
            <p className="text-slate-600 leading-relaxed">
              • Reduced frustration and irritability
              <br />• Calm, controlled responses
              <br />• Better emotional clarity
              <br />• Stronger relationships
              <br />• Healthier coping habits
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
            Take Control of Your Anger — Not the Other Way Around
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
            Start a safe, supportive journey toward emotional strength and
            healthier reactions. Your transformation begins with the right
            therapist.
          </p>

          <a
            href="/therapists"
            className="inline-flex items-center gap-2 bg-orange-600 text-white px-10 py-4 rounded-2xl text-lg font-bold shadow-lg hover:bg-orange-700 transition-all duration-300 hover:shadow-orange-300"
          >
            Find a Therapist <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}

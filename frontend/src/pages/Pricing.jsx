import React from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { useBookingPlan } from "../contexts/BookingPlanContext";

const plans = [
  {
    id: "single-flex",
    title: "Single Session",
    subtitle: "Try therapy, one step at a time",
    priceLabel: "₹250 – ₹500",
    per: "per session (chat / audio / video)",
    description:
      "Perfect if you’re starting therapy for the first time or want to talk about a specific concern.",
    bullets: [
      "1 session with a recommended therapist",
      "Choose chat, audio, or video",
      "Private & encrypted",
      "We match the right therapist for you",
    ],
    type: "single",
    mode: "flexible", // will choose chat/audio/video later
    sessionsTotal: 1,
  },
  {
    id: "video-5",
    title: "5-Session Video Plan",
    subtitle: "Build consistency & emotional stability",
    priceLabel: "₹2500",
    oldPriceLabel: "₹3995",
    per: "for 5 video sessions",
    description:
      "Ideal if you want to work deeply on patterns, emotions, or ongoing stress over a few weeks.",
    bullets: [
      "5 video therapy sessions",
      "Priority therapist matching",
      "Save vs per-session pricing",
      "Perfect for short-term therapy",
    ],
    type: "bundle",
    mode: "video",
    sessionsTotal: 5,
    pricePerSession: 500,
    totalPrice: 2500,
  },
  {
    id: "video-8",
    title: "8-Session Deep Healing Plan",
    subtitle: "For long-term healing & transformation",
    priceLabel: "₹4000",
    oldPriceLabel: "₹6392",
    per: "for 8 video sessions",
    description:
      "Best if you’re committed to deep emotional healing, trauma work, or long-term patterns.",
    bullets: [
      "8 video therapy sessions",
      "Premium therapist matchmaking",
      "Most value for deeper work",
      "Weekly or flexible schedule (set by therapist)",
    ],
    type: "bundle",
    mode: "video",
    sessionsTotal: 8,
    pricePerSession: 500,
    totalPrice: 4000,
  },
];

const Pricing = () => {
  const navigate = useNavigate();
  const { selectPlan } = useBookingPlan();

  const handleChoosePlan = (plan) => {
    selectPlan(plan);
    navigate("/recommend-therapist"); // new page we’ll create next
  };

  return (
    <section className="bg-black text-white py-24 px-6">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-extrabold mb-4">
          Choose Your Healing Plan
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
          Book a plan and we will recommend a psychologist or a counsellor for
          you. No need to worry about dates — your therapist will guide and
          schedule future sessions during therapy.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid gap-10 grid-cols-1 md:grid-cols-3">
        {plans.map((plan, index) => (
          <div
            key={plan.id}
            className={`p-8 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm shadow-lg transition-transform hover:-translate-y-2 ${
              plan.id === "video-5" ? "border-purple-400 bg-white/10" : ""
            }`}
          >
            {plan.id === "video-5" && (
              <span className="inline-block mb-3 text-xs font-semibold text-purple-300 tracking-widest">
                RECOMMENDED
              </span>
            )}

            <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
            <p className="text-sm text-gray-300 mb-4">{plan.subtitle}</p>

            <div className="mb-4">
              {plan.oldPriceLabel && (
                <span className="text-gray-500 line-through text-sm mr-2">
                  {plan.oldPriceLabel}
                </span>
              )}
              <span className="text-3xl font-extrabold text-purple-300">
                {plan.priceLabel}
              </span>
              <p className="text-xs text-gray-400 mt-1">{plan.per}</p>
            </div>

            <p className="text-gray-300 text-sm mb-6">{plan.description}</p>

            <ul className="space-y-2 mb-8 text-sm text-gray-200">
              {plan.bullets.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="text-purple-400 h-4 w-4" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleChoosePlan(plan)}
              className="block w-full text-center px-6 py-3 rounded-xl font-bold bg-purple-500 hover:bg-purple-600 transition"
            >
              Choose {plan.title}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;

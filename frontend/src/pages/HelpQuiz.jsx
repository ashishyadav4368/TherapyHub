import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SERVICES = [
  "Depression",
  "Anxiety",
  "Stress",
  "Anger",
  "Grief",
  "PTSD",
  "Other",
];

const HelpQuiz = () => {
  const navigate = useNavigate();
  const [serviceType, setServiceType] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!serviceType) {
      alert("Please select a service type.");
      return;
    }

    navigate(`/quiz?service=${serviceType}`);
  };

  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-20">
      <div className="max-w-xl w-full">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Get Help With What You're Feeling
        </h1>

        <p className="text-gray-300 mb-8">
          Select what you're struggling with, and we’ll guide you with a quick
          assessment.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dropdown */}
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="w-full px-4 py-3 bg-white text-black rounded-lg focus:outline-none"
          >
            <option value="">Select a Service</option>
            {SERVICES.map((service, index) => (
              <option key={index} value={service}>
                {service}
              </option>
            ))}
          </select>

          {/* Input Message */}
          <textarea
            placeholder="How do you feel right now?"
            className="w-full px-4 py-3 bg-white text-black rounded-lg focus:outline-none min-h-[120px]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 transition-all"
          >
            Start Assessment
          </button>
        </form>
      </div>
    </section>
  );
};

export default HelpQuiz;
4;

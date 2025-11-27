import React from "react";
import { useLocation, Link } from "react-router-dom";

const QuizResult = () => {
  const { state } = useLocation();
  const { service, answers } = state || {};

  if (!answers) return <h2 className="text-white p-10">No result available</h2>;

  const score = answers.reduce((a, b) => a + b, 0);
  const severity =
    score <= 3
      ? "Mild"
      : score <= 6
      ? "Moderate"
      : score <= 10
      ? "High"
      : "Severe";

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-6">
      <h1 className="text-4xl font-bold mb-4">
        {service} Severity: {severity}
      </h1>

      <p className="text-gray-300 mb-10 max-w-lg text-center">
        Based on your answers, you may benefit from speaking to a professional.
      </p>

      <Link
        to="/therapists"
        className="px-8 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition"
      >
        Talk to a Therapist
      </Link>
    </div>
  );
};

export default QuizResult;

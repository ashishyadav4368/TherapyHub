import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import quizQuestions from "../data/quizQuestions";

const QuizPage = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const service = query.get("service");

  const questions = quizQuestions[service] || [];
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const handleAnswer = (value) => {
    const updated = [...answers];
    updated[current] = value;
    setAnswers(updated);
  };

  const handleNext = () => {
    if (answers[current] === null) {
      alert("Please select an answer");
      return;
    }

    if (current === questions.length - 1) {
      navigate("/quiz/result", {
        state: { service, answers },
      });
    } else {
      setCurrent(current + 1);
    }
  };

  const handleBack = () => {
    if (current > 0) setCurrent(current - 1);
  };

  if (!service) return <h2 className="text-white p-10">No service selected</h2>;

  return (
    <div className="min-h-screen bg-black text-white py-20 px-6 flex justify-center">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-6">{service} Assessment</h1>

        <p className="text-lg text-gray-300 mb-10">
          Question {current + 1} of {questions.length}
        </p>

        <h2 className="text-2xl font-semibold mb-8">{questions[current]}</h2>

        <div className="grid grid-cols-1 gap-4 mb-10">
          {[0, 1, 2, 3].map((choice) => (
            <button
              key={choice}
              onClick={() => handleAnswer(choice)}
              className={`p-4 rounded-lg font-medium transition-all border ${
                answers[current] === choice
                  ? "bg-white text-black"
                  : "border-white/30 hover:bg-white/10"
              }`}
            >
              {["Not at all", "A little", "Moderately", "Very much"][choice]}
            </button>
          ))}
        </div>

        <div className="flex justify-between">
          <button
            disabled={current === 0}
            onClick={handleBack}
            className="px-6 py-2 border border-gray-400 rounded-lg disabled:opacity-20"
          >
            Back
          </button>

          <button
            onClick={handleNext}
            className="px-6 py-2 bg-white text-black rounded-lg"
          >
            {current === questions.length - 1 ? "See Result" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is online therapy and how does it work?",
    answer:
      "Online therapy allows you to connect with licensed mental health professionals through video sessions, chat, or voice calls. It provides the same support as in-person therapy but from the comfort of your home.",
  },
  {
    question: "Are my therapy sessions confidential?",
    answer:
      "Yes. All your sessions are fully confidential. Our platform uses encrypted communication and follows strict privacy laws to ensure your data and conversations are secure.",
  },
  {
    question: "How do I choose the right therapist?",
    answer:
      "You can browse our list of verified therapists, check their expertise, read reviews, and choose the therapist that fits your needs. You can also switch therapists anytime if needed.",
  },
  {
    question: "Can therapy really help with depression, anxiety, or stress?",
    answer:
      "Absolutely. Therapy has been scientifically proven to help individuals manage and overcome anxiety, depression, stress, trauma, and relationship challenges.",
  },
  {
    question: "How long does a therapy session last?",
    answer:
      "A typical therapy session lasts 45–60 minutes depending on the therapist. Some offer shorter or extended sessions as well.",
  },
  {
    question: "What if I feel uncomfortable talking at first?",
    answer:
      "It’s completely normal to feel nervous. Your therapist will help create a safe, non-judgmental space so you can open up at your own pace.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-black text-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <h4 className="text-indigo-400 font-semibold tracking-wider">FAQs</h4>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto">
            Find answers to the most common questions about therapy, mental
            health support, and how our platform works.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 cursor-pointer transition hover:border-indigo-500"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">{faq.question}</h3>
                <ChevronDown
                  className={`w-6 h-6 transition-transform ${
                    openIndex === index
                      ? "rotate-180 text-indigo-400"
                      : "text-gray-400"
                  }`}
                />
              </div>

              {/* Animated answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-40 mt-3" : "max-h-0"
                }`}
              >
                <p className="text-gray-400">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

import React, { useEffect, useRef, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
  CheckCircle,
  AlertTriangle,
  MessageSquare,
  ChevronDown,
  Copy,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Footer from "./FooterPage";

// Vite safe API base. Put VITE_API_BASE in frontend/.env
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

/* -----------------------
   FAQ Data
   ----------------------- */
const faqs = [
  {
    question: "How quickly can I get a response?",
    answer:
      "We prioritize support inquiries. We typically respond to all messages within 24 hours during business days (Monday–Friday).",
  },
  {
    question: "Is this for emergency situations?",
    answer:
      "No — this contact form is not for emergencies. If you or someone else is in immediate danger or crisis, call your local emergency services right away.",
  },
  {
    question: "Can I request a specific therapist?",
    answer:
      "Yes — you can browse our therapist directory and book directly with your preferred licensed therapist.",
  },
  {
    question: "Do you offer international support?",
    answer:
      "Our services currently cover the US, Canada and UK primarily; we're expanding. Check our FAQ page for updates.",
  },
];

/* -----------------------
   Utility: simple client validation
   ----------------------- */
const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());

/* -----------------------
   Input component (accessible)
   ----------------------- */
const InputField = ({
  icon: Icon,
  id,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  isTextArea = false,
  required = true,
}) => (
  <label htmlFor={id} className="block">
    <div className="relative">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-blue-400" />
      </div>

      {isTextArea ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          rows={6}
          required={required}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 outline-none resize-none shadow-sm"
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 outline-none shadow-sm font-medium"
        />
      )}
    </div>
  </label>
);

/* -----------------------
   Contact Component
   ----------------------- */
export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // success | error | null
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [copied, setCopied] = useState(""); // "email" | "phone" | ""
  const statusTimerRef = useRef(null);
  const liveRegionRef = useRef(null);

  // cleanup timers
  useEffect(() => {
    return () => {
      if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
    };
  }, []);

  // announce submit status for screen readers
  useEffect(() => {
    if (submitStatus) {
      const msg =
        submitStatus === "success"
          ? "Message sent successfully."
          : "There was an error sending the message.";
      if (liveRegionRef.current) {
        liveRegionRef.current.textContent = msg;
      }
    }
  }, [submitStatus]);

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleFaqToggle = (index) =>
    setOpenFaqIndex((prev) => (prev === index ? null : index));

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(""), 1800);
    } catch {
      setCopied("");
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Please enter your name.";
    if (!isValidEmail(formData.email))
      return "Please enter a valid email address.";
    if (!formData.message.trim() || formData.message.trim().length < 10)
      return "Please enter a message (at least 10 characters).";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validateForm();
    if (err) {
      setSubmitStatus({ type: "error", message: err });
      if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
      statusTimerRef.current = setTimeout(() => setSubmitStatus(null), 5000);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Real request:
      await axios.post(`${API_BASE}/api/contact`, formData, {
        headers: { "Content-Type": "application/json" },
        timeout: 8000,
      });

      // success
      setSubmitStatus({
        type: "success",
        message: "Message sent — we'll reply within 24 hours.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Contact form error:", error?.response || error);
      setSubmitStatus({
        type: "error",
        message:
          error?.response?.data?.message ||
          "Submission failed. You can email support@therapyconnect.com directly.",
      });
    } finally {
      setIsSubmitting(false);
      if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
      statusTimerRef.current = setTimeout(() => setSubmitStatus(null), 7000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans relative overflow-hidden py-20">
      {/* Ambient background blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute -top-20 -left-24 w-[520px] h-[520px] bg-blue-100/30 rounded-full blur-[80px] animate-pulse" />
        <div className="absolute -bottom-24 -right-16 w-[640px] h-[640px] bg-indigo-100/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Let's start the conversation
          </h1>
          <p className="text-lg text-slate-600">
            Technical questions, partnership inquiries, or therapy support —
            we’re here to help.
            <span className="block mt-2 text-sm text-slate-400">
              Not for emergencies. Call local emergency services if urgent.
            </span>
          </p>
        </motion.div>

        {/* Live region for screen reader announcements */}
        <div aria-live="polite" ref={liveRegionRef} className="sr-only" />

        {/* Status toast */}
        <AnimatePresence>
          {submitStatus && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className={`max-w-3xl mx-auto mb-6 rounded-2xl p-4 shadow-xl flex items-start gap-4 ${
                submitStatus.type === "success"
                  ? "bg-green-50 border border-green-200 text-green-800"
                  : "bg-red-50 border border-red-200 text-red-800"
              }`}
              role="status"
              aria-live="polite"
            >
              <div className="flex-shrink-0">
                {submitStatus.type === "success" ? (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                ) : (
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                )}
              </div>
              <div>
                <p className="font-semibold">
                  {submitStatus.type === "success" ? "Message sent" : "Error"}
                </p>
                <p className="text-sm mt-1">{submitStatus.message}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Info + FAQ column */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Contact Card */}
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-2xl border border-white/60">
              <div className="flex items-center gap-4 mb-4">
                <MessageSquare className="h-7 w-7 text-blue-600" />
                <h2 className="text-2xl font-bold text-slate-900">
                  Reach us directly
                </h2>
              </div>

              <p className="text-slate-600 mb-6">
                Prefer direct contact? Use email, phone, or visit our office.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-50 p-3 rounded-xl">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <a
                        className="text-blue-600 font-semibold hover:underline"
                        href="mailto:support@therapyconnect.com"
                      >
                        support@therapyconnect.com
                      </a>
                      <button
                        onClick={() =>
                          copyToClipboard("support@therapyconnect.com", "email")
                        }
                        aria-label="Copy email"
                        className="text-slate-400 hover:text-slate-700 transition-colors"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                      {copied === "email" && (
                        <span className="text-sm text-green-600 ml-2">
                          Copied
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-500">
                      General inquiries & technical support
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-green-50 p-3 rounded-xl">
                    <Phone className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <a
                        className="text-green-600 font-semibold hover:underline"
                        href="tel:+15551234567"
                      >
                        +1 (555) 123-4567
                      </a>
                      <button
                        onClick={() => copyToClipboard("+15551234567", "phone")}
                        aria-label="Copy phone"
                        className="text-slate-400 hover:text-slate-700 transition-colors"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                      {copied === "phone" && (
                        <span className="text-sm text-green-600 ml-2">
                          Copied
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-500">
                      Mon–Fri: 9:00 AM – 5:00 PM (ET)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-purple-50 p-3 rounded-xl">
                    <MapPin className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-slate-900 font-semibold">
                      123 Wellness Street
                    </div>
                    <p className="text-sm text-slate-500">New York, NY 10001</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ accordion */}
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-2xl border border-white/60">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Quick Answers
              </h3>

              <div className="space-y-3">
                {faqs.map((f, i) => {
                  const isOpen = openFaqIndex === i;
                  return (
                    <motion.div
                      key={i}
                      initial={false}
                      animate={{ borderRadius: isOpen ? 16 : 12 }}
                      className="overflow-hidden border border-slate-100 rounded-lg"
                    >
                      <button
                        onClick={() => handleFaqToggle(i)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${i}`}
                        className="flex items-center justify-between w-full p-4 text-left font-semibold text-slate-800 bg-white hover:bg-slate-50 transition"
                      >
                        <span>{f.question}</span>
                        <ChevronDown
                          className={`h-5 w-5 text-blue-500 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                          aria-hidden
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={`faq-panel-${i}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28 }}
                            className="px-4 pb-4 bg-slate-50 text-slate-600"
                          >
                            <p className="py-2">{f.answer}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Form column */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-2xl border border-white/60"
              aria-labelledby="contact-form-heading"
            >
              <h2
                id="contact-form-heading"
                className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3"
              >
                <MessageSquare className="h-6 w-6 text-blue-600" />
                Send us a secure message
              </h2>

              <div className="grid grid-cols-1 gap-4">
                <InputField
                  icon={Mail}
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email address"
                />
                <InputField
                  icon={MessageSquare}
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                />
                <InputField
                  icon={Send}
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  isTextArea
                />
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-3 w-full py-3.5 rounded-xl bg-blue-600 text-white font-extrabold shadow-lg hover:bg-blue-700 transition-all disabled:opacity-70 disabled:cursor-wait"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Sending…</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 -rotate-12" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
                <p className="text-xs text-slate-500 mt-3">
                  All messages are encrypted and handled with strict
                  confidentiality.
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

// src/pages/ApplyJobs.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, UploadCloud, CheckCircle } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

const ApplyJobs = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    coverLetter: "",
  });

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("email", form.email);
      fd.append("coverLetter", form.coverLetter);
      if (resume) fd.append("resume", resume);

      await axios.post(`${API_BASE}/api/jobs/apply/${slug}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto p-8 text-center">
        <CheckCircle className="text-green-600 w-20 h-20 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-3">Application Submitted!</h1>
        <p className="text-slate-600 mb-6">
          Thank you for applying. Our team will review your application soon.
        </p>
        <button
          onClick={() => navigate("/careers")}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl"
        >
          Back to Careers
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 mb-6"
      >
        <ArrowLeft /> Back
      </button>

      <h1 className="text-3xl font-bold mb-6">Apply for this Role</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 border rounded-xl"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-3 border rounded-xl"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <textarea
          placeholder="Cover Letter"
          className="w-full p-3 border rounded-xl min-h-[150px]"
          value={form.coverLetter}
          onChange={(e) => setForm({ ...form, coverLetter: e.target.value })}
          required
        />

        <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl cursor-pointer hover:bg-slate-50">
          <UploadCloud className="w-8 h-8 text-blue-600 mb-2" />
          <span className="text-sm text-slate-600">
            Upload Resume (PDF, DOCX)
          </span>
          <input
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResume(e.target.files[0])}
          />
        </label>

        {resume && (
          <p className="text-sm text-green-600">
            Selected: <strong>{resume.name}</strong>
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700"
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
};

export default ApplyJobs;

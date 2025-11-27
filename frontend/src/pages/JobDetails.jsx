import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, MapPin, Clock, GraduationCap } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

const JobDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  // ⭐ THIS IS WHERE YOU PUT THE FETCH LINE ⭐
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/jobs/slug/${slug}`);
        setJob(res.data);
      } catch (err) {
        console.error("Error fetching job:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [slug]);

  if (loading) return <div className="p-10">Loading...</div>;
  if (!job) return <div className="p-10">Job not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 hover:underline mb-6"
      >
        <ArrowLeft /> Back to Careers
      </button>

      <h1 className="text-4xl font-bold text-slate-900">{job.title}</h1>

      <div className="flex flex-wrap gap-6 mt-4 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          {job.location}
        </div>

        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          {job.type}
        </div>

        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4" />
          {job.level}
        </div>
      </div>

      <p className="mt-6 text-slate-700 leading-relaxed">{job.description}</p>

      <button
        onClick={() => navigate(`/careers/job/${slug}/apply`)}
        className="mt-10 w-full py-4 bg-blue-600 text-white rounded-xl text-lg font-bold hover:bg-blue-700"
      >
        Apply Now
      </button>
    </div>
  );
};

export default JobDetails;

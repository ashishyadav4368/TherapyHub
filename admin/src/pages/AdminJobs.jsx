// AdminJobs.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Plus, Search, Trash2, Edit2, X, Check, Repeat } from "lucide-react";

// ----------------------
// API BASE
// ----------------------
let API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";
const api = axios.create({ baseURL: API_BASE });

/* -------------------------
   Job Form Modal
------------------------- */
const JobFormModal = ({ open, onClose, initial, onSaved }) => {
  const isEdit = !!(initial && initial._id);

  const [form, setForm] = useState({
    title: "",
    dept: "",
    type: "Full-time",
    location: "",
    level: "Entry Level",
    tag: "",
    description: "",
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initial) {
      setForm(initial);
    } else {
      setForm({
        title: "",
        dept: "",
        type: "Full-time",
        location: "",
        level: "Entry Level",
        tag: "",
        description: "",
      });
    }
  }, [initial]);

  const handleSave = async () => {
    if (!form.title || !form.dept) {
      return alert("Please fill title & dept");
    }

    setSaving(true);

    try {
      if (isEdit) {
        const { data } = await api.put(`/api/jobs/${initial._id}`, form);
        onSaved(data);
      } else {
        const { data } = await api.post(`/api/jobs/`, form);
        onSaved(data.job);
      }

      onClose();
    } catch (err) {
      console.error("Error saving job:", err);
      alert("Failed to save job");
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex justify-center items-start pt-20 px-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>

      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative bg-white rounded-2xl p-6 w-full max-w-xl shadow-xl z-50"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {isEdit ? "Edit Job" : "Add Job"}
          </h2>
          <button className="p-2 hover:bg-gray-100 rounded" onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <input
            className="border p-3 rounded"
            placeholder="Job Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <input
            className="border p-3 rounded"
            placeholder="Department"
            value={form.dept}
            onChange={(e) => setForm({ ...form, dept: e.target.value })}
          />

          <input
            className="border p-3 rounded"
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />

          <select
            className="border p-3 rounded"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Internship</option>
          </select>

          <select
            className="border p-3 rounded"
            value={form.level}
            onChange={(e) => setForm({ ...form, level: e.target.value })}
          >
            <option>Entry Level</option>
            <option>Mid Level</option>
            <option>Senior Level</option>
            <option>Lead</option>
            <option>Staff</option>
          </select>

          <input
            className="border p-3 rounded"
            placeholder="Tag"
            value={form.tag}
            onChange={(e) => setForm({ ...form, tag: e.target.value })}
          />

          <textarea
            className="border p-3 rounded min-h-[120px]"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          ></textarea>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button className="px-4 py-2 rounded border" onClick={onClose}>
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-blue-600 text-white flex items-center gap-2"
            disabled={saving}
          >
            {saving ? <Repeat className="animate-spin" /> : <Check />}
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
};

/* -------------------------
   Main Admin Jobs Component
------------------------- */
const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formOpen, setFormOpen] = useState(false);
  const [formInitial, setFormInitial] = useState(null);

  const [applicantsOpen, setApplicantsOpen] = useState(false);
  const [currentApplicants, setCurrentApplicants] = useState([]);

  const [search, setSearch] = useState("");

  const handleOpenApplicants = async (job) => {
    try {
      const { data } = await api.get(`/api/jobs/${job._id}/applicants`);
      setCurrentApplicants(data);
      setApplicantsOpen(true);
    } catch (err) {
      console.error(err);
      alert("Failed to load applicants");
    }
  };

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/api/jobs/");
      setJobs(data);
    } catch (err) {
      console.error("Fetch jobs error:", err);
      alert("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filtered = jobs.filter((j) =>
    j.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (!confirm("Delete this job?")) return;

    try {
      await api.delete(`/api/jobs/${id}`);
      fetchJobs();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete job");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Jobs</h1>

        <button
          onClick={() => {
            setFormInitial(null);
            setFormOpen(true);
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus /> Add Job
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 border rounded-lg bg-white px-3 py-2 mb-4">
        <Search className="text-gray-500" />
        <input
          className="outline-none flex-1"
          placeholder="Search job title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button className="p-1" onClick={() => setSearch("")}>
            <X />
          </button>
        )}
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          [...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-32 bg-gray-200 animate-pulse rounded-xl"
            />
          ))
        ) : filtered.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          filtered.map((job) => (
            <motion.div
              key={job._id}
              whileHover={{ y: -5 }}
              className="bg-white p-5 rounded-xl shadow border flex flex-col"
            >
              <h3 className="font-bold text-lg">{job.title}</h3>
              <p className="text-sm text-gray-600">
                {job.dept} • {job.location}
              </p>

              <p className="text-sm mt-2 text-gray-700 line-clamp-3">
                {job.description || "No description"}
              </p>
              <div className="text-xs text-blue-600 font-semibold">
                {job.applicants?.length || 0} Applicants
              </div>

              <div className="mt-auto flex justify-between pt-4">
                <button
                  onClick={() => {
                    setFormInitial(job);
                    setFormOpen(true);
                  }}
                  className="px-3 py-1 border rounded flex items-center gap-2"
                >
                  <Edit2 className="w-4" /> Edit
                </button>

                <button
                  onClick={() => handleDelete(job._id)}
                  className="px-3 py-1 border rounded flex items-center gap-2 text-red-600"
                >
                  <Trash2 className="w-4" /> Delete
                </button>
                <button
                  onClick={() => handleOpenApplicants(job)}
                  className="px-3 py-1 border rounded flex items-center gap-2 text-blue-600"
                >
                  View Applicants
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Modal */}
      <JobFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        initial={formInitial}
        onSaved={() => fetchJobs()}
      />

      <ApplicantsModal
        open={applicantsOpen}
        onClose={() => setApplicantsOpen(false)}
        applicants={currentApplicants}
      />
    </div>
  );
};

const ApplicantsModal = ({ open, onClose, applicants }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-start pt-20 px-4">
      <div className="absolute inset-0" onClick={onClose}></div>

      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6 z-50"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Applicants</h2>
          <button className="p-2" onClick={onClose}>
            <X />
          </button>
        </div>

        {applicants.length === 0 ? (
          <p className="text-center text-gray-500 py-6">No applicants yet</p>
        ) : (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {applicants.map((a, i) => (
              <div key={i} className="p-4 border rounded-lg">
                <h3 className="font-semibold">{a.name}</h3>
                <p className="text-sm text-gray-600">{a.email}</p>
                {a.coverLetter && (
                  <p className="text-sm mt-2">{a.coverLetter}</p>
                )}
                {a.resume && (
                  <a
                    href={`${API_BASE}/${a.resume}`}
                    target="_blank"
                    className="text-blue-600 text-sm font-semibold mt-2 inline-block"
                  >
                    View Resume
                  </a>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Applied on: {new Date(a.submittedAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminJobs;

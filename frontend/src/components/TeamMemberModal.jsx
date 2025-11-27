// src/components/TeamMemberModal.jsx
import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};
const modal = {
  hidden: { y: 40, opacity: 0, scale: 0.98 },
  visible: { y: 0, opacity: 1, scale: 1 },
};

export default function TeamMemberModal({ open, onClose, member }) {
  if (!open || !member) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial="hidden"
      animate={open ? "visible" : "hidden"}
      variants={backdrop}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <motion.div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        variants={backdrop}
      />
      <motion.div
        className="relative bg-white rounded-2xl max-w-3xl w-full mx-4 md:mx-0 shadow-2xl z-50 overflow-hidden"
        variants={modal}
        initial="hidden"
        animate="visible"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between p-6 border-b">
          <div className="flex items-center gap-4">
            <img
              src={member.image}
              alt={member.name}
              className="w-20 h-20 rounded-xl object-cover shadow"
              loading="lazy"
            />
            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                {member.name}
              </h3>
              <p className="text-sm text-indigo-600 font-medium">
                {member.role}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-md text-slate-600 hover:bg-slate-100"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <p className="text-slate-700 leading-relaxed">
              {member.bio_long || member.bio}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {member.education && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">
                    Education
                  </h4>
                  <p className="text-sm text-slate-600">{member.education}</p>
                </div>
              )}
              {member.experience && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">
                    Experience
                  </h4>
                  <p className="text-sm text-slate-600">{member.experience}</p>
                </div>
              )}
            </div>

            {member.specializations && member.specializations.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-2">
                  Specializations
                </h4>
                <div className="flex flex-wrap gap-2">
                  {member.specializations.map((s, i) => (
                    <span
                      key={i}
                      className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {member.certifications && member.certifications.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-2">
                  Certifications
                </h4>
                <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
                  {member.certifications.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="space-y-4 md:border-l md:pl-4">
            {member.languages && (
              <div>
                <h4 className="text-sm font-semibold text-slate-900">
                  Languages
                </h4>
                <p className="text-sm text-slate-600">
                  {member.languages.join(", ")}
                </p>
              </div>
            )}

            {member.contact && (
              <div>
                <h4 className="text-sm font-semibold text-slate-900">
                  Contact
                </h4>
                <p className="text-sm text-slate-600">{member.contact}</p>
              </div>
            )}

            {member.social && (
              <div>
                <h4 className="text-sm font-semibold text-slate-900">Social</h4>
                <div className="flex gap-2 flex-wrap">
                  {Object.entries(member.social).map(([k, v]) => (
                    <a
                      key={k}
                      href={v}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-indigo-600 underline"
                    >
                      {k}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </motion.div>
    </motion.div>
  );
}

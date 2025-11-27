const mongoose = require("mongoose");

const applicantSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    coverLetter: String,
    resume: String,

    // ⭐ NEW FIELDS FOR HIRING WORKFLOW ⭐
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected", "interview"],
        default: "pending",
    },

    notes: {
        type: String,
        default: ""
    },

    submittedAt: { type: Date, default: Date.now }
});

// JOB MODEL
const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    dept: { type: String, required: true },
    type: { type: String, required: true },
    location: { type: String, required: true },
    level: { type: String, required: true },
    tag: { type: String, default: "" },
    description: String,
    slug: { type: String, unique: true },

    applicants: [applicantSchema],  // stays same

    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Job", jobSchema);

const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

const multer = require("multer");

// ---- FIXED STORAGE ----
const storage = multer.diskStorage({
    destination: "uploads/resumes",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = multer({ storage });

// ---------------------------------------------
// CREATE SEO-FRIENDLY SLUG FUNCTION
// ---------------------------------------------
function createSlug(title) {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

// ---------------------------------------------
// ADD NEW JOB
// ---------------------------------------------
router.post("/", async (req, res) => {
    try {
        const baseSlug = createSlug(req.body.title);

        // Check if slug already exists
        const existing = await Job.findOne({ slug: baseSlug });

        let finalSlug = baseSlug;
        if (existing) finalSlug = `${baseSlug}-${Date.now()}`;

        const job = new Job({
            ...req.body,
            slug: finalSlug,
        });

        await job.save();
        res.json({ success: true, job });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ---------------------------------------------
// GET ALL JOBS
// ---------------------------------------------
router.get("/", async (req, res) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ---------------------------------------------
// GET JOB BY SLUG
// ---------------------------------------------
router.get("/slug/:slug", async (req, res) => {
    try {
        const job = await Job.findOne({ slug: req.params.slug });

        if (!job) return res.status(404).json({ error: "Job not found" });

        res.json(job);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// ---------------------------------------------
// DELETE JOB
// ---------------------------------------------
router.delete("/:id", async (req, res) => {
    try {
        await Job.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Job deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ---------------------------------------------
// UPDATE JOB (ALSO REGENERATE SLUG)
// ---------------------------------------------
router.put("/:id", async (req, res) => {
    try {
        const baseSlug = createSlug(req.body.title);
        const finalSlug = `${baseSlug}-${Date.now()}`;

        const job = await Job.findByIdAndUpdate(
            req.params.id,
            { ...req.body, slug: finalSlug },
            { new: true }
        );

        res.json(job);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ---------------------------------------------
// APPLY FOR JOB (SAVE APPLICANT INSIDE JOB)
// ---------------------------------------------
router.post("/apply/:slug", upload.single("resume"), async (req, res) => {
    try {
        const job = await Job.findOne({ slug: req.params.slug });
        if (!job) return res.status(404).json({ error: "Job not found" });

        const applicant = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            coverLetter: req.body.coverLetter,
            resume: req.file?.path,
            submittedAt: new Date(),
        };

        await Job.findByIdAndUpdate(job._id, {
            $push: { applicants: applicant },
        });

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// ---------------------------------------------
// GET APPLICANTS OF A JOB
// ---------------------------------------------
router.get("/:id/applicants", async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) return res.status(404).json([]);

        res.json(job.applicants || []);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

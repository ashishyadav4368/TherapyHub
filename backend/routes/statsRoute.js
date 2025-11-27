const express = require("express");
const router = express.Router();

// STATIC COUNTERS FOR NOW (You can make them dynamic later)
router.get("/", async (req, res) => {
    try {
        const stats = {
            sessions: 10000,
            therapists: 500,
            languages: 50,
            satisfaction: 98,
        };

        res.json(stats);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch stats" });
    }
});

module.exports = router;

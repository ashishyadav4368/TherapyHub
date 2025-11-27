const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const statsRoute = require('./routes/statsRoute')
const jobRoutes = require("./routes/jobRoutes");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "5mb" }));        // FIX ADDED
app.use(express.urlencoded({ extended: true, limit: "5mb" })); // FIX ADDED

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/therapists', require('./routes/therapists'));
app.use('/api/sessions', require('./routes/sessions'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/ratings', require('./routes/ratings'));
app.use("/api/stats", statsRoute);
app.use("/api/jobs", jobRoutes);


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/therapy-platform', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Therapy Platform API is running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
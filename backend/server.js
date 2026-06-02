const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
});

// Routes
const authRoutes = require('./routes/authRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/analytics', analyticsRoutes);

app.get('/', (req, res) => {
    res.send('SaaS Analytics API is running');
});

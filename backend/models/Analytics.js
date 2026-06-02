const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
    month: { type: String, required: true }, // e.g., 'Jan', 'Feb'
    users: { type: Number, required: true },
    revenue: { type: Number, required: true },
    churnRate: { type: Number, required: true },
    subscriptions: { type: Number, required: true }
});

const Analytics = mongoose.model('Analytics', analyticsSchema);
module.exports = Analytics;

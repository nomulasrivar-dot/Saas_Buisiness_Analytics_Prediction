const Analytics = require('../models/Analytics');

// Mock data generator for first time run
const seedAnalyticsData = async () => {
    const dataCount = await Analytics.countDocuments();
    if (dataCount === 0) {
        const mockData = [
            { month: 'Jan', users: 4000, revenue: 24000, churnRate: 2.4, subscriptions: 2400 },
            { month: 'Feb', users: 3000, revenue: 13980, churnRate: 2.2, subscriptions: 2210 },
            { month: 'Mar', users: 2000, revenue: 9800, churnRate: 2.9, subscriptions: 2290 },
            { month: 'Apr', users: 2780, revenue: 39080, churnRate: 2.0, subscriptions: 2000 },
            { month: 'May', users: 1890, revenue: 48000, churnRate: 1.8, subscriptions: 2181 },
            { month: 'Jun', users: 2390, revenue: 38000, churnRate: 2.5, subscriptions: 2500 },
            { month: 'Jul', users: 3490, revenue: 43000, churnRate: 2.1, subscriptions: 2100 },
        ];
        await Analytics.insertMany(mockData);
        console.log('Mock analytics data seeded');
    }
};

exports.getAnalytics = async (req, res) => {
    try {
        await seedAnalyticsData(); // Ensure data exists
        const data = await Analytics.find();
        
        // Compute some summary metrics
        const totalRevenue = data.reduce((acc, curr) => acc + curr.revenue, 0);
        const totalUsers = data.reduce((acc, curr) => acc + curr.users, 0);
        const averageChurn = (data.reduce((acc, curr) => acc + curr.churnRate, 0) / data.length).toFixed(2);
        
        res.json({
            chartData: data,
            summary: {
                totalRevenue,
                totalUsers,
                averageChurn,
                activeSubscriptions: data[data.length - 1].subscriptions // Latest month
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const Analytics = require('../models/Analytics');
const xlsx = require('xlsx');

// Linear regression helper
const predictNextValue = (data, key) => {
    const n = data.length;
    if (n === 0) return 0;
    if (n === 1) return Number(data[0][key]) || 0;

    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
    
    for (let i = 0; i < n; i++) {
        const x = i + 1; // Time step
        const y = Number(data[i][key]) || 0;
        sumX += x;
        sumY += y;
        sumXY += x * y;
        sumX2 += x * x;
    }
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    
    const nextX = n + 1;
    let predictedY = slope * nextX + intercept;
    return predictedY > 0 ? Number(predictedY.toFixed(2)) : 0;
};

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
        let data = await Analytics.find();
        
        // Convert to plain JS objects to avoid mongoose document issues when adding predictions
        const formattedData = data.map(doc => ({
            month: doc.month,
            users: doc.users,
            revenue: doc.revenue,
            churnRate: doc.churnRate,
            subscriptions: doc.subscriptions
        }));

        // Generate prediction for next month
        const nextMonthPrediction = {
            month: 'Next Month (Predicted)',
            users: Math.round(predictNextValue(formattedData, 'users')),
            revenue: predictNextValue(formattedData, 'revenue'),
            churnRate: predictNextValue(formattedData, 'churnRate'),
            subscriptions: Math.round(predictNextValue(formattedData, 'subscriptions'))
        };
        
        const chartData = [...formattedData, nextMonthPrediction];
        
        const totalRevenue = formattedData.reduce((acc, curr) => acc + curr.revenue, 0);
        const totalUsers = formattedData.reduce((acc, curr) => acc + curr.users, 0);
        const averageChurn = formattedData.length > 0 ? (formattedData.reduce((acc, curr) => acc + curr.churnRate, 0) / formattedData.length).toFixed(2) : 0;
        
        res.json({
            chartData,
            summary: {
                totalRevenue,
                totalUsers,
                averageChurn,
                activeSubscriptions: formattedData.length > 0 ? formattedData[formattedData.length - 1].subscriptions : 0,
                prediction: nextMonthPrediction
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.uploadAndPredict = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rawData = xlsx.utils.sheet_to_json(sheet);
        
        const formattedData = rawData.map(row => {
            const keys = Object.keys(row);
            const getVal = (possibleNames) => {
                const key = keys.find(k => possibleNames.includes(k.toLowerCase().replace(/[^a-z]/g, '')));
                return key ? Number(row[key]) : 0;
            };
            
            return {
                month: row.Month || row.month || row.Date || row.date || 'Unknown',
                users: getVal(['users', 'totalusers', 'activeusers']),
                revenue: getVal(['revenue', 'mrr', 'arr', 'sales']),
                churnRate: getVal(['churnrate', 'churn', 'churnpercentage']),
                subscriptions: getVal(['subscriptions', 'subs', 'activesubscriptions'])
            };
        });

        // Save uploaded data to database
        await Analytics.deleteMany({});
        await Analytics.insertMany(formattedData);

        // Fetch using the standard getAnalytics method to ensure consistency
        req.method = 'GET';
        exports.getAnalytics(req, res);

    } catch (error) {
        res.status(500).json({ message: 'Failed to process file', error: error.message });
    }
};

import { useState, useEffect } from 'react';
import { 
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
    AreaChart, Area, BarChart, Bar, Legend
} from 'recharts';
import { Users, DollarSign, UserMinus, CreditCard, TrendingUp, UploadCloud } from 'lucide-react';
import api from '../api/axios';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await api.get('/analytics');
                setData(response.data);
            } catch (err) {
                setError('Failed to fetch analytics data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            setLoading(true);
            const response = await api.post('/analytics/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setData(response.data);
        } catch (err) {
            setError('Failed to upload and parse the file.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <>
                <Sidebar />
                <main className="main-content">
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Loading your analytics...</p>
                    </div>
                </main>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Sidebar />
                <main className="main-content">
                    <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', color: 'var(--danger-color)' }}>
                        <h2>Oops!</h2>
                        <p>{error}</p>
                        <button className="btn btn-outline" style={{ marginTop: '1rem' }} onClick={() => window.location.reload()}>Retry</button>
                    </div>
                </main>
            </>
        );
    }

    const { summary, chartData } = data;

    return (
        <>
            <Sidebar />
            <main className="main-content animate-fade-in">
                <div className="dashboard-header">
                    <div>
                        <h1 className="page-title">Analytics Overview</h1>
                        <p style={{ color: 'var(--text-secondary)' }}>Track your SaaS metrics in real-time</p>
                    </div>
                    <div className="header-actions">
                        <input 
                            type="file" 
                            id="file-upload" 
                            style={{ display: 'none' }} 
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            onChange={handleFileUpload}
                        />
                        <label htmlFor="file-upload" className="btn btn-outline" style={{ cursor: 'pointer', margin: 0 }}>
                            <UploadCloud size={18} />
                            Upload Live Data
                        </label>
                        <button className="btn btn-primary" onClick={() => window.location.reload()}>
                            <TrendingUp size={18} />
                            Reset Mock Data
                        </button>
                    </div>
                </div>

                {summary.prediction && (
                    <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2.5rem', borderLeft: '4px solid var(--accent-color)' }}>
                        <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <TrendingUp size={20} color="var(--accent-color)" />
                            AI Predictive Insights (Next Month)
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                            <div>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Expected Revenue</p>
                                <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>${summary.prediction.revenue.toLocaleString()}</p>
                            </div>
                            <div>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Expected Users</p>
                                <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{summary.prediction.users.toLocaleString()}</p>
                            </div>
                            <div>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Expected Churn</p>
                                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--danger-color)' }}>{summary.prediction.churnRate}%</p>
                            </div>
                            <div>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Expected Subscriptions</p>
                                <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{summary.prediction.subscriptions.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="stats-grid">
                    <div className="stat-card glass-panel">
                        <div className="stat-icon" style={{ color: '#10b981', background: 'rgba(16, 185, 129, 0.1)' }}>
                            <DollarSign size={24} />
                        </div>
                        <h3 className="stat-title">Total Revenue</h3>
                        <p className="stat-value">${summary.totalRevenue.toLocaleString()}</p>
                        <div className="stat-change change-positive">
                            <span>+12.5%</span> from last month
                        </div>
                    </div>

                    <div className="stat-card glass-panel">
                        <div className="stat-icon" style={{ color: '#6366f1', background: 'rgba(99, 102, 241, 0.1)' }}>
                            <Users size={24} />
                        </div>
                        <h3 className="stat-title">Total Users</h3>
                        <p className="stat-value">{summary.totalUsers.toLocaleString()}</p>
                        <div className="stat-change change-positive">
                            <span>+8.2%</span> from last month
                        </div>
                    </div>

                    <div className="stat-card glass-panel">
                        <div className="stat-icon" style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)' }}>
                            <UserMinus size={24} />
                        </div>
                        <h3 className="stat-title">Avg Churn Rate</h3>
                        <p className="stat-value">{summary.averageChurn}%</p>
                        <div className="stat-change change-negative">
                            <span>-1.1%</span> from last month
                        </div>
                    </div>

                    <div className="stat-card glass-panel">
                        <div className="stat-icon" style={{ color: '#f59e0b', background: 'rgba(245, 158, 11, 0.1)' }}>
                            <CreditCard size={24} />
                        </div>
                        <h3 className="stat-title">Active Subscriptions</h3>
                        <p className="stat-value">{summary.activeSubscriptions.toLocaleString()}</p>
                        <div className="stat-change change-positive">
                            <span>+5.4%</span> from last month
                        </div>
                    </div>
                </div>

                <div className="charts-grid">
                    <div className="chart-card glass-panel">
                        <div className="chart-header">
                            <h3 className="chart-title">Revenue Growth</h3>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                                <XAxis dataKey="month" stroke="var(--text-secondary)" tickLine={false} />
                                <YAxis stroke="var(--text-secondary)" tickLine={false} axisLine={false} />
                                <Tooltip 
                                    contentStyle={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} 
                                    itemStyle={{ color: '#e2e8f0' }}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="chart-card glass-panel">
                        <div className="chart-header">
                            <h3 className="chart-title">User Acquisition vs Churn</h3>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                                <XAxis dataKey="month" stroke="var(--text-secondary)" tickLine={false} />
                                <YAxis yAxisId="left" stroke="var(--text-secondary)" tickLine={false} axisLine={false} />
                                <YAxis yAxisId="right" orientation="right" stroke="var(--text-secondary)" tickLine={false} axisLine={false} />
                                <Tooltip 
                                    contentStyle={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} 
                                />
                                <Legend />
                                <Line yAxisId="left" type="monotone" dataKey="users" name="New Users" stroke="#6366f1" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                                <Line yAxisId="right" type="monotone" dataKey="churnRate" name="Churn Rate (%)" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="chart-card glass-panel" style={{ gridColumn: '1 / -1' }}>
                        <div className="chart-header">
                            <h3 className="chart-title">Subscriptions Overview</h3>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                                <XAxis dataKey="month" stroke="var(--text-secondary)" tickLine={false} />
                                <YAxis stroke="var(--text-secondary)" tickLine={false} axisLine={false} />
                                <Tooltip 
                                    contentStyle={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                />
                                <Bar dataKey="subscriptions" fill="url(#colorSubscriptions)" radius={[4, 4, 0, 0]}>
                                    <defs>
                                        <linearGradient id="colorSubscriptions" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#a855f7" />
                                            <stop offset="100%" stopColor="#6366f1" />
                                        </linearGradient>
                                    </defs>
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Dashboard;

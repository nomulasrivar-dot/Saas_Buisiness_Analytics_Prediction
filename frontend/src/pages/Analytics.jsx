import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import api from '../api/axios';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';

const Analytics = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await api.get('/analytics');
                setData(response.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    if (loading || !data) return <><Sidebar /><main className="main-content"><div className="spinner"></div></main></>;

    // Calculate ARPU (Average Revenue Per User) for the chart
    const arpuData = data.chartData.map(row => ({
        month: row.month,
        arpu: row.users > 0 ? Number((row.revenue / row.users).toFixed(2)) : 0
    }));

    return (
        <>
            <Sidebar />
            <main className="main-content animate-fade-in">
                <div className="dashboard-header">
                    <div>
                        <h1 className="page-title">Advanced Analytics</h1>
                        <p style={{ color: 'var(--text-secondary)' }}>Deep dive into your SaaS dataset trends</p>
                    </div>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
                    <div className="glass-panel" style={{ padding: '1.5rem' }}>
                        <h3 style={{ marginBottom: '1.5rem' }}>ARPU (Average Revenue Per User)</h3>
                        <div style={{ height: '300px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={arpuData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorArpu" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#a855f7" />
                                            <stop offset="100%" stopColor="#6366f1" />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={true} vertical={false} />
                                    <XAxis dataKey="month" stroke="var(--text-secondary)" tickLine={false} axisLine={false} />
                                    <YAxis stroke="var(--text-secondary)" tickLine={false} axisLine={false} />
                                    <Tooltip 
                                        contentStyle={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} 
                                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                    />
                                    <Bar dataKey="arpu" fill="url(#colorArpu)" radius={[4, 4, 0, 0]} name="ARPU ($)" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="glass-panel" style={{ padding: '1.5rem' }}>
                        <h3 style={{ marginBottom: '1.5rem' }}>Subscriptions vs Churn Rate</h3>
                        <div style={{ height: '300px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data.chartData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                    <XAxis dataKey="month" stroke="var(--text-secondary)" tickLine={false} />
                                    <YAxis yAxisId="left" stroke="var(--text-secondary)" tickLine={false} axisLine={false} />
                                    <YAxis yAxisId="right" orientation="right" stroke="var(--text-secondary)" tickLine={false} axisLine={false} />
                                    <Tooltip 
                                        contentStyle={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} 
                                    />
                                    <Legend />
                                    <Line yAxisId="left" type="monotone" dataKey="subscriptions" name="Subscriptions" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                                    <Line yAxisId="right" type="monotone" dataKey="churnRate" name="Churn Rate (%)" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Analytics;

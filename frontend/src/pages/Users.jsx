import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import api from '../api/axios';
import { Users as UsersIcon, UserPlus, TrendingDown } from 'lucide-react';

const Users = () => {
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

    // Exclude the predicted row for the historical table
    const historicalData = data.chartData.filter(d => !d.month.includes('Predicted'));

    return (
        <>
            <Sidebar />
            <main className="main-content animate-fade-in">
                <div className="dashboard-header">
                    <div>
                        <h1 className="page-title">User Growth & Retention</h1>
                        <p style={{ color: 'var(--text-secondary)' }}>Track user acquisition and churn based on your dataset</p>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ padding: '1rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px', color: '#818cf8' }}>
                            <UsersIcon size={24} />
                        </div>
                        <div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Total Users (All Time)</p>
                            <h2 style={{ fontSize: '1.8rem' }}>{data.summary.totalUsers.toLocaleString()}</h2>
                        </div>
                    </div>
                    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', color: '#10b981' }}>
                            <UserPlus size={24} />
                        </div>
                        <div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Expected Next Month</p>
                            <h2 style={{ fontSize: '1.8rem' }}>{data.summary.prediction.users.toLocaleString()}</h2>
                        </div>
                    </div>
                    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px', color: '#ef4444' }}>
                            <TrendingDown size={24} />
                        </div>
                        <div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Avg Churn Rate</p>
                            <h2 style={{ fontSize: '1.8rem' }}>{data.summary.averageChurn}%</h2>
                        </div>
                    </div>
                </div>
                
                <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
                    <h3 style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Monthly User Metrics (From Dataset)</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                            <tr>
                                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Month</th>
                                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Total Users</th>
                                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>New Users Added</th>
                                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Churn Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historicalData.map((row, idx) => {
                                const prevUsers = idx === 0 ? 0 : historicalData[idx - 1].users;
                                const newUsers = idx === 0 ? row.users : row.users - prevUsers;
                                return (
                                    <tr key={idx} style={{ borderBottom: idx !== historicalData.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                                        <td style={{ padding: '1rem 1.5rem', fontWeight: '500' }}>{row.month}</td>
                                        <td style={{ padding: '1rem 1.5rem' }}>{row.users.toLocaleString()}</td>
                                        <td style={{ padding: '1rem 1.5rem', color: '#10b981' }}>+{newUsers.toLocaleString()}</td>
                                        <td style={{ padding: '1rem 1.5rem', color: '#ef4444' }}>{row.churnRate}%</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    );
};

export default Users;

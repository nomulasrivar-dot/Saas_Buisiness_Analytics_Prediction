import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import api from '../api/axios';
import { CreditCard, CheckCircle, TrendingUp } from 'lucide-react';

const Billing = () => {
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

    const historicalData = data.chartData.filter(d => !d.month.includes('Predicted')).reverse(); // newest first
    const currentMRR = historicalData.length > 0 ? historicalData[0].revenue : 0;

    return (
        <>
            <Sidebar />
            <main className="main-content animate-fade-in">
                <div className="dashboard-header">
                    <div>
                        <h1 className="page-title">Billing & Revenue</h1>
                        <p style={{ color: 'var(--text-secondary)' }}>Track your financial metrics and subscriptions derived from your dataset</p>
                    </div>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                    <div className="glass-panel" style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>Current MRR (Latest Month)</h3>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '1rem' }}>
                            <h2 style={{ fontSize: '2.5rem', color: '#10b981' }}>${currentMRR.toLocaleString()}</h2>
                        </div>
                        <h4 style={{ marginBottom: '1rem' }}>Total Historical Revenue</h4>
                        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>${data.summary.totalRevenue.toLocaleString()}</p>
                    </div>

                    <div className="glass-panel" style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>AI Revenue Forecast</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.3)', marginBottom: '1.5rem' }}>
                            <div style={{ padding: '0.5rem', background: '#6366f1', borderRadius: '6px', color: '#fff' }}>
                                <TrendingUp size={24} />
                            </div>
                            <div>
                                <p style={{ fontWeight: '500', color: '#818cf8' }}>Expected Next Month</p>
                                <p style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>${data.summary.prediction.revenue.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Monthly Revenue History</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                <th style={{ padding: '1rem 0', color: 'var(--text-secondary)', fontWeight: '500' }}>Month</th>
                                <th style={{ padding: '1rem 0', color: 'var(--text-secondary)', fontWeight: '500' }}>Revenue</th>
                                <th style={{ padding: '1rem 0', color: 'var(--text-secondary)', fontWeight: '500' }}>Active Subscriptions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historicalData.map((row, idx) => (
                                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={{ padding: '1rem 0', fontWeight: '500' }}>{row.month}</td>
                                    <td style={{ padding: '1rem 0', color: '#10b981' }}>${row.revenue.toLocaleString()}</td>
                                    <td style={{ padding: '1rem 0' }}>{row.subscriptions.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    );
};

export default Billing;

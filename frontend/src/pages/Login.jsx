import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { LogIn } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const { data } = await api.post('/auth/login', { email, password });
            login(data);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to login');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const { data } = await api.post('/auth/google', { token: credentialResponse.credential });
            login(data);
            navigate('/');
        } catch (err) {
            setError('Google login failed');
        }
    };

    return (
        <div className="auth-container">
            <div className="glass-panel auth-card animate-fade-in">
                <div className="auth-header">
                    <h1 className="auth-title">Welcome Back</h1>
                    <p className="auth-subtitle">Login to access your analytics</p>
                </div>

                {error && <div style={{ color: 'var(--danger-color)', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input 
                            type="email" 
                            className="form-input" 
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input 
                            type="password" 
                            className="form-input" 
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem' }} disabled={loading}>
                        <LogIn size={18} />
                        {loading ? 'Logging in...' : 'Sign In'}
                    </button>
                </form>

                <div className="auth-divider">OR</div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => {
                            setError('Google Login Failed');
                        }}
                        theme="filled_black"
                        shape="rectangular"
                        size="large"
                        text="continue_with"
                    />
                </div>
                
                <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    Don't have an account? <Link to="/signup" style={{ color: 'var(--accent-color)', fontWeight: 500 }}>Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;

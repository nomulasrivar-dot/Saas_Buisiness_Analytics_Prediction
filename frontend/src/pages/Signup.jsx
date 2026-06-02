import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { UserPlus } from 'lucide-react';

const Signup = () => {
    const [name, setName] = useState('');
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
            const { data } = await api.post('/auth/register', { name, email, password });
            login(data);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to register');
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
                    <h1 className="auth-title">Create Account</h1>
                    <p className="auth-subtitle">Join us to scale your SaaS business</p>
                </div>

                {error && <div style={{ color: 'var(--danger-color)', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input 
                            type="text" 
                            className="form-input" 
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required 
                        />
                    </div>

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
                        <UserPlus size={18} />
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <div className="auth-divider">OR</div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => setError('Google Registration Failed')}
                        theme="filled_black"
                        shape="rectangular"
                        size="large"
                        text="signup_with"
                    />
                </div>
                
                <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--accent-color)', fontWeight: 500 }}>Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;

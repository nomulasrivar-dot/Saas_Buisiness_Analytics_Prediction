import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Users, CreditCard, Activity, LogOut } from 'lucide-react';
import { useNavigate, NavLink } from 'react-router-dom';

const Sidebar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <aside className="sidebar">
            <div className="logo-container">
                <div className="logo-icon">S</div>
                <span className="logo-text">SaaSly</span>
            </div>

            <ul className="nav-links">
                <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </NavLink>
                <NavLink to="/users" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Users size={20} />
                    <span>Users</span>
                </NavLink>
                <NavLink to="/billing" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <CreditCard size={20} />
                    <span>Billing</span>
                </NavLink>
                <NavLink to="/analytics" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Activity size={20} />
                    <span>Analytics</span>
                </NavLink>
            </ul>

            <div className="nav-footer">
                <div className="user-profile mb-4">
                    <div className="avatar">
                        {user?.name?.charAt(0) || 'U'}
                    </div>
                    <div className="user-info">
                        <span className="user-name">{user?.name || 'User'}</span>
                        <span className="user-role">{user?.role || 'Admin'}</span>
                    </div>
                </div>
                
                <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'flex-start' }} onClick={handleLogout}>
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;

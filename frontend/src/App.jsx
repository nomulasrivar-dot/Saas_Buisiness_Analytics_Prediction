import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Billing from './pages/Billing';
import Analytics from './pages/Analytics';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return null;
  
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/users" 
            element={
              <PrivateRoute>
                <Users />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/billing" 
            element={
              <PrivateRoute>
                <Billing />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/analytics" 
            element={
              <PrivateRoute>
                <Analytics />
              </PrivateRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

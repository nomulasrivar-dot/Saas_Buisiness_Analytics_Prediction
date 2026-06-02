import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;

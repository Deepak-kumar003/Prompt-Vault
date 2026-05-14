// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register'

// We are importing placeholder components for now
// We will build these properly in the next step!
const Dashboard = () => <div className="p-10 text-2xl font-bold text-blue-600">Welcome to the Dashboard</div>;
const Login = () => <div className="p-10 text-2xl font-bold text-green-600">Login Page</div>;

function App() {
  return (
    // BrowserRouter wraps our whole app to enable routing
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
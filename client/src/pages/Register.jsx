import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/login');
      } else {
        console.log("Registration failed:", data.message);
      }
    } catch (err) {
      console.log("Server connection error:", err.message);
    }
  };

  return (
    // Outer canvas: fills screen, centers content, light gray background
    <div className="min-h-screen bg-vault-bg flex items-center justify-center p-4">
      
      {/* The White Card */}
      <div className="bg-vault-card border border-vault-border rounded-xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-vault-textMain text-center mb-8">
          Create an Account
        </h2>
        
        {/* Fixed: Pass function reference, don't execute immediately */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Name Input Group */}
          <div>
            <label className="block text-sm font-medium text-vault-textMuted mb-1">
              Name
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 bg-vault-bg border border-vault-border rounded-md text-vault-textMain focus:outline-none focus:border-vault-primary focus:ring-1 focus:ring-vault-primary transition-colors"
              placeholder="Enter your Name"
              value={name} // Fixed: Added value back for controlled input
              onChange={(e) => setName(e.target.value)} 
            />
          </div>

          {/* Email Input Group */}
          <div>
            <label className="block text-sm font-medium text-vault-textMuted mb-1">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 bg-vault-bg border border-vault-border rounded-md text-vault-textMain focus:outline-none focus:border-vault-primary focus:ring-1 focus:ring-vault-primary transition-colors"
              placeholder="Enter your Email address"
              value={email} // Fixed: Added value back
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          {/* Password Input Group */}
          <div>
            <label className="block text-sm font-medium text-vault-textMuted mb-1">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full px-4 py-2 bg-vault-bg border border-vault-border rounded-md text-vault-textMain focus:outline-none focus:border-vault-primary focus:ring-1 focus:ring-vault-primary transition-colors"
              placeholder="Enter your Password"
              value={password} // Fixed: Added value back
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-vault-primary hover:bg-vault-primaryHover text-black font-semibold py-2.5 rounded-md transition-colors mt-4"
          >
            Sign Up
          </button>
          
        </form>
      </div>
    </div>
  );
}

export default Register;
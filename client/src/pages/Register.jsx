import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
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
        setError(data.message);
      }
    } catch (err) {
      setError(`Cannot connect to the server. ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-vault-bg flex items-center justify-center p-4">
      
      <div className="bg-vault-card border border-vault-border rounded-xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-vault-textMain text-center mb-8">
          Create an Account
        </h2>

        {error && (
          <div className="p-3 text-sm text-red-700 bg-red-100 rounded m-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-vault-textMuted mb-1">
              Name
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 bg-vault-bg border border-vault-border rounded-md text-vault-textMain focus:outline-none focus:border-vault-primary focus:ring-1 focus:ring-vault-primary transition-colors"
              placeholder="Enter your Name"
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-vault-textMuted mb-1">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 bg-vault-bg border border-vault-border rounded-md text-vault-textMain focus:outline-none focus:border-vault-primary focus:ring-1 focus:ring-vault-primary transition-colors"
              placeholder="Enter your Email address"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-vault-textMuted mb-1">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full px-4 py-2 bg-vault-bg border border-vault-border rounded-md text-vault-textMain focus:outline-none focus:border-vault-primary focus:ring-1 focus:ring-vault-primary transition-colors"
              placeholder="Enter your Password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
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
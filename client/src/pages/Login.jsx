import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault();
        setError(" ");

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                navigate('/dashboard');
            } else {
                setError(data.message);
            }
        }
        catch (err) {
            setError(`cannot connect to server: ${err.message}`);
        }

    }


    return (
        <div className="min-h-screen bg-vault-bg flex items-center justify-center p-4">
            <div className="bg-vault-card border border-vault-border rounded-xl w-full max-w-md p-8">
                <h1 className="text-2xl font-bold text-vault-textMain text-center mb-8">Welcome Back!</h1>

                {error && (
                    <div className="p-3 text-sm text-red-700 bg-red-100 rounded m-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handlesubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-vault-textMuted mb-1">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full px-4 py-2 bg-vault-bg border border-vault-border rounded-md text-vault-textMain focus:outline-none focus:border-vault-primary focus:ring-1 focus:ring-vault-primary transition-colors"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-vault-textMuted mb-1">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full px-4 py-2 bg-vault-bg border border-vault-border rounded-md text-vault-textMain focus:outline-none focus:border-vault-primary focus:ring-1 focus:ring-vault-primary transition-colors"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-vault-primary hover:bg-vault-primaryHover text-black font-semibold py-2.5 rounded-md transition-colors mt-4"
                    >Sign In</button>

                    <div className="mt-6 text-center text-sm text-vault-textMuted">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-vault-primary hover:text-vault-primaryHover hover:underline font-medium transition-colors">
                            Sign up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login
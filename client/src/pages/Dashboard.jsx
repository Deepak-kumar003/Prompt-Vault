import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import DashboardCard from '../components/DashboardCard';

const Dashboard = () => {
    const [prompts, setPrompts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPrompts = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await fetch("http://localhost:5000/api/prompts/my-prompts", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    setPrompts(data);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError("Cannot connect to server to fetch prompts.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchPrompts();
    }, [navigate]);

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const newThisWeek = prompts.filter(p => new Date(p.createdAt) >= oneWeekAgo).length;

    const uniqueTags = new Set(prompts.flatMap(p => p.tags || []));
    const totalModels = uniqueTags.size;

    const totalCopies = prompts.reduce((sum, p) => sum + (p.copyCount || 0), 0);

    const recentlyEdited = [...prompts]
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .slice(0, 3);


    return (
        <div className="flex h-screen bg-vault-bg text-vault-textMain overflow-hidden">
            <SideBar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />

                <main className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-6xl mx-auto">

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-lg mb-6">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-3 gap-6 mb-10">

                            <div className="bg-vault-card border border-vault-border rounded-xl p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-vault-textMuted text-sm font-medium">Total Prompts</span>
                                    <svg className="w-5 h-5 text-vault-textMuted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                </div>
                                <h3 className="text-4xl font-bold text-vault-textMain">{prompts.length}</h3>
                                <p className="text-vault-textMuted text-xs mt-2">+{newThisWeek} this week</p>
                            </div>

                            <div className="bg-vault-card border border-vault-border rounded-xl p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-vault-textMuted text-sm font-medium">Parameter Models</span>
                                    <svg className="w-5 h-5 text-vault-textMuted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                                </div>
                                <h3 className="text-4xl font-bold text-vault-textMain">{totalModels}</h3>
                                {/* <p className="text-vault-textMuted text-xs mt-2">2 active</p> */}
                            </div>

                            <div className="bg-vault-card border border-vault-border rounded-xl p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-vault-textMuted text-sm font-medium">Most Used</span>
                                    <svg className="w-5 h-5 text-vault-textMuted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                                </div>
                                <h3 className="text-4xl font-bold text-vault-textMain">{totalCopies}</h3>
                                <p className="text-vault-textMuted text-xs mt-2">copies this month</p>
                            </div>

                        </div>

                        <div className="grid grid-cols-3 gap-8">
                            <div className="col-span-2">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-bold flex items-center gap-2">
                                        <span className="text-vault-textMuted text-base">⏱</span> Recently Edited
                                    </h2>
                                    <Link to="/my-prompts" className="text-vault-primary text-sm hover:underline">View all →</Link>
                                </div>

                                <div className="flex flex-col gap-4">
                                    {isLoading ? (
                                        <p className="text-vault-textMuted">Loading your prompts...</p>
                                    ) : prompts.length === 0 ? (
                                        <div className="text-center py-10 bg-vault-card border border-dashed border-vault-border rounded-xl">
                                            <p className="text-vault-textMuted">You haven't created any prompts yet!</p>
                                        </div>
                                    ) : (
                                        recentlyEdited.map((prompt) => (
                                            <DashboardCard key={prompt._id} prompt={prompt} />
                                        ))
                                    )}
                                </div>
                            </div>

                            <div className="col-span-1">
                                <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
                                    <span className="text-yellow-500 text-base">☆</span> Favorites
                                </h2>
                                <div className="bg-vault-card border border-vault-border rounded-xl p-5 min-h-[300px]">
                                    <p className="text-vault-textMuted text-sm">Favorites list coming soon...</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
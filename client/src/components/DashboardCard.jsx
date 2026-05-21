import { useState } from 'react';
import { Link } from 'react-router-dom';

const getTimeAgo = (dateString) => {
    if (!dateString) return "Just now";
    const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);

    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return "Yesterday";
    return `${days}d ago`;
};


const DashboardCard = ({ prompt }) => {

    const [copied, setCopied] = useState(false);

    const handleCopy = async (e) => {
        e.preventDefault(); 
        e.stopPropagation();
        navigator.clipboard.writeText(prompt.promptTemplate || prompt.description);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);

        try {
            await fetch(`http://localhost:5000/api/prompts/${prompt._id}/copy`, {
                method: 'POST',
            });
        } catch (err) {
            console.error("Failed to update copy count");
        }
    };


    return (
        <Link to={`/prompt/${prompt._id}`} className="bg-vault-card border border-vault-border rounded-xl p-5 flex justify-between items-start hover:border-vault-textMuted transition-colors group cursor-pointer">

            <div className="flex-1 pr-6">
                <h3 className="text-vault-textMain font-semibold text-lg mb-1">
                    {prompt.title}
                </h3>
                <p className="text-vault-textMuted text-sm mb-4 line-clamp-2">
                    {prompt.description}
                </p>
                <div className="flex flex-wrap gap-2">
                    {(prompt.tags || []).map((tag, index) => (
                        <span
                            key={index}
                            className="px-2.5 py-1 bg-[#18181b] border border-vault-border text-vault-textMuted text-xs rounded-md"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex flex-col items-end gap-3 shrink-0">
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-1.5 border border-vault-border rounded-md text-vault-textMain text-sm hover:bg-vault-bg transition-colors"
                >
                    {copied ? (
                        <span className="text-vault-primary flex items-center gap-1">✓ Copied!</span>
                    ) : (
                        <>
                            <svg className="w-4 h-4 text-vault-textMuted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Copy
                        </>
                    )}
                </button>

                <span className="text-vault-textMuted text-xs">
                    {getTimeAgo(prompt.updatedAt || prompt.createdAt)}
                </span>
            </div>

        </Link>
    );
};

export default DashboardCard;
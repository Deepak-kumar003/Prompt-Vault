import { useState } from 'react';

const LibraryCard = ({ prompt }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    navigator.clipboard.writeText(prompt.content || prompt.description);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    try {
      await fetch(`http://localhost:5000/api/prompts/${prompt._id}/copy`, { method: 'POST' });
    } catch (err) {
      console.error("Failed to update copy count");
    }
  };

  return (
    // Note the flex-col here! It makes the card stack vertically.
    <div className="bg-vault-card border border-vault-border rounded-xl p-6 flex flex-col h-full hover:border-vault-textMuted transition-colors cursor-pointer group">
      
      {/* Top Row: Title and Star */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-vault-textMain font-semibold text-lg leading-tight pr-4">
          {prompt.title}
        </h3>
        {/* Gold Star Icon */}
        <svg className="w-5 h-5 text-yellow-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>

      {/* Middle: Description */}
      <p className="text-vault-textMuted text-sm mb-6 line-clamp-3 flex-grow">
        {prompt.description}
      </p>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(prompt.tags || []).slice(0, 3).map((tag, index) => (
          <span key={index} className="px-2.5 py-1 bg-[#18181b] border border-vault-border text-vault-textMain text-xs rounded-md">
            {tag}
          </span>
        ))}
        {prompt.tags?.length > 3 && (
          <span className="px-2.5 py-1 bg-[#18181b] border border-vault-border text-vault-textMuted text-xs rounded-md">
            +{prompt.tags.length - 3}
          </span>
        )}
      </div>

      {/* Bottom Row: Copy Count and Action Button */}
      {/* mt-auto pushes this row to the absolute bottom of the card */}
      <div className="flex justify-between items-center mt-auto pt-4 border-t border-vault-border/50">
        <div className="flex items-center gap-1.5 text-vault-textMuted text-xs">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          {prompt.copyCount || 0} copies
        </div>
        
        <button 
          onClick={handleCopy}
          className="bg-vault-primary hover:bg-vault-primaryHover text-black text-sm font-semibold px-4 py-1.5 rounded-md transition-colors flex items-center gap-2"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

    </div>
  );
};

export default LibraryCard;
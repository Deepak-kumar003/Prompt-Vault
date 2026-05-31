import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import LibraryCard from '../components/LibraryCard';

const PromptLibrary = () => {
  const [prompts, setPrompts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All'); // New state for the Tag filter!

  useEffect(() => {
    const fetchAllPrompts = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('https://prompt-vault-vxg1.onrender.com/api/prompts', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (response.ok) setPrompts(data);
      } catch (err) {
        console.error("Failed to fetch");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllPrompts();
  }, []);

  // 1. Automatically extract all unique tags from the database to build the filter bar
  const allAvailableTags = ['All', ...new Set(prompts.flatMap(p => p.tags || []))];

  // 2. Filter logic: Must match Search Query AND the Selected Tag
  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prompt.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTag = selectedTag === 'All' || (prompt.tags && prompt.tags.includes(selectedTag));
    
    return matchesSearch && matchesTag;
  });

  return (
    <div className="flex h-screen bg-vault-bg text-vault-textMain overflow-hidden">
      <SideBar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Page Header (Title + New Prompt Button) */}
            <div className="flex justify-between items-end mb-8">
              <div>
                <h1 className="text-3xl font-serif font-bold text-vault-textMain mb-1">Total Prompts</h1>
                <p className="text-vault-textMuted text-sm">{prompts.length} prompts</p>
              </div>
              <Link to="/create" className="bg-vault-primary hover:bg-vault-primaryHover text-black font-semibold px-4 py-2 rounded-md transition-colors flex items-center gap-2 text-sm">
                <span className="text-lg leading-none">+</span> New Prompt
              </Link>
            </div>

            {/* The Advanced Filter Bar Container */}
            <div className="space-y-4 mb-8">
              
              {/* Row 1: Search and Dropdowns */}
              <div className="flex gap-4 items-center">
                <div className="relative flex-1">
                  <svg className="absolute left-3 top-2.5 h-4 w-4 text-vault-textMuted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  <input 
                    type="text" 
                    placeholder="Search prompts..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-vault-bg border border-vault-border rounded-md pl-9 pr-4 py-2 text-sm text-vault-textMain focus:outline-none focus:border-vault-primary transition-colors"
                  />
                </div>
                
                {/* Simulated Dropdowns from your design */}
                <select className="bg-vault-bg border border-vault-border rounded-md px-4 py-2 text-sm text-vault-textMain focus:outline-none focus:border-vault-primary w-40">
                  <option>All Models</option>
                  <option>GPT-4</option>
                  <option>Claude</option>
                </select>
                
                <select className="bg-vault-bg border border-vault-border rounded-md px-4 py-2 text-sm text-vault-textMain focus:outline-none focus:border-vault-primary w-40">
                  <option>All Status</option>
                  <option>Active</option>
                </select>

                {/* View Toggles (Visual only for now) */}
                <div className="flex bg-vault-bg border border-vault-border rounded-md p-1">
                  <button className="p-1.5 bg-vault-card rounded shadow-sm text-vault-textMain">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                  </button>
                  <button className="p-1.5 text-vault-textMuted hover:text-vault-textMain">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                  </button>
                </div>
              </div>

              {/* Row 2: Tag Pills */}
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                <span className="text-vault-textMuted text-sm flex items-center gap-1 shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                  Tags:
                </span>
                
                {allAvailableTags.map((tag, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3 py-1 rounded-md text-sm whitespace-nowrap transition-colors border ${
                      selectedTag === tag 
                        ? 'bg-vault-textMain text-black border-vault-textMain' // Active state
                        : 'bg-vault-bg text-vault-textMain border-vault-border hover:bg-vault-card' // Inactive state
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* The Grid */}
            {isLoading ? (
               <div className="text-vault-textMuted text-center mt-20">Loading...</div>
            ) : filteredPrompts.length === 0 ? (
               <div className="text-vault-textMuted text-center mt-20">No prompts found matching your filters.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPrompts.map((prompt) => (
                  <Link key={prompt._id} to={`/prompt/${prompt._id}`}>
                    <LibraryCard prompt={prompt} />
                  </Link>
                ))}
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
};

export default PromptLibrary;
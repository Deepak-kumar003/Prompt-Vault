import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SideBar from '../components/SideBar';
import Header from '../components/Header';

const Playground = () => {
  const { id } = useParams(); // Gets the prompt ID from the URL
  const [prompt, setPrompt] = useState(null);
  const [variables, setVariables] = useState({});
  const [compiledText, setCompiledText] = useState('');

  // 1. Fetch the single prompt when the page loads
  useEffect(() => {
    const fetchPrompt = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`http://localhost:5000/api/prompts/${id}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await response.json();
        if (response.ok) {
          setPrompt(data);
          extractVariables(data.content || data.description);
        }
      } catch (err) {
        console.error("Failed to fetch prompt");
      }
    };
    fetchPrompt();
  }, [id]);

  // 2. The Regex Engine: Finds all {{words}} and creates state for them
  const extractVariables = (text) => {
    if (!text) return;
    // Regex to find anything inside {{ }}
    const matches = [...text.matchAll(/\{\{([^}]+)\}\}/g)];
    const varNames = [...new Set(matches.map(m => m[1]))]; // Get unique names
    
    // Create an object to hold the values typed by the user
    const initialVars = {};
    varNames.forEach(v => initialVars[v] = '');
    setVariables(initialVars);
    updateCompiledText(text, initialVars);
  };

  // 3. Update the text live as the user types
  const handleVariableChange = (varName, value) => {
    const newVars = { ...variables, [varName]: value };
    setVariables(newVars);
    updateCompiledText(prompt.content || prompt.description, newVars);
  };

  // 4. Replaces {{variables}} with typed values
  const updateCompiledText = (text, currentVars) => {
    let result = text;
    Object.keys(currentVars).forEach(v => {
      const regex = new RegExp(`\\{\\{${v}\\}\\}`, 'g');
      // If they typed something, use it. Otherwise, keep the {{variable}} visible
      result = result.replace(regex, currentVars[v] || `{{${v}}}`);
    });
    setCompiledText(result);
  };

  if (!prompt) return <div className="p-10 text-white">Loading Playground...</div>;

  return (
    <div className="flex h-screen bg-vault-bg text-vault-textMain overflow-hidden">
      <SideBar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-5xl mx-auto">
            
            {/* TOP AREA: Header and Details */}
            <div className="mb-8">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <Link to="/" className="text-vault-textMuted hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                  </Link>
                  <h1 className="text-2xl font-bold flex items-center gap-2">
                    {prompt.title}
                    <span className="text-yellow-500 text-xl">★</span>
                  </h1>
                </div>
                <div className="flex gap-3">
                  <button className="px-4 py-2 border border-vault-border rounded-md hover:bg-vault-card transition-colors text-sm font-medium flex items-center gap-2">
                    Edit
                  </button>
                  <button 
                    onClick={() => navigator.clipboard.writeText(compiledText)}
                    className="px-4 py-2 bg-vault-primary hover:bg-vault-primaryHover text-black rounded-md transition-colors text-sm font-medium flex items-center gap-2"
                  >
                    Copy Final Prompt
                  </button>
                </div>
              </div>

              <p className="text-vault-textMuted mb-4">{prompt.description}</p>
              
              <div className="flex gap-2 items-center text-sm">
                {(prompt.tags || []).map((tag, i) => (
                  <span key={i} className="px-2 py-1 bg-vault-card border border-vault-border rounded-md text-vault-textMuted">{tag}</span>
                ))}
                <span className="text-vault-textMuted ml-4 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  {prompt.copyCount || 0} copies
                </span>
              </div>
            </div>

            {/* SPLIT SCREEN PLAYGROUND */}
            <div className="grid grid-cols-2 gap-6">
              
              {/* Left Side: Dynamic Inputs */}
              <div className="bg-vault-card border border-vault-border rounded-xl p-6">
                <h2 className="font-semibold mb-1">Variable Inputs</h2>
                <p className="text-sm text-vault-textMuted mb-6">Fill in values to compile your prompt</p>
                
                <div className="space-y-4">
                  {Object.keys(variables).length === 0 && (
                    <p className="text-sm text-vault-textMuted italic">No {"{{variables}}"} found in this prompt.</p>
                  )}
                  {Object.keys(variables).map((varName) => (
                    <div key={varName}>
                      <label className="block text-sm font-medium text-vault-primary mb-1">
                        {varName}
                      </label>
                      <input
                        type="text"
                        value={variables[varName]}
                        onChange={(e) => handleVariableChange(varName, e.target.value)}
                        className="w-full bg-vault-bg border border-vault-border rounded-md px-3 py-2 text-vault-textMain focus:outline-none focus:border-vault-primary transition-colors"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side: Live Compiled Output */}
              <div className="bg-vault-card border border-vault-border rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-semibold">Compiled Prompt</h2>
                  <button 
                    onClick={() => navigator.clipboard.writeText(compiledText)}
                    className="text-vault-primary text-sm font-medium flex items-center gap-1 border border-vault-primary/30 px-2 py-1 rounded hover:bg-vault-primary/10 transition-colors"
                  >
                    Copy
                  </button>
                </div>
                
                <div className="bg-vault-bg border border-vault-border rounded-lg p-4 min-h-[300px] whitespace-pre-wrap font-sans text-sm leading-relaxed">
                  {compiledText}
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Playground;
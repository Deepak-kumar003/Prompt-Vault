import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar';
import Header from '../components/Header';

const CreatePrompt = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [content, setContent] = useState('');
  const [detectedVars, setDetectedVars] = useState([]);
  const [error, setError] = useState('');
  const [variables, setVariables] = useState([]);
  const [compiledText, setCompiledText] = useState('content');
  const [Preview, setPreview] = useState(false);
  const [copied, setCopied] = useState(false);

  // 1. Detect variables when content changes
  useEffect(() => {
    const matches = [...content.matchAll(/\{\{([^}]+)\}\}/g)];
    const uniqueVars = [...new Set(matches.map(m => m[1]))];
    setDetectedVars(uniqueVars);

    // Keep old variable values if they exist, create new ones if they don't
    setVariables(prev => {
      const newVars = [ ...prev] ;
      // Remove variables that were deleted from the text
      Object.keys(newVars).forEach(k => {
        if (!uniqueVars.includes(k)) delete newVars[k];
      });
      // Add new variables as empty strings
      uniqueVars.forEach(k => {
        if (newVars[k] === undefined) newVars[k] = '';
      });
      return newVars;
    });
  }, [content]);

  // 2. Live compile the text whenever content OR variable inputs change
  useEffect(() => {
    let result = content;
    detectedVars.forEach(v => {
      const regex = new RegExp(`\\{\\{${v}\\}\\}`, 'g');
      // Replace with typed value, or keep the {{variable}} tag if empty
      result = result.replace(regex, variables[v] || `{{${v}}}`);
    });
    setCompiledText(result);
  }, [content, variables, detectedVars]);

  // 3. Handle user typing into the dynamic input boxes
  const handleVariableChange = (varName, value) => {
    setVariables(prev => ({ ...prev, [varName]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const tagsArray = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag);
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('https://prompt-vault-vxg1.onrender.com/api/prompts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, description, tags: tagsArray, promptTemplate:content, variables:detectedVars})
      });

      if (response.ok) {
        navigate('/');
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to create prompt');
      }
    } catch (err) {
      setError('Cannot connect to server');
    }
  };

  const handleCopy = async (e) => {
    e.preventDefault();
    try {
      navigate.clipboard.writeText(compiledText)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 2000);

      await fetch(`https://prompt-vault-vxg1.onrender.com/api/prompts/:id/copy`, {
        method: 'POST'
      })
    }
    catch (err) {

    }
  };

  return (
    <div className="flex h-screen bg-vault-bg text-vault-textMain overflow-hidden">
      <SideBar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">

            <div className="flex justify-between items-center mb-8">
              <div>
                {/* <h1 className="text-2xl font-bold">Create Prompt</h1> */}
                <p className="text-vault-textMuted text-sm">Design your parameterized prompt template</p>
              </div>
              <div className="flex gap-4">
                <button className="px-4 py-2 border border-vault-border rounded-md hover:bg-vault-card transition-colors flex items-center gap-2" onClick={() => setPreview(true)}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  Preview
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-vault-primary hover:bg-vault-primaryHover text-black font-semibold px-6 py-2 rounded-md transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
                  Save Prompt
                </button>
              </div>
            </div>

            {error && <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/50 rounded mb-6">{error}</div>}

            <div className="grid grid-cols-5 gap-8">

              {/* LEFT SIDE: Form Inputs (Takes up 3 columns) */}
              <div className="col-span-3 space-y-6">

                <div className="bg-vault-card border border-vault-border rounded-xl p-6 space-y-4">
                  <h2 className="font-semibold text-vault-primary flex items-center gap-2 mb-4">
                    <span className="text-lg">{'</>'}</span> Prompt Details
                  </h2>
                  <div>
                    <label className="block text-sm font-medium text-vault-textMuted mb-1">Title</label>
                    <input
                      type="text" required value={title} onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-vault-bg border border-vault-border rounded-md px-4 py-2 focus:outline-none focus:border-vault-primary transition-colors"
                      placeholder="e.g., Document Analyzer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-vault-textMuted mb-1">Description</label>
                    <textarea
                      rows="2" required value={description} onChange={(e) => setDescription(e.target.value)}
                      className="w-full bg-vault-bg border border-vault-border rounded-md px-4 py-2 focus:outline-none focus:border-vault-primary transition-colors resize-none"
                      placeholder="Briefly describe what this prompt does..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-vault-textMuted mb-1">Tags</label>
                    <input
                      type="text" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)}
                      className="w-full bg-vault-bg border border-vault-border rounded-md px-4 py-2 focus:outline-none focus:border-vault-primary transition-colors"
                      placeholder="Add a tag..."
                    />
                  </div>
                </div>

                <div className="bg-vault-card border border-vault-border rounded-xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold text-vault-primary flex items-center gap-2">
                      <span className="text-lg">✨</span> Prompt Template
                    </h2>
                    <span className="text-xs text-vault-textMuted">{detectedVars.length} variables detected</span>
                  </div>

                  <textarea
                    rows="12" required value={content} onChange={(e) => setContent(e.target.value)}
                    className="w-full bg-vault-bg border border-vault-border rounded-md px-4 py-3 focus:outline-none focus:border-vault-primary transition-colors font-mono text-sm leading-relaxed"
                    placeholder="Type your prompt here. Use {{variable_name}} syntax..."
                  ></textarea>
                </div>
              </div>

              {/* RIGHT SIDE: Dynamic Preview Engine (Takes up 2 columns) */}
              <div className="col-span-2 space-y-6">

                {/* 1. Dynamic Inputs List */}
                <div className="space-y-4">
                  {detectedVars.length === 0 ? (
                    <div className="bg-vault-card border border-vault-border rounded-xl p-6 text-center">
                      <p className="text-sm text-vault-textMuted">Type <span className="font-mono text-vault-primary">{"{{variable}}"}</span> in your template to generate inputs.</p>
                    </div>
                  ) : (
                    detectedVars.map((varName) => (
                      <div key={varName}>
                        <label className="block text-sm font-medium text-vault-primary mb-1">
                          {varName}
                        </label>
                        <input
                          type="text"
                          placeholder={`Enter ${varName}...`}
                          value={variables[varName] || ''}
                          onChange={(e) => handleVariableChange(varName, e.target.value)}
                          className="w-full bg-vault-bg border border-vault-border rounded-md px-3 py-2 text-vault-textMain focus:outline-none focus:border-vault-primary transition-colors"
                        />
                      </div>
                    ))
                  )}
                </div>

                {/* 2. Compiled Output Box */}
                {Preview === true && (
                  <div className="bg-vault-card border border-vault-border rounded-xl p-6 mt-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="font-semibold text-vault-textMain">Compiled Output</h2>
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
                    </div>

                    <div className="bg-vault-bg border border-vault-border rounded-lg p-4 min-h-50 whitespace-pre-wrap font-sans text-sm leading-relaxed text-vault-textMain">
                      {compiledText}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreatePrompt;
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#09090b] text-white selection:bg-[#00E5B5]/30 font-sans">
      
      {/* --- NAVBAR --- */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-6 h-6 bg-[#00E5B5] rounded flex items-center justify-center text-black">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
            </div>
            PromptVault
          </div>
          <a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">Features</a>
        </div>
        <Link to="/register" className="bg-[#00E5B5] hover:bg-[#00c49a] text-black text-sm font-medium px-5 py-2 rounded-md transition-all">
          Get Started →
        </Link>
      </nav>

      <main className="max-w-7xl mx-auto px-8 pt-24 pb-32 flex flex-col items-center text-center">
        {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-800 bg-gray-900/50 text-gray-300 text-xs font-medium mb-8">
          <span className="text-[#00E5B5]">⚡</span> PromptOps for modern AI teams
        </div> */}
        
        <h1 className="text-6xl md:text-7xl font-bold font-serif mb-6 leading-tight">
          The OS for your <br />
          <span className="text-[#00E5B5]">AI Prompts</span>
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          A centralized workspace for prompt engineering. Version control, parameterized templates, and developer-first integrations — all in one place.
        </p>
        
        <div className="flex gap-4">
          <Link to="/register" className="bg-[#00E5B5] hover:bg-[#00c49a] text-black font-medium px-6 py-3 rounded-md transition-all flex items-center gap-2">
            Start Building →
          </Link>
          <a href="#features" className="border border-gray-800 hover:bg-gray-900 text-white font-medium px-6 py-3 rounded-md transition-all">
            Explore Features
          </a>
        </div>
      </main>

      <section id="features" className="max-w-6xl mx-auto px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif font-bold mb-4">Everything you need for prompt engineering</h2>
          <p className="text-gray-400">Built for developers who demand precision, version control, and seamless integrations.</p>
        </div>

        <div className="bg-[#18181b] border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
          <div className="bg-[#09090b] border-b border-gray-800 px-4 py-3 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-xs text-gray-500 font-mono ml-4">prompt-editor.tsx</span>
          </div>
          
          <div className="grid grid-cols-2 divide-x divide-gray-800">
            <div className="p-8">
              <div className="text-xs text-gray-500 mb-6 tracking-wider">PROMPT EDITOR</div>
              <div className="font-mono text-sm leading-relaxed text-gray-300">
                <span className="text-gray-500">// Parameterized prompt template</span><br/><br/>
                Analyze the following <span className="text-[#00E5B5]">{"{{document}}"}</span> and provide<br/>
                a summary in a <span className="text-[#00E5B5]">{"{{tone}}"}</span> tone.<br/><br/>
                Focus on: <span className="text-[#00E5B5]">{"{{focus_areas}}"}</span>
              </div>
            </div>
            <div className="p-8 bg-[#09090b]/50">
              <div className="text-xs text-gray-500 mb-6 tracking-wider">LIVE PREVIEW</div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">document</label>
                  <div className="bg-[#18181b] border border-gray-800 rounded px-3 py-2 text-sm text-gray-300">Q4 Financial Report</div>
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">tone</label>
                  <div className="bg-[#18181b] border border-gray-800 rounded px-3 py-2 text-sm text-gray-300">professional</div>
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">focus_areas</label>
                  <div className="bg-[#18181b] border border-gray-800 rounded px-3 py-2 text-sm text-gray-300">revenue, growth metrics</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-8 py-20 border-t border-gray-900">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#09090b] border border-gray-800 rounded-xl p-8 hover:border-gray-700 transition-colors">
            <div className="w-10 h-10 bg-[#00E5B5]/10 text-[#00E5B5] rounded-lg flex items-center justify-center mb-6">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
            </div>
            <h3 className="text-lg font-bold mb-3">Parameterized Templates</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Define variables with {"{{syntax}}"} and generate dynamic inputs automatically.</p>
          </div>
          
          <div className="bg-[#09090b] border border-gray-800 rounded-xl p-8 hover:border-gray-700 transition-colors">
            <div className="w-10 h-10 bg-[#00E5B5]/10 text-[#00E5B5] rounded-lg flex items-center justify-center mb-6">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
            </div>
            <h3 className="text-lg font-bold mb-3">Version Control</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Track every change with full history, diffs, and one-click restore.</p>
          </div>

          <div className="bg-[#09090b] border border-gray-800 rounded-xl p-8 hover:border-gray-700 transition-colors">
            <div className="w-10 h-10 bg-[#00E5B5]/10 text-[#00E5B5] rounded-lg flex items-center justify-center mb-6">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            </div>
            <h3 className="text-lg font-bold mb-3">Instant Copy</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Compile and copy prompts with filled parameters in a single click.</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-900 bg-[#09090b]">
        <div className="max-w-4xl mx-auto px-8 py-24 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">Ready to organize your prompts?</h2>
          <p className="text-gray-400 mb-8">Join developers who are building better AI applications with PromptVault.</p>
          <Link to="/login" className="bg-[#00E5B5] hover:bg-[#00c49a] text-black font-medium px-8 py-3 rounded-md transition-all inline-flex items-center gap-2">
            Get Started Free →
          </Link>
        </div>
        <div className="border-t border-gray-900 py-6 px-8 flex justify-center items-center text-sm text-gray-600 max-w-7xl mx-auto">
          {/* <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-[#00E5B5] rounded flex items-center justify-center text-black">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
            </div>
            PromptVault
          </div> */}
          <p>Built By Deepak Kumar</p>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
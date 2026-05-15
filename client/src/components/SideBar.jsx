import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="w-64 h-full bg-vault-bg border-r border-vault-border flex flex-col">
      <div className="h-16 flex items-center px-4 border-b border-vault-border gap-3 shrink-0">
        <div className="w-8 h-8 bg-vault-primary rounded flex items-center justify-center text-black font-bold text-lg">
          ⌘
        </div>
        <span className="text-xl font-serif font-bold text-vault-textMain">PromptVault</span>
      </div>

      <div className="flex-1 flex flex-col p-4 overflow-y-auto">
        <div className="relative mb-6">
          {/*SVG magnifying glass icon from ai*/}
          <svg className="absolute left-3 top-2.5 h-4 w-4 text-vault-textMuted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full bg-vault-bg border border-vault-border text-vault-textMain text-sm rounded-md pl-9 pr-12 py-2 focus:outline-none focus:border-vault-primary transition-colors"
          />
          <div className="absolute right-2 top-2 flex items-center justify-center border border-vault-border rounded bg-vault-card px-1.5 py-0.5">
            <span className="text-[10px] text-vault-textMuted font-mono">Ctrl K</span>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
          <Link to="/" className="px-3 py-2 rounded-md bg-vault-card text-vault-primary font-medium transition-colors">
            Dashboard
          </Link>
          <Link to="/library" className="px-3 py-2 rounded-md text-vault-textMuted hover:bg-vault-card hover:text-vault-textMain font-medium transition-colors">
            Prompt Library
          </Link>
          <Link to="/create" className="px-3 py-2 rounded-md text-vault-textMuted hover:bg-vault-card hover:text-vault-textMain font-medium transition-colors">
            Create Prompt
          </Link>
          <Link to="/favorites" className="px-3 py-2 rounded-md text-vault-textMuted hover:bg-vault-card hover:text-vault-textMain font-medium transition-colors">
            Favorites
          </Link>
          <Link to="/settings" className="px-3 py-2 rounded-md text-vault-textMuted hover:bg-vault-card hover:text-vault-textMain font-medium transition-colors">
            Settings
          </Link>
        </nav>

      </div>

      <div className="p-4 border-t border-vault-border shrink-0">
        <div className="bg-vault-card border border-vault-border rounded-xl p-4">
          <h3 className="text-vault-textMain font-semibold text-sm mb-1">Pro Tip</h3>
          <p className="text-vault-textMuted text-xs leading-relaxed">
            Use <span className="font-mono text-vault-textMain">{"{{variable}}"}</span> syntax for parameterized prompts.
          </p>
        </div>
      </div>

    </div>
  );
};

export default SideBar;
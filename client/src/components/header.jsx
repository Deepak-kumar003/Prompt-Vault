import { Link, useNavigate, useLocation } from "react-router-dom";
const Header = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  let pageTitle = "Dashboard";
  if (location.pathname === '/library') pageTitle = "Prompt Library";
  if (location.pathname === '/create') pageTitle = "Create Prompt";
  if (location.pathname.startsWith('/prompt/')) pageTitle = "Playground";
  if (location.pathname === '/favorites') pageTitle = "Favorites";
  if (location.pathname === '/settings') pageTitle = "Settings";

  return (
    <header className="h-16 bg-vault-bg border-b border-vault-border flex items-center justify-between px-8 shrink-0">
      <h1 className="text-xl font-serif font-bold text-vault-textMain">
        {pageTitle}
      </h1>

      <div className="flex items-center gap-6">
        {/* <div className="relative w-64">
          <svg className="absolute left-3 top-2.5 h-4 w-4 text-vault-textMuted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search prompts..."
            className="w-full bg-vault-bg border border-vault-border text-vault-textMain text-sm rounded-md pl-9 pr-12 py-2 focus:outline-none focus:border-vault-primary transition-colors"
          />
          <div className="absolute right-2 top-2 flex items-center justify-center border border-vault-border rounded bg-vault-card px-1.5 py-0.5">
            <span className="text-[10px] text-vault-textMuted font-mono">Ctrl K</span>
          </div>
        </div> */}

        <Link
          to="/create"
          className="bg-vault-primary hover:bg-vault-primaryHover text-black font-semibold px-4 py-2 rounded-md transition-colors flex items-center gap-2 text-sm"
        >
          <span className="text-lg leading-none">+</span> New Prompt
        </Link>

        <button
          onClick={handleLogout}
          className="text-vault-textMuted hover:text-red-400 text-sm font-medium transition-colors"
        >
          Logout
        </button>

      </div>
    </header>
  );
};

export default Header;
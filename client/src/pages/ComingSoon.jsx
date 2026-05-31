import SideBar from '../components/SideBar';
import Header from '../components/Header';

const ComingSoon = ({ title }) => {
  return (
    <div className="flex h-screen bg-vault-bg text-vault-textMain overflow-hidden">
      <SideBar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-8 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-vault-card border border-vault-border rounded-xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-vault-textMuted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            </div>
            <h2 className="text-2xl font-bold text-vault-textMain">{title}</h2>
            <p className="text-vault-textMuted max-w-md mx-auto">
              working on this feature it will be available soon!
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ComingSoon;
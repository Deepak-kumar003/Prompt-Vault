import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Playground from './pages/Playground';
import CreatePrompt from './pages/CreatePrompt';
import PromptLibrary from './pages/PromptLibrary';
import ComingSoon from './pages/ComingSoon';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/prompt/:id" element={<Playground />} />
        <Route path="/create" element={<CreatePrompt />} />
        <Route path='/library' element={<PromptLibrary />} />
        <Route path="/settings" element={<ComingSoon title="Settings" />} />
        <Route path="/favorites" element={<ComingSoon title="Favorites" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
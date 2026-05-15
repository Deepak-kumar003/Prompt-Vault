import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Playground from './pages/Playground';
import CreatePrompt from './pages/CreatePrompt';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/prompt/:id" element={<Playground />} />
        <Route path="/create" element={<CreatePrompt />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
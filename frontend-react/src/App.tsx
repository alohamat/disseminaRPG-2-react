import { Route, Routes, Navigate } from 'react-router-dom'
import { Login } from './pages/LoginPage';
import { Player } from "./pages/PlayerPage"
import { Dados } from './pages/DadosPage';
import { LoginMaster } from './pages/LoginMestrePage';
import { Master } from './pages/MasterPage';
import { VotingPage } from './pages/VotingPage';


function App() {
  return (
    <Routes>
      <Route path='*' element={<Navigate to="/login" replace />}  />
      <Route path='/login' element={<Login /> }/>
      <Route path='/master/login' element={<LoginMaster />} />
      <Route path="/player/:id" element={<Player />} />
      <Route path='/master/:id' element={<Master />} />
      <Route path="/player/:id/dados" element={<Dados />} />
      <Route path='/master/:id/dados' element={<Dados />} />
      <Route path='/master/:id/criar-votacao' element={<VotingPage />} />
    </Routes>
  );
}

export default App;

import { Route, Routes, Navigate } from 'react-router-dom'
import { Login } from './pages/LoginPage';
import { Player } from "./pages/PlayerPage"
import { Dados } from './pages/DadosPage';
import { LoginMaster } from './pages/LoginMestrePage';
import { Master } from './pages/MasterPage';
import { VotingPage } from './pages/VotingPage';
import { VotacaoNormal } from './pages/CriarVotacao';
import { VotacaoComDados } from './pages/CriarVotacaoDados';
import { AcoesPage } from './pages/AcoesPage';
import AguardaVotacaoPage from './pages/AguardaVotacaoPage';
import { useEffect } from 'react';
import { api } from './services/ApiService';


function App() {
  useEffect(() => {
    const PING_INTERVAL = 5 * 60 * 1000; // 5 minutos
    const ping = async () => {
       try {
        const res = await api.get("ping")
        console.log("Ping enviado:", res.data);
      } catch (err) {
        console.error("Erro ao pingar o backend:", err);
      }
    };
    ping();

    const intervalId = setInterval(ping, PING_INTERVAL);

    return () => clearInterval(intervalId);
  }, [])

  return (
    <Routes>
      <Route path='*' element={<Navigate to="/login" replace />}  />
      <Route path='/login' element={<Login /> }/>
      <Route path='/master/login' element={<LoginMaster />} />
      <Route path="/player/:id" element={<Player />} />
      <Route path="/player/:id/dados" element={<Dados />} />
      <Route path='/player/:id/acoes' element={<AcoesPage />} />
      <Route path='/master/:id' element={<Master />} />
      <Route path='/master/:id/dados' element={<Dados />} />
      <Route path='/master/:id/criar-votacao' element={<VotingPage />} />
      <Route path='/master/:id/aguarda-votacao' element={<AguardaVotacaoPage />} />
      <Route path="/votacao-normal/:id" element={<VotacaoNormal />} />
      <Route path="/votacao-dados/:id" element={<VotacaoComDados />} />
    </Routes>
  );
}

export default App;

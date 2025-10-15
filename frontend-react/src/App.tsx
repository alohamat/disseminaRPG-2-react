import { Route, Routes } from 'react-router-dom'
import { Login } from './pages/LoginPage';
import { Player } from "./pages/PlayerPage"
import { Dados } from './pages/DadosPage';

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login /> }/>
      <Route path="/player/:id" element={<Player />} />
      <Route path="/player/:id/dados" element={<Dados />} />
    </Routes>
  );
}

export default App;

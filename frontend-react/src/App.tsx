import { Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login';
import Mestre from './pages/Mestre';
import MestreJogador from './pages/MestreJogador';
import MestreResetaDados from './pages/ResetaDados';
import ExibeRolagem from './pages/ExibeRolagem';
import Jogador from './pages/Jogador';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login /> }/>
      <Route path='/jogador/:jogador' element={<Jogador /> }/>
      <Route path='/mestre' element={<Mestre /> }/>
      <Route path='/mestre/:jogador' element={<MestreJogador /> }/>
      <Route path='/mestre/:jogador/resetaDados' element={ <MestreResetaDados /> } />
      <Route path='/mestre/:jogador/exibeRolagem' element={ <ExibeRolagem /> } />
    </Routes>
  );
}

export default App;

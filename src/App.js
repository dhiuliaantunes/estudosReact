import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Inicio from './components/pages/Inicio';

import Dates from './components/pages/dates/Dates';
import NovoDate from './components/pages/dates/NovoDate';
import Date from './components/pages/dates/Date';

import Filmes from './components/pages/filmes/Filmes';
import NovoFilme from './components/pages/filmes/NovoFilme'
import Filme from './components/pages/filmes/Filme';

import Receitas from './components/pages/receitas/Receitas';
import NovaReceita from './components/pages/receitas/NovaReceita';
import Receita from './components/pages/receitas/Receita'

import Lugares from './components/pages/lugares/Lugares';
import NovoLugar from './components/pages/lugares/NovoLugar';
import Lugar from './components/pages/lugares/Lugar';

import Jogos from './components/pages/jogos/Jogos';
import NovoJogo from './components/pages/jogos/NovoJogo';
import Jogo from './components/pages/jogos/Jogo';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Container from './components/layout/Container';

function App() {
  return (
    <Router>
      <Navbar />
      <Container customClass="min-height">
        <Routes>
            <Route exact path="/" element={<Inicio />} > </Route>

            <Route path="/lazer" element={<Dates />} > </Route>
            <Route path="/novaAtividade" element={<NovoDate />} > </Route>
            <Route path="/date/:id" element={<Date />} > </Route>

            <Route path="/filmes" element={<Filmes />} > </Route>
            <Route path="/novoFilme" element={<NovoFilme />} > </Route>
            <Route path="/filme/:id" element={<Filme />} > </Route>

            <Route path="/receitas" element={<Receitas />} > </Route>
            <Route path="/novaReceita" element={<NovaReceita />} > </Route>
            <Route path="/receita/:id" element={<Receita />} > </Route>

            <Route path="/lugares" element={<Lugares />} > </Route>
            <Route path="/novoLugar" element={<NovoLugar />} > </Route>
            <Route path="/lugar/:id" element={<Lugar />} > </Route>

            <Route path="/jogos" element={<Jogos />} > </Route>
            <Route path="/novoJogo" element={<NovoJogo />} > </Route>
            <Route path="/jogo/:id" element={<Jogo />} > </Route>
        </Routes>
      </Container>
      <Footer/>
    </Router>
  )
}

export default App
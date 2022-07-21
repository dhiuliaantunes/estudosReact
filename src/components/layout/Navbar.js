import { Link } from "react-router-dom";
import Container from "./Container";

import logo from '../../img/octopus.png'

import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul>
        <Container>
        <Link to = "/">
          <img src={logo} alt="Nosso site" className={styles.logo}/>
        </Link>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to = "/">Inicio</Link>
          </li>
          <li className={styles.item}>
            <Link to = "/lazer">Lazer</Link>
          </li>
          <li className={styles.item}>
            <Link to = "/filmes">Filmes e Séries</Link>
          </li>
          <li className={styles.item}>
            <Link to = "/receitas">Receitas</Link>
          </li>
          <li className={styles.item}>
            <Link to = "/lugares">Lugares a visitar</Link>
          </li>
          <li className={styles.item}>
            <Link to = "/jogos">Jogos</Link>
          </li>
        </ul>
        </Container>
      </ul>
    </nav>
  );
}

export default Navbar;

import styles from './Inicio.module.css'
import octopus from '../../img/octopus.png'

function Inicio(){
    return(
        <section className={styles.home_container}>
        <h1>
          Bem-vindo ao <span>nosso site ♡</span>
        </h1>
        <ul>
            <li> Gerando atividades aleatórias para fazermos juntos conforme o clima lá fora </li>
            <li> Listando coisas para assistirmos juntos ou avaliarmos </li>
            <li> Ideias de jantares, lanches, cafés da manhã... </li>
            <li> Lugares para visitarmos! </li>
        </ul>
        <img src={octopus} alt="Polvo" />
      </section>
    ) 
}

export default Inicio;
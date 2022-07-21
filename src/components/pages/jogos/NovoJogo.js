import { useNavigate } from 'react-router-dom'

import styles from '../../styles/Novo.module.css'
import JogoForm from '../../jogos/JogoForm'


function NovoJogo(){
    const navigate = new useNavigate()

    function createPost(jogo){
        fetch('http://localhost:5000/jogos', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            }, 
            body: JSON.stringify(jogo)
        }).then((resp => resp.json()))
        .then((data) => {
            navigate('/jogos', {state:{message: 'Jogo salvo com sucesso!'}})
        })
        .catch(err => console.log(err))
    }

    return (
        <div className={styles.novo_container}>
             <h1> Novo Jogo </h1>
             <p> Insira mais um jogo à lista </p>
             <JogoForm handleSubmit={createPost} btnText="Salvar"/>
        </div>
    )
}

export default NovoJogo
import { useNavigate } from 'react-router-dom'

import styles from '../../styles/Novo.module.css'
import ReceitaForm from '../../receitas/ReceitaForm'

function NovaReceita(){
    const navigate = new useNavigate()

    function createPost(receita){
        fetch('http://localhost:5000/receitas', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(receita)
        }).then((resp => resp.json()))
        .then((data) => {
            navigate('/receitas', {state:{message: 'Receita salva com sucesso!'}})
        })
        .catch(err => console.log(err))
    }

    return(
        <div className={styles.novo_container}>
             <h1> Nova Receita </h1>
             <p> Insira algo para cozinharmos :) </p>
             <ReceitaForm handleSubmit={createPost} btnText="Salvar"/>
        </div>
    )
}

export default NovaReceita
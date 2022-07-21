import { useNavigate } from 'react-router-dom'

import styles from '../../styles/Novo.module.css'
import FilmeForm from '../../filmes/FilmeForm'

function NovoFilme(){
    const navigate = new useNavigate()

    function createPost(filme){
        fetch('http://localhost:5000/filmes', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(filme)
        }).then((resp => resp.json()))
        .then((data) => {
            console.log(data)
            navigate('/filmes', {state:{message: 'Salvo com sucesso!'}})
        })
        .catch(err => console.log(err))
    }

    return(
        <div className={styles.novo_container}>
             <h1> Novo Filme/Série </h1>
             <p> Insira algo para assistir à lista </p>
             <FilmeForm handleSubmit={createPost} btnText="Salvar"/>
        </div>
    )
}

export default NovoFilme
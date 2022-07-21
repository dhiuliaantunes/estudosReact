import { useNavigate } from 'react-router-dom'

import styles from '../../styles/Novo.module.css'
import LugarForm from '../../lugares/LugarForm'

function NovoLugar(){
    const navigate = new useNavigate()

    function createPost(lugar){
        fetch('http://localhost:5000/lugares', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(lugar)
        }).then((resp => resp.json()))
        .then((data) => {
            console.log(data)
            navigate('/lugares', {state:{message: 'Lugar salvo com sucesso!'}})
        })
        .catch(err => console.log(err))
    }

    return(
        <div className={styles.novo_container}>
             <h1> Novo Lugar </h1>
             <p> Insira um novo lugar para visitarmos </p>
             <LugarForm handleSubmit={createPost} btnText="Salvar"/>
        </div>
    )
}

export default NovoLugar
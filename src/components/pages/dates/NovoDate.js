import { useNavigate } from 'react-router-dom'

import styles from '../../styles/Novo.module.css'
import DateForm from '../../dates/DateForm'


function NovoDate(){
    const navigate = new useNavigate()

    function createPost(date){
        fetch('http://localhost:5000/dates', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            }, 
            body: JSON.stringify(date)
        }).then((resp => resp.json()))
        .then((data) => {
            console.log(data)
            navigate('/lazer', {state:{message: 'Atividade salva com sucesso!'}})
        })
        .catch(err => console.log(err))
    }

    return (
        <div className={styles.novo_container}>
             <h1> Nova Atividade </h1>
             <p> Insira mais uma atividade à lista </p>
             <DateForm handleSubmit={createPost} btnText="Salvar"/>
        </div>
    )
}

export default NovoDate
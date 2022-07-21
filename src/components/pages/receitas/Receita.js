import {useParams} from 'react-router-dom'
import { useState, useEffect } from 'react' 

import Message from '../../layout/Message'
import Container from '../../layout/Container'
import ReceitaForm from '../../receitas/ReceitaForm'
import Loading from '../../layout/Loading'

import styles from '../../styles/Details.module.css'

function Receita(){
    const {id} = useParams() 
    const[receita, setReceita] = useState([])
    const[showReceitaForm, setShowReceitaForm] = useState(false)
    const[message, setMessage] = useState()
    const[type, setType] = useState()

    useEffect(() =>{
        setTimeout(() => {
            fetch(`http://localhost:5000/receitas/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(resp => resp.json())
            .then((data) => {
                setReceita(data)
            })
        }, 400)
    }, [id]) 
  
    function editPost(receita){
        fetch(`http://localhost:5000/receitas/${receita.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(receita),
        })
        .then(resp => resp.json())
        .then((data) => {
            setReceita(data)
            setShowReceitaForm(false)
            setMessage('Atualizado com sucesso!')
            setType('success')
        })
    }

    function toggleReceitaForm(){
        setShowReceitaForm(!showReceitaForm)
    }

    return(
        <>
        {receita.name? (
            <div className={styles.details}>
                <Container customClass="column">
                    {message && <Message type={type} msg={message}/>}
                    <div className={styles.details_container}>
                        <h1>Receitinhas</h1>
                        <button className={styles.btn} onClick={toggleReceitaForm}>
                            {!showReceitaForm ? 'Editar' : 'Fechar'}
                        </button>
                        {!showReceitaForm ? (
                            <div className={styles.info}>
                                <p>
                                    <span>Receita:</span> {receita.name}
                                </p>
                                <p>
                                    <span>Ingredientes:</span> {receita.ingredients}
                                </p>
                                <p>
                                    <span>Modo de preparo:</span> {receita.preparation}
                                </p>
                                <p>
                                    <span>Ideal para:</span> {receita.categories.name}
                                </p>
                            </div>
                        ) : (
                            <div className={styles.info}>
                                <ReceitaForm handleSubmit={editPost} btnText='Concluir' receitaInfo={receita}/> 
                                {console.log(receita)}
                            </div>
                        )}
                    </div>
                </Container>
            </div>
        ): (
        <Loading />
        )}
    </>
    )
}

export default Receita
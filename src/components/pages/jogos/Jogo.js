import styles from '../../styles/Details.module.css'
import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'

import Message from '../../layout/Message'
import Loading from '../../layout/Loading'
import Container from '../../layout/Container'
import JogoForm from '../../jogos/JogoForm' 

function Jogo(){
    const {id} = useParams() 
    const [jogo, setJogo] = useState([])
    const[showJogoForm, setShowJogoForm] = useState(false)
    const[message, setMessage] = useState()
    const[type, setType] = useState()

    useEffect(() =>{
        setTimeout(() => {
            fetch(`http://localhost:5000/jogos/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(resp => resp.json())
            .then((data) => {
                setJogo(data)
            })
        }, 400)
    }, [id])

    function editPost(jogo){
        fetch(`http://localhost:5000/jogos/${jogo.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jogo),
        })
        .then(resp => resp.json())
        .then((data) => {
            setJogo(data)
            setShowJogoForm(false)
            setMessage('Jogo atualizado com sucesso!')
            setType('success')
        })
    }

    function toggleJogoForm(){
        setShowJogoForm(!showJogoForm)
    }

    return(
    <>
        {jogo.name ? ( 
            <div className={styles.details}>
                <Container customClass="column">
                    {message && <Message type={type} msg={message}/>}
                    <div className={styles.details_container}>
                        <h1>Jogos:</h1>
                        <button className={styles.btn} onClick={toggleJogoForm}>
                            {!showJogoForm ? 'Editar' : 'Fechar'}
                        </button>
                        {!showJogoForm ? (
                            <div className={styles.info}>
                                <p>
                                    <span>Jogo:</span> {jogo.name}
                                </p>
                                <p>
                                    <span>Descrição:</span> {jogo.description}
                                </p>
                                <p>
                                    <span>Tipo: </span> {jogo.tipos.name}
                                </p>  
                            </div>
                        ) : (
                            <div className={styles.info}>
                                <JogoForm handleSubmit={editPost} btnText='Concluir' jogoInfo={jogo}/> 
                            </div>
                        )}
                    </div>
                </Container>
            </div>
        ): (
        <Loading />
        )}
    </>
)}

export default Jogo
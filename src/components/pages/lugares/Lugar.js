import styles from '../../styles/Details.module.css'
import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'

import Loading from '../../layout/Loading'
import Container from '../../layout/Container'
import LugarForm from '../../lugares/LugarForm'
import Message from '../../layout/Message'

function Lugar(){
    const {id} = useParams() 
    const[lugar, setLugar] = useState([])
    const[showLugarForm, setShowLugarForm] = useState(false)
    const[message, setMessage] = useState()
    const[type, setType] = useState()

    useEffect(() =>{
        setTimeout(() => {
            fetch(`http://localhost:5000/lugares/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(resp => resp.json())
            .then((data) => {
                setLugar(data)
            })
        }, 400)
    }, [id]) 

    function editPost(lugar){
        fetch(`http://localhost:5000/lugares/${lugar.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(lugar),
        })
        .then(resp => resp.json())
        .then((data) => {
            setLugar(data)
            setShowLugarForm(false)
            setMessage('Atualizado com sucesso!')
            setType('success')
        })
        
    }

    function toggleLugarForm(){
        setShowLugarForm(!showLugarForm)
    }

    return (
        <>
        {lugar.name? (
            <div className={styles.details}>
                <Container customClass="column">
                    {message && <Message type={type} msg={message}/>}
                    <div className={styles.details_container}>
                        <h1>Lugares</h1>
                        <button className={styles.btn} onClick={toggleLugarForm}>
                            {!showLugarForm ? 'Editar' : 'Fechar'}
                        </button>
                        {!showLugarForm ? (
                            <div className={styles.info}>
                                <p>
                                    <span>Lugar:</span> {lugar.name}
                                </p>
                                <p>
                                    <span>Descrição:</span> {lugar.description}
                                </p>
                                <p>
                                    <span>Localização:</span> {lugar.location}
                                </p>
                            </div>
                        ) : (
                            <div className={styles.info}>
                                <LugarForm handleSubmit={editPost} btnText='Concluir' lugarInfo={lugar}/> 
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

export default Lugar
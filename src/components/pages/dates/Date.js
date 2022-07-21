import styles from '../../styles/Details.module.css'
import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'

import Message from '../../layout/Message'
import Loading from '../../layout/Loading'
import Container from '../../layout/Container'
import DateForm from '../../dates/DateForm' 

function Date(){
    const {id} = useParams() 
    const [date, setDate] = useState([])
    const[showDateForm, setShowDateForm] = useState(false)
    const[message, setMessage] = useState()
    const[type, setType] = useState()

    useEffect(() =>{
        setTimeout(() => {
            fetch(`http://localhost:5000/dates/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(resp => resp.json())
            .then((data) => {
                setDate(data)
            })
        }, 400)
    }, [id])

    function editPost(date){
        fetch(`http://localhost:5000/dates/${date.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(date),
        })
        .then(resp => resp.json())
        .then((data) => {
            setDate(data)
            setShowDateForm(false)
            setMessage('Atividade atualizada com sucesso!')
            setType('success')
        })
    }

    function toggleDateForm(){
        setShowDateForm(!showDateForm)
    }

    return(
    <>
        {date.date ? ( 
            <div className={styles.details}>
                <Container customClass="column">
                    {message && <Message type={type} msg={message}/>}
                    <div className={styles.details_container}>
                        <h1>Atividade de Lazer:</h1>
                        <button className={styles.btn} onClick={toggleDateForm}>
                            {!showDateForm ? 'Editar' : 'Fechar'}
                        </button>
                        {!showDateForm ? (
                            <div className={styles.info}>
                                <p>
                                    <span>Atividade:</span> {date.date}
                                </p>
                                <p>
                                    <span>Clima:</span> {date.climas.name}
                                </p>  
                            </div>
                        ) : (
                            <div className={styles.info}>
                                <DateForm handleSubmit={editPost} btnText='Concluir' dateInfo={date}/> 
                                {console.log(date)}
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

export default Date
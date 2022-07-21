import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react' 

import LinkButton from '../../layout/LinkButton'
import Message from '../../layout/Message'
import Container from '../../layout/Container'
import DateCard from '../../dates/DateCard'
import Loading from '../../layout/Loading'

import styles from '../../styles/Pages.module.css'


function Dates(){
    const [dates, setDates] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const[dateMessage, setDateMessage] = useState('')

    const location = useLocation()
    let message = ''
    if(location.state){
        message = location.state.message
    }

    useEffect(() => {
        setTimeout(
            () => {
                fetch('http://localhost:5000/dates', {
                    method: 'GET',
                    headers: {
                      'Content-type': 'application/json',
                    },
                })
                .then((resp) => resp.json())
                .then((data) => {
                    console.log(data)
                    setDates(data)
                    setRemoveLoading(true)
                })
            }, 400)
    }, [])

    function removeDate(id){
        fetch(`http://localhost:5000/dates/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            },
        })
        .then(resp => resp.json())
        .then(data => {
            setDates(dates.filter((date) => date.id !== id ))
            setDateMessage('Atividade removida com sucesso!')
        })
        .catch(err => console.log(err))
    }

    return (
        <div className={styles.page_container}>
            <div className={styles.title_container}>
                <h1> Atividades de Lazer </h1> 
                <LinkButton to="/novaAtividade" text="Inserir nova atividade"/>        
            </div>
            {message && <Message type='success' msg={message}/>}
            {dateMessage && <Message type='success' msg={dateMessage}/>}
            <Container customClass="start">
                {dates.length > 0 && 
                    dates.map((date) => (
                    <DateCard 
                    id={date.id}
                    name={date.date} 
                    clima={date.climas.name}
                    key={date.id}
                    handleRemove={removeDate}
                    />))}
                {!removeLoading && <Loading />}
                {removeLoading && dates.length === 0 && (
                    <p>Não há atividades cadastradas </p>
                )}
            </Container>
        </div>  
    )
}

export default Dates;
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react' 

import LinkButton from '../../layout/LinkButton'
import Message from '../../layout/Message'
import Container from '../../layout/Container'
import LugarCard from '../../lugares/LugarCard'
import Loading from '../../layout/Loading'

import styles from '../../styles/Pages.module.css'

function Lugares(){
    const [lugares, setLugares] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const[lugarMessage, setLugarMessage] = useState('')

    const location = useLocation()
    let message = ''
    if(location.state){
        message = location.state.message
    } 

    useEffect(() => {
        setTimeout(
            () => {
                fetch('http://localhost:5000/lugares', {
                    method: 'GET',
                    headers: {
                      'Content-type': 'application/json',
                    },
                })
                .then((resp) => resp.json())
                .then((data) => {
                    console.log(data)
                    setLugares(data)
                    setRemoveLoading(true)
                })
            }, 400)
    }, [])

    function removeLugar(id){
        fetch(`http://localhost:5000/lugares/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            },
        })
        .then(resp => resp.json())
        .then(data => {
            setLugares(lugares.filter((lugar) => lugar.id !== id ))
            setLugarMessage('Lugar removido com sucesso!')
        })
        .catch(err => console.log(err))
    }

    return ( 
        <div className={styles.page_container}>
            <div className={styles.title_container}>
                <h1> Lugares </h1>
                <LinkButton to="/novoLugar" text="Inserir lugar"/> 
            </div>
            {message && <Message type='success' msg={message}/>}
            {lugarMessage && <Message type='success' msg={lugarMessage}/>}
            <Container customClass="start">
                {lugares.length > 0 && 
                        lugares.map((lugar) => (
                        <LugarCard 
                        id={lugar.id}
                        name={lugar.name}
                        description={lugar.description}
                        location={lugar.location}
                        key={lugar.id}
                        handleRemove={removeLugar}
                        />))}
                    {!removeLoading && <Loading />}
                    {removeLoading && lugares.length === 0 && (
                        <p>Não há lugares cadastrados </p>
                    )}
            </Container>
    </div>
    )
}

export default Lugares;
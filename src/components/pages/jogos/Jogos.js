import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react' 

import LinkButton from '../../layout/LinkButton'
import Message from '../../layout/Message'
import Container from '../../layout/Container'
import JogoCard from '../../jogos/JogoCard'
import Loading from '../../layout/Loading'

import styles from '../../styles/Pages.module.css'


function Jogos(){
    const [jogos, setJogos] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const[jogoMessage, setJogoMessage] = useState('')

    const location = useLocation()
    let message = ''
    if(location.state){
        message = location.state.message
    }

    useEffect(() => {
        setTimeout(
            () => {
                fetch('http://localhost:5000/jogos', {
                    method: 'GET',
                    headers: {
                      'Content-type': 'application/json',
                    },
                })
                .then((resp) => resp.json())
                .then((data) => {
                    setJogos(data)
                    setRemoveLoading(true)
                })
            }, 400)
    }, [])

    function removeJogo(id){
        fetch(`http://localhost:5000/jogos/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            },
        })
        .then(resp => resp.json())
        .then(data => {
            setJogos(jogos.filter((jogo) => jogo.id !== id ))
            setJogoMessage('Jogo removido com sucesso!')
        })
        .catch(err => console.log(err))
    }

    return (
        <div className={styles.page_container}>
            <div className={styles.title_container}>
                <h1> Jogos </h1> 
                <LinkButton to="/novoJogo" text="Inserir novo jogo"/>        
            </div>
            {message && <Message type='success' msg={message}/>}
            {jogoMessage && <Message type='success' msg={jogoMessage}/>}
            <Container customClass="start">
                {jogos.length > 0 && 
                    jogos.map((jogo) => (
                    <JogoCard 
                    id={jogo.id}
                    name={jogo.name} 
                    description={jogo.description}
                    tipo={jogo.tipos.name}
                    key={jogo.id}
                    handleRemove={removeJogo}
                    />))}
                {!removeLoading && <Loading />}
                {removeLoading && jogos.length === 0 && (
                    <p>Não há jogos cadastrados </p>
                )}
                {console.log(jogos)}
            </Container>
        </div>  
    )
}

export default Jogos;
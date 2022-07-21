import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react' 

import LinkButton from '../../layout/LinkButton'
import Message from '../../layout/Message'
import Container from '../../layout/Container'
import FilmeCard from '../../filmes/FilmeCard'
import Loading from '../../layout/Loading'

import styles from '../../styles/Pages.module.css'

function Filmes(){
    const [filmes, setFilmes] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const[filmeMessage, setFilmeMessage] = useState('')

    const location = useLocation()
    let message = ''
    if(location.state){
        message = location.state.message
    } 

    useEffect(() => {
        setTimeout(
            () => {
                fetch('http://localhost:5000/filmes', {
                    method: 'GET',
                    headers: {
                      'Content-type': 'application/json',
                    },
                })
                .then((resp) => resp.json())
                .then((data) => {
                    console.log(data)
                    setFilmes(data)
                    setRemoveLoading(true)
                })
            }, 400)
    }, [])

    function removeFilme(id){
        fetch(`http://localhost:5000/filmes/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            },
        })
        .then(resp => resp.json())
        .then(data => {
            setFilmes(filmes.filter((filme) => filme.id !== id ))
            setFilmeMessage('Removido(a) com sucesso!')
        })
        .catch(err => console.log(err))
    }

    return ( 
        <div className={styles.page_container}>
            <div className={styles.title_container}>
                <h1> Filmes e Séries </h1>
                <LinkButton to="/novoFilme" text="Inserir filme/série"/> 
            </div>
            {message && <Message type='success' msg={message}/>}
            {filmeMessage && <Message type='success' msg={filmeMessage}/>}
            <Container customClass="start">
                {filmes.length > 0 && 
                        filmes.map((filme) => (
                        <FilmeCard 
                        id={filme.id}
                        type={filme.type}
                        name={filme.name}
                        synopsis={filme.synopsis} 
                        key={filme.id}
                        handleRemove={removeFilme}
                        />))}
                    {!removeLoading && <Loading />}
                    {removeLoading && filmes.length === 0 && (
                        <p>Não há filmes ou séries cadastrados </p>
                    )}
            </Container>
    </div>
    )
}

export default Filmes;
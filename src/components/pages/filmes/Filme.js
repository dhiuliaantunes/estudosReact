import styles from '../../styles/Details.module.css'
import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'

import Loading from '../../layout/Loading'
import Container from '../../layout/Container'
import FilmeForm from '../../filmes/FilmeForm'
import Message from '../../layout/Message'

function Filme(){
    const {id} = useParams() 
    const[filme, setFilme] = useState([])
    const[showFilmeForm, setShowFilmeForm] = useState(false)
    const[message, setMessage] = useState()
    const[type, setType] = useState()

    useEffect(() =>{
        setTimeout(() => {
            fetch(`http://localhost:5000/filmes/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(resp => resp.json())
            .then((data) => {
                setFilme(data)
            })
        }, 400)
    }, [id]) 

    function editPost(filme){
        fetch(`http://localhost:5000/filmes/${filme.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(filme),
        })
        .then(resp => resp.json())
        .then((data) => {
            setFilme(data)
            setShowFilmeForm(false)
            setMessage('Atualizado com sucesso!')
            setType('success')
        })
        
    }

    function toggleFilmeForm(){
        setShowFilmeForm(!showFilmeForm)
    }

    return (
        <>
        {filme.name? (
            <div className={styles.details}>
                <Container customClass="column">
                    {message && <Message type={type} msg={message}/>}
                    <div className={styles.details_container}>
                        <h1>Filmes e Séries</h1>
                        <button className={styles.btn} onClick={toggleFilmeForm}>
                            {!showFilmeForm ? 'Editar' : 'Fechar'}
                        </button>
                        {!showFilmeForm ? (
                            <div className={styles.info}>
                                <p>
                                    <span>Filme/Série:</span> {filme.name}
                                </p>
                                <p>
                                    <span>Tipo:</span> {filme.type}
                                </p>
                                <p>
                                    <span>Sinopse:</span> {filme.synopsis}
                                </p>
                            </div>
                        ) : (
                            <div className={styles.info}>
                                <FilmeForm handleSubmit={editPost} btnText='Concluir' filmeInfo={filme}/> 
                                {console.log(filme)}
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

export default Filme
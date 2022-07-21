import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react' 

import LinkButton from '../../layout/LinkButton'
import Message from '../../layout/Message'
import Container from '../../layout/Container'
import ReceitaCard from '../../receitas/ReceitaCard'
import Loading from '../../layout/Loading'

import styles from '../../styles/Pages.module.css'

function Receitas(){
    const [receitas, setReceitas] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const[receitaMessage, setReceitaMessage] = useState('')

    const location = useLocation()
    let message = ''
    if(location.state){
        message = location.state.message
    } 

    useEffect(() => {
        setTimeout(
            () => {
                fetch('http://localhost:5000/receitas', {
                    method: 'GET',
                    headers: {
                      'Content-type': 'application/json',
                    },
                })
                .then((resp) => resp.json())
                .then((data) => {
                    console.log(data)
                    setReceitas(data)
                    setRemoveLoading(true)
                    console.log(data)
                })
            }, 400)
    }, [])

    function removeReceitas(id){
        fetch(`http://localhost:5000/receitas/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            },
        })
        .then(resp => resp.json())
        .then(data => {
            setReceitas(receitas.filter((receita) => receita.id !== id ))
            setReceitaMessage('Receita removida com sucesso!')
        })
        .catch(err => console.log(err))
    }

    return (
           <div className={styles.page_container}>
            <div className={styles.title_container}>
                <h1> Receitas </h1>
                <LinkButton to="/novaReceita" text="Inserir receita"/> 
            </div>
            {message && <Message type='success' msg={message}/>}
            {receitaMessage && <Message type='success' msg={receitaMessage}/>}
            <Container customClass="start">
                {receitas.length > 0 && 
                        receitas.map((receita) => (
                        <ReceitaCard 
                        id={receita.id}
                        name={receita.name}
                        //ingredients={receita.ingredients}
                        //preparation={receita.preparation}
                        category={receita.categories.name}
                        key={receita.id}
                        handleRemove={removeReceitas}
                        />))}
                    {!removeLoading && <Loading />}
                    {removeLoading && receitas.length === 0 && (
                        <p>Não há receitas cadastradas</p>
                    )}
            </Container>
    </div>
    )
}

export default Receitas;
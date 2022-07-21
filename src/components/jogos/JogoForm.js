import {useEffect, useState} from 'react'

import styles from '../styles/Form.module.css'
import Input from '../form/Input' 
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'

 
function JogoForm({handleSubmit, btnText, jogoInfo}){
    const[jogos, setJogos] = useState(jogoInfo || {})
    const[tipos, setTipos] = useState([])

    useEffect(() => { 
        fetch('http://localhost:5000/tipos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
        setTipos(data)
        console.log(data)
        })
    }, [])

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(jogos)
    }

    function handleChange(e){
        setJogos({...jogos, [e.target.name] : e.target.value})
    }

    function handleTipo(e){
        setJogos({...jogos, tipos: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
        }}) 
    }

    return(
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Jogo"
                name="name"
                placeholder="Insira o nome aqui :)"
                handleOnChange={handleChange}
                value={jogos.name}
             />
              <Input
                type="text"
                text="Descrição"
                name="description"
                placeholder="Descrição: "
                handleOnChange={handleChange}
                value={jogos.description}
             /> 
               <Select 
                name="tipos" 
                text="Selecione o tipo"
                options={tipos}
                handleOnChange={handleTipo}
                value={jogos.tipos ? jogos.tipos.id : ''}
              />
            <SubmitButton text={btnText} />   
        </form>
    )
}

export default JogoForm
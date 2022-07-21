import {useEffect, useState} from 'react'

import styles from '../styles/Form.module.css'
import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'


function ReceitaForm({handleSubmit, btnText, receitaInfo}){
    const[receitas, setReceitas] = useState(receitaInfo || {})
    const[categories, setCategories] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }) 
        .then((resp) => resp.json())
        .then((data) => {
        setCategories(data)
        })
    }, [])

const submit = (e) => {
    e.preventDefault()
    handleSubmit(receitas)
}

function handleChange(e){
    setReceitas({...receitas, [e.target.name] : e.target.value})
}

function handleCategories(e){
    setReceitas({...receitas, categories: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
    }}) 
}

    return(
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Nome"
                name="name"
                placeholder="Insira o nome aqui :)"
                handleOnChange={handleChange}
                value={receitas.name}
             />
              <Input
                type="text"
                text="Ingredientes:"
                name="ingredients"
                placeholder="Insira os ingredientes e quantidades"
                handleOnChange={handleChange}
                value={receitas.ingredients}
             />
              <Input
                type="text"
                text="Modo de preparo"
                name="preparation"
                placeholder="Descreva o modo de preparo aqui"
                handleOnChange={handleChange}
                value={receitas.preparation}
             /> 
              <Select 
                name="categories" 
                text="Selecione a categoria"
                options={categories}
                handleOnChange={handleCategories}
                value={receitas.categories ? receitas.categories.id : ''}
              />
            <SubmitButton text={btnText} />   
        </form>
    )
}

export default ReceitaForm
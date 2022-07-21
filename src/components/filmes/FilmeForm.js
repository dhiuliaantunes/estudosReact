import {useEffect, useState} from 'react'

import styles from '../styles/Form.module.css'
import Input from '../form/Input' 
import SubmitButton from '../form/SubmitButton'

 
function FilmeForm({handleSubmit, btnText, filmeInfo}){
    const[filmes, setFilmes] = useState(filmeInfo || {})


    const submit = (e) => {
        e.preventDefault()
        handleSubmit(filmes)
    }

    function handleChange(e){
        setFilmes({...filmes, [e.target.name] : e.target.value})
    }

    return(
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Filme/Série"
                name="name"
                placeholder="Insira o nome aqui :)"
                handleOnChange={handleChange}
                value={filmes.name}
             />
              <Input
                type="text"
                text="Tipo"
                name="type"
                placeholder="Filme/Série?"
                handleOnChange={handleChange}
                value={filmes.type}
             />
              <Input
                type="text"
                text="Sinopse"
                name="synopsis"
                placeholder="Sinopse..."
                handleOnChange={handleChange}
                value={filmes.synopsis}
             /> 
            <SubmitButton text={btnText} />   
        </form>
    )
}

export default FilmeForm
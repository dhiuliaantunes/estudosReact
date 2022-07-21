import {useEffect, useState} from 'react'

import styles from '../styles/Form.module.css'

import Input from '../form/Input' 
import SubmitButton from '../form/SubmitButton'

function LugarForm({handleSubmit, btnText, lugarInfo}){
    const[lugares, setLugares] = useState(lugarInfo || {})

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(lugares)
    }
    
    function handleChange(e){
        setLugares({...lugares, [e.target.name] : e.target.value})
    }

    return(
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Name"
                name="name"
                placeholder="Insira o nome aqui :)"
                handleOnChange={handleChange}
                value={lugares.name}
             />
              <Input
                type="text"
                text="Description"
                name="description"
                placeholder="Descrição:"
                handleOnChange={handleChange}
                value={lugares.description}
             />
              <Input
                type="text"
                text="Localização"
                name="location"
                placeholder="Localização..."
                handleOnChange={handleChange}
                value={lugares.location}
             /> 
            <SubmitButton text={btnText} />   
        </form>
    )
}

export default LugarForm
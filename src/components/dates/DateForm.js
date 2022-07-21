import {useEffect, useState} from 'react'

import styles from '../styles/Form.module.css'
import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
 

function DateForm({handleSubmit, btnText, dateInfo}){
    const[climas, setClimas] = useState([])
    const[dates, setDates] = useState(dateInfo || {}) 

    useEffect(() => {
        fetch('http://localhost:5000/climas', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
        setClimas(data)
        })
    }, [])

const submit = (e) => {
    e.preventDefault()
    handleSubmit(dates)
}

function handleChange(e){
    setDates({...dates, [e.target.name] : e.target.value})
}

function handleClima(e){
    setDates({...dates, climas: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
    }}) 
}

    return(
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Atividade"
                name="date"
                placeholder="Insira o nome da atividade :)"
                handleOnChange={handleChange}
                value={dates.date}
             />
             <Select 
                name="clima_id" 
                text="Selecione o clima"
                options={climas}
                handleOnChange={handleClima}
                value={dates.climas ? dates.climas.id : ''}
              />
              <SubmitButton text={btnText} />   
        </form>
    )
}

export default DateForm
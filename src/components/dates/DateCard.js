import styles from './DateCard.module.css'
import stylesCard from '../styles/Card.module.css'

import { Link } from 'react-router-dom'
import {BsPencil, BsFillTrashFill} from 'react-icons/bs'

function DateCard({id, name, clima, handleRemove}){

    const remove = (e) =>{
        e.preventDefault()
        handleRemove(id) 
    }
    return(
        <div className={stylesCard.card}>
            <h4>{name}</h4>
            <p className={styles.clima_text}>
                <span className = {`${styles[clima?.toLowerCase() || '']}`}> </span> {clima}
            </p>
            <div className={stylesCard.card_actions}>
                <Link to={`/date/${id}`}>
                    <BsPencil /> Editar
                </Link>
                <button onClick={remove}>
                    <BsFillTrashFill /> Remover
                </button>
            </div>
        </div>
    )
}

export default DateCard
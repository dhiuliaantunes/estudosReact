import styles from './JogoCard.module.css'
import stylesCard from '../styles/Card.module.css'

import { Link } from 'react-router-dom'
import {BsPencil, BsFillTrashFill} from 'react-icons/bs'

function JogoCard({id, name, description, tipo, handleRemove}){

    const remove = (e) =>{
        e.preventDefault()
        handleRemove(id)
    }

    return(
        <div className={stylesCard.card}>
            <h4>{name}</h4>
            <p className={styles.text}>
                <span></span> {description}
            </p>
            <p className={styles.jogo_text}>
                <span className = {`${styles[tipo?.toLowerCase() || '']}`}></span> {tipo}
            </p>
            <div className={stylesCard.card_actions}>
                <Link to={`/jogo/${id}`}>
                    <BsPencil /> Editar
                </Link>
                <button onClick={remove}>
                    <BsFillTrashFill /> Remover
                </button>
            </div>
        </div>
    )
}

export default JogoCard;
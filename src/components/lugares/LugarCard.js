import stylesCard from '../styles/Card.module.css'
import styles from './LugarCard.module.css'

import { Link } from 'react-router-dom'
import {BsPencil, BsFillTrashFill} from 'react-icons/bs'

function LugarCard({id, name, description, location, handleRemove}){

    const remove = (e) =>{
        e.preventDefault()
        handleRemove(id)
    }
    return( <div className={stylesCard.card}>
        <h4>{name}</h4>
        <p>
            <span>Lugar:</span> {name}
        </p>
        <p className={styles.text}>
            <span></span> {description}
        </p>
        <p className={styles.text}>
            <span></span> {location}
        </p>
        <div className={stylesCard.card_actions}>
            <Link to={`/lugar/${id}`}>
                <BsPencil /> Editar
            </Link>
            <button onClick={remove}>
                <BsFillTrashFill /> Remover
            </button>
        </div>
    </div>)
}

export default LugarCard

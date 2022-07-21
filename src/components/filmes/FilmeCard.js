import styles from './FilmeCard.module.css'
import stylesCard from '../styles/Card.module.css'

import { Link } from 'react-router-dom'
import {BsPencil, BsFillTrashFill} from 'react-icons/bs'

function FilmeCard({id, type, name, synopsis, handleRemove}){

    const remove = (e) =>{
        e.preventDefault()
        handleRemove(id)
    }

    return(
        <div className={stylesCard.card}>
            <h4>{name}</h4>
            <p>
                <span>Tipo:</span> {type}
            </p>
            <p className={styles.synopsis}>
                <span>Sinopse:</span> {synopsis}
            </p>
            <div className={stylesCard.card_actions}>
                <Link to={`/filme/${id}`}>
                    <BsPencil /> Editar
                </Link>
                <button onClick={remove}>
                    <BsFillTrashFill /> Remover
                </button>
            </div>
        </div>
    )
}

export default FilmeCard;
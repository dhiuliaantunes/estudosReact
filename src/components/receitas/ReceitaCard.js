import styles from './ReceitaCard.module.css'
import stylesCard from '../styles/Card.module.css'

import { Link } from 'react-router-dom'
import {BsPencil, BsFillTrashFill} from 'react-icons/bs'

function ReceitaCard({id, name, ingredients, preparation, category, handleRemove}){

    const remove = (e) =>{
        e.preventDefault()
        handleRemove(id)
    }

    return(
        <div className={stylesCard.card}>
            <h4>{name}</h4>
            <p>
                <span>Receita:</span> {name}
            </p>
            {/* <p className={styles.ingredients}>
                <span>Ingredientes:</span> {ingredients}
            </p>
            <p ClassName={styles.receita_text}>
                <span>Preparo:</span> {preparation}
            </p> */}
            <p className={styles.categoria_text}>
                <span> </span> {category} {}
            </p>
            <div className={stylesCard.card_actions}>
                <Link to={`/receita/${id}`}>
                    <BsPencil /> Detalhes
                </Link>
                <button onClick={remove}>
                    <BsFillTrashFill /> Remover
                </button>
            </div>
        </div>
    )
}

export default ReceitaCard;
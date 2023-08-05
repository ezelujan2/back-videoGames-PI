import { useEffect } from 'react';
import estilos from './Detail.module.css'
import { useParams } from "react-router-dom"
import { get_details } from '../../redux/actions/actions';
import { useDispatch, useSelector } from "react-redux";

export default function Detail() {
    const param = useParams()
    const id = param.id;
    const dispatch = useDispatch()
    
    useEffect(()=> {
        dispatch(get_details(id))
    }, [id])


    const currentGame = useSelector(state => state.details)
    console.log(currentGame)
    
    
 
    return (
        <div className={estilos.container}>
                <h3 className={estilos.titulo}>{currentGame.name}</h3>
                <h5>ID: {currentGame.id}</h5>
                <h5>PLATFORMS:</h5>
                <ul>
                    {currentGame.platforms?.map(plataformas => {
                        return (
                            <li>{plataformas.platform.name}</li>
                        )
                    })}
                </ul>
                <h5 dangerouslySetInnerHTML={{ __html: currentGame.description}}></h5>
                <h5>RELEASED : {currentGame.released}</h5>
                <h5>RATING: {currentGame.rating}</h5>
                <h5>GENRES: </h5>
                <ul>
                    {currentGame.genres?.map(generos=> {
                        return (
                            <li>{generos.name}</li>
                        )
                    })}
                </ul>
                <img src={currentGame.imagen} alt={currentGame.name}/>
        </div>
        
    )
}
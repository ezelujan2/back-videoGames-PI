import estilos from './Juegos.module.css'
import { Link } from "react-router-dom";
import imagenDe from './sinimagen.png'

export default function Juegos({name,genres,imagen,key,id}) {

    return (
        <div className={estilos.juegos} key={key} name={name}> 
            <h3><Link to={`/detail/${id}`}>{name}</Link></h3>
            <h4>{genres.length === 0 ? "Sin genero" : genres.map(genero => genero.name + ' ')}</h4>
            <img src={imagen ? imagen : imagenDe} alt={name}></img>
        </div>
        )
}

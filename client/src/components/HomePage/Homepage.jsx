import estilos from './Homepage.module.css'


export default function Homepage() {
    return (
        <>
            <div className={estilos.todo}> 
                <div className={estilos.juegos}> Juegos </div>
                <div className={estilos.filtrado}> 
                    <input className={estilos.input} placeholder='Ingresar busqueda'></input>
                    <p className={estilos.subtitulo}>Ordenar: </p> 
                    <button className={estilos.boton}> Ascendente </button>
                    <button className={estilos.boton}> Descendente </button>

                    <p className={estilos.subtitulo}>Filtrar: </p> 
                    <button className={estilos.boton}> Genero </button>
                    <button className={estilos.boton}> Origen </button>

                </div>
            </div>
        </>
    )
}
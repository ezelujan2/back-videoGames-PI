import estilos from './Form.module.css'
import { useState } from 'react'
import validate from './validation'
import { useNavigate } from 'react-router-dom'
import { post_game } from '../../redux/actions/actions'
import { useDispatch } from 'react-redux'


export default function Form(){
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const[game,setGame]= useState({
        name: '',
        imagen: '',
        description: '',
        platform: [],
        released: '',
        genres: [],
    })

    const todook = () => {
        if(game.name != '' && game.description != "" && game.released != "") return false;
        else return true
    }

    const[error,setError] = useState({
        name: '',
    })

    const[genero,setGenero] = useState("")
    const[platform,setPlatforms] = useState("")


    const handleChange = (event) => {
        setGame({...game, [event.target.name] : event.target.value});
        setError({...error, [event.target.name] : validate(event.target.name, event.target.value)})
    }

    const addGenre = (event) => {
        setGame({...game, genres: [...game.genres, genero]})
        setGenero("")
    }
    const addPlatform = (event) => {
        setGame({...game,platform: [...game.platform, {name: platform}]})
        setPlatforms("")
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(game)
        if(genero != "") addGenre()
        if(platform != "") addPlatform()
        dispatch(post_game(game))
        navigate('/home')

    }

    return (
        <div className={estilos.container}> 
            <form onSubmit={handleSubmit} className={estilos.formulario}>
                {/* <label htmlFor="Name">Name: </label> */}
                <input type="text" onChange={handleChange} value={game.name} name="name" placeholder='Name'/>
                {error.name ? <p>{error.name}</p> : ''}
                {/* <label htmlFor="imagen">Imagen: </label> */}
                <input type="text" onChange={handleChange} value={game.imagen} name="imagen" placeholder="Imagen URL"/>
                {/* <label htmlFor="description">Description: </label> */}
                <input type="textarea" onChange={handleChange} value={game.description} name="description" placeholder='Description' />
                {/* <label htmlFor="platform">Platform: </label> */}
                <div className={estilos.inputContainer}>
                <input className={estilos.inputConAdd} type="text" onChange={(e) => setPlatforms(e.target.value)} value={platform} name="platform" placeholder="Platform" />
                <button type="reset" onClick={addPlatform} className={estilos.add}>ADD</button>
                </div>
                {/* <label htmlFor="Genres">Genres: </label> */}
                <input type="date" onChange={handleChange} value={game.released} name='released' placeholder='Released' />

                <div className={estilos.inputContainer}> 
                <input className={estilos.inputConAdd} type="text" onChange={(e) => setGenero(e.target.value)} value={genero} name='genres' placeholder='Genres' />
                <button type="reset" className={estilos.add} onClick={addGenre}>ADD</button>
                </div> 
                <button disabled={error.name || todook()} type="submit">SUBMIT</button>
            </form>
        </div>
    )
}
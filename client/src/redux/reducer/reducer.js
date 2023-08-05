import { GET_CARDS, GET_BY_NAME, GET_DETAILS, SORT_GAMES, GET_GENRES, FILTER_BY_GENRE, FILTER_BY_ORIGIN, POST_GAME } from "../actions/types"


const initialState = {
    juegos: [],
    aux : [],
    byName : [],
    details: '',
    genres: [],
}

const reducer = (state=initialState, {type,payload}) => {
    switch(type){
        case GET_CARDS:
            return{...state, juegos:payload}
        case GET_BY_NAME:
            return{...state, byName:payload}
        case GET_DETAILS:
            return{...state, details:payload}
        case SORT_GAMES:
            let orderedlist = [...state.juegos]
            if(payload === 'A') {
                return {...state, juegos: orderedlist.sort((a, b) => a.name.localeCompare(b.name))}
            }
            else if(payload === 'D'){
                return {...state, juegos: orderedlist.sort((a, b) => b.name.localeCompare(a.name))}
            }
            else if(payload === 'RA')
                return {...state, juegos: orderedlist.sort((a,b) => b.rating - a.rating)}

            else if(payload === 'RD')
                return {...state, juegos: orderedlist.sort((a,b) => a.rating - b.rating)}

        case GET_GENRES:
            return{...state,genres:payload}
        
        case FILTER_BY_GENRE:
                if(payload === 'todos'){
                    if(state.aux.length === 0) return {...state}
                    else return{...state, juegos:state.aux}
                }
                else if(state.aux.length === 0){
                    let updated = []
                    state.juegos.map(juegos => {
                        if(juegos.hasOwnProperty('Genres')) updated.push({...juegos, genres: juegos.Genres})
                        else updated.push(juegos)
                    })
                    let filtered = updated.filter((game) => game.genres.map(genero => genero.name).includes(payload));
                    return { ...state, aux: updated, juegos: filtered}
                }
                else {
                    let filtered = state.aux.filter((game) => game.genres.map(genero => genero.name).includes(payload));
                    return{...state, juegos:filtered}
                }
        case FILTER_BY_ORIGIN:
            if(state.aux.length === 0) {
                let db = []
                let api = []
                state.juegos.map(juego => {
                    if(juego.hasOwnProperty('updatedAt')) db.push(juego);
                    else api.push(juego)
                })
                if(payload === 'DB') return{...state, aux: state.juegos, juegos: db}
                if(payload === 'API') return{...state, aux: state.juegos, juegos: api}
                if(payload === 'todos') return{...state}
            }
            else{
                let db = []
                let api = []
                state.aux.map(juego => {
                    if(juego.hasOwnProperty('updatedAt')) db.push(juego)
                    else api.push(juego)
                })
                if(payload === 'DB') return {...state, juegos: db}
                if(payload === 'API') return {...state, juegos: api}
                if(payload === 'todos') return {...state, juegos: state.aux}
            }
        
        case POST_GAME:
            if(state.aux.length === 0){
                return {...state, juegos: [...state.juegos, payload]}
            }
            else{
                return {...state, aux: [...state.aux, payload]}
            }
        default:
            return {...state}
    }
}

export default reducer
const {Videogame, Genre} = require('../db')
const {KEY} = process.env;
const axios = require('axios')


const getDetails = async (req,res) => {
    try {
        let description = null;
        if(req.params.game.includes("-") === true){
            description = await Videogame.findByPk(req.params.game, {include: Genre})
        }
        
        if(!description) {
            description = await axios(`https://api.rawg.io/api/games/${req.params.game}?key=${KEY}`)
            return res.json({
                id: description.data.id,
                description : description.data.description,
                genres:description.data.genres,
                name: description.data.name,
                imagen : description.data.background_image,
                platforms : description.data.platforms,
                released: description.data.released,
                rating: description.data.rating,
                 })
        }
        else return res.json({id: description.id,
            description : description.description,
            genres:description.Genres,
            name: description.name,
            imagen : description.background_image,
            platforms : description.platform,
            released: description.released,
            rating: description.rating,})

    } catch (error) {
        console.log(error.message)
        res.status(400).json({error:error.message})
    }
}

module.exports = getDetails
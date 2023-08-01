const {Videogame} = require('../DB_connection')
const {KEY} = process.env;
const axios = require('axios')

const getDetails = async (req,res) => {
    try {
        let description = await Videogame.findByPk(req.params.game)
        if(!description) {
            description = await  axios(`https://api.rawg.io/api/games/${req.params.game}?key=${KEY}`)
            return res.json({description : description.data.description, genres:description.data.genres})
        }
        else return res.json({description: description.description, genre: description.genre8})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports = getDetails
const {Genre} = require('../DB_connection')
const axios = require('axios')
const {KEY} = process.env

const getGenres = async (req,res) => {
    try {
        const genres = await Genre.findAll()
        if( genres.length === 0) {
            const {data} = await axios(`https://api.rawg.io/api/genres?key=${KEY}`)
            data.results.map(el => {
                genres.push({id:el.id, name:el.name})
            })
            await Genre.bulkCreate(genres)
        }
        return res.status(200).json(await Genre.findAll()) 
    } catch (error) {
        res.send(error.message)
    }
}


module.exports = getGenres

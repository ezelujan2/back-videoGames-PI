const {Videogame} = require('../DB_connection')
const {KEY} = process.env;
const axios = require('axios')
const getByName = require('../controllers/getByName')



const getvideogames = async (req,res) => {
    try {

        if(req.query.name) return getByName(req,res)
        // Al hacer el pedido de la api no incluye la descripcion
        let {data} = await axios(`https://api.rawg.io/api/games?key=${KEY}`)
        const base = await Videogame.findAll()

        let videoJuegos = []

        while(data.next && videoJuegos.length !== 100){
            videoJuegos = [...videoJuegos, ...data.results]
            data = await axios(data.next)
            data = data.data
        }

        if(base.length === 0) return res.json(videoJuegos)
        const allData = [...data.results, ...base]    
        return res.json(allData)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


module.exports = getvideogames;
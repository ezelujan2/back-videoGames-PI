const {Videogame, Genre} = require('../db')
const {KEY} = process.env;
const axios = require('axios')
const getByName = require('../controllers/getByName')



const getvideogames = async (req,res) => {
    try {
        if(req.query.name) return getByName(req,res)
        
        const base = await Videogame.findAll({
            include: Genre,
          });

        let {data} = await axios(`https://api.rawg.io/api/games?key=${KEY}`)

        let videoJuegos = []

        while(data.next && videoJuegos.length !== 100){
            videoJuegos = [...videoJuegos, ...data.results]
            data = await axios(data.next)
            data = data.data
        }

        if(base.length === 0) return res.json(videoJuegos)
        const allData = [...videoJuegos, ...base]
        return res.status(200).json(allData)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


module.exports = getvideogames;
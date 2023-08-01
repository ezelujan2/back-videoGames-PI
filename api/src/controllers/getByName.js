const {Videogame} = require('../DB_connection')
const {KEY} = process.env;
const axios = require('axios')

const getByName = async (req,res) => {
    try {
        const name = req.query.name
        let encontrados = 0;
        
        const videos = await Videogame.findAll({
            where: {
              name: {
                [Op.iLike]: `%${name}%`,
              },
            },
          });

        if(videos.length === 15) return res.json(videos)
        if(videos.length > 15) return res.json(videos.slice(0,15))
        encontrados = videos.length
        const apiVideos = await axios(`https://api.rawg.io/api/games?search=${name}&key=${KEY}`)
        if(apiVideos.data.length + encontrados <= 15){
            return res.json([...videos,...apiVideos.data]);
        }
        else if(apiVideos.data.length + encontrados === 0){
            throw new Error('No existe el video juego');
        }
        else{
            return res.json([...videos, ...apiVideos.data.slice(0,15-encontrados)])
        }

    } catch (error) {
        return res.status(400).json({error:error.message})
    }
}

module.exports = getByName
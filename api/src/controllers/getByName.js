const {Videogame, Op, Genre} = require('../db')
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
            include: Genre,
          });
        if(videos)
        {
        if(videos.length === 15) return res.json(videos)
        if(videos.length > 15) return res.json(videos.slice(0,15))
        }
        encontrados = videos.length
        
        const apiVideos = await axios(`https://api.rawg.io/api/games?search=${name}&key=${KEY}`)
        
    
        if(apiVideos.data.results.length + encontrados <= 15){
            return res.json([...videos,...apiVideos.data.results]);
        }
        else if(apiVideos.data.results.length + encontrados === 0){
            throw new Error('No existe el video juego');
        }
        else{
            
            return res.json([...videos, ...apiVideos.data.results.slice(0,15-encontrados)])
        }

    } catch (error) {
        console.log(error.message);
        return res.status(400).json({error:error.message})
    }
}

module.exports = getByName
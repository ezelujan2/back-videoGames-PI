const {Videogame,Genre} = require('../db')


const postVideoGame = async (req,res) => {
    try {
        const {name,description,platform,imagen,genres,released} = req.body
        console.log(platform)
        const [videogame, gameCreated] = await Videogame.findOrCreate({
            where: {
                name,
            },
            defaults : {
                name,
                description,
                platform,
                imagen,
                released,
            }
        })
    
        const [genero, genreCreated] = await Genre.findOrCreate({
            where: {
                name : genres
            },
            defaults: {
                name,
            }
        })
        await videogame.addGenre(genero)
        res.send('Creado con exito')
    } catch (error) {
        console.log(error.message)
        res.status(400).send(error.message)
    }
}

module.exports = postVideoGame
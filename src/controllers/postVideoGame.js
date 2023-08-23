const {Videogame,Genre} = require('../db')


const postVideoGame = async (req,res) => {
    try {
        const {name,description,platform,imagen,genres,released,rating} = req.body
        
        const [videogame, gameCreated] = await Videogame.findOrCreate({
            where: {
                name,
            },
            defaults : {
                name,
                description,
                platform,
                background_image: imagen,
                released,
                rating,
            }
        })
        genres.map(async genre => {
            const [genero, genreCreated] = await Genre.findOrCreate({
                where: {
                    name : genre
                },
                defaults: {
                    name: genre,
                }
            })
            await videogame.addGenre(genero)
        })
        
        
        res.send('Creado con exito')
    } catch (error) {
        console.log(error.message)
        res.status(400).send(error.message)
    }
}

module.exports = postVideoGame
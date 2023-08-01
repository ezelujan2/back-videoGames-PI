const {Videogame} = require('../DB_connection')


const postVideoGame = async (req,res) => {
    try {
        const {id,name,description,plataform,imagen,genre} = req.body
        const [videogame, gameCreated] = await Videogame.findOrCreate({
            where: {
                id,
            },
            defaults : {
                id,
                name,
                description,
                plataform,
                imagen,
            }
        })

        const [genero, genreCreated] = await Genre.findOrCreate({
            where: {
                name : genre
            },
            defaults: {
                name,
            }
        })

        await videogame.addGenre(genero);

        res.send('Creado con exito')
    } catch (error) {
        res.send('nose')
    }
}

module.exports = postVideoGame
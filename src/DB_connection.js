require('dotenv').config();
const { Sequelize , Op} = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/videogames`,
    {logging: false, native: false}
)

const videogames =  require('./models/Videogame');
videogames(sequelize)

const genre = require('./models/Genre');
genre(sequelize)

const {Videogame,Genre} = sequelize.models;


Videogame.belongsToMany(Genre, { through: 'VideoGenres' });
Genre.belongsToMany(Videogame, { through: 'VideoGenres' });

module.exports = {
    Videogame,
    Genre,
    conn: sequelize,
    Op,
}
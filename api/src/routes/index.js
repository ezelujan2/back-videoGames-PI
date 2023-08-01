const { Router } = require('express');
const axios = require('axios')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const getvideogames = require('../controllers/getvideogames')
const getDetails = require('../controllers/getDetail')
const postVideoGame = require('../controllers/postVideoGame')
const getGenres = require('../controllers/getGenres')



router.get('/videogames',getvideogames)
router.get('/videogames/:game',getDetails)
router.post('/videogames',postVideoGame)
router.get('/genres',getGenres)



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;

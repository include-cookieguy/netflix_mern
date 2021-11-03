const router = require('express').Router();
const auth = require('../middleware/auth');
const movieCtrl = require('../controllers/movieCtrl');

router.get('/movies', auth, movieCtrl.getAllMovie)

router.get('/movie/get/:id', auth, movieCtrl.getMovie);

router.get('/movie/random', auth, movieCtrl.getRandomMovie);

router.post('/movie', auth, movieCtrl.createMovie);

router.patch('/movie/update/:id', auth, movieCtrl.updateMovie);

router.delete('/movie/delete/:id', auth, movieCtrl.deleleMovie);

module.exports = router;

const router = require('express').Router();
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/userCtrl');

router.get('/user/get/:id', auth, userCtrl.getUser);

router.patch('/user/update/username', auth, userCtrl.updateUsername);

router.patch('/user/update/password', auth, userCtrl.updatePassword);

router.patch('/user/update/avatar', auth, userCtrl.updateAvatar);

router.get('/user/favlist', auth, userCtrl.getMovieFav);

router.post('/user/favlist/:id', auth, userCtrl.addMovieToFav);

router.delete('/user/favlist/:id', auth, userCtrl.removeMovieFromFav);

router.delete('/user/favlist', auth, userCtrl.removeAllMovieFromFav);

router.delete('/user/delete/:id', auth, userCtrl.deleteAccount);

module.exports = router;

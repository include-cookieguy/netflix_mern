const router = require('express').Router();
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/userCtrl');

router.get('/users', userCtrl.getAllUsers);

router.get('/user/get/:id', auth, userCtrl.getUser);

router.patch('/user/update/username', auth, userCtrl.updateUsername);

router.patch('/user/update/password', auth, userCtrl.updatePassword);

router.patch('/user/update/avatar', auth, userCtrl.updateAvatar);

router.put('/user/:id', userCtrl.updateUserById)

router.get('/user/favlist', auth, userCtrl.getMovieFav);

router.post('/newUser', userCtrl.newUser)

router.post('/user/favlist/:id', auth, userCtrl.addMovieToFav);

router.delete('/user/favlist/:id', auth, userCtrl.removeMovieFromFav);

router.delete('/user/favlist', auth, userCtrl.removeAllMovieFromFav);

router.delete('/user/delete/:id', userCtrl.deleteAccount);

module.exports = router;

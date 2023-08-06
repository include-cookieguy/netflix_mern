const router = require('express').Router();
const authCtrl = require('../controllers/authCtrl');

router.post('/register', authCtrl.register);

router.post('/registerEmail', authCtrl.registerEmail);

router.post('/login', authCtrl.login);

router.post('/logout', authCtrl.logout);

router.post('/request-accesstoken', authCtrl.generateAccessToken);

module.exports = router;

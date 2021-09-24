const router = require('express').Router();
const auth = require('../middleware/auth');
const listCtrl = require('../controllers/listCtrl');

router.get('/lists', auth, listCtrl.getList);

router.post('/lists', auth, listCtrl.createList);

router.patch('/lists/update/:id', auth, listCtrl.updateList);

router.delete('/lists/delete/:id', auth, listCtrl.deleteList);

module.exports = router;

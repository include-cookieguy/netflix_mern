const router = require("express").Router();
const auth = require("../middleware/auth");
const listCtrl = require("../controllers/listCtrl");

<<<<<<< HEAD
router.get("/lists", auth, listCtrl.getList);

router.post("/lists", auth, listCtrl.createList);
=======
router.get('/lists', listCtrl.getList);

router.post('/lists', listCtrl.createList);
>>>>>>> 7fdcb3216b4e44245497a86637281451a4ca1715

router.get("/lists/recommend/:id", listCtrl.getRecommendList);

router.patch("/lists/update/:id", auth, listCtrl.updateList);

router.delete("/lists/delete/:id", auth, listCtrl.deleteList);

module.exports = router;

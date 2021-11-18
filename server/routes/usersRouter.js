const router = require("express").Router();
const auth = require("../middleware/auth");
const userCtrl = require("../controllers/userCtrl");

router.get("/users", auth, userCtrl.getAllUsers);

router.get("/user/get/:id", auth, userCtrl.getUser);

router.patch("/user/update/username", auth, userCtrl.updateUsername);

router.patch("/user/update/password", auth, userCtrl.updatePassword);

router.patch("/user/update/avatar", auth, userCtrl.updateAvatar);

router.put("/user/:id", auth, userCtrl.updateUserById);

router.get("/user/favlist", auth, userCtrl.getMovieFav);

router.post("/newUser", auth, userCtrl.newUser);

router.post("/user/favlist/:id", auth, userCtrl.addMovieToFav);

router.delete("/user/favlist/:id", auth, userCtrl.removeMovieFromFav);

router.delete("/user/favlist", auth, userCtrl.removeAllMovieFromFav);

router.get("/user/again", auth, userCtrl.getPausedAtList);

router.post("/user/again", auth, userCtrl.createPausedAt);

router.patch("/user/again", auth, userCtrl.setPausedAt);

router.delete("/user/again/:id", auth, userCtrl.expirePausedAt);

router.delete("/user/delete/:id", auth, userCtrl.deleteAccount);

module.exports = router;

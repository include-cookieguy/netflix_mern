const router = require("express").Router();
const auth = require("../middleware/auth");
const movieCtrl = require("../controllers/movieCtrl");

router.get("/movies", movieCtrl.getAllMovie);

router.get("/movie/get/:id", movieCtrl.getMovie);

router.get("/movie/random", auth, movieCtrl.getRandomMovie);

router.post("/movie", auth, movieCtrl.createMovie);

<<<<<<< HEAD
router.get("/movie/search", auth, movieCtrl.searchMovie);

router.patch("/movie/update/:id", auth, movieCtrl.updateMovie);
=======
router.patch("/movie/update/:id", movieCtrl.updateMovie);
>>>>>>> 7fdcb3216b4e44245497a86637281451a4ca1715

router.delete("/movie/delete/:id", auth, movieCtrl.deleleMovie);

module.exports = router;

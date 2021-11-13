const router = require("express").Router();
const auth = require("../middleware/auth");
const movieCtrl = require("../controllers/movieCtrl");

router.get("/movies", movieCtrl.getAllMovie);

router.get("/movie/get/:id", movieCtrl.getMovie);

router.get("/movie/random", auth, movieCtrl.getRandomMovie);

router.post("/movie", auth, movieCtrl.createMovie);

router.patch("/movie/update/:id", movieCtrl.updateMovie);

router.delete("/movie/delete/:id", auth, movieCtrl.deleleMovie);

module.exports = router;

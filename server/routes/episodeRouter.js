const router = require("express").Router();
const auth = require("../middleware/auth");
const episodeCtrl = require("../controllers/episodeCtrl");

router.get("/episodes", auth, episodeCtrl.getAllEpisode);

router.get("/episode/get/:id", auth, episodeCtrl.getEpisode);

router.post("/episode", auth, episodeCtrl.createEpisode);

router.patch("/episode/update/:id", auth, episodeCtrl.updateEpisode);

router.delete("/episode/delete/:id", auth, episodeCtrl.deleteEpisode);

module.exports = router;

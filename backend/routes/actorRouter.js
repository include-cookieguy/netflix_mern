const { Router } = require('express')
const router = Router()

const actorCtrl = require('../controllers/actorCtrl')

router.get('/actors', actorCtrl.getAllActor)

router.get('/actor/:idActor', actorCtrl.getActorById)

router.put('/actor/:idActor', actorCtrl.updateActorById)

router.post('/actor', actorCtrl.createActor)

router.delete('/actor/:idActor', actorCtrl.deleteActorById)

module.exports = router

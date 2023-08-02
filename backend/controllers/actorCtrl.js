const Actor = require('../models/Actor')


const getAllActor = async (req, res) => {
  try {
    let actors = await Actor.find({})
    res.status(200).json(actors)
  } catch (err) {
    console.log('Get all actors error: ', err)
    res.status(400).json({ message: 'Get all Actors error' })
  }
}

const getActorById = async (req, res) => {
  let { idActor } = req.params
  try {
    let actor = await Actor.findById(idActor)
    res.status(200).json(actor)
  } catch (err) {
    console.log(`Get Actor Id = ${idActor} error !!`)
    res.status(400).json({ message: 'Get Actor error!' })
  }
}

const updateActorById = async (req, res) => {
  let { idActor } = req.params
  let { name, gender, description } = req.body
  try {
    let actor = await Actor.findById(idActor)
    if (name) actor.name = name
    if (gender) actor.gender = gender
    if (description) actor.description = description
    await actor.save()
    res.status(200).json({
      message: 'Update successfully',
      actor: actor
    })
  } catch (err) {
    console.log(`Get Actor Id = ${idActor} error: ${err}`)
    res.status(400).json({ message: 'Get Actor error!' })
  }
}

const createActor = async (req, res) => {
  let { name, gender, description } = req.body
  try {
    // let checkName = await Actor.findOne({name})
    // if (checkName) {
    //   return res.status(400).json({ message: 'Actor name exists!'})
    // }

    let actor = new Actor({ name, gender, description })
    await actor.save()
    res.status(200).json({
      message: 'Create actor successfully',
      actor
    })
  } catch(err) {
    console.log(`Create actor error: ${err}`)
    res.status(400).json({ message: 'Create actor error!!'})
  }
}

const deleteActorById = async (req, res) => {
  let { idActor } = req.params
  try {
    await Actor.findByIdAndDelete(idActor)
    res.status(200).json({ message: 'Delete successfully' })
  } catch(err) {
    console.log(`Delete actor Id = ${idActor} error: ${err}`)
    res.status(400).json({ message: 'Delete actor error !!' })
  }
}

module.exports = {
  getAllActor,
  getActorById,
  updateActorById,
  createActor,
  deleteActorById
}
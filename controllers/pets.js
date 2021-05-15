const Pet = require('../models/Pet')


// middle man between req and res

const getPets = (req,res) => {
    Pet.getPets()
    .then(pets => {
        res.status(200).json(pets); 
      }).catch(err => {
        res.status(500).send()
      })
}

const getPet = (req,res) => {
  const id = req.params.id
  Pet.getPet(id)
    .then(pet => {
        res.status(200).json(pet); 
      }).catch(err => {
        res.status(500).send()
      })
}

const createPet = (req, res) => {
  const {id, species, owner_id, age, name} = req.body
  Pet.createPet(id, species, owner_id, age, name)
    .then(pet => {
      res.status(201).json(pet)
    }).catch(err => {
      res.status(500).send()
    })
}

const deletePet = (req, res) => {
  Pet.deletePet(req.id)
    .then(() => {
      res.status(204).send()
    }).catch(err => {
      res.status(500).send()
    })
}

const updatePet = (req, res) => {
  //use regex to check the email is properly formatted
  //res with 400 if email is bad
  let newObj = Object.assign(req.person, req.body) 
  User.updatePet(req.id, newObj)
    .then(person => {
      res.status(200).json(person)
    }).catch(err => {
      res.status(500).send()
    })
}

module.exports = {
    getPets,
    getPet,
    createPet,
    deletePet,
    updatePet
}
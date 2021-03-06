const Pet = require('../models/Pet')


// middle man between req and res

const getPets = (req,res) => {
    Pet.getPets()
    .then(pets => {
        res.status(200).json(pets); 
      }).catch(err => {
        res.status(500).send(err)
      })
}

const getPet = (req,res) => {
  const id = req.params.id
  Pet.getPet(id)
    .then(pet => {
        res.status(200).json(pet); 
      }).catch(err => {
        res.status(500).send(err)
      })
}

const createPet = (req, res) => {
  const {species, owner_id, age, name} = req.body
  Pet.createPet(species, owner_id, age, name)
    .then(pet => {
      res.status(201).json(pet)
    }).catch(err => {
      res.status(500).send(err)
    })
}

const deletePet = (req, res) => {
  Pet.deletePet(req.params.id)
    .then(() => {
      res.status(204).send()
    }).catch(err => {
      res.status(500).send(err)
    })
}

const updatePet = (req, res) => {
  Pet.updatePet(req.params.id, req.body)
    .then(person => {
      res.status(200).json(person)
    }).catch(err => {
      res.status(500).send(err)
    })
}

const needPet = (req, res) => {
  Pet.needPet()
    .then(pet => {
      res.status(200).json(pet)
    }).catch(err => {
      res.status(500).send(err)
    })
}

const getByOwner = (req, res) => {
  let id = req.session.user?.id
  if(!id){
    return res.status(500).send([])
  }
  Pet.getUsersPets(id)
    .then(pet => {
      res.status(200).json(pet)
    }).catch(err => {
      res.status(500).send(err)
    })
}

const claimPet = (req,res) => {
  let petId = req.params.petId
  let userId = req.session.user?.id
  if(!userId){
    console.log('claimpet', 'invalid session')
    res.status(500).send({
      err: "Invalid Session"
    })
    return
  }
  Pet.claimPet(petId, userId)
  .then(pet => {
    console.log('claimpet', pet)
    res.status(200).json(pet)
  }).catch(err => {
    console.log('claimpet', err)
    res.status(500).send(err)
  })
}

module.exports = {
    getPets,
    getPet,
    createPet,
    deletePet,
    updatePet,
    needPet,
    getByOwner,
    claimPet
}
const User = require('../models/User')

// middle man between req and res

const getUsers = (req,res) => {
    User.getUsers()
    .then(users => {
        res.status(200).json(users); 
      }).catch(err => {
        res.status(500).send(err)
      })
}

const getUser = (req,res) => {
  const id = req.params.id
  User.getUser(id)
    .then(user => {
        res.status(200).json(user); 
      }).catch(err => {
        res.status(500).send(err)
      })
}

const  createUser =  (req, res) => {
  const {name, username, password} = req.body
  User.createUser(name, username, password)
    .then(user => {   
      res.status(201).json(user)
    }).catch(err => {
      res.status(500).send(err)
    })
}


const deleteUser = (req, res) => {
  User.deleteUser(req.params.id)
    .then(() => {
      res.status(204).send()
    }).catch(err => {
      res.status(500).send(err)
    })
}

const updateUser = (req, res) => {
  User.updateUser(req.params.id, req.body)
    .then(user => {
      res.status(200).json(user)
    }).catch(err => {
      res.status(500).send(err)
    })
}

const getUsersPets = (req, res) => {
  const id = req.params.id
  User.getUsersPets(id)
    .then(user => {
      res.status(200).json(user)
    }).catch(err => {
      res.status(500).send(err)
    })
}

const getByUsername = (req, res) => {
  const username = req.params.username
  User.getByUsername(username)
    .then(user => {
      res.status(200).json(user)
    }).catch(err => {
      res.status(500).send(err)
    })
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser,
    getUsersPets,
    getByUsername
}
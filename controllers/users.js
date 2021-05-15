const User = require('../models/User')

// middle man between req and res

const getUsers = (req,res) => {
    User.getUsers()
    .then(users => {
        res.status(200).json(users); 
      }).catch(err => {
        res.status(500).send()
      })
}

const getUser = (req,res) => {
  const id = req.params.id
  User.getUser(id)
    .then(user => {
        res.status(200).json(user); 
      }).catch(err => {
        res.status(500).send()
      })
}

const createUser = (req, res) => {
  const {id, name, username, password} = req.body
  User.createUser(id, name, username, password)
    .then(user => {
      res.status(201).json(user)
    }).catch(err => {
      res.status(500).send()
    })
}

const deleteUser = (req, res) => {
  User.deleteUser(req.id)
    .then(() => {
      res.status(204).send()
    }).catch(err => {
      res.status(500).send()
    })
}

const updateUser = (req, res) => {
  //use regex to check the email is properly formatted
  //res with 400 if email is bad
  let newObj = Object.assign(req.person, req.body) 
  User.updateUser(req.id, newObj)
    .then(person => {
      res.status(200).json(person)
    }).catch(err => {
      res.status(500).send()
    })
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
}
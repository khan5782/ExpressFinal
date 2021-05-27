const User = require('../models/User')
const bcrypt = require('bcrypt')

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
  console.log('getUser', id, req.session.user?.id)
  if(id != req.session.user?.id){
    return res.status(500).send({})
  }
  User.getUser(id)
    .then(user => {
      console.log('getUser', user)
        res.status(200).json({
          id: user.id,
          name: user.name,
          username: user.username
        }); 
      }).catch(err => {
        console.log( 'getUser', err)
        res.status(500).send(err)
      })
}

const  createUser =  (req, res) => {
  console.log(req.body)
  const {name, username, password} = req.body
  // encryption
  bcrypt.hash(password, 10, (err, hash) => {
    User.createUser(name, username, hash)
    .then(user => {   
      req.session.user = user
      res.status(201).json(user)
    }).catch(err => {
      console.log(err)
      res.status(500).send(err)
    })
  })
}


const deleteUser = (req, res) => {
  let id = req.params.id;
  console.log('deletuser', id , req.session.user?.id)
  if(id != req.session.user?.id){
    return res.status(500).send({
      err: "Invalid Session"
    })
  }
  User.deleteUser(id)
    .then(() => {
      console.log('deleteuser','hey')
      res.status(204).send({
        err: false
      })
    }).catch(err => {
      console.log('deleteuser', err)
      res.status(500).send(err)
    })
}

const updateUser = (req, res) => {
  let id = req.params.id;
  console.log('updateuser',id, req.session.user?.id)
  if(id != req.session.user?.id){
    return res.status(500).send({
      err: "Invalid Session"
    })
  }
  let user = {
    name: req.body.name,
    username: req.body.username,
    password: req.body.password
  } 
  
  if(!user.password){
    console.log('updateuser', 'missinggpass')
    return res.status(500).send({
      err: "Missing Password"
    })
  }
  bcrypt.hash(user.password, 10, (err, hash) => {
    user.password =  hash
    User.updateUser(id, user)
      .then(user => {
        console.log('updateuser', user)
        res.status(200).json(user)
      }).catch(err => {
        console.log('updateuser', err)
        res.status(500).send(err)
      })
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

const login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.login(username, password)
    .then(user => {      
      if(user){
          // password passed in comapred to the password in data base
          bcrypt.compare(password, user.password)
          .then((result) => {

              if(result){ 
                req.session.user = user
                res.status(200).json({
                  id: user.id,
                  name: user.name,
                  username: user.username
                })
              } else {
                res.status(500).send('Invalid Password')
              }
          })
      }
      
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
    getByUsername,
    login
}
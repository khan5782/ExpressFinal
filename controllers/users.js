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
  if(req.session.user){
    res.status(200).json({
      // all props in req session in user and not include pass
      ...req.session.user, 
      password: null
    })
  } else {
    res.status(500).send({
      err: 'User Is not logged In'
    })
  }
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
  let id = req.session.user?.id;
  console.log('deletuser', id)
  if(!id){
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
  let id = req.session.user?.id;
  console.log('updateuser',id)
  if(!id){
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

 const logOut = (req, res) => {
  req.session.user = null
  res.sendStatus(200)
 }

module.exports = {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser,
    getByUsername,
    login,
    logOut
}
const express = require('express')
const session = require('express-session')
const userController = require('./controllers/users')
const petController = require('./controllers/pets')
const app = express()
const port = 4000

app.use(express.urlencoded({ extended: true })); // allows form request
app.use(express.json()); // allows json request

// create a varaible on incoming req
app.use(session({
    // encrypts storage using this password
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    name: 'petssite'
}))

app.get('/', async (req, res) => {
    res.status(200)
    res.send('EXPRESS!')    
})

app.get('/pets/owned', petController.getByOwner)
app.get('/pets/needadoption', petController.needPet)

app.get('/users', userController.getUsers)
app.get('/pets', petController.getPets)
app.get('/user', userController.getUser)
app.get('/pets/:id', petController.getPet)

app.post('/users', userController.createUser)
app.post('/pets', petController.createPet)
app.post('/users/login', userController.login)
app.get('/users/logout', userController.logOut)

app.delete('/users', userController.deleteUser)
app.delete('/pets/:id', petController.deletePet)

app.put('/users', userController.updateUser)
app.put('/pets/:id', petController.updatePet)
app.put('/pets/claim/:petId', petController.claimPet)

app.listen(port, () => console.log(`Listening on http://localhost:${port}`))
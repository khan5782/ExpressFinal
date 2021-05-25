const express = require('express')
const userController = require('./controllers/users')
const petController = require('./controllers/pets')
const app = express()
const port = 4000

app.use(express.urlencoded({ extended: true })); // allows form request
app.use(express.json()); // allows json request

app.get('/', async (req, res) => {
    res.status(200)
    res.send('EXPRESS!')    
})

app.get('/users/getByUsername/:username', userController.getByUsername)
app.get('/pets/owned/:id', petController.getByOwner)
app.get('/pets/needadoption', petController.needPet)

app.get('/users', userController.getUsers)
app.get('/pets', petController.getPets)
app.get('/users/:id', userController.getUser)
app.get('/pets/:id', petController.getPet)

app.post('/users', userController.createUser)
app.post('/pets', petController.createPet)

app.delete('/users/:id', userController.deleteUser)
app.delete('/pets/:id', petController.deletePet)

app.put('/users/:id', userController.updateUser)
app.put('/pets/:id', petController.updatePet)

app.listen(port, () => console.log(`Listening on http://localhost:${port}`))
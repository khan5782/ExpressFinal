const express = require('express')
const db = require('./db/db')
const userController = require('./controllers/users')
const petController = require('./controllers/pets')
const app = express()
const port = 3000


app.use(express.urlencoded({ extended: true })); // allows form request
app.use(express.json()); // allows json request

app.get('/', async (req, res) => {
    res.status(200)
    res.send('EXPRESS!')    
})


app.get('/users', userController.getUsers)
app.get('/pets', petController.getPets)
app.get('/users/:id', userController.getUser)
app.get('/pets/:id', petController.getPet)
app.post('/users', userController.createUser)
app.post('/pets', petController.createPet)
app.delete('/users/:id', userController.deleteUser)
app.delete('/pets/:id', petController.deletePet)
app.patch('/users/:id', userController.updateUser)
app.patch('/pets/:id', petController.updatePet)


// app.get('/users/:id', async (req,res) => {
//     let results = await db.query('SELECT * FROM users WHERE id=$1', [req.params.id])
//     res.status(200)
//     res.json(results.rows[0])

// })

// app.get('/pets/:id', async (req,res) => {
//     let results = await db.query('SELECT * FROM pets WHERE id=$1', [req.params.id])
//     res.status(200)
//     res.json(results.rows[0])
// })

// app.post('/users', async (req,res) => {
//     let results = await db.query("INSERT INTO users (id, name, username, password) VALUES ($1, $2, $3, $4) RETURNING id, name, username, password ", [req.body.id, req.body.name, req.body.username, req.body.password])
//     res.status(200)
//     res.json(results.rows[0])
// })

// app.post('/pets', async (req,res) => {
//     let results = await db.query("INSERT INTO pets (id, species, owner_id, age, name) VALUES ($1, $2, $3, $4, $5) RETURNING id, species, owner_id, age, name", [req.body.id, req.body.species, req.body.owner_id, req.body.age, req.body.name])
//     res.status(200)
//     res.json(results.rows[0])
// })

// app.delete('/users/:id', async (req,res) => {
//     let results = await db.query("DELETE FROM users WHERE id=$1", [req.params.id])
//     res.status(200)
//     res.json({id:req.params.id})
// })

// app.delete('/pets/:id', async (req,res) => {
//     let results = await db.query("DELETE FROM pets WHERE id=$1", [req.params.id])
//     res.status(200)
//     res.json({id:req.params.id})
// })

app.listen(port, () => console.log(`Listening on http://localhost:${port}`))
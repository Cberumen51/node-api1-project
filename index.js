const express = require("express")
const db = require("./database.js")

const server = express()
server.use(express.json())

server.get("/", (req, res) => {
    res.json({ message: "Welcome to the Server!"})
})

server.post("/api/users", (req,res) => {
    if (!req.body.name, !req.body.bio) {
        return res.status(400).json({
            message: "Please provide name and bio for the user",
        })
    }
    const newUser = db.createUser({
        name: req.body.name,
        bio: req.body.bio,
    })
    if (newUser) {
    res.status(201).json(newUser)
    } else {
        res.status(500).json({
            message: "There was an error while saving the user to the database"
        })
    }
})

server.get("/api/users", (req, res) => {
    const users = db.getUsers()
    if (user){
    res.json(users)
    } else {
        res.status(500).json({
            message: "The users information could not be retrieved."
        })
    }
})

server.get("/api/users/:id", (req, res) => {
    const userId = req.params.id
    const user = db.getUserById(userId)
    if (user) {
        res.json(user)
    } else {
        res.status(404).json({
            message: "The user with the specified ID does not exist.",
        })
    }
})

server.delete("/api/users/:id", (req,res) => {
    const user = db.getUserById(req.params.id)
    if (user) {
        db.deleteUser(user.id)
        res.status(204).end()
    } else {
        res.status(500).json({
            message: "The user could not be removed",
        })
    }
})

server.put("/api/users/:id", (req,res) => {
    const user = db.getUserById(req.params.id)
    if (user) {
        const updatedUser = db.updateUser(user.id, {
            name: req.body.name || user.name,
        })
        res.json(updatedUser)
    } else {
        res.status(500).json({
            message: "The user information could not be modified."
        })
    }
})

server.listen(2415, () => {
    console.log('server started at port 2415')
})
const { router } = require("express")
const express = require("express")
const router = express.router

router.get("/", (req, res) => {
    res.send("User list")
})

router.get("/new", (req, res) => {
    res.send("User new form")
})

router.post("/", (req, res) => {
    res.send("Create user")
})

router.get("/donantesid", (req, res) =>{
    console.log(req.users)
    res.send("Get user with id ${req.params.donantesid}")
}).put((req, res) =>{
    res.send("Update user with id  ${req.params.donantesid}")
}).delete((req, res) =>{
    res.send("Delete user with id  ${req.params.donantesid}")
})

const users = [{name: "Facu"}, {name: "brasla"}]
router.param("donantesid", (req, res, next, id) => {
    req.users = users[id]
    next()
})

module.exports = router
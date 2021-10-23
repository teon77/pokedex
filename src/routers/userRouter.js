const router = require("./pokemonRouter")
const fsp = require('fs/promises');
const path = require('path');
const { response } = require("express");


router.post('/info', async function (request, response) {
    username = response.username; 
    response.json({'username':username})
})

router.post('/signin', async function (request, response) {
    username = response.username; 
    await fsp.mkdir(path.resolve(`users/${username}`))
    response.send(`Welcome ${username} You are in!`)
})



module.exports = router;

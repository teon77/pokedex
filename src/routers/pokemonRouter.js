const express = require('express');
const router = express.Router();
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();
const pokemonData = require('../pokemon-data');
const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');


const getDataFromPokedex = async (idOrName)=>{
    try{
        apiData= await P.getPokemonByName(`${idOrName}`)
        pokemonData.name = apiData.name;
        pokemonData.height = apiData.height, 
        pokemonData.weight = apiData.weight,
        pokemonData.front_pic = apiData.sprites.front_default,
        pokemonData.back_pic = apiData.sprites.back_default,
        pokemonData.types = apiData.types.map((type)=>type.type.name)
        pokemonData.abilities = apiData.abilities.map((ability)=>ability.ability.name)
        return;
    }catch(error){
        throw error;
    }
}


router.get('/', async function (request, response, next) {
    try {
        const pokemonsArray = [];
        const files = await fsp.readdir(path.resolve(`users/${username}`));  
        for(let file of files){
            const fileData = await fsp.readFile(path.resolve(`users/${username}/${file}`));
            pokemonsArray.push(JSON.parse(fileData.toString()).pokemon);
        }
        res.json(pokemonsArray);
        } catch(error) {
            next(error);
        }  
})

router.get('/query', async function (request, response) {
    const name = request.query.name;
    await getDataFromPokedex(name)
    response.json(pokemonData);
})


router.get('/get/:id', async function (request, response) {
    const { id } = request.params;
    await getDataFromPokedex(id)
    response.json(pokemonData);
})

router.put('/catch/:id',function (request, response) {
    const username = response.username;
    const { id } = request.params;
    const pokemonObj = request.body
    const check = fs.existsSync(path.resolve(`users/${username}/${id}.json`));
    if(check){
        throw { status: 403, text: "You have Already caught this pokemon"}
    }else{
        fs.writeFile(path.resolve(`users/${username}/${id}.json`), JSON.stringify(pokemonObj),
             (err,data)=> {(err)? console.log(err) : console.log(data)});
        response.send(`${pokemonObj.pokemon.name} pokemon been caught`);
    }
})

router.delete('/release/:id',function (request, response) {
    const username = response.username;
    const { id } = request.params;
    const check = fs.existsSync(path.resolve(`users/${username}/${id}.json`));
    if(check){
        fs.unlink(path.resolve(`users/${username}/${id}.json`),
             (err) => {(err)? console.log(err) : console.log('path/file.txt was deleted')});
        response.send(`pokemon been deleted`);
    }else{
        throw { status: 403, text: "Oops, You dont have this pokemon"};
    }
})

module.exports = router;
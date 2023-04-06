//DEPENDENCIES
const express = require("express")

//CONFIGURATION
const app = express();
const pokemon = require('./models/pokemon.json')


//ROUTES
app.get("/" , (req , res) => {
    res.send("Welcome 99 Pokemon")
})
app.get("/:verb/:adjective/:noun" , (req, res) => {
    const {verb, adjective, noun } = req.params;
    res.send(`Congratulations on starting a new project called ${verb}-${adjective}-${noun}!`)
});


//99 Bugs
app.get("/bugs" , (req, res) => {
    const link = `<a href="/bugs/101">pull one down, patch it around</a>`
    res.send(`<h1>99 little bugs in the code</h1> ${link}`)
})

app.get("/bugs/:numberOfBugs" , (req, res) => {
    const {numberOfBugs} = req.params;
    if (numberOfBugs < 200) {
    res.send(`<h1>${numberOfBugs} little bugs in the code</h1><a href="/bugs/${(Number(numberOfBugs) + 2)}">Pull one down, patch it around</a>`)

    }else {
        res.send(`<a href="/bugs">Too many bugs!! Start over!</a>`)
    }
   
})

app.get("/pokemon" , (req, res) => {
    res.send(pokemon)
})



app.get("/pokemon/search" , (req , res) => {
    
    const { name } = req.query;
    formattedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    const foundPokemon = pokemon.find(poke => poke.name === formattedName)
    
    if (foundPokemon) {
        res.send([foundPokemon])
    } else {
        res.send([])
    }
})

app.get("/pokemon/:index" , (req , res) => {
    const { index } = req.params;
    if (pokemon[index]) {
        res.send(pokemon[index]);
    }else {
        res.send(`Sorry, no pokemon found at ${index}`)
    }
})



//EXPORT
module.exports = app;
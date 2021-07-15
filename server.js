/*
mkdir, cd into the dir
touch server.js .env .gitignore
mkdir views models
touch views/index.ejs views/show.ejs 
npm init -y
npm i express dotenv ejs method-override
npm install -D nodemon
code .
in .gitignore .env and node_modules/ 
in .env PORT=3000
in server.js set up file, in package.json, edit "start": "nodemon server.js"
*/

require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const methodOverride = require("method-override");
const Pokemon = require("./models/pokemon");

app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public'));
app.use(methodOverride("_method"));

// Index route
app.get("/pokemon", (req, res) => {
  res.render("index.ejs", {data : Pokemon});
  });

// New route => to form
app.get("/pokemon/new", (req, res) => {
    res.render("new.ejs");
  });

// Post => create a new pokemon
app.post("/pokemon", (req, res) => {
    const newPokemon = {name:"",img:"",type:[], misc : { abilities : { normal : [], hidden : []}}}
    req.body.type = req.body.type.split(',');
    req.body.norm_abilities = req.body.norm_abilities.split(',');
    req.body.hidden_abilities = req.body.hidden_abilities.split(',');
    newPokemon.name = req.body.name;
    newPokemon.img = req.body.img;
    newPokemon.type = [...req.body.type];
    newPokemon.misc.abilities.normal = [...req.body.norm_abilities];
    newPokemon.misc.abilities.hidden = [...req.body.hidden_abilities];
    Pokemon.push(newPokemon);
    res.redirect("/pokemon");
  });
  
//Show route
app.get("/pokemon/:id", (req, res) => {
    const pos = req.params.id;
    res.render("show.ejs", { data : Pokemon[pos], pos : pos });
  });

// Update 
app.put('/pokemon/:id', (req, res) => {
    const {id}  = req.params; // another to pluck params 
    req.body.type = req.body.type.split(',');
    req.body.norm_abilities = req.body.norm_abilities.split(',');
    req.body.hidden_abilities = req.body.hidden_abilities.split(',');
    Pokemon[id].name = req.body.name;
    Pokemon[id].img = req.body.img;
    Pokemon[id].type = req.body.type ;
    Pokemon[id].misc.abilities.normal = [...req.body.norm_abilities] ;
    Pokemon[id].misc.abilities.hidden = [...req.body.hidden_abilities] ;
    res.redirect("/pokemon");
   });

// *show edit form route => show edit form
app.get('/pokemon/:id/edit', (req, res) => {
    const pos = req.params.id;
    const pokemon = Pokemon[pos];
    res.render("edit.ejs", { data : pokemon, pos: pos });
   });


// *delete route => delete 1 pokemon
app.delete('/pokemon/:id', (req, res) => {
    Pokemon.splice(req.params.id, 1); //remove the item from the array
    res.redirect('/pokemon');  //redirect back to index route
   });
  

app.listen(PORT, () => {
    console.log("Pokedex Up and Running on port: ", PORT);
  });
  
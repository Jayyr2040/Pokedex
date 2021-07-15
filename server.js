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
  //   res.send("Pokdex route working!");
  res.render("index.ejs", {data : Pokemon});
  });

// New route => to form
app.get("/pokemon/new", (req, res) => {
    res.render("new.ejs");
  });

// Post => create a new fruit
app.post("/pokemon", (req, res) => {
    req.body.type = req.body.type.split(',');
    console.log(req.body);
    Pokemon.push(req.body);
    res.redirect("/pokemon");
  });
  
//Show route
app.get("/pokemon/:id", (req, res) => {
    const pos = req.params.id;
    res.render("show.ejs", { data : Pokemon[pos] });
  });

app.listen(PORT, () => {
    console.log("Pokedex Up and Running on port: ", PORT);
  });
  
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
const pokedex = require("./models/pokemon");

app.use(express.urlencoded({ extended: false })); 
app.use(express.static('public'));
app.use(methodOverride("_method"));


app.get("/pokemon", (req, res) => {
    res.send("Pokdex route working!");
  });

  
app.listen(PORT, () => {
    console.log("Pokedex Up and Running on port: ", PORT);
  });
  
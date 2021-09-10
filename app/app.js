const express = require('express');
const bodyParser = require('body-parser');
const db = require('../db');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, function() {
    console.log(`Listen http:/localhost:3000`);
});

const PlayerController = require('../player/PlayerController');
app.use('/players', PlayerController);

const GameController = require('../game/GameController');
app.use('/players', GameController);

module.exports = app;



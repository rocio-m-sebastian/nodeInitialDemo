const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const Game = require('../models/Game');
const Player = require('../models/Player');

router.get('/games', function (req, res) {
    Game.find({}, function (err, games) {
        if (err) return res.status(500).send("There was a problem finding the players.");
        res.status(200).send(games);
    });
});

router.post('/:id/games', (req, res) => {
        Game.create({
            dice1 : req.body.dice1,
            dice2 : req.body.dice2,
            score: req.body.dice1 + req.body.dice2,
            player: req.params.id
        }, 
        async function (err, game) {
            await game.save();
            const userById = await Player.findById(req.params.id);
            userById.games.push(game);
            userById.save();
            // añadir success_rate al player
            const winnedGames = await Game.find(
                {
                    score: 7,
                    player: req.params.id
                }
            ).count();
            const totalGames = await Game.find().count();
            const success_rate = winnedGames / totalGames * 100; 

            await Player.findByIdAndUpdate(req.params.id, { 
                success: success_rate
            });
            // añadir success_rate al player
            res.send(userById);
            // res.status(200).send(game);
        });

});

router.delete('/:id/games', function (req, res) {
    Player.findByIdAndUpdate(req.params.id, {
        games: []
    }, async function (err, player) {
        await Game.deleteMany({ player: req.params.id });
        if (err) return res.status(500).send("There was a problem deleting the player's games.");
        res.status(200).send("Player "+ player.name +" games has been deleted.");
    });
});


module.exports = router;
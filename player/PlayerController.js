const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const Player = require('../models/Player');
const Game = require('../models/Game');

router.post('/', function (req, res) {
    Player.create({
            name : req.body.name,
            password : req.body.password
        }, 
        function (err, player) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(player);
        });
});

router.get('/', function (req, res) {
    Player.find({}, function (err, players) {
        if (err) return res.status(500).send("There was a problem finding the players.");
        res.status(200).send(players);
    });
});

router.get('/:id', function (req, res) {
    Player.findById(req.params.id, function (err, player) {
        if (err) return res.status(500).send("There was a problem finding the player.");
        if (!player) return res.status(404).send("No player found.");
        res.status(200).send(player);
    });
});

router.delete('/:id', function (req, res) {
    Player.findByIdAndRemove(req.params.id, function (err, player) {
        if (err) return res.status(500).send("There was a problem deleting the player.");
        res.status(200).send("Player "+ player.name +" was deleted.");
    });
});

router.put('/:id', function (req, res) {
    Player.findByIdAndUpdate(req.params.id, { 
            name: req.body.name
        }, {new: true}, function (err, player) {
        if (err) return res.status(500).send("There was a problem updating the player.");
        res.status(200).send(player);
    });
});

router.get('/:id/games', function (req, res) {
    Player.findById(req.params.id, function (err, player) {
        if (err) return res.status(500).send("There was a problem finding the player games.");
        if (!player) return res.status(404).send("No player found.");
        res.status(200).send(player.games);
    });
});

router.get('/ranking/all', function (req, res) {
    Player.aggregate([{$group: { "_id":"_id", avg: { $avg: "$success" } }}], function (err, avg) {
        if (err) return res.status(500).send("There was a problem finding the players.");
        res.status(200).send(avg[0]);
    });
});

router.get('/ranking/looser', function (req, res) {
    Player.aggregate(   
    [
        { $sort: { success: 1 } },
        { $limit: 1 }
    ], function (err, players) {
        if (err) return res.status(500).send("There was a problem finding the looser.");
        res.status(200).send(players);
    });
});

router.get('/ranking/winner', function (req, res) {
    Player.aggregate(   
    [
        { $sort: { success: -1 } },
        { $limit: 1 }   
    ], function (err, players) {
        if (err) return res.status(500).send("There was a problem finding the winner.");
        res.status(200).send(players);
    });
});

module.exports = router;
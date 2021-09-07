const router = require('express').Router();

const { Player, Game, Sequelize } = require('../../db.js');

router.get('/', async (req, res) => {
    const players = await Player.findAll({
        attributes: ['id', 'name', 'success_rate']
    });
    res.json(players);
});

router.post('/', async function(req, res) {
    const player = await Player.create({ 
        name: req.body.name, 
        password: req.body.password
    });

    res.json(player);
});

router.get('/:playerId', async (req, res) => {
    const player = await Player.findOne({
        where: { id: req.params.playerId }
    });
    res.json(player);
});

router.put('/:playerId', async (req, res) => {
    await Player.update(
        { 
            name: req.body.name
        }, 
        {
            where: { id: req.params.playerId 
        }
    });
    res.json({ success: 'se ha modificado' });
});

router.get('/:playerId/games', async function(req, res) {
    const playerGames = await Game.findAll({
        where: { playerId: req.params.playerId }
    });
    
    res.send(playerGames);
});

router.post('/:playerId/games', async function(req, res) {
    const playerGame = await Game.create({ 
        dice1: req.body.dice1, 
        dice2: req.body.dice2, 
        score: req.body.dice1 + req.body.dice2, 
        playerId: req.params.playerId 
    });
    // añadir success_rate al player
    const games = await Game.findAndCountAll({
        where: { playerId: req.params.playerId }
    });
    const winnedGames = await Game.findAndCountAll({
        where: { 
            playerId: req.params.playerId,
            score: 7
        }
    });
    const success_rate = winnedGames.count / games.count * 100;

    await Player.update({success_rate: success_rate}, {
        where: { id: req.params.playerId }
    });
    // añadir success_rate al player

    res.json(playerGame);
});

router.delete('/:playerId/games', async (req, res) => {
    await Game.destroy({
        where: { playerId: req.params.playerId }
    });
    res.json({ success: 'se ha borrado' });
});

router.get('/ranking/all', async (req, res) => {
    const avg = await Player.findAll({
        attributes: [
            [Sequelize.fn('AVG', Sequelize.col('success_rate')), 'total']
        ]
    });
    res.json(avg);
});

router.get('/ranking/loser', async (req, res) => {
    const player = await Player.findOne({
        order: [
            ['success_rate', 'ASC']
        ]
    });
    res.json(player);
});

router.get('/ranking/winner', async (req, res) => {
    const player = await Player.findOne({
        order: [
            ['success_rate', 'DESC']
        ]
    });
    res.json(player);
});

module.exports = router;

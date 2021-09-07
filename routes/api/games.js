const router = require('express').Router();

const { Game } = require('../../db.js');

router.get('/', async (req, res) => {
    const games = await Game.findAll();
    res.json(games);
});

router.post('/', async (req, res) => {
    const game = await Game.create(req.body);
    res.json(game);
});

router.put('/:gameId', async (req, res) => {
    await Game.update(req.body, {
        where: { id: req.params.gameId }
    });
    res.json({ success: 'se ha modificado' });
});

router.delete('/:gameId', async (req, res) => {
    await Game.destroy({
        where: { id: req.params.gameId }
    });
    res.json({ success: 'se ha borrado' });
});

module.exports = router;
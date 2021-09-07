const router = require('express').Router();

const gamesRoutes = require('./api/games.js');
const playersRoutes = require('./api/players.js');

router.use('/games', gamesRoutes);
router.use('/players', playersRoutes);

module.exports = router;
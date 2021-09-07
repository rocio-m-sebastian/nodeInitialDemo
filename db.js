const Sequelize = require('sequelize');

const gameModel = require('./models/game');
const playerModel = require('./models/player');

const sequelize = new Sequelize('juegodados', 'root', 'itacademy,2005', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

const Game = gameModel(sequelize, Sequelize);
const Player = playerModel(sequelize, Sequelize);

Game.belongsTo(Player);

(async () => {
    sequelize.sync({ force: false })
        .then(() => {
            console.log('tablas sincronizadas');
        });
    await Player.create({
        name: 'Julia',
        password: '123556789101112',
        success_rate: 100
    });
    await Player.create({
        name: 'Cleo',
        password: '309e89',
        success_rate: 0
    });
    await Game.create({
        dice1: 1,
        dice2: 3,
        score: 4,
        playerId: 2
    });
    await Game.create({
        dice1: 4,
        dice2: 3,
        score: 7,
        playerId: 1
    });
})();

module.exports = {
    Game,
    Player,
    Sequelize
}


module.exports = (sequelize, type) => {

    return sequelize.define('game', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        dice1: type.INTEGER,
        dice2: type.INTEGER,
        score: type.INTEGER
    })
}
module.exports = (sequelize, type) => {
    return sequelize.define('player', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: type.STRING,
            defaultValue: 'Anónimo',
            unique: true
        },
        password: type.STRING(150),
        success_rate: {
            type: type.INTEGER,
            defaultValue: 0,
            allowNull: false
        }
    });
}
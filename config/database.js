const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('skillHub_difficulty', 'skillHub_difficulty', '8a11618a53d22819efcd993fed4a6e5cfab4489e', {
    host: '5xe.h.filess.io',
    dialect: 'mysql',
    dialectModule: require('mysql2'),
    port: 3307,
});

async function connect() {
    try {
        await sequelize.authenticate();
        console.log('Connected to the database!');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = {
    connect,
    sequelize,
};

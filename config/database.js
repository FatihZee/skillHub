const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('skillhub', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    dialectModule: require('mysql2'),
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

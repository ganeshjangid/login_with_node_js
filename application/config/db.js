const Sequelize = require('sequelize');

const sequelize = new Sequelize('login_with_nodejs', 'application', 's@myD#@mnl@sy', {
    host: '172.29.67.213',
    dialect: 'mysql',
     pool: {
         max: 5,
         min: 0,
         acquire: 30000,
         idle: 10000
     }
});
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
});

module.exports = sequelize;

const Sequelize  = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Address = require('../models/Address');
const Tech = require('../models/Tech');
const Grids = require('../models/Grids');
const ManagerValues = require('../models/ManagerValues');
const connection = new Sequelize(dbConfig);

User.init(connection);
Grids.init(connection);
ManagerValues.init(connection);
Address.init(connection);
Tech.init(connection);


User.associate(connection.models);
Address.associate(connection.models);
Tech.associate(connection.models);
Grids.associate(connection.models);
ManagerValues.associate(connection.models);

connection.authenticate().then(() => {
    console.log('conectado');
});

module.exports = connection;


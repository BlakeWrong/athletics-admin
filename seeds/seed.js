const sequelize = require('../config/connection');
const { User, Team, Role } = require('../models');

const userData = require('./userData.json');
const roleData = require('./roleData.json');
const teamData = require('./teamData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  Team.bulkCreate(teamData, {
    individualHooks: true,
    returning: true,
  });
  Role.bulkCreate(roleData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();

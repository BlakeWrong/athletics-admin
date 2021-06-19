const sequelize = require('../config/connection');
const { User, Team, Role, UserRole } = require('../models');

const userData = require('./userData.json');
const roleData = require('./roleData.json');
const teamData = require('./teamData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  const teams = await Team.bulkCreate(teamData, {
    individualHooks: true,
    returning: true,
  });
  const roles = await Role.bulkCreate(roleData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();

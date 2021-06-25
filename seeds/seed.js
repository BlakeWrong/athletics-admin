const sequelize = require('../config/connection');
const { User, Team, Role, UserRole, Event, Announcement} = require('../models');

const userData = require('./userData.json');
const roleData = require('./roleData.json');
const teamData = require('./teamData.json');
const userRoleData = require('./userRoleData.json');
const eventData = require('./eventData.json');
const announcement = require('./announcement.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  await Team.bulkCreate(teamData, {
    individualHooks: true,
    returning: true,
  });
  await Role.bulkCreate(roleData, {
    individualHooks: true,
    returning: true,
  });
  await UserRole.bulkCreate(userRoleData, {
    individualHooks: true,
    returning: true,
  });
  await Event.bulkCreate(eventData, {
    individualHooks: true,
    returning: true,
  });
  await Announcement.bulkCreate(announcement, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();

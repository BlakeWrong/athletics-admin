const User = require('./User');
const Role = require('./Role');
const Team = require('./Team');
const UserRole = require('./UserRole');
const Event = require('./Event');
const Announcement = require('./Announcement');

User.belongsToMany(Role, {
  through: {
    model: UserRole,
    unique: false,
  },
});

Role.belongsToMany(User, {
  through: {
    model: UserRole,
    unique: false,
  },
});

Role.belongsTo(Team, {
  foreignKey: 'team_id',
});

Team.hasMany(Role, {
  foreignKey: 'team_id',
  onDelete: 'CASCADE',
});

Event.belongsTo(Team, {
  foreignKey: 'team_id',
});

Team.hasMany(Event, {
  foreignKey: 'team_id',
  onDelete: 'CASCADE',
});

Announcement.belongsTo(Team, {
  foreignKey: 'team_id',
});

Team.hasMany(Announcement, {
  foreignKey: 'team_id',
  onDelete: 'CASCADE',
});

module.exports = { User, Role, Team, UserRole, Event, Announcement };

const User = require('./User');
const Role = require('./Role');
const Team = require('./Team');
const UserRole = require('./UserRole');
const Event = require('./Event');
const Announcement = require('./Announcement');

// User.belongsToMany(Role, {
//   through: {
//     model: UserRole,
//     foreignKey: 'role_id',
//     unique: false,
//   },
// });
// Role.belongsToMany(User, {
//   through: {
//     model: UserRole,
//     foreignKey: 'user_id',
//     unique: false,
//   },
// });

User.hasMany(UserRole, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

UserRole.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Role.hasMany(UserRole, {
  foreignKey: 'role_id',
  onDelete: 'CASCADE',
});

UserRole.belongsTo(Role, {
  foreignKey: 'role_id',
  onDelete: 'CASCADE',
});

Team.hasMany(Role, {
  foreignKey: 'team_id',
  onDelete: 'CASCADE',
});

Role.belongsTo(Team, {
  foreignKey: 'team_id',
  onDelete: 'CASCADE',
});

Team.hasMany(Event, {
  foreignKey: 'team_id',
  onDelete: 'CASCADE',
});

Event.belongsTo(Team, {
  foreignKey: 'team_id',
  onDelete: 'CASCADE',
});

Team.hasMany(Announcement, {
  foreignKey: 'team_id',
  onDelete: 'CASCADE',
});

Announcement.belongsTo(Team, {
  foreignKey: 'team_id',
  onDelete: 'CASCADE',
});

module.exports = { User, Role, Team, UserRole, Event, Announcement };

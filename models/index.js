const User = require('./User');
const Role = require('./Role');
const Team = require('./Team');
const UserRole = require('./UserRole');

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

// User.belongsTo(Team, {
//   foreignKey: 'team_id',
// });

// Team.hasMany(User, {
//   foreignKey: 'team_id',
//   onDelete: 'CASCADE',
// });

// Team.belongsTo(User, {
//   foreignKey: 'user_id',
// });

// User.hasMany(Team, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE',
// });

module.exports = { User, Role, Team, UserRole };

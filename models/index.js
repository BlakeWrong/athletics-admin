const User = require('./User');
const Role = require('./Role');
const Team = require('./Team');

User.hasOne(Role, {
  foreignKey: 'role_id',
  onDelete: 'CASCADE',
});

Role.belongsTo(User, {
  foreignKey: 'role_id',
});

Team.hasMany(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

User.belongsTo(Team, {
  foreignKey: 'user_id',
});

module.exports = { User, Role, Team };

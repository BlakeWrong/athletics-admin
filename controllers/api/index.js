const router = require('express').Router();
const userRoutes = require('./userRoutes');
const roleRoutes = require('./roleRoutes');
const teamRoute = require('./teamRoutes');
const userRoleRoutes = require('./userRoleRoutes');
const eventRoutes = require('./eventRoutes');
const announcementRoutes = require('./announcementRoutes');

router.use('/users', userRoutes);
router.use('/projects', roleRoutes);
router.use('/team', teamRoute);
router.use('/userRole', userRoleRoutes);
router.use('/events', eventRoutes);
router.use('/announcements', announcementRoutes);

module.exports = router;

const router = require('express').Router();
const userRoutes = require('./userRoutes');
const roleRoutes = require('./roleRoutes');
const teamRoute = require('./teamRoute');
const userRoleRoutes = require('./userRoleRoutes');

router.use('/users', userRoutes);
router.use('/projects', roleRoutes);
router.use('/team', teamRoute);
router.use('/userRole', userRoleRoutes)

module.exports = router;

const router = require('express').Router();
const {
  User,
  Team,
  Event,
  Announcement,
  Role,
  UserRole,
} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  //route to render home page
  try {
    const homeUserData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });
    const home_user = homeUserData.get({ plain: true });
    console.log('req.session.teams :>> ', req.session.teams);
    res.render('homepage', {
      is_admin: req.session.is_admin,
      home_user,
      my_teams: req.session.teams,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/admin', withAuth, async (req, res) => {
  //route to render admin console
  try {
    const homeUserData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });
    const home_user = homeUserData.get({ plain: true });
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      include: [
        {
          model: UserRole,
          include: [
            {
              model: Role,
              include: [
                {
                  model: Team,
                },
              ],
            },
          ],
        },
      ],
    });
    const users = userData.map((user) => user.get({ plain: true }));
    res.render('admin', {
      home_user,
      is_admin: req.session.is_admin,
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/users', withAuth, async (req, res) => {
  //route to render all users
  try {
    const homeUserData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });
    const home_user = homeUserData.get({ plain: true });
    res.render('users', {
      home_user,
      is_admin: req.session.is_admin,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/teams', withAuth, async (req, res) => {
  //route to render all teams
  try {
    const homeUserData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });
    const home_user = homeUserData.get({ plain: true });
    res.render('teams', {
      home_user,
      is_admin: req.session.is_admin,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/team/:id', withAuth, async (req, res) => {
  //route to render 1 team
  try {
    const homeUserData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });
    const home_user = homeUserData.get({ plain: true });
    const teamData = await Team.findByPk(req.params.id, {
      include: [
        {
          model: Event,
        },
        {
          model: Announcement,
        },
      ],
    });

    const team = teamData.get({ plain: true });
    console.log('team :>> ', team);

    res.render('team', {
      home_user,
      is_admin: req.session.is_admin,
      team,
      logged_in: req.session.logged_in,
    });
    // res.status(200).json(teamData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/user/:username', withAuth, async (req, res) => {
  //route to render user profile
  try {
    const homeUserData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });
    const home_user = homeUserData.get({ plain: true });
    const userData = await User.findOne({
      where: { username: req.params.username },
      include: [
        {
          model: UserRole,
          include: [
            {
              model: Role,
              include: [
                {
                  model: Team,
                },
              ],
            },
          ],
        },
      ],
    });
    const user = userData.get({ plain: true });
    res.render('profile', {
      home_user,
      is_admin: req.session.is_admin,
      user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/schedule', withAuth, async (req, res) => {
  //route to render user profile
  try {
    const homeUserData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });
    const home_user = homeUserData.get({ plain: true });
    res.render('schedule', {
      home_user,
      is_admin: req.session.is_admin,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/signup', (req, res) => {
  //route to render signup page
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  try {
    res.render('signup', {
      logged_in: req.session.logged_in,
      layout: 'empty.handlebars',
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login', { layout: 'empty.handlebars' });
});

module.exports = router;

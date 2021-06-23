const router = require('express').Router();
// const {  User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  //route to render home page
  try {
    res.render('homepage', {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/admin', withAuth, async (req, res) => {
  //route to render admin console
  try {
    res.render('admin', {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/users', withAuth, async (req, res) => {
  //route to render all users
  try {
    res.render('users', {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/teams', withAuth, async (req, res) => {
  //route to render all teams
  try {
    res.render('teams', {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/teams/:id', withAuth, async (req, res) => {
  //route to render 1 team
  try {
    res.render('team', {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/user/:username', withAuth, async (req, res) => {
  //route to render user profile
  try {
    res.render('profile', {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/schedule', withAuth, async (req, res) => {
  //route to render user profile
  try {
    res.render('schedule', {
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

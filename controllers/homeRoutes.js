const router = require('express').Router();
const { Project, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    //route to render home page
});

router.get('/admin', async (req, res) => {
    //route to render admin console
});

router.get('/users', async (req, res) => {
    //route to render all users
});

router.get('/teams', async (req, res) => {
    //route to render all teams
});

router.get('/teams/:id', async (req, res) => {
    //route to render 1 team
});

router.get('/user/:username', async (req, res) => {
    //route to render user profile
});

router.get('/schedule', async (req, res) => {
    //route to render user profile
});

router.get('/signup', (req, res) => {
    //route to render signup page
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;

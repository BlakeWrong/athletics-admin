const router = require('express').Router();
const { User, UserRole, Role, Team } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
  console.log('req.body :>> ', req.body);
  try {
    const userData = await User.create(req.body);

    res.status(200).json(userData);
    res.redirect('/login');
  } catch (err) {
    //ADD LOGIC FOR CATCHING all errors ERRORS ON LOGIN
    console.error(err.errors[0].message);
    if (err.errors[0].message.includes('unique')) {
      res.status(406).json({ message: err.errors[0].message });
    }
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { email: req.body.email },
      include: [
        {
          model: UserRole,
          include: [
            {
              model: Role,
              include: [
                {
                  model: Team,
                  plain: true,
                  nest: true,
                },
              ],
              plain: true,
              nest: true,
            },
          ],
          plain: true,
          nest: true,
        },
      ],
      plain: true,
      nest: true,
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    const user = userData.get({ plain: true, nest: true });
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      const role_ids = user.user_roles.map((userRole) => {
        return userRole.role.id;
      });
      req.session.is_admin = role_ids.includes(1);
      let teams = user.user_roles.map((userRole) => {
        return userRole.role.team;
      });
      teams = teams.filter(Boolean);
      req.session.teams = teams;
      console.log('teams :>> ', teams);
      const { password, ...userResponse } = user;
      res.json({
        user: userResponse,
        message: 'You are now logged in!',
      });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', withAuth, (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.get('/', withAuth, async (req, res) => {
  try {
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
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/:id', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
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
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    await User.update(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        username: req.body.username,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    const editedUser = await User.findByPk(req.params.id, {
      attributes: {
        exclude: ['password'],
      },
    });

    res.status(200).json(editedUser);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;

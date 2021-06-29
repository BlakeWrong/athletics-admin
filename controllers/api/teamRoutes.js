const router = require('express').Router();
const {
  Team,
  Announcement,
  Event,
  User,
  Role,
  UserRole,
} = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const teamData = await Team.create({
      team_name: req.body.team_name,
    });

    const newPlayerRole = await Role.create({
      title: 'Player',
      team_id: teamData.id,
    });
    const newCoachRole = await Role.create({
      title: 'Coach',
      team_id: teamData.id,
    });
    res.status(200).json(teamData, newPlayerRole, newCoachRole);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', withAuth, async (req, res) => {
  try {
    const teamData = await Team.findAll();
    res.status(200).json(teamData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', withAuth, async (req, res) => {
  try {
    const teamData = await Team.findByPk(req.params.id, {
      include: [
        {
          model: Event,
        },
        {
          model: Announcement,
        },
        {
          model: Role,
          include: [
            {
              model: UserRole,
              include: [
                {
                  model: User,
                  attributes: {
                    exclude: ['password'],
                  },
                },
              ],
            },
          ],
        },
      ],
    });
    res.status(200).json(teamData);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/roster/:id', withAuth, async (req, res) => {
  try {
    const teamData = await Team.findByPk(req.params.id, {
      include: [
        {
          model: Event,
        },
        {
          model: Announcement,
        },
        {
          model: Role,
          include: [
            {
              model: UserRole,
              include: [
                {
                  model: User,
                  attributes: {
                    exclude: ['password'],
                  },
                },
              ],
            },
          ],
        },
      ],
    });
    const roster = teamData.roles;
    res.status(200).json(roster);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    await Team.update(
      {
        team_name: req.body.team_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    const editedTeam = await Team.findByPk(req.params.id);

    res.status(200).json(editedTeam);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const roleData = await Team.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!roleData) {
      res.status(404).json({ message: 'No team found with this id.' });
      return;
    }

    res.status(200).json(roleData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

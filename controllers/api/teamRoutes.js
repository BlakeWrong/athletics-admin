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
                },
              ],
            },
          ],
        },
      ],
    });
    // const teamMembers = await UserRole.findAll({
    //   include: [
    //     {
    //       model: Role,
    //       where: {
    //         team_id: req.params.id,
    //       },
    //     },
    //   ],
    // });
    // res.render('teams', { team, events, logged_in: req.session.logged_in });
    res.status(200).json(teamData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

const router = require('express').Router();
const { Announcement, Team } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:team_id', withAuth, async (req, res) => {
  try {
    const announcementData = await Announcement.findAll({
      where: {
        team_id: req.params.team_id,
      },
      include: [
        {
          model: Team,
          attributes: ['team_name'],
        },
      ],
    });
    // const events = announcementData.map((announcement) => announcement.get({ plain: true }));
    // const team = announcements[0].team.team_name;
    // res.render('schedule', { team, events, logged_in: req.session.logged_in });
    res.status(200).json(announcementData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/:team_id', withAuth, async (req, res) => {
  try {
    const newAnnouncement = await Announcement.create({
      title: req.body.title,
      message: req.body.message,
      team_id: req.params.team_id,
    });

    res.status(200).json(newAnnouncement);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;

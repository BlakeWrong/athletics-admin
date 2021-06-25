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
    res.status(200).json(announcementData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newAnnouncement = await Announcement.create({
      title: req.body.title,
      message: req.body.message,
      team_id: req.body.team_id,
    });

    res.status(200).json(newAnnouncement);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    await Announcement.update(
      {
        title: req.body.title,
        message: req.body.message,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    const editedAnnouncement = await Announcement.findByPk(req.params.id);

    res.status(200).json(editedAnnouncement);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;

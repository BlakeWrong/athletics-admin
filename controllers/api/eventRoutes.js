const router = require('express').Router();
const { Event, Team } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:team_id', withAuth, async (req, res) => {
  try {
    const eventData = await Event.findAll({
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
    const events = eventData.map((event) => event.get({ plain: true }));
    const team = events[0].team.team_name;
    res.render('schedule', { team, events, logged_in: req.session.logged_in });
    // res.status(200).json(eventData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/:team_id', withAuth, async (req, res) => {
  try {
    const newEvent = await Event.create({
      event_name: req.body.event_name,
      event_date: req.body.event_date,
      team_id: req.params.team_id,
    });

    res.status(200).json(newEvent);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;

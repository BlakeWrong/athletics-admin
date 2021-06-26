const router = require('express').Router();
const { Event, Team } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const eventData = await Event.findAll({
      include: [
        {
          model: Team,
          attributes: ['team_name'],
        },
      ],
    });
    res.status(200).json(eventData);
  } catch (err) {
    res.status(500).json(err);
  }
});

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
    res.status(200).json(eventData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newEvent = await Event.create({
      event_name: req.body.event_name,
      event_date: req.body.event_date,
      team_id: req.body.team_id,
    });

    res.status(200).json(newEvent);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    await Event.update(
      {
        event_name: req.body.event_name,
        event_date: req.body.event_date,
        team_id: req.body.team_id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    const editedEvent = await Event.findByPk(req.params.id);

    res.status(200).json(editedEvent);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;

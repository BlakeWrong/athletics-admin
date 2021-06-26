const router = require('express').Router();
const { Role, Team } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const roleData = await Role.findAll({
      include: [
        {
          model: Team,
        },
      ],
    });
    res.status(200).json(roleData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newRole = await Role.create({
      title: req.body.title,
      team_id: req.body.team_id,
    });

    res.status(200).json(newRole);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const editRole = await Role.update(
      {
        title: req.body.title,
        team_id: req.body.team_id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    const editedRole = await Role.findByPk(req.params.id);

    res.status(200).json(editedRole);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

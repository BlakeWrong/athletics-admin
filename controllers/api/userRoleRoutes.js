const router = require('express').Router();
const { UserRole, User, Role } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const roleData = await UserRole.findAll({
      include: [
        {
          model: Role,
        },
        {
          model: User,
          attributes: {
            exclude: ['password'],
          },
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
    const newUserRole = await UserRole.create({
      user_id: req.body.user_id,
      role_id: req.body.role_id,
    });

    res.status(200).json(newUserRole);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    await UserRole.update(
      {
        user_id: req.body.user_id,
        role_id: req.body.role_id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    const editedUserRole = await UserRole.findByPk(req.params.id);

    res.status(200).json(editedUserRole);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;

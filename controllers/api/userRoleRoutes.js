const router = require('express').Router();
const { UserRole, User, Role, Team } = require('../../models');
const withAuth = require('../../utils/auth');
const nodemailer = require('nodemailer');

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

    const userData = await User.findByPk(req.body.user_id, {
      attributes: {
        exclude: ['password'],
      },
    });
    const teamData = await Role.findByPk(req.body.role_id, {
      include: [
        {
          model: Team,
        },
      ],
    });

    const assignmentEmail = `
    <h3>Hello ${userData.first_name},</h3>
    <p>You have been assigned the role of ${teamData.title} on the team ${teamData.team.team_name}!</p>
    <p>To view your team's page go to <a href="https://abc-myteam.herokuapp.com/login">abc-myteam</a> and login.</p>
    `;

    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // generated ethereal user
        pass: process.env.SMTP_PASSWORD, // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Admin" <my0Team0athletics@gmail.com>', // sender address
      to: userData.email, // list of receivers
      subject: 'New Role Assignment', // Subject line
      text: 'You have been assigned a new role on Athletics Admin', // plain text body
      html: assignmentEmail, // html body
    });

    console.log('Message sent: %s', info.messageId);

    res.status(200).json(newUserRole);
  } catch (err) {
    console.error(err);
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

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const roleData = await UserRole.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!roleData) {
      res.status(404).json({ message: 'No user role found with this id.' });
      return;
    }

    res.status(200).json(roleData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/usersController');

const { body } = require('express-validator');

//@route     POST api/users
//@desc      Register User
//@access    Public
router.post(
  '/',
  [
    body('name', 'Name is required!!').not().isEmpty(),
    body('email', 'Please include a valid email!!').isEmail(),
    body(
      'password',
      'Please enter a password with 6 or more characters!!'
    ).isLength({ min: 6 })
  ],
  usersController.registerUser
);

module.exports = router;

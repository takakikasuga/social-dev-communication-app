const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');
const authMiddleware = require('../../middleware/authMiddleware');

const { body } = require('express-validator');

//@route     GET api/auth
//@desc      Test Route
//@access    Public
router
  .route('/')
  .get(authMiddleware.secureRouteValidateJsonWebToken, authController.getUser)
  .post(
    [
      body('email', 'Please include a valid email!!').isEmail(),
      body('password', 'Password is required!!').exists()
    ],
    authController.loginUser
  );

module.exports = router;

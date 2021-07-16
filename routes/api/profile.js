const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const profileController = require('../../controllers/profileController');

const { body } = require('express-validator');

//@route     GET api/profile/me
//@desc      Get users current profile
//@access    Private
router

  .route('/me')
  .get(
    authMiddleware.secureRouteValidateJsonWebToken,
    profileController.getProfile
  );

//@route     POST api/profile
//@desc      Create or update user profile
//@access    Private
router
  .route('/')
  .post(
    authMiddleware.secureRouteValidateJsonWebToken,
    [
      body('status', 'Status is required!!').not().isEmpty(),
      body('skills', 'Skills is required!!').not().isEmpty()
    ],
    profileController.createAndUpdateProfile
  )
  .get(profileController.getAllUserprofiles);

router.route('/user/:user_id').get(profileController.getUserprofile);

module.exports = router;

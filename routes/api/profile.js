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
  .get(profileController.getAllUserProfiles)
  .delete(
    authMiddleware.secureRouteValidateJsonWebToken,
    profileController.deleteUserprofile
  );

router.route('/user/:user_id').get(profileController.getUserProfile);

router
  .route('/experience')
  .put(
    authMiddleware.secureRouteValidateJsonWebToken,
    [
      body('title', 'title is required!!').not().isEmpty(),
      body('company', 'Company is required!!').not().isEmpty(),
      body('from', 'From date is required!!').not().isEmpty()
    ],
    profileController.addExperience
  );

router
  .route('/experience/:experience_id')
  .delete(
    authMiddleware.secureRouteValidateJsonWebToken,
    profileController.deleteExperience
  );

router
  .route('/education')
  .put(
    authMiddleware.secureRouteValidateJsonWebToken,
    [
      body('school', 'School is required!!').not().isEmpty(),
      body('degree', ' Degree is required!!').not().isEmpty(),
      body('fieldofstudy', 'fieldofstudy is required!!').not().isEmpty(),
      body('from', 'From date is required!!').not().isEmpty()
    ],
    profileController.addEducation
  );

router
  .route('/education/:education_id')
  .delete(
    authMiddleware.secureRouteValidateJsonWebToken,
    profileController.deleteEducation
  );

router.route('/github/:username').get(profileController.getUserGithub);

module.exports = router;

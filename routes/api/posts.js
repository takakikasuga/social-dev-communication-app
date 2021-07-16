const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const postsController = require('../../controllers/postsController');
const { body } = require('express-validator');

//@route     POST api/posts
//@desc      Create a post
//@access    Private
router
  .route('/')
  .post(
    authMiddleware.secureRouteValidateJsonWebToken,
    [body('text', 'Text is required!!').not().isEmpty()],
    postsController.createPost
  )
  .get(
    authMiddleware.secureRouteValidateJsonWebToken,
    postsController.getAllUserPosts
  );

router
  .route('/:post_id')
  .get(
    authMiddleware.secureRouteValidateJsonWebToken,
    postsController.getUserPost
  )
  .delete(
    authMiddleware.secureRouteValidateJsonWebToken,
    postsController.deleteUserPost
  );

router
  .route('/likes/:post_id')
  .put(authMiddleware.secureRouteValidateJsonWebToken, postsController.addLike);

router
  .route('/unlikes/:post_id')
  .put(
    authMiddleware.secureRouteValidateJsonWebToken,
    postsController.removeLike
  );

router
  .route('/comment/:post_id')
  .post(
    authMiddleware.secureRouteValidateJsonWebToken,
    [body('text', 'Text is required!!').not().isEmpty()],
    postsController.addComment
  );

router
  .route('/comment/:post_id/:comment_id')
  .delete(
    authMiddleware.secureRouteValidateJsonWebToken,
    postsController.deleteComment
  );

module.exports = router;

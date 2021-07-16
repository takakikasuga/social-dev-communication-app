const User = require('../models/User');
const Post = require('../models/Post');
const Profile = require('../models/Profile');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

//@route     POST api/posts
//@desc      Create a post
//@access    Private

exports.createPost = async (req, res) => {
  const errors = validationResult(req);
  console.log('errors', errors);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const user = await User.findById(req.user.id)
      .select('-password')
      .select('-__v');
    console.log('user.name', user.name);

    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    });

    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error at creating a new Post!!');
  }
};

//@route     Get api/posts
//@desc      Create all posts
//@access    Private

exports.getAllUserPosts = async (req, res) => {
  try {
    // 降順で取得
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error at getting all user Posts!!');
  }
};

//@route     Get api/posts/:post_id
//@desc      Create post by id
//@access    Private

exports.getUserPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId')
      return res.status(404).json({ msg: 'Post not found' });
    res.status(500).send('Server Error at getting the user Post!!');
  }
};

//@route     DELETE api/posts/:post_id
//@desc      Delete a post
//@access    Private

exports.deleteUserPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) return res.status(404).json({ msg: 'Post not found' });

    // チェックユーザー（投稿ユーザーと作業しているユーザーが一致するかどうか）
    console.log('post.user', post.user);
    if (post.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'User not authorized' });

    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId')
      return res.status(404).json({ msg: 'Post not found' });
    res.status(500).send('Server Error at getting all user Posts!!');
  }
};

//@route     PUt api/posts/like/:post_id
//@desc      PUT a post
//@access    Private

exports.addLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    // 投稿が既に同じユーザーにお気に入りされている場合
    console.log(post.likes.filter((like) => like.user === req.user.id));
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    )
      return res.status(400).json({ msg: 'Post already liked' });

    post.likes.unshift({ user: req.user.id });

    await post.save();
    console.log('post.likes', post.likes);
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error at adding like to Post!!');
  }
};

//@route     PUt api/posts/unlike/:post_id
//@desc      PUT a post
//@access    Private

exports.removeLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    // 投稿が既に同じユーザーにお気に入りされていない場合
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    )
      return res.status(400).json({ msg: 'Post has not yet been liked' });

    console.log(post.likes.map((like) => like.user));
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error at adding like to Post!!');
  }
};

//@route     POST api/posts/comment/:post_id
//@desc      Comment a post
//@access    Private

exports.addComment = async (req, res) => {
  const errors = validationResult(req);
  console.log('errors', errors);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const user = await User.findById(req.user.id)
      .select('-password')
      .select('-__v');
    const post = await Post.findById(req.params.post_id).select('-__v');
    console.log('user.name', user.name);

    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    };

    console.log('post', post);
    post.comments.unshift(newComment);

    await post.save();
    console.log('post.comments', post.comments);
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error at adding a comment in the Post!!');
  }
};

//@route     DELETE api/posts/:post_id/:comment_id
//@desc      Delete a post
//@access    Private

exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id).select('-__v');

    console.log('post.comments', post.comments);
    const comment = post.comments.find(
      (comment) => comment._id.toString() === req.params.comment_id
    );

    console.log('comment', comment);
    if (!comment)
      return res.status(404).json({ msg: 'Comment does not exist' });

    if (comment.user.toString() !== req.user.id)
      return res.status(404).json({ msg: 'User not authorized' });

    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);

    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error at deleting the comment in the Post!!');
  }
};

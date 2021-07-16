const request = require('request');
const config = require('config');
const Profile = require('../models/Profile');
const User = require('../models/User');
const { validationResult } = require('express-validator');

//@route     GET api/profile/me
//@desc      Get users current profile
//@access    Private

exports.getProfile = async (req, res) => {
  try {
    // Profileデータにあるuserのidで検索をかける
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );

    if (!profile)
      return res.status(400).send({ msg: 'There is no profile for this user' });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error at getting profile!!');
  }
};

//@route     POST api/profile
//@desc      Create or update user profile
//@access    Private

exports.createAndUpdateProfile = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  // destructure the request
  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    twitter,
    instagram,
    linkedin,
    facebook
    // spread the rest of the fields we don't need to check
    // ...rest
  } = req.body;

  // 初期化
  let profileFields = {};
  profileFields.user = req.user.id;

  // req.user.id;はユーザーの一意のID（ミドルウェアで取得）
  profileFields.user = req.user.id;
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (githubusername) profileFields.githubusername = githubusername;
  if (skills) {
    profileFields.skills = skills.split(',').map((skill) => skill.trim());
  }
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (instagram) profileFields.social.instagram = instagram;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (facebook) profileFields.social.facebook = facebook;
  console.log('profileFields', profileFields);

  try {
    // プロフィールに紐づくユーザーIDで情報を取得
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      // Update
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      ).select('-__v');
      console.log('profile', profile);
      return res.json(profile);
    }

    // Create
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .send('Server error at creating or Updating profile infomation!!');
  }
};

//@route     GET api/profile
//@desc      Get all profiles
//@access    Public

exports.getAllUserprofiles = async (req, res) => {
  try {
    const profiles = await Profile.find()
      .populate('user', ['name', 'avatar'])
      .select('-__v');
    console.log('profiles', profiles);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error at getting all profiles infomation!!');
  }
};

//@route     GET api/profile/user/:user_id
//@desc      Get profiles by user ID
//@access    Public

exports.getUserprofile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id })
      .populate('user', ['name', 'avatar'])
      .select('-__v');

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    console.log('profile', profile);
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    console.log('err.kind', err.kind);
    if (err.kind === 'ObjectId')
      return res.status(400).json({ msg: 'Profile not found' });
    res
      .status(500)
      .send('Server error at getting the user profile infomation!!');
  }
};

//@route     DELETE api/profile
//@desc      Delete profile ,user,& post
//@access    Private

exports.deleteUserprofile = async (req, res) => {
  try {
    // ユーザーのプロフィールを削除
    await Profile.findOneAndRemove({ user: req.user.id });
    // ユーザー情報を削除
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted!!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error at getting profile!!');
  }
};

//@route     PUT api/profile/experience
//@desc      Add profile experience
//@access    Private

exports.addExperience = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { title, company, location, from, to, current, description } = req.body;
  const newExperience = {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.experience.unshift(newExperience);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error at adding experience!!');
  }
};

//@route     DELETE api/profile/experience/:experience_id
//@desc      Delete experience from profile
//@access    Private

exports.deleteExperience = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // mapメソッドで[ObjectID]の配列に変えてindexOfでインデックス番号を取得する
    const removeIndex = profile.experience
      .map((item) => item._id)
      .indexOf(req.params.experience_id);

    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error at deleting the experience!!');
  }
};

//@route     PUT api/profile/education
//@desc      Add profile education
//@access    Private

exports.addEducation = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { school, degree, fieldofstudy, from, to, current, description } =
    req.body;
  const newEducation = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.education.unshift(newEducation);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error at adding education!!');
  }
};

//@route     DELETE api/profile/education/:education_id
//@desc      Delete education from profile
//@access    Private

exports.deleteEducation = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // mapメソッドで[ObjectID]の配列に変えてindexOfでインデックス番号を取得する
    const removeIndex = profile.education
      .map((item) => item._id)
      .indexOf(req.params.education_id);

    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error at deleting the education!!');
  }
};

//@route     GET api/profile/github/:username
//@desc      Get user repos from github
//@access    Profile

exports.getUserGithub = async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page5&sort=created:asc&client_id=${config.get(
        'githubClientId'
      )}&client_secret${config.get('githubSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' }
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: 'No Github profile found' });
      }
      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error at getting the guthub repository!!');
  }
};

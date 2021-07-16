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

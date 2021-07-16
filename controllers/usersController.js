const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/User');

//@route     POST api/users
//@desc      Register User
//@access    Public
exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  console.log('errors', errors);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  console.log('req.body', req.body);

  const { name, email, password } = req.body;
  try {
    // ユーザー情報の有無の確認
    // findOne({サーチワード：バリュー});
    let user = await User.findOne({ email }).collation({
      locale: 'en',
      strength: 2
    });
    if (user)
      return res
        .status(400)
        .json({ errors: [{ msg: 'User already exists!' }] });

    // ユーザーのアバターを取得する（gravatarモジュール）
    // s：文字列（String）、r：評価（Rating）、d：標準（ Default）
    const avatar = gravatar.url(email, {
      size: '200',
      rating: 'pg',
      // mmはデフォルトで画像を差し込んでくれる（ミステリーマン）
      default: 'robohash'
    });

    // ユーザーモデルのインスタンスを作成
    user = new User({
      name,
      email,
      avatar,
      password
    });

    // パスワードの暗号化
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    console.log('ハッシュ化したuser.password', user.password);
    console.log('user', user);

    // データベースにユーザー情報を保管する
    await user.save();
    console.log('after saved user', user);

    const payload = {
      user: {
        id: user._id
      }
    };

    // expiresIn: 3600は1時間
    console.log('payload', payload);
    // jwtとしてユーザー情報のObjectIdを登録
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 3600 },
      (err, token) => {
        // エラーだったらエラーを投げる
        if (err)
          return res.status(400).json({ errors: [{ msg: err.message }] });
        // そうでなかったらトークンを返す
        res.json({
          token,
          msg: 'Getting the original token is success and User account have registered!!'
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

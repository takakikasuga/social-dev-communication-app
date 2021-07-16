const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

//@route     GET api/auth
//@desc      Get user
//@access    Private
exports.getUser = async (req, res) => {
  try {
    // req.user.idはミドルウェアを通過しているためユーザーのObjectIDが格納されている;
    // .select('-password')はpassword、.select('-__v')は__vを取り除く
    console.log('req.user.id', req.user.id);
    const user = await User.findById(req.user.id)
      .select('-password')
      .select('-__v');
    console.log('user', user);
    res.json(user);
  } catch (err) {
    console.err(err, message);
    res.status(500).send('Server Error at fetching user Infomation');
  }
};

//@route     POST api/auth
//@desc      Authenticate user & get token
//@access    Public
exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  console.log('errors', errors);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  console.log('req.body', req.body);

  const { email, password } = req.body;
  try {
    // ユーザー情報の有無の確認
    // findOne({サーチワード：バリュー});
    let user = await User.findOne({ email }).collation({
      locale: 'en',
      strength: 2
    });

    // ログインした場合にemai情報がヒットしない場合
    if (!user)
      return res
        .status(400)
        .json({ errors: [{ msg: 'Invalid Credentials!!' }] });

    // メールアドレスはDBにあったとして実際にパスワードが一致するかを確認する
    // プレーンなパスワード、そして暗号化したDBに存在するパスワード
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ errors: [{ msg: 'Invalid Credentials!!' }] });

    const payload = {
      user: {
        id: user._id
      }
    };

    // ログインするときもtokenを発行する
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
          msg: 'Getting the original token is success and User have done logged in!!'
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

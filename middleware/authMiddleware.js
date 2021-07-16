const jwt = require('jsonwebtoken');
const config = require('config');

exports.secureRouteValidateJsonWebToken = (req, res, next) => {
  // .headers('x-auth-token')：送信されてきたヘッダーデータからトークンを取得する。
  const token = req.header('x-auth-token');

  if (!token)
    return res.status(401).json({ msg: 'No token, authorization deneid!!' });

  try {
    // トークンを元に戻す
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    // reqにuserプロパティを追加する
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

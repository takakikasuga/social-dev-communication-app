const { validationResult } = require('express-validator');

//@route     POST api/users
//@desc      Register User
//@access    Public
exports.registerUser = (req, res) => {
  const errors = validationResult(req);
  console.log('errors', errors);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  console.log('req.body', req.body);
  res.send('User routes');
};

const express = require('express');
const connectDB = require('./config/db');
const morgan = require('morgan');
const path = require('path');

const app = express();
// 各ルーターのインポート
const usersRouter = require('./routes/api/users');
const authRouter = require('./routes/api/auth');
const postsRouter = require('./routes/api/posts');
const profileRouter = require('./routes/api/profile');
// リクエストの種類をログで出力する
app.use(morgan('dev'));

// mongoDBと接続
connectDB();

// リクエスト本体のデータを受け取る
app.use(express.json({ extended: false }));

// 各ルーターの定義
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);
app.use('/api/profile', profileRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

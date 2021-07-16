const express = require('express');
const connectDB = require('./config/db');
const morgan = require('morgan');

const app = express();
// 各ルーターのインポート
const usersRouter = require('./routes/api/users');
const authRouter = require('./routes/api/auth');
const postsRouter = require('./routes/api/posts');
const profileRouter = require('./routes/api/profile');

// mongoDBと接続
connectDB();

// リクエストの種類をログで出力する
app.use(morgan('dev'));

// リクエスト本体のデータを受け取る
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

// 各ルーターの定義
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);
app.use('/api/profile', profileRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

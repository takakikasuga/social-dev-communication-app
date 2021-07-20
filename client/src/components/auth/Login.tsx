import React, { FC, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

// コンポーネント
import { InputValidation } from '../atoms/index';
import { Button } from '../atoms/index';

// スライサー
import { loginUserAsync, authStatus } from '../../features/auth/authSlice';

export interface LoginInputValue {
  email: string;
  password: string;
}

const Login: FC = () => {
  const dispatch = useDispatch();
  const auth = useSelector(authStatus);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginInputValue>({
    mode: 'onBlur',
    defaultValues: { email: '', password: '' }
  });

  const onSubmit: SubmitHandler<LoginInputValue> = (formData) => {
    console.log('通過しました。');
    console.log('formData', formData);
    dispatch(loginUserAsync(formData));
  };

  // ログイン状態であった場合はリダイレクトする
  if (auth.isAuthenticated) return <Redirect to='/dashboard' />;
  return (
    <Fragment>
      <h1 className='text-primary'>Sign In</h1>
      <p>
        <i className='fas fa-users' /> Sign Into Your Account
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-3'>
          <InputValidation
            id='email'
            inputType='text'
            placeholder='Email'
            error={errors.email!}
            register={register('email', {
              required: 'メールアドレスを入力してください'
            })}>
            Email address
          </InputValidation>
        </div>
        <div className='mb-3'>
          <InputValidation
            id='password'
            inputType='password'
            placeholder='Email'
            error={errors.password!}
            register={register('password', {
              required: 'パスワードを入力してください',
              minLength: {
                value: 6,
                message: 'パスワードは最低６文字以上にしてください。'
              }
            })}>
            Password
          </InputValidation>
        </div>
        <Button type='submit' buttonColor='primary' textColor='text-white'>
          ログイン
        </Button>
        <p className='mt-5'>
          アカウントを持っていない方はこちら。{' '}
          <Link to='/register'>新規登録</Link>
        </p>
      </form>
    </Fragment>
  );
};

export default Login;

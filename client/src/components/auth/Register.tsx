import React, { FC, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

// コンポーネント
import { InputValidation } from '../atoms/index';

import { Button } from '../atoms/index';

// スライサー
import { registerUserAsync, authStatus } from '../../features/auth/authSlice';

export interface RegisterInputValue {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: FC = () => {
  const dispatch = useDispatch();
  const auth = useSelector(authStatus);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<RegisterInputValue>({
    mode: 'onBlur',
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' }
  });

  const onSubmit: SubmitHandler<RegisterInputValue> = (formData) => {
    console.log('通過しました。');
    console.log('formData', formData);
    dispatch(registerUserAsync(formData));
  };

  // ログイン状態であった場合はリダイレクトする
  if (auth.isAuthenticated) return <Redirect to='/dashboard' />;

  return (
    <Fragment>
      <h1 className='text-primary'>Sign Up</h1>
      <p>
        <i className='fas fa-users' /> Create Your Account
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-3'>
          <InputValidation
            id='name'
            inputType='text'
            placeholder='Name'
            error={errors.name!}
            register={register('name', {
              required: '名前を入力してください'
            })}>
            Name
          </InputValidation>
        </div>
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
          <p className='form-text'>
            We'll never share your email with anyone else.
          </p>
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
        <div className='mb-3'>
          <InputValidation
            id='confirmPassword'
            inputType='password'
            placeholder='ConfirmPassword'
            error={errors.confirmPassword!}
            register={register('confirmPassword', {
              required: 'パスワードを入力してください',
              minLength: {
                value: 6,
                message: 'パスワードは最低６文字以上にしてください。'
              },
              validate: (value) => {
                return (
                  value === getValues('password') ||
                  'パスワードを一致させてください。'
                );
              }
            })}>
            Confirm Password
          </InputValidation>
        </div>
        <Button type='submit' buttonColor='primary' textColor='text-white'>
          新規登録
        </Button>
        <p className='mt-5'>
          既にアカウントを持っている方はこちら。{' '}
          <Link to='/login'>ログイン</Link>
        </p>
      </form>
    </Fragment>
  );
};

export default Register;

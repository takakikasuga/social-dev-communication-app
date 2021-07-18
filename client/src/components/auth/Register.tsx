import React, { FC, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

// コンポーネント
import { InputName } from '../atoms/index';
import { InputEmail } from '../atoms/index';
import { InputPassword } from '../atoms/index';
import { InputConfirmPassword } from '../atoms/index';
import { Button } from '../atoms/index';

export interface RegisterInputValue {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: FC = () => {
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
  };

  return (
    <Fragment>
      <h1 className='text-primary'>Sign Up</h1>
      <p>
        <i className='fas fa-users' /> Create Your Account
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-3'>
          <InputName
            error={errors.name!}
            register={register('name', {
              required: '名前を入力してください'
            })}
          />
        </div>
        <div className='mb-3'>
          <InputEmail
            error={errors.email!}
            register={register('email', {
              required: 'メールアドレスを入力してください'
            })}
          />
        </div>
        <div className='mb-3'>
          <InputPassword
            error={errors.password!}
            register={register('password', {
              required: 'パスワードを入力してください',
              minLength: {
                value: 6,
                message: 'パスワードは最低６文字以上にしてください。'
              }
            })}
          />
        </div>
        <div className='mb-3'>
          <InputConfirmPassword
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
            })}
          />
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

import React, { FC, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

// コンポーネント
import { InputEmail } from '../atoms/index';
import { InputPassword } from '../atoms/index';
import { Button } from '../atoms/index';

export interface LoginInputValue {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Login: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginInputValue>({
    mode: 'onBlur',
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' }
  });

  const onSubmit: SubmitHandler<LoginInputValue> = (formData) => {
    console.log('通過しました。');
    console.log('formData', formData);
  };

  return (
    <Fragment>
      <h1 className='text-primary'>Sign In</h1>
      <p>
        <i className='fas fa-users' /> Sign Into Your Account
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
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

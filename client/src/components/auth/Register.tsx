import React, { FC, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

// スタイルコンポーネント
import { ErrorParagraph } from '../../styles/errorParagraph';

interface registerInputValue {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control
  } = useForm<registerInputValue>({
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' }
  });

  const onSubmit: SubmitHandler<registerInputValue> = () => {
    console.log('通過しました。');
  };

  return (
    <Fragment>
      <h1 className='text-primary'>Sign Up</h1>
      <p>
        <i className='fas fa-users' /> Create Your Account
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            Name
          </label>
          <input
            {...register('name', {
              required: '名前を入力してください'
            })}
            type='text'
            className='form-control'
            id='name'
          />
          {errors.name && (
            <ErrorParagraph>{errors.name.message}</ErrorParagraph>
          )}
        </div>
        <div className='mb-3'>
          <label
            {...register('email', {
              required: 'メールアドレスを入力してください'
            })}
            htmlFor='email'
            className='form-label'>
            Email address
          </label>
          <input
            type='email'
            className='form-control'
            id='email'
            aria-describedby='emailHelp'
          />
          {errors.email && (
            <ErrorParagraph>{errors.email.message}</ErrorParagraph>
          )}
          <div id='emailHelp' className='form-text'>
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input type='password' className='form-control' id='password' />
        </div>
        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Confirm Password
          </label>
          <input type='password' className='form-control' id='password' />
        </div>
        <button type='submit' className='btn btn-primary'>
          新規登録
        </button>
        <p className='mt-5'>
          既にアカウントを持っている方はこちら。{' '}
          <Link to='/login'>ログイン</Link>
        </p>
      </form>
    </Fragment>
  );
};

export default Register;

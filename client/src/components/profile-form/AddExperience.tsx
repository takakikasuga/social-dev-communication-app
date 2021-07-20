import React, { FC, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';

// コンポーネント
import { InputValidation } from '../../components/atoms/index';
import { TextareaValidation } from '../../components/atoms/index';
import { Button } from '../../components/atoms/index';

// スライサー
import { addExperienceAsync } from '../../features/profile/profileSlice';

export interface AddExperienceValue {
  company: string;
  title: string;
  location: string;
  from: Date;
  to: Date;
  current: boolean;
  description: string;
}

const AddExperience: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AddExperienceValue>({
    mode: 'onBlur',
    defaultValues: { current: false }
  });
  const onSubmit: SubmitHandler<AddExperienceValue> = (formData) => {
    console.log('通過しました。');
    console.log('formData', formData);
    dispatch(addExperienceAsync({ formData, history }));
  };
  return (
    <Fragment>
      <h1 className='text-primary'>経験の追加</h1>
      <p>
        <i className='fas fa-code-branch'></i>{' '}
        開発もしくはプログラマーで経験した内容を下記の項目に沿ってご入力ください。
      </p>
      <small>* = 入力必須項目</small>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-3'>
          <InputValidation
            id='title'
            inputType='text'
            placeholder='*Job Title'
            error={errors.title!}
            register={register('title', {
              required: '職業を入力してください'
            })}>
            *職業名
          </InputValidation>
        </div>
        <div className='mb-3'>
          <InputValidation
            id='company'
            inputType='text'
            placeholder='*Company'
            error={errors.company!}
            register={register('company', {
              required: '企業名を入力してください'
            })}>
            *企業名
          </InputValidation>
        </div>
        <div className='mb-3'>
          <InputValidation
            id='location'
            inputType='text'
            placeholder='Location'
            error={errors.location!}
            register={register('location')}>
            勤務地域
          </InputValidation>
        </div>
        <div className='mb-3'>
          <InputValidation
            id='from'
            inputType='date'
            placeholder='From Date'
            error={errors.from!}
            register={register('from', {
              required: '日付を入力してください'
            })}>
            *開始日付
          </InputValidation>
        </div>
        <div className='form-check mb-3'>
          <input
            className='form-check-input'
            type='checkbox'
            id='flexCheckDefault'
            {...register('current')}
          />
          <label className='form-check-label' htmlFor='flexCheckDefault'>
            現職ならばチェックを押下してください。
          </label>
        </div>
        <div className='mb-3'>
          <InputValidation
            // 意図的にレンダリングさせるためにwatchメソッドを使用
            disabled={watch('current')}
            id='to'
            inputType='date'
            placeholder='To Date'
            error={errors.to!}
            register={register('to')}>
            終了日付
          </InputValidation>
        </div>
        <div className='mb-3'>
          <TextareaValidation
            id='description'
            placeholder='Job Description'
            error={errors.description!}
            register={register('description')}>
            詳細
          </TextareaValidation>
        </div>
        <Button type='submit' buttonColor='primary' textColor='text-white'>
          Submit
        </Button>
        <Link className='btn btn-info text-white mx-3' to='/dashboard'>
          ダッシュボードに戻る
        </Link>
      </form>
    </Fragment>
  );
};

export default AddExperience;

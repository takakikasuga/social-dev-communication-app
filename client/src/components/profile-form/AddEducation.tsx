import React, { FC, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';

// コンポーネント
import { InputValidation } from '../../components/atoms/index';
import { TextareaValidation } from '../../components/atoms/index';
import { Button } from '../../components/atoms/index';

// スライサー
import { addEducationAsync } from '../../features/profile/profileSlice';

export interface AddEducationValue {
  school: string;
  degree: string;
  fieldofstudy: string;
  from: Date;
  to: Date;
  current: boolean;
  description: string;
}

const AddEducation: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AddEducationValue>({
    mode: 'onBlur',
    defaultValues: { current: false }
  });
  const onSubmit: SubmitHandler<AddEducationValue> = (formData) => {
    console.log('通過しました。');
    console.log('formData', formData);
    dispatch(addEducationAsync({ formData, history }));
  };
  return (
    <Fragment>
      <h1 className='text-primary'>学歴の追加</h1>
      <p>
        <i className='fas fa-code-branch'></i>{' '}
        あなたが参画した学校もしくは教育スクールの内容を下記の項目に沿ってご入力ください。
      </p>
      <small>* = 入力必須項目</small>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-3'>
          <InputValidation
            id='school'
            inputType='text'
            placeholder='*School'
            error={errors.school!}
            register={register('school', {
              required: '所属した学校もしくは教育スクールを入力してください'
            })}>
            *学校もしくは教育スクール名
          </InputValidation>
        </div>
        <div className='mb-3'>
          <InputValidation
            id='degree'
            inputType='text'
            placeholder='*Degree'
            error={errors.degree!}
            register={register('degree', {
              required: '学位もしくは受講した技術分野をご入力してください。'
            })}>
            *学位もしくは受講した技術
          </InputValidation>
        </div>
        <div className='mb-3'>
          <InputValidation
            id='fieldofstudy'
            inputType='text'
            placeholder='Field Of Study'
            error={errors.fieldofstudy!}
            register={register('fieldofstudy')}>
            研究分野
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
            placeholder='Program Description'
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

export default AddEducation;

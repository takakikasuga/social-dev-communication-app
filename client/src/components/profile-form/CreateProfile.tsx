import React, { FC, Fragment, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// コンポーネント
import { Button } from '../atoms/index';
import { SelectValidation, InputValidation } from '../atoms/index';

// スライサー
import { createOrUpdateProfileAsync } from '../../features/profile/profileSlice';

// 共通データ
import { professional } from '../../common/common';

export interface CreateProfileValue {
  company?: string;
  website?: string;
  location?: string;
  status: string;
  skills: string[] | string;
  githubusername?: string;
  bio?: string;
  twitter?: string;
  facebook?: string;
  linkedin?: string;
  youtube?: string;
  instagram?: string;
}

const CreateProfile: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [toggle, setToggle] = useState<boolean>(false);
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateProfileValue>({
    mode: 'onBlur',
    defaultValues: { status: 'default', skills: '' }
  });

  const onSubmit: SubmitHandler<CreateProfileValue> = (formData) => {
    console.log('通過しました。');
    console.log('formData', formData);
    dispatch(createOrUpdateProfileAsync({ formData, history, edit: false }));
  };

  console.log('errors', errors);

  return (
    <Fragment>
      <h1 className='text-primary'>プロフィール登録</h1>
      <p>
        <i className='fas fa-user'></i> プロフィールを登録しよう。
      </p>
      <small>* = required field</small>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-3'>
          <SelectValidation
            register={register('status', {
              required: '職業を選択してください。',
              validate: (value) => {
                return value !== 'default' || '職業一覧から選択してください。';
              }
            })}
            error={errors.status!}
            selects={professional}
          />
        </div>
        <div className='mb-3'>
          <InputValidation
            id='skills'
            inputType='text'
            placeholder='*Skills'
            error={errors.skills!}
            register={register('skills', {
              required: '使用できる技術をご入力ください。'
            })}>
            技術
          </InputValidation>
          <p className='form-text'>
            「,：カンマ」で分けて技術をご入力ください。（例：HTML,CSS,JavaScript）
          </p>
        </div>
        <div className='mb-3'>
          <InputValidation
            id='company'
            inputType='text'
            placeholder='*Company'
            error={errors.company!}
            register={register('company')}>
            企業
          </InputValidation>
          <p className='form-text'>
            よろしければ勤務先もしくは職種をご入力ください。
          </p>
        </div>
        <div className='mb-3'>
          <InputValidation
            id='website'
            inputType='text'
            placeholder='Website'
            error={errors.website!}
            register={register('website')}>
            WEBサイト
          </InputValidation>
          <p className='form-text'>
            よろしければ勤務先の企業サイトをご入力ください。
          </p>
        </div>
        <div className='mb-3'>
          <InputValidation
            id='location'
            inputType='text'
            placeholder='Location'
            error={errors.location!}
            register={register('location')}>
            地域
          </InputValidation>
          <p className='form-text'>
            よろしければお住まいの地域をご入力ください。
          </p>
        </div>
        <div className='mb-3'>
          <InputValidation
            id='githubusername'
            inputType='text'
            placeholder='GitHub UserName'
            error={errors.location!}
            register={register('githubusername')}>
            GitHubのユーザーネーム
          </InputValidation>
          <p className='form-text'>
            もし直近のリポジトリを閲覧したい場合はユーザーネームをご入力ください。
          </p>
        </div>
        <div className='mb-3'>
          <InputValidation
            id='bio'
            inputType='text'
            placeholder='経歴'
            error={errors.location!}
            register={register('bio')}>
            経歴
          </InputValidation>
          <p className='form-text'>
            もし直近のリポジトリを閲覧したい場合はユーザーネームをご入力ください。
          </p>
        </div>
        <div className='mb-3'>
          <Button
            type='button'
            buttonColor='primary'
            textColor='text-white'
            toggleValue={toggle}
            toggleFunc={setToggle}>
            オプション
          </Button>
          <span className='mx-3'>各種SNSの追加</span>
        </div>
        {!toggle ? null : (
          <Fragment>
            <div
              className='mb-3'
              style={{ display: 'flex', alignItems: 'center' }}>
              <InputValidation
                id='twitter'
                inputType='text'
                placeholder='Twitter URL'
                error={errors.twitter!}
                register={register('twitter')}
                classIconName='fab fa-twitter fa-2x p-3'
                styleIconColor={{ color: '#55acee' }}>
                Twitter
              </InputValidation>
            </div>
            <div
              className='mb-3'
              style={{ display: 'flex', alignItems: 'center' }}>
              <InputValidation
                id='facebook'
                inputType='text'
                placeholder='Facebook URL'
                error={errors.facebook!}
                register={register('facebook')}
                classIconName='fab fa-facebook fa-2x p-3'
                styleIconColor={{ color: '#3B5998' }}>
                Facebook
              </InputValidation>
            </div>
            <div
              className='mb-3'
              style={{ display: 'flex', alignItems: 'center' }}>
              <InputValidation
                id='youtube'
                inputType='text'
                placeholder='Youtube URL'
                error={errors.youtube!}
                register={register('youtube')}
                classIconName='fab fa-youtube fa-2x p-3'
                styleIconColor={{ color: '#DA1725' }}>
                Youtube
              </InputValidation>
            </div>
            <div
              className='mb-3'
              style={{ display: 'flex', alignItems: 'center' }}>
              <InputValidation
                id='instagram'
                inputType='text'
                placeholder='Instagram URL'
                error={errors.instagram!}
                register={register('instagram')}
                classIconName='fab fa-instagram fa-2x p-3'
                styleIconColor={{ color: '#CF2E92' }}>
                Instagram
              </InputValidation>
            </div>
            <div
              className='mb-3'
              style={{ display: 'flex', alignItems: 'center' }}>
              <InputValidation
                id='linkedin'
                inputType='text'
                placeholder='Linkedin URL'
                error={errors.linkedin!}
                register={register('linkedin')}
                classIconName='fab fa-linkedin fa-2x p-3'
                styleIconColor={{ color: '#0e76a8' }}>
                Linkedin
              </InputValidation>
            </div>
          </Fragment>
        )}
        <Button type='submit' buttonColor='primary' textColor='text-white'>
          新規登録
        </Button>
        <Link className='btn btn-info text-white mx-3' to='/dashboard'>
          ダッシュボードに戻る
        </Link>
      </form>
    </Fragment>
  );
};

export default CreateProfile;

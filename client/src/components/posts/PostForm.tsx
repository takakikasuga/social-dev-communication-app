import React, { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';

// コンポーネント
import { TextareaValidation, Button } from '../atoms/index';

// スライサー
import { addPostAsync } from '../../features/post/postSlice';

interface AddPostValue {
  text: string;
}

const PostForm: FC = () => {
  const dispatch = useDispatch();
  const {
    watch,
    reset,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AddPostValue>({
    mode: 'onBlur',
    defaultValues: { text: '' }
  });
  const onSubmit: SubmitHandler<AddPostValue> = (formData) => {
    console.log('通過しました。');
    console.log('formData', formData);
    dispatch(addPostAsync(formData));
    reset();
  };
  return (
    <div>
      <div>
        <h3 className='text-primary'>技術をシェアしよう</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextareaValidation
          id='text'
          placeholder=' Create a new post'
          error={errors.text!}
          register={register('text', {
            required: '投稿内容を入力してください。'
          })}>
          投稿内容
        </TextareaValidation>
        <Button type='submit' buttonColor='primary' textColor='text-white'>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default PostForm;

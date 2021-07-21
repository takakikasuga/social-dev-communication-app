import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

// コンポーネント
import { Button, TextareaValidation } from '../atoms/index';

//  スライサー
import { addCommentAsync } from '../../features/post/postSlice';
import { useForm, SubmitHandler } from 'react-hook-form';

interface CommentInputValue {
  text: string;
}

const CommentForm: FC<{ postId: string }> = ({ postId }) => {
  const dispatch = useDispatch();
  const {
    watch,
    reset,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CommentInputValue>({
    mode: 'onBlur',
    defaultValues: { text: '' }
  });
  const onSubmit: SubmitHandler<CommentInputValue> = (formData) => {
    console.log('通過しました。');
    console.log('formData', formData);
    dispatch(addCommentAsync({ postId, formData }));
    reset();
  };
  return (
    <div>
      <div>
        <h3 className='text-primary'>コメントをシェアしよう</h3>
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
          投稿
        </Button>
      </form>
    </div>
  );
};

export default CommentForm;

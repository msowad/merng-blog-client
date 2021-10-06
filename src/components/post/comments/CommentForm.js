import { useMutation } from '@apollo/client';
import React from 'react';
import { CREATE_COMMENT } from '../../../graphql/post';
import { Form, FormError, SubmitButton, useForm } from '../../useForm';

const initialFormData = {
  body: '',
};

const CommentForm = ({ postId }) => {
  const { error, resetForm, setError, handleChange, formData } =
    useForm(initialFormData);
  const [addComment, { loading: addingComment }] = useMutation(CREATE_COMMENT, {
    update() {
      resetForm();
    },
    onError(err) {
      setError(err.message);
    },
    variables: { ...formData, id: postId },
  });

  return (
    <div className='flex mt-2'>
      <img
        className='h-10 w-10 mr-4 rounded-full'
        src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60'
        alt=''
      />
      <Form onSubmit={addComment} className='w-full'>
        <textarea
          name='body'
          value={formData.body}
          onChange={handleChange}
          className='input w-full mb-2'
          rows={2}
        />
        <FormError error={error} />
        <div className='text-right mt-2'>
          <SubmitButton loading={addingComment} text='Add comment' submit />
        </div>
      </Form>
    </div>
  );
};

export default CommentForm;

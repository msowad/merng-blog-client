import React, { Fragment, useState } from 'react';
import { TrashIcon } from '@heroicons/react/solid';
import { useMutation } from '@apollo/client';
import { DELETE_POST, GET_POSTS } from '../../graphql/post';
import { useHistory } from 'react-router';
import ConfirmDialog from '../ConfirmDialog';

const DeleteButton = ({ postId }) => {
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const [deletePost, { loading }] = useMutation(DELETE_POST, {
    update(proxy) {
      const data = proxy.readQuery({ query: GET_POSTS });
      const posts = data.posts.filter(p => p.id !== postId);
      proxy.writeQuery({ query: GET_POSTS, data: { posts } });
      setOpen(false);
      history.push('/');
    },
    // TODO: toast notification on error
    onError(err) {
      console.log(err);
    },
    variables: { postId: postId },
  });

  const confirmDeletePost = () => {
    setOpen(true);
  };

  return (
    <>
      <button onClick={confirmDeletePost} className='btn danger py-2'>
        <TrashIcon className='w-5' />
      </button>
      <ConfirmDialog
        open={open}
        setOpen={setOpen}
        onDelete={deletePost}
        loading={loading}
        title='Delete post'
      >
        Are you sure you want to delete your post? This action cannot be undone.
      </ConfirmDialog>
    </>
  );
};

export default DeleteButton;

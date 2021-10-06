import moment from 'moment';
import React, { useState } from 'react';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { DotsVerticalIcon, TrashIcon } from '@heroicons/react/solid';
import { DELETE_COMMENT } from '../../../graphql/post';
import { useMutation } from '@apollo/client';
import ConfirmDialog from '../../ConfirmDialog';

const PostComments = ({ comments, postId, username }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [confirmingCommentID, setConfirmingCommentID] = useState(null);

  const confirmDelete = id => {
    setConfirmingCommentID(id);
    setOpenDialog(true);
  };

  const [deleteComment, { loading }] = useMutation(DELETE_COMMENT, {
    update(proxy) {
      setOpenDialog(false);
    },
    // TODO: toast notification on error
    onError(err) {
      console.log(err);
    },
    variables: { id: confirmingCommentID, postId: postId },
  });

  return (
    <div className='space-y-4'>
      {comments.map(comment => (
        <div key={comment.id}>
          <div className='flex items-center'>
            <img
              className='h-10 w-10 rounded-full mr-4'
              src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60'
              alt=''
            />
            <div className='flex justify-between w-full'>
              <div>
                <h5 className='text-sm font-medium text-gray-900 capitalize'>
                  {comment.username}
                </h5>
                <p className='text-sm text-gray-500'>
                  {moment(comment.createdAt).fromNow()}
                </p>
              </div>
              {comment.username === username && (
                <Menu as='div' className='relative inline-block text-left'>
                  <Menu.Button className='p-1 btn icon outline primary'>
                    <DotsVerticalIcon className='w-5' />
                  </Menu.Button>

                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none py-1.5'>
                      <Menu.Item>
                        <button
                          onClick={() => confirmDelete(comment.id)}
                          className='text-left inline-flex hover:bg-red-100 text-red-600 w-full px-4 py-2 text-sm font-semibold '
                        >
                          <TrashIcon className='w-5 mr-2' />
                          Delete
                        </button>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              )}
            </div>
          </div>
          <p className='mt-2 ml-14 font-medium text-gray-700'>{comment.body}</p>
        </div>
      ))}
      <ConfirmDialog
        open={openDialog}
        setOpen={setOpenDialog}
        title='Delete Comment'
        onDelete={deleteComment}
        loading={loading}
      >
        Are you sure you want to delete your post? This action cannot be undone.
      </ConfirmDialog>
    </div>
  );
};

export default PostComments;

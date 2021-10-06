import { ChatAlt2Icon, ThumbUpIcon } from '@heroicons/react/solid';
import moment from 'moment';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import LikeButton from './LikeButton';

const Post = ({ post }) => {
  const { user } = useContext(AuthContext);

  return (
    <div className='shadow-lg rounded-lg hover:shadow-2xl bg-white transition'>
      <Link to={`/posts/${post.id}`}>
        <img
          src='https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
          alt=''
          className='w-full object-cover bg-gray-100 rounded-t-lg'
        />
      </Link>
      <div className='px-4 py-5 space-y-2'>
        <div className='flex items-center mb-4'>
          <div className='flex-shrink-0 h-10 w-10'>
            <img
              className='h-10 w-10 rounded-full'
              src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60'
              alt=''
            />
          </div>
          <div className='ml-4'>
            <div className='text-sm font-medium text-gray-900 capitalize'>
              {post.username}
            </div>
            <div className='text-sm text-gray-500'>
              {moment(post.createdAt).fromNow()}
            </div>
          </div>
        </div>
        <Link to={`/posts/${post.id}`} className='text-xl font-medium'>
          {post.title}
        </Link>
        <p className='text-sm font-medium'>
          {post.body.length > 70
            ? `${post.body.substring(0, 70)}...`
            : post.body}
        </p>
        <div className='flex items-center justify-between'>
          <div className='flex items-center text-md'>
            <ThumbUpIcon className='mr-1 w-5 text-indigo-600' />
            <p>
              {post.likesCount} like{post.likesCount > 1 && 's'}
            </p>
            <ChatAlt2Icon className='ml-2 mr-1 w-5 text-indigo-600' />
            <p>
              {post.commentsCount} comment{post.commentsCount > 1 && 's'}
            </p>
          </div>
          <LikeButton
            postId={post.id}
            likes={post.likes}
            username={user?.username}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;

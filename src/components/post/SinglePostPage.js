import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { GET_POST } from '../../graphql/post';
import ErrorCard from '../ErrorCard';
import { Link } from 'react-router-dom';
import {
  ArrowLeftIcon,
  ChatAlt2Icon,
  ThumbUpIcon,
} from '@heroicons/react/solid';
import moment from 'moment';
import LikeButton from './LikeButton';
import { AuthContext } from '../../context/auth';
import DeleteButton from './DeleteButton';
import PostComments from './comments/PostComments';
import CommentForm from './comments/CommentForm';

const SinglePostPage = ({ match }) => {
  const { user } = useContext(AuthContext);
  const postId = match.params.postId;
  const { loading, error, data, refetch } = useQuery(GET_POST, {
    variables: { postId },
  });
  const post = data?.post;

  return (
    <div>
      {error && (
        <ErrorCard refetch={refetch} text='Post not found'>
          <Link to='/' className='btn primary outline py-2'>
            <ArrowLeftIcon className='w-5 mr-1' />
            See all post
          </Link>
        </ErrorCard>
      )}
      {loading && (
        <div className='animate-pulse rounded-md shadow-2xl max-w-4xl mx-auto bg-white'>
          <div className='h-60 rounded-t-md bg-gray-400'></div>
          <div className='px-4 py-5 space-y-4'>
            <div className='flex items-center mb-4'>
              <div className='rounded-full h-10 w-10 bg-gray-400'></div>
              <div className='ml-4'>
                <div className='w-14 h-2 bg-gray-400 rounded-lg mb-2'></div>
                <div className='w-16 h-2 bg-gray-400 rounded-lg'></div>
              </div>
            </div>
            <div className='flex justify-between'>
              <div className='w-1/4 h-2 bg-gray-400 rounded-lg mb-2'></div>
              <div className='w-20 h-2 bg-gray-400 rounded-lg mb-2'></div>
            </div>
            <div className='w-1/2 h-8 bg-gray-400 rounded-lg mb-2'></div>
            {[1, 2, 3, 4].map(i => (
              <React.Fragment key={i}>
                <div className='h-2 bg-gray-400 rounded-lg mb-2'></div>
                <div className='w-5/6 h-2 bg-gray-400 rounded-lg mb-2'></div>
                <div className='w-4/5 h-2 bg-gray-400 rounded-lg mb-2'></div>
                <div className='w-3/4 h-2 bg-gray-400 rounded-lg mb-2'></div>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
      {post && (
        <div className='rounded-md shadow-2xl max-w-4xl mx-auto bg-white'>
          <img
            src='https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=800'
            alt=''
            className='w-full object-cover bg-gray-100 rounded-t-lg'
          />
          <div className='p-8 rounded-b-md'>
            <div className='flex items-center'>
              <img
                className='h-10 w-10 rounded-full'
                src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60'
                alt=''
              />
              <div className='ml-4'>
                <div className='text-sm font-medium text-gray-900 capitalize'>
                  {post.username}
                </div>
                <div className='text-sm text-gray-500'>
                  {moment(post.createdAt).fromNow()}
                </div>
              </div>
            </div>
            <div className='flex items-center justify-between my-4'>
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
              <div className='flex items-center space-x-2'>
                <LikeButton
                  postId={post.id}
                  likes={post.likes}
                  username={user?.username}
                  large
                />
                {post.username === user?.username && (
                  <DeleteButton postId={post.id} />
                )}
              </div>
            </div>
            <p className='text-xl sm:text-3xl font-medium'>{post.title}</p>
            <p className='mt-4 font-medium text-gray-700'>{post.body}</p>
          </div>
          <hr />
          <div className='p-8'>
            <h5 className='text-xl font-semibold'>
              Comments({post.commentsCount})
            </h5>
            <CommentForm postId={post.id} />
            <div className='space-y-4 mt-6'>
              {post.comments && (
                <PostComments
                  username={user?.username}
                  postId={post.id}
                  comments={post.comments}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePostPage;

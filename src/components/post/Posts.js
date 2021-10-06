import { useQuery } from '@apollo/client';
import React, { useState, useContext } from 'react';
import Post from './Post';
import PostSkeleton from '../PostSkeleton';
import ErrorCard from '../ErrorCard';
import PostForm from './PostForm';
import { GET_POSTS } from '../../graphql/post';
import { AuthContext } from '../../context/auth';

const Posts = () => {
  const { loading, error, data, refetch } = useQuery(GET_POSTS);
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-2xl font-medium text-gray-900'>Recent posts</h2>
        {user && (
          <button
            onClick={() => setOpen(true)}
            className='btn primary filled py-2'
          >
            Add post
          </button>
        )}
      </div>
      {user && <PostForm open={open} setOpen={setOpen} />}

      {error && <ErrorCard refetch={refetch} text={error?.message} />}
      {!loading && !error && !data?.posts?.length && (
        <ErrorCard text='No posts found' />
      )}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {loading &&
          [75, 150, 300, 700].map(d => <PostSkeleton key={d} delay={d} />)}
        {data?.posts?.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Posts;

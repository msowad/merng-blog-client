import React from 'react';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router';
import { LIKE_POST } from '../../graphql/post';
import { SubmitButton } from '../useForm';

const LikeButton = ({ postId, likes, username, large }) => {
  const history = useHistory();

  const like = () => {
    username ? likePost() : history.push('/login');
  };

  const [likePost, { loading }] = useMutation(LIKE_POST, {
    // TODO: toast notification on error
    onError(err) {
      console.log(err);
    },
    variables: { postId: postId },
  });

  const liked = () => username && likes[0]?.username === username;
  return (
    <SubmitButton
      onClick={like}
      loading={loading}
      small={!large}
      type={liked() ? 'filled' : 'outline'}
      text='like'
    />
  );
};

export default LikeButton;

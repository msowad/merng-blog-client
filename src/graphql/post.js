import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query {
    posts {
      id
      title
      body
      createdAt
      username
      commentsCount
      likesCount
      likes {
        username
      }
    }
  }
`;

export const GET_POST = gql`
  query ($postId: ID!) {
    post(postId: $postId) {
      id
      title
      body
      createdAt
      username
      commentsCount
      likesCount
      likes {
        username
      }
      comments {
        id
        body
        username
        createdAt
      }
    }
  }
`;

export const ADD_POST = gql`
  mutation createPost($title: String!, $body: String!) {
    createPost(title: $title, body: $body) {
      id
      title
      body
      createdAt
      username
      commentsCount
      likesCount
      likes {
        username
      }
    }
  }
`;

export const LIKE_POST = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likesCount
      likes {
        username
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export const CREATE_COMMENT = gql`
  mutation createComment($id: ID!, $body: String!) {
    createComment(postId: $id, body: $body) {
      id
      comments {
        id
        body
        username
        createdAt
      }
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($id: ID!, $postId: ID!) {
    deleteComment(postId: $postId, commentId: $id) {
      id
      comments {
        id
        body
        username
        createdAt
      }
    }
  }
`;

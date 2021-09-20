import React from 'react'
import Post from '../interfaces';
import PostListItem from './PostListItem';

interface Props {
  posts: Post[];
}
const PostList: React.FC<Props> = ({ posts }) => {
  return (
      
      <div >
        Post {posts[0].userName}
        <PostListItem />
      </div>
      )
}
export default PostList;
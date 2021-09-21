import React from 'react'
import Post from '../interfaces';
import PostListItem from './PostListItem';
import { Virtuoso } from 'react-virtuoso'


interface Props {
  posts: Post[];
}

const PostList: React.FC<Props> = ({ posts }) => {
  return (
      
    <div >
      <Virtuoso
        style={{ height: "800px", width: "70%" }}
        totalCount={100}
        itemContent={(index) => <div>
          {posts.map(post => 
            <PostListItem 
              key={post.id} 
              username={post.userName} 
              img={post.userProfileImgUrl}
              comment={post.comment}
              postedOn={post.postedOn}
            />)}
          </div>}
      />  
    </div>
      )
}

export default PostList;
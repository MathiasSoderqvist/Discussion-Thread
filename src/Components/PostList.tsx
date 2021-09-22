import React from 'react'
import Post from '../interfaces';
import PostListItem from './PostListItem';
import { Virtuoso } from 'react-virtuoso'


interface Props {
  posts: Post[];
  filter: boolean;
}

const PostList: React.FC<Props> = ({ posts, filter }) => {

  return (
      
    <div >
      <Virtuoso
        style={{ height: "675px", width: "80%" }}
        totalCount={100}
        itemContent={(index) => <div>
          {filter ? posts.filter((post) => post.validated).map((post, index) => 
            <PostListItem 
              key={index} 
              username={post.userName} 
              img={post.userProfileImgUrl}
              comment={post.comment}
              postedOn={post.postedOn}
            />) 
            : posts.map(post => 
            <PostListItem 
              key={index+1*Math.random()} 
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


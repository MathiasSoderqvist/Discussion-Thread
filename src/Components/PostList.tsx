import React, { useRef } from 'react'
import Post from '../interfaces';
import PostListItem from './PostListItem';
import NumberPicker from './NumberPicker';
import { Virtuoso } from 'react-virtuoso'

interface Props {
  posts: Post[];
  filter: boolean;
  focusClicked: boolean;
}

const PostList: React.FC<Props> = ({ posts, filter, focusClicked }) => {
  const virtuoso = useRef(null);
  
  return (
      
    <div >
      <Virtuoso
        style={{ height: focusClicked ? "400px": "620px", width: "80%" }}
        totalCount={100}
        ref={virtuoso}
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
      <NumberPicker virtuoso={virtuoso}/>
    </div>
      )
}

export default PostList;


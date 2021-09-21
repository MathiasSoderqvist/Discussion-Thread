import React from 'react'

interface Props {
  username: string;
  img: string;
  comment: string;
  postedOn: string;
}

const PostListItem: React.FC<Props> = ({ username, img, comment, postedOn }) => {
  return (
    <div>
      <p>{postedOn}</p>
      <img src={img} alt="profile-pic"/>
      <p>{username}</p>
      <p>{comment}</p>
      <hr />   
      </div>
  )
}
export default PostListItem;
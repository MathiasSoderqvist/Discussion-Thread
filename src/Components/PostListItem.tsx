import React from 'react';
import { makeStyles } from '@mui/styles'
import moment from 'moment';

interface Props {
  username: string;
  img: string;
  comment: string;
  postedOn: string;
}

const useStyles = makeStyles({
  top: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '2rem',
  },
  img: {
    borderRadius: '50%',
    float: 'left',
    maxHeight: '60px',
    marginTop: '10px',
  },
  time: {
    color: '#636363',
  },
  comment: {
    marginLeft: '8%',
    marginRight: '5%',
    marginBottom: '5%',
  },
  username: {
    marginLeft: '3%',
  },
  line: {
    border: '1px solid #eaeaea'
  },
})

const PostListItem: React.FC<Props> = ({ username, img, comment, postedOn }) => {

  const classes = useStyles();

  return (
    <div>
      <div > 
      <img src={img} alt="profile-pic" className={classes.img}/>
      <div className={classes.top}>
        <h3 className={classes.username}>{username}</h3>
        <p className={classes.time}>{moment(postedOn, "YYYYMMDD").fromNow()}</p>
      </div>
      </div>
      <p className={classes.comment}>{comment}</p>
      <hr className={classes.line}/>   
      </div>
  )
}


export default PostListItem;
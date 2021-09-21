import React from 'react'
import { makeStyles } from '@mui/styles'
import Button from '@mui/material/Button';
import ReplyTwoToneIcon from '@mui/icons-material/ReplyTwoTone';

const useStyles = makeStyles({
  root: {
    float: 'right',
  },
});

const CommentBtn: React.FC = () => {

  const classes = useStyles();
  return (
    <div className={classes.root}> 
      <Button variant="contained">
        <ReplyTwoToneIcon />
        Comment</Button>
    </div>
  )
}

export default CommentBtn;
import React from 'react'
import { makeStyles } from '@mui/styles'
import Button from '@mui/material/Button';
import ReplyTwoToneIcon from '@mui/icons-material/ReplyTwoTone';

const useStyles = makeStyles({
  root: {
    float: 'right',
    position: 'absolute',
    bottom: '76%',
    left: '85%',
  },
  icon: {
    marginRight: '0.7rem',
  },
  button: {
    
  },
});

const CommentBtn: React.FC = () => {

  const classes = useStyles();
  return (
    <div className={classes.root}> 
      <Button variant="contained" className={classes.button}>
        <ReplyTwoToneIcon className={classes.icon}/>
        Comment
        </Button>
    </div>
  )
}

export default CommentBtn;
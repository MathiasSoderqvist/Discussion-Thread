import React from 'react'
import { makeStyles } from '@mui/styles'
import ReplyTwoToneIcon from '@mui/icons-material/ReplyTwoTone';

interface Props {
  handleFocus : () => void;
}

const useStyles = makeStyles({
  root: {
    float: 'right',
    position: 'fixed',
    bottom: '76%',
    left: '85%',
  },
  icon: {
    marginRight: '0.7rem',
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#e6f2ff',
    border: 0,
    borderRadius: 6,
    boxShadow: 'none',
    color: '#0092DB',
    minHeight: 48,
    marginTop: '5%',
    marginBottom: '5%',
    fontWeight: 'bold',
    padding: '0 30px',
    fontSize: '1em',
    transition: "background 0.5s, color 0.5s, border 0.5s",
    "&:hover": {
    backgroundColor: "#F0F0F0",
    color: "#0092DB"
    },
  },
});

const CommentBtn: React.FC<Props> = ({ handleFocus }) => {

  const clickHandler = () => {
    handleFocus();
  }

  const classes = useStyles();
  return (
    <div className={classes.root}> 
      <button 
        className={classes.button} 
        onClick={()=>{
        clickHandler()}
      }>
      <ReplyTwoToneIcon className={classes.icon}/>
        Comment
      </button>
    </div>
  )
}

export default CommentBtn;
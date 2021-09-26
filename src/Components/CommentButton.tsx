import React from 'react';
import { makeStyles } from '@mui/styles';
import ReplyTwoToneIcon from '@mui/icons-material/ReplyTwoTone';

interface Props {
  handleFocus : () => void;
  focusClicked: boolean;
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
    transition: 'background 0.5s, color 0.5s, border 0.5s',
    '&:hover': {
      backgroundColor: '#F0F0F0',
      color: '#0092DB',
    },
  },
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const CommentButton = ({ handleFocus, focusClicked }: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <button
        type="button"
        className={classes.button}
        style={{ backgroundColor: focusClicked ? '#FF7F7F' : '#e6f2ff', color: focusClicked ? '#FFF' : '#0092DB' }}
        onClick={() => {
          handleFocus();
        }}
      >
        <ReplyTwoToneIcon className={classes.icon} />
        {focusClicked ? 'Close' : 'Comment'}
      </button>
    </div>
  );
};

export default CommentButton;

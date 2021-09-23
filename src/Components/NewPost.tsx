import React, { useEffect, useRef } from 'react'
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles'
import IconButton from '@mui/material/IconButton';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';

interface Props {
  createPost: (body: Object) => void;
  focusClicked: boolean;
}

const useStyles = makeStyles({
  container: {
    marginTop: '5%',
    marginLeft: '10%',
  },
  textfield: {
    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;',
    bottom: '25px',
  }
});

const NewPost: React.FC<Props> = ({ createPost, focusClicked }) => {
  const [comment, setComment] = React.useState('');
  const validated = true;
  const userName = 'You';
  const userProfileImgUrl = 'https://cdn.fakercloud.com/avatars/arthurholcombe1_128.jpg';
  const postedOn = new Date();
  const focusInput = useRef();
  const classes = useStyles();

    const handleSubmit = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      let input = { userName, userProfileImgUrl, comment, validated, postedOn };
        createPost(input);
        setComment('');
    }
    
    const onInputChange = (e: React.FormEvent<HTMLDivElement> ) => {
      const target = e.target as HTMLTextAreaElement;
      setComment(target.value);
    };

    useEffect(() => {
      focusOn(focusInput);
    }, [focusClicked]);

    const focusOn = (ref: React.MutableRefObject<any>) => {
      ref.current.focus();
    };

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
      <TextField
          className={classes.textfield}
          id="outlined-multiline-static"
          label="Reply.."
          inputRef={focusInput}
          value={comment}
          multiline
          rows={8}
          size="medium"
          sx={{ width: '75%' }}
          onSubmit={handleSubmit}
          InputProps={{endAdornment: 
            <IconButton 
              size="large"
              color="primary"
              type="submit"
              >
              <SendTwoToneIcon />
            </IconButton>}}
          onInput={(e)=> onInputChange(e)}
        />
      </form>
    </div>
  )
}
export default NewPost;

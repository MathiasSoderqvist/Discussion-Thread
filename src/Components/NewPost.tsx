import React from 'react'
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles'
import IconButton from '@mui/material/IconButton';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';

interface Props {
  createPost: (body: any) => void;
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

const NewPost: React.FC<Props> = ({ createPost }) => {
  const [comment, setComment] = React.useState('');
  const validated = true;
  const userName = 'You';
  const userProfileImgUrl = 'https://source.unsplash.com/random';

  const classes = useStyles();

    const handleSubmit = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      let input = { userName, userProfileImgUrl, comment, validated }
        createPost(input);
        setComment('');
    }
    
    const onInputChange = (e: React.FormEvent<HTMLDivElement> ) => {
      const target = e.target as HTMLTextAreaElement;
      setComment(target.value);
    };

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
      <TextField
          className={classes.textfield}
          id="outlined-multiline-static"
          label="Reply.."
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

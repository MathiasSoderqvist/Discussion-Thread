import React, {useState} from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  text: {
    marginLeft: '8%',
    marginRight: '5%',
    marginBottom: '5%',
  },
  readOrHide: {
    color: 'rgb(192,192,192)',
    cursor: 'pointer',
  },

});

const ReadMore: React.FC = ({ children }) => {
  const classes = useStyles();
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const sliced = (text: any) => {
    return text.slice(0, 450);
  } 

  return (
    <div>
      <p className={classes.text}>
        {isReadMore ? sliced(text) : text}
        <span onClick={toggleReadMore} className={classes.readOrHide}>
        {isReadMore ? "...read more" : ""}
      </span>
      </p>
    </div>
    
  );
};

export default ReadMore;
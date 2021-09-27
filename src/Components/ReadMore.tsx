/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
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

  const toggleReadMoreKey = (e: { keyCode: number; }) => {
    if (e.keyCode === 13) {
      setIsReadMore(!isReadMore);
    }
  };

  const sliced = (textToSlice: any) => textToSlice.slice(0, 400);
  return (
    <div>
      <p>
        {isReadMore ? sliced(text) : text}
        <span role="button" tabIndex={0} onClick={toggleReadMore} className={classes.readOrHide} onKeyDown={toggleReadMoreKey}>
          {isReadMore ? '...read more' : 'hide'}
        </span>
      </p>
    </div>
  );
};

export default ReadMore;

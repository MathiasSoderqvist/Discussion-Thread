import React from 'react';
import { makeStyles } from '@mui/styles';
import TuneIcon from '@mui/icons-material/Tune';

interface Props {
  filterValidated: () => void;
  filter: boolean;
}

const useStyles = makeStyles({
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#F0F0F0',
    border: 0,
    borderRadius: 6,
    boxShadow: 'none',
    color: '#0092DB',
    minHeight: 48,
    marginTop: '3%',
    marginBottom: '5%',
    fontWeight: 'bold',
    padding: '0 30px',
    fontSize: '1em',
    transition: 'background 0.5s, color 0.5s, border 0.5s',
    '&:hover': {
      backgroundColor: '#e6f2ff',
      color: '#0092DB',
    },
  },
  text: {
    marginLeft: '25%',
  },
  filtered: {
    backgroundColor: '#f9f9f9',
    backgroundImage: 'radial-gradient(#e9fce9, #cdffcd)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    border: 0,
    borderRadius: 6,
    boxShadow: 'none',
    color: '#0092DB',
    minHeight: 48,
    marginTop: '3%',
    marginBottom: '5%',
    fontWeight: 'bold',
    padding: '0 30px',
    fontSize: '1em',
    transition: 'background 0.5s, color 0.5s, border 0.5s',
    '&:hover': {
      backgroundColor: '#e6f2ff',
      color: '#0092DB',
    },
  },
});

const Filter = ({ filterValidated, filter }: Props) => {
  const classes = useStyles();
  return (
    <div>
      <div>
        <button type="button" onClick={() => filterValidated()} className={filter ? classes.filtered : classes.button}>
          <TuneIcon />
          <p className={classes.text}>Filter</p>
        </button>
      </div>
    </div>
  );
};
export default Filter;

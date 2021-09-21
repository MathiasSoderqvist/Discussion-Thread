import React from 'react'
import { makeStyles } from '@mui/styles'
import TuneIcon from '@mui/icons-material/Tune';

const useStyles = makeStyles({
  root: {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  backgroundColor: '#ELELEL',
  border: 0,
  borderRadius: 6,
  boxShadow: 'none',
  color: '#0092DB',
  minHeight: 48,
  marginTop: '5%',
  marginBottom: '5%',
  fontWeight: 'bold',
  padding: '0 30px',
  },
  text: {
    marginLeft: '25%',
  },
});

const Filter: React.FC = () => {

  const classes = useStyles();
  return (
    <div> 
      <button className={classes.root}>
      <TuneIcon />
      <p className={classes.text}>Filter</p>
      </button>
    </div>
  )
}
export default Filter;

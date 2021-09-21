import React from 'react'
import { makeStyles } from '@mui/styles'
import TuneIcon from '@mui/icons-material/Tune';

interface Props {
  filterValidated: () => void;
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
  marginTop: '5%',
  marginBottom: '5%',
  fontWeight: 'bold',
  padding: '0 30px',
  fontSize: '1em',
  transition: "background 0.5s, color 0.5s, border 0.5s",
  "&:hover": {
  backgroundColor: "#e6f2ff",
  color: "#0092DB"
  },
  },
  text: {
    marginLeft: '25%',
  },
});

const Filter: React.FC<Props> = ({ filterValidated }) => {

  const classes = useStyles();
  return (
    <div> 
      <button onClick={() => filterValidated()} className={classes.button}>
      <TuneIcon />
      <p className={classes.text}>Filter</p>
      </button>
    </div>
  )
}
export default Filter;

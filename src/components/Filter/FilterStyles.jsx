import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  Filter: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginBottom: '20px',
    fontSize: '20px',
    width: '450px',
    '& input': {
      width: '250px',
      border: '1px solid black',
      borderRadius: '10px',
      paddingLeft: '15px',
      fontSize: '15px',
      '&:hover, &:focus': {
        outline: 'none',
      },
    },
  },
});
export default useStyles;

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  Filter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
    fontSize: '20px',
    position: 'relative',
    '& input': {
      width: '250px',
      height: '25px',
      border: '1px solid black',
      borderRadius: '10px',
      paddingLeft: '15px',
      paddingRight: '30px',
      fontSize: '15px',
      '&:hover, &:focus': {
        outline: 'none',
      },
    },
  },
  icon: {
    position: 'absolute',
    top: 1,
    right: '33px',
    width: '23px',
    height: '15px',
    backgroundColor: 'white',
  },
});
export default useStyles;

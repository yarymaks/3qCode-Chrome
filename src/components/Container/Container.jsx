import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  Container: {
    width: '300px',
    textAlign: 'center',
  },
});

const Container = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.Container}>{children}</div>;
};

export default Container;

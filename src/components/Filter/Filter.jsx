import React from 'react';
import useStyles from './FilterStyles';
const Filter = ({ value, onChange }) => {
  const classes = useStyles();
  return (
    <label className={classes.Filter}>
      <span>Find serial</span>
      <input type="text" value={value} onChange={onChange} />
    </label>
  );
};
export default Filter;

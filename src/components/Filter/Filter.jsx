import React from 'react';
import useStyles from './FilterStyles';
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';

const Filter = ({ value, onChange }) => {
  const classes = useStyles();
  return (
    <>
      <h2>Find serial</h2>
      <label className={classes.Filter}>
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Search"
          maxLength="10"
        />
        <div className={classes.icon}>
          <SearchIcon />
        </div>
      </label>
    </>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;

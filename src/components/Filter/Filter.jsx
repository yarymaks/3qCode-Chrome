import React from 'react';
import useStyles from './FilterStyles';
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';

const Filter = ({ value, onChange }) => {
  const classes = useStyles();
  return (
    <>
      <h2>Find serial</h2>
      <label className={classes.Filter} htmlFor="search">
        <input
          id="search"
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Search"
          maxLength="10"
        />
        <div data-testid="icon" className={classes.icon}>
          <SearchIcon />
        </div>
      </label>
    </>
  );
};

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Filter;

import React from 'react';
import PropTypes from 'prop-types';

const SecondTab = ({ result }) => {
  return (
    <>
      <h2>Counter of serials on year</h2>
      <ul>
        {Object.keys(result).map(key => {
          return (
            <li key={Math.random()}>
              <p>
                {result[key]} serial{result[key] > 1 ? 's' : ''} in year
                {'  '} : {'  '}
                {key}
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

SecondTab.propTypes = {
  result: PropTypes.shape({ key: PropTypes.string }).isRequired,
};

export default SecondTab;

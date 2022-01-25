import React from 'react';
import PropTypes from 'prop-types';

const OneSerial = ({ smallestSerial }) => {
  return (
    <div>
      <h2>Serial</h2>
      <img src={smallestSerial.image} alt={smallestSerial.name} width="250px" />
      <a href={`${smallestSerial.url ? smallestSerial.url : ''}`}>
        <p>Title: {smallestSerial.name ? smallestSerial.name : ''}</p>
      </a>
      <p>Runtime: {smallestSerial.runtime ? smallestSerial.runtime : ''}</p>
      <p>Type: {smallestSerial.type ? smallestSerial.type : ''}</p>
      <p>
        Premier:
        {smallestSerial.premiered ? smallestSerial.premiered : ''}
      </p>
    </div>
  );
};
OneSerial.propTypes = {
  smallestSerial: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
      premiered: PropTypes.string,
      url: PropTypes.string,
      image: PropTypes.string,
      runtime: PropTypes.number,
    }),
  ).isRequired,
};
export default OneSerial;

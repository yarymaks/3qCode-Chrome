import React from 'react';
import PropTypes from 'prop-types';
const TwoSerials = ({ smallestSerial, biggestSerial }) => {
  return (
    <div>
      <div>
        <h2>The biggest serial</h2>
        <img src={biggestSerial.image} alt={biggestSerial.name} width="250px" />
        <a href={`${biggestSerial.url}`}>
          <p>Title: {biggestSerial.name ? biggestSerial.name : ''}</p>
        </a>
        <p>Runtime: {biggestSerial.runtime ? biggestSerial.runtime : ''}</p>
        <p>Type: {biggestSerial.type ? biggestSerial.type : ''}</p>
        <p>
          Premier:
          {biggestSerial.premiered ? biggestSerial.premiered : ''}
        </p>
      </div>
      <div>
        <h2>The smallest serial</h2>
        <img
          src={smallestSerial.image}
          alt={smallestSerial.name}
          width="250px"
        />
        <a href={`${smallestSerial.url}`}>
          <p>Title: {smallestSerial.name ? smallestSerial.name : ''}</p>
        </a>
        <p>Runtime: {smallestSerial.runtime ? smallestSerial.runtime : ''}</p>
        <p>Type: {smallestSerial.type ? smallestSerial.type : ''}</p>
        <p>
          Premier:
          {smallestSerial.premiered ? smallestSerial.premiered : ''}
        </p>
      </div>
    </div>
  );
};

TwoSerials.propTypes = {
  smallestSerial: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    premiered: PropTypes.string,
    url: PropTypes.string,
    image: PropTypes.string,
    runtime: PropTypes.number,
  }).isRequired,
  biggestSerial: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    premiered: PropTypes.string,
    url: PropTypes.string,
    image: PropTypes.string,
    runtime: PropTypes.number,
  }).isRequired,
};

export default TwoSerials;

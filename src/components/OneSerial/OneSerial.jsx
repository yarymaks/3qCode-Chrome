import React from 'react';

const OneSerial = ({ smallestSerial }) => {
  return (
    <div>
      <h2>Serial</h2>
      <img src={smallestSerial.image} alt={smallestSerial.name} width="250px" />
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
  );
};
export default OneSerial;

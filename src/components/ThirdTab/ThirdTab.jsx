import React from 'react';

const ThirdTab = ({ smallestSerial, biggestSerial }) => {
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

export default ThirdTab;

import React from 'react';
import OneSerial from '../OneSerial';
import TwoSerials from '../TwoSerials';

const ThirdTab = ({ smallestSerial, biggestSerial }) => {
  return (
    <>
      {smallestSerial.length !== 0 ? (
        smallestSerial.id === biggestSerial.id ? (
          <OneSerial smallestSerial={smallestSerial} />
        ) : (
          <TwoSerials
            smallestSerial={smallestSerial}
            biggestSerial={biggestSerial}
          />
        )
      ) : (
        ''
      )}
    </>
  );
};

export default ThirdTab;

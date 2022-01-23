import React from 'react';
import { useState, useEffect } from 'react';

const ThirdTab = ({ serialsData }) => {
  const [runtimeData, setRuntimeData] = useState([]);
  const [smallestSerial, setSmallestSerial] = useState([]);
  const [biggestSerial, setBiggestSerial] = useState([]);

  const runtimeSerials = () => {
    serialsData.map(({ _embedded }) => {
      if (_embedded.show.runtime !== null) {
        let image;
        for (let key in _embedded.show.image) {
          if (key === 'original') image = _embedded.show.image[key];
        }
        const newValue = {
          runtime: _embedded.show.runtime,
          id: _embedded.show.id,
          image: image,
          name: _embedded.show.name,
          type: _embedded.show.type,
          premiered: _embedded.show.premiered,
          url: _embedded.show.url,
        };
        setRuntimeData(prevArray => [...prevArray, newValue]);
      }
    });
  };

  useEffect(() => {
    if (runtimeData.length === 0) {
      runtimeSerials();
    } else if (runtimeData.length !== 0) {
      let biggest = '';
      setSmallestSerial(
        runtimeData.reduce((prev, curr) => {
          return prev.runtime < curr.runtime ? prev : curr;
        }),
      );
      setBiggestSerial(
        runtimeData.reduce((prev, curr) => {
          return prev.runtime > curr.runtime ? prev : curr;
        }),
      );
    }
  }, [runtimeData]);

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

import React from 'react';
import { useState, useEffect } from 'react';

const SecondTab = ({ serialsData }) => {
  const [premiered, setPremiered] = useState([]);
  const result = {};
  const premieredSerials = () => {
    serialsData.map(({ _embedded }) => {
      const newValue = _embedded.show.premiered.slice(0, 4);
      setPremiered(prevArray => [...prevArray, newValue]);
    });
  };

  useEffect(() => {
    premieredSerials();
  }, []);

  const counter = premiered => {
    premiered.forEach(premier => {
      result[premier] = result[premier] + 1 || 1;
    });
  };

  return (
    <>
      <h2>Counter of serials on year</h2>
      <ul>
        {
          (counter(premiered),
          Object.keys(result).map(key => {
            return (
              <li key={Math.random()}>
                <p>
                  {result[key]} serial{result[key] > 1 ? 's' : ''} in year
                  {'  '} : {'  '}
                  {key}
                </p>
              </li>
            );
          }))
        }
      </ul>
    </>
  );
};
export default SecondTab;

import React, { useEffect } from 'react';
import { useState } from 'react';
import { fetchhSerialsCast } from '../../API/serialsAPI';

const FourthTab = ({ smallestSerialCastId, biggestSerialCastId }) => {
  const [castData, setCastData] = useState([]);
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (castData.length === 0) {
      fetchCast();
    }
    if (cast.length === 0) {
      getOldestPerson();
    }
  }, [castData, cast]);

  const fetchCast = async () => {
    try {
      const fetchData = await fetchhSerialsCast(smallestSerialCastId);
      const fetchDataBiggest = await fetchhSerialsCast(biggestSerialCastId);
      const result = Object.assign(fetchData, fetchDataBiggest);
      setCastData(prevArray => [...prevArray, result]);
      setError(false);
    } catch (err) {
      setError(`${err}`);
    }
  };

  const getOldestPerson = () => {
    castData.map(index => {
      setCast(prev => [
        ...prev,
        index.reduce((prevData, currData) => {
          if (currData.birthday !== null) {
            return Math.floor(
              new Date(prevData.person.birthday).getTime() / 1000,
            ) < Math.floor(new Date(currData.person.birthday).getTime() / 1000)
              ? prevData
              : currData;
          }
        }),
      ]);
    });
  };

  return (
    <>
      <h2>Data of oldest person in movies</h2>
      {error && <p>Oops, we have a problem with server : {error} </p>}
      <div>
        {cast.map(cast => {
          return (
            <ul key={cast.person.id}>
              <li>Name: {cast.person.name}</li>
              <li>
                Birthday: {new Date(cast.person.birthday).toLocaleDateString()}
              </li>
            </ul>
          );
        })}
      </div>
    </>
  );
};
export default FourthTab;

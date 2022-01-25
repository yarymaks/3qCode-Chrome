import React, { useEffect } from 'react';
import { useState } from 'react';
import { fetchhSerialsCast } from '../../API/serialsAPI';
import PersonInfo from '../PersonInfo';

const FourthTab = ({ smallestSerialCastId, biggestSerialCastId }) => {
  const [castData, setCastData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchCast();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return (
    <>
      <h2>Data of oldest person in movies</h2>
      {error && <p>Oops, we have a problem with server : {error} </p>}

      <PersonInfo castData={castData} />
    </>
  );
};
export default FourthTab;

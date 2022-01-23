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
      getStackPerson();
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

  const getStackPerson = () => {
    // castData.map(index => {
    //   index.map(personData => {
    //     if (personData.person.birthday !== null) {
    //       const newValue = {
    //         birthday: personData.person.birthday,
    //         id: personData.person.id,
    //         name: personData.person.name,
    //       };
    //       console.log(newValue.birthday);
    //       setCast(prev => [...prev, newValue]);
    //     }
    //   });
    // });
    castData.map(index => {
      setCast(prev => [
        ...prev,
        index.reduce((prevData, currData) => {
          if (currData.birthday !== null) {
            return new Date(prevData.person.birthday) >
              new Date(currData.person.birthday)
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
      {cast.map(cast => {
        return (
          <ul>
            <li>Name: {cast.person.name}</li>
            <li>Birthday: {cast.person.birthday}</li>
          </ul>
        );
      })}
    </>
  );
};
export default FourthTab;

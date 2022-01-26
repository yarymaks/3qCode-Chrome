import React from 'react';
import PropTypes from 'prop-types';

const PersonInfo = ({ castData }) => {
  let personInfo;

  const getOldestPerson = () => {
    const result = [];
    castData.map(index => {
      return result.push(
        index.reduce((prevData, currData) => {
          if (currData.person !== null && prevData !== null) {
            return Math.floor(
              new Date(prevData.person.birthday).getTime() / 1000,
            ) < Math.floor(new Date(currData.person.birthday).getTime() / 1000)
              ? prevData
              : currData;
          }
          return '';
        }),
      );
    });
    return (personInfo = result);
  };

  getOldestPerson();

  return (
    <div>
      {personInfo.map(({ person }) => {
        return (
          <div key={person.id}>
            <p>Name: {person.name}</p>
            <p>Birthday: {new Date(person.birthday).toLocaleDateString()}</p>
          </div>
        );
      })}
    </div>
  );
};

PersonInfo.propTypes = {
  castData: PropTypes.array.isRequired,
};

export default PersonInfo;

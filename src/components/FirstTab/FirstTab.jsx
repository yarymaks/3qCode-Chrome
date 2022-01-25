import React from 'react';
import PropTypes from 'prop-types';
import notAvailable from '../../images/notFound.jpg';

const FirstTab = ({ serials }) => {
  return (
    <ul>
      {serials.map(({ _embedded }) => {
        const poster =
          _embedded.show.image !== null
            ? _embedded.show.image.original
            : notAvailable;
        return (
          <li key={`${_embedded.show.id}${Math.random()}`}>
            <img src={poster} alt={_embedded.show.name} width="250px" />
            <a href={`${_embedded.show.url}`}>
              <p>Title: {_embedded.show.name ? _embedded.show.name : ''}</p>
            </a>
            <p>Type: {_embedded.show.type ? _embedded.show.type : ''}</p>
            <p>
              Premier:
              {_embedded.show.premiered ? _embedded.show.premiered : ''}
            </p>
          </li>
        );
      })}
    </ul>
  );
};

FirstTab.propTypes = {
  serials: PropTypes.arrayOf(
    PropTypes.shape({
      _embedded: PropTypes.objectOf(
        PropTypes.shape({
          show: PropTypes.objectOf(
            PropTypes.shape({
              id: PropTypes.number.isRequired,
              name: PropTypes.string.isRequired,
              type: PropTypes.string.isRequired,
              premiered: PropTypes.string.isRequired,
              url: PropTypes.string.isRequired,
              image: PropTypes.array,
            }),
          ),
        }),
      ).isRequired,
    }),
  ).isRequired,
};

export default FirstTab;

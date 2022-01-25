/* eslint-disable no-undef */
import React from 'react';
import { useState } from 'react';
import FirstTab from '../FirstTab';
import SecondTab from '../SecondTab';
import ThirdTab from '../ThirdTab';
import FourthTab from '../FourthTab';
import TabsList from '../TabsList';
import Filter from '../Filter';

// const optionRender = [<FirstTab />, <SecondTab />, <ThirdTab />, <FourthTab />];

const ExtensionMenu = ({ serialsData }) => {
  const [numberOfMenu, setNumberOfMenu] = useState(0);
  const [filter, setFilter] = useState('');
  const result = {};
  const counter = [];
  let smallestSerial, biggestSerial;

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const normalizedFilter = filter.toLowerCase();

  const filteredSerials = serialsData.filter(serial => {
    return serial._embedded.show.name.toLowerCase().includes(normalizedFilter);
  });

  const premieredSerials = () => {
    const values = [];
    filteredSerials.map(({ _embedded }) => {
      const newValue = _embedded.show.premiered.slice(0, 4);
      return values.push(newValue);
    });
    counter.push(
      values.forEach(premier => {
        result[premier] = result[premier] + 1 || 1;
      }),
    );
  };

  const runtimeSerials = () => {
    const values = [];
    filteredSerials.map(({ _embedded }) => {
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
        values.push(newValue);
      }
      return values;
    });
    smallestSerial = values.reduce((prev, curr) => {
      return prev.runtime < curr.runtime ? prev : curr;
    });
    biggestSerial = values.reduce((prev, curr) => {
      return prev.runtime > curr.runtime ? prev : curr;
    });
    premieredSerials();
  };

  const changeTabs = e => {
    e.preventDefault();
    const buttons = document.querySelector('.tabs__container');
    for (let i = 0; i < buttons.children.length; i++) {
      if (buttons.children[i].classList.contains('active')) {
        buttons.children[i].classList.remove('active');
        e.target.classList.add('active');
        break;
      }
    }
    for (let i = 0; i < buttons.children.length; i++) {
      if (buttons.children[i].classList.contains('active')) {
        setNumberOfMenu(i);
      }
    }
    return e.target.blur();
  };

  const clear = () => {
    for (const prop of Object.keys(result)) {
      delete result[prop];
    }
    counter.splice(0, counter.length);
    smallestSerial = '';
    biggestSerial = '';
  };

  chrome.action.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
  chrome.action.setBadgeText({
    text: `${filteredSerials.length > 0 ? filteredSerials.length + 1 : 0}`,
  });

  filteredSerials.length !== 0 ? runtimeSerials() : clear();

  return (
    <>
      <TabsList changeTabs={changeTabs} />
      <div className="container">
        {numberOfMenu === 0 ? (
          <>
            <Filter value={filter} onChange={changeFilter} />
            {smallestSerial === `` ? (
              `Sorry we haven't data. Try to write other serial`
            ) : (
              <FirstTab serials={filteredSerials} />
            )}
          </>
        ) : numberOfMenu === 1 ? (
          Object.keys(result).length === 0 ? (
            `Sorry we haven't data for this Tab. See information in Tab1`
          ) : (
            <SecondTab result={result} />
          )
        ) : numberOfMenu === 2 ? (
          smallestSerial === `` ? (
            `Sorry we haven't data for this Tab. See information in Tab1`
          ) : (
            <ThirdTab
              smallestSerial={smallestSerial}
              biggestSerial={biggestSerial}
            />
          )
        ) : smallestSerial === '' ? (
          `Sorry we haven't data for this Tab. See information in Tab1`
        ) : (
          <FourthTab
            smallestSerialCastId={smallestSerial.id}
            biggestSerialCastId={biggestSerial.id}
          />
        )}
      </div>
    </>
  );
};
export default ExtensionMenu;

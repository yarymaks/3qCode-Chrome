import React from 'react';
import { useState, useEffect } from 'react';
import FirstTab from '../FirstTab';
import SecondTab from '../SecondTab';
import ThirdTab from '../ThirdTab';
import FourthTab from '../FourthTab';
import TabsList from '../TabsList';
import Filter from '../Filter';

// const optionRender = [<FirstTab />, <SecondTab />, <ThirdTab />, <FourthTab />];

const ExtensionMenu = ({ serialsData }) => {
  const [numberOfMenu, setNumberOfMenu] = useState(0);
  const [runtimeData, setRuntimeData] = useState([]);
  const [smallestSerial, setSmallestSerial] = useState([]);
  const [biggestSerial, setBiggestSerial] = useState([]);

  const [filter, setFilter] = useState('');
  useEffect(() => {
    if (runtimeData.length === 0) {
      runtimeSerials();
    } else if (runtimeData.length !== 0) {
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

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const normalizedFilter = filter.toLowerCase();

  const filteredSerials = serialsData.filter(serial => {
    return serial._embedded.show.name.toLowerCase().includes(normalizedFilter);
  });
  chrome.action.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
  chrome.action.setBadgeText({ text: `${filteredSerials.length + 1}` });
  const runtimeSerials = () => {
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
        setRuntimeData(prevArray => [...prevArray, newValue]);
      }
    });
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
        runtimeSerials();
      }
    }
    return e.target.blur();
  };

  return (
    <>
      <TabsList changeTabs={changeTabs} />
      {numberOfMenu === 0 ? (
        <>
          <Filter value={filter} onChange={changeFilter} />
          <FirstTab serials={filteredSerials} />
        </>
      ) : numberOfMenu === 1 ? (
        <SecondTab serials={filteredSerials} />
      ) : numberOfMenu === 2 ? (
        <ThirdTab
          smallestSerial={smallestSerial}
          biggestSerial={biggestSerial}
        />
      ) : (
        <FourthTab
          smallestSerialCastId={smallestSerial.id}
          biggestSerialCastId={biggestSerial.id}
        />
      )}
    </>
  );
};
export default ExtensionMenu;

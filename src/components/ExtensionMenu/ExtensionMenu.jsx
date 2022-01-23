import React from 'react';
import { useState, useEffect } from 'react';
import FirstTab from '../FirstTab';
import SecondTab from '../SecondTab';
import ThirdTab from '../ThirdTab';
import FourthTab from '../FourthTab';
import TabsList from '../TabsList';
import { fetchSerials } from '../../API/serialsAPI';

// const optionRender = [<FirstTab />, <SecondTab />, <ThirdTab />, <FourthTab />];

const ExtensionMenu = () => {
  const [numberOfMenu, setNumberOfMenu] = useState(0);
  const [serialsData, setSerialsData] = useState([]);
  const [runtimeData, setRuntimeData] = useState([]);
  const [smallestSerial, setSmallestSerial] = useState([]);
  const [biggestSerial, setBiggestSerial] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (serialsData.length === 0) {
      fetchData();
    }
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
  }, [serialsData, runtimeData]);

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

  const fetchData = async () => {
    try {
      const serials = await fetchSerials();
      setSerialsData(serials);
      setError(false);
    } catch (err) {
      setError(`${err}`);
    }
  };

  return (
    <>
      <TabsList changeTabs={changeTabs} />
      {error && <p>Oops, we have a problem with server : {error} </p>}
      {numberOfMenu === 0 ? (
        <FirstTab serials={serialsData} />
      ) : numberOfMenu === 1 ? (
        <SecondTab serialsData={serialsData} />
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

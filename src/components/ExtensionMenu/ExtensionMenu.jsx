import React from 'react';
import { useState, useEffect } from 'react';
import FirstTab from '../FirstTab';
import SecondTab from '../SecondTab';
import ThirdTab from '../ThirdTab';
import FourthTab from '../FourthTab';
import { fetchSerials } from '../../API/serialsAPI';

// const optionRender = [<FirstTab />, <SecondTab />, <ThirdTab />, <FourthTab />];

const ExtensionMenu = () => {
  const [numberOfMenu, setNumberOfMenu] = useState(0);
  const [serialsData, setSerialsData] = useState([]);
  const [error, setError] = useState(false);

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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section className="tabs">
        <div className="tabs__container">
          <button className="tabs__button active" onClick={changeTabs}>
            Tab1
          </button>
          <button className="tabs__button" onClick={changeTabs}>
            Tab2
          </button>
          <button className="tabs__button" onClick={changeTabs}>
            Tab3
          </button>
          <button className="tabs__button" onClick={changeTabs}>
            Tab4
          </button>
        </div>
      </section>
      {error && <p>Oops, we have a problem with server : {error} </p>}
      {numberOfMenu === 0 ? (
        <FirstTab serials={serialsData} />
      ) : numberOfMenu === 1 ? (
        <SecondTab serialsData={serialsData} />
      ) : numberOfMenu === 2 ? (
        <ThirdTab />
      ) : (
        <FourthTab />
      )}
    </>
  );
};
export default ExtensionMenu;

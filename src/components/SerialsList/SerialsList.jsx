import React from 'react';
import { useState, useEffect } from 'react';
import ExtensionToggle from '../ExtensionToggle';
import ExtensionMenu from '../ExtensionMenu';
import logo from '../../images/logo.png';
import { fetchSerials } from '../../API/serialsAPI';

const SerialsList = () => {
  const [status, setStatus] = useState(false);
  const [serialsData, setSerialsData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {}, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('serialsData'));
    data !== null
      ? data.length === 0
        ? fetchData()
        : setSerialsData(data)
      : '';
    const dataStatus = JSON.parse(localStorage.getItem('status'));
    const toggle = document.getElementById('switch-extension-toggle');
    dataStatus ? (toggle.checked = true) : (toggle.checked = false);
    setStatus(dataStatus);
  }, []);

  useEffect(() => {
    localStorage.setItem('serialsData', JSON.stringify(serialsData));
    localStorage.setItem('status', JSON.stringify(status));
  }, [serialsData, status]);

  const fetchData = async () => {
    try {
      const serials = await fetchSerials();
      setSerialsData(serials);
      setError(false);
    } catch (err) {
      setError(`${err}`);
    }
  };

  /* eslint-disable no-param-reassign */
  const switchStatus = () => {
    if (!status) {
      chrome.action.setIcon({
        path: {
          16: '/images/get_started16.png',
          32: '/images/get_started32.png',
          48: '/images/get_started48.png',
          128: '/images/get_started128.png',
        },
      });
    } else {
      chrome.action.setBadgeBackgroundColor({ color: [0, 0, 0, 0] });
      chrome.action.setBadgeText({ text: `` });
      chrome.action.setIcon({
        path: {
          16: '/images/disabled-16x16.png',
          32: '/images/disabled-32x32.png',
          48: '/images/disabled-48x48.png',
          128: '/images/disabled-128x128.png',
        },
      });
    }
    setStatus(!status);
  };
  /* eslint-enable no-param-reassign */
  return (
    <div>
      <img src={logo} alt="logo" width="300px" />
      <ExtensionToggle switchStatus={switchStatus} />
      {error && <p>Oops, we have a problem with server : {error} </p>}
      {status ? <ExtensionMenu serialsData={serialsData} /> : ''}
    </div>
  );
};

export default SerialsList;

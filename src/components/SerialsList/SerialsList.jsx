/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
import React from 'react';
import { useState, useEffect } from 'react';
import ExtensionToggle from '../ExtensionToggle';
import ExtensionMenu from '../ExtensionMenu';
import logo from '../../images/logo.png';
import PropTypes from 'prop-types';
import { fetchSerials } from '../../API/serialsAPI';

const SerialsList = () => {
  const [status, setStatus] = useState(false);
  const [serialsData, setSerialsData] = useState([]);
  const [error, setError] = useState(false);

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
    chrome.action.setIcon({
      path: {
        16: '/images/get_started16.png',
        32: '/images/get_started32.png',
        48: '/images/get_started48.png',
        128: '/images/get_started128.png',
      },
    });
    setStatus(dataStatus);
    setEnabledIcons();
  }, []);

  const setEnabledIcons = () => {
    chrome.action.setIcon({
      path: {
        16: '/images/get_started16.png',
        32: '/images/get_started32.png',
        48: '/images/get_started48.png',
        128: '/images/get_started128.png',
      },
    });
  };
  const setDisabledIcons = () => {
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
  };

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

  const switchStatus = () => {
    if (!status) {
      setEnabledIcons();
    } else {
      setDisabledIcons();
      localStorage.removeItem('status');
      localStorage.removeItem('serialsData');
    }
    setStatus(!status);
  };

  return (
    <div>
      <img src={logo} alt="logo" width="300px" />
      <ExtensionToggle switchStatus={switchStatus} />
      {error && <p>Oops, we have a problem with server : {error} </p>}
      {status ? <ExtensionMenu serialsData={serialsData} /> : ''}
    </div>
  );
};

SerialsList.propTypes = {
  status: PropTypes.bool,
};

export default SerialsList;

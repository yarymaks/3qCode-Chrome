import React from 'react';
import { useState } from 'react';
import ExtensionToggle from '../ExtensionToggle';
import ExtensionMenu from '../ExtensionMenu';
import logo from '../../images/logo.png';

const SerialsList = () => {
  const [status, setStatus] = useState(false);
  const switchStatus = () => {
    setStatus(!status);
  };

  return (
    <div>
      <img src={logo} alt="logo" width="300px" />
      <ExtensionToggle switchStatus={switchStatus} />
      {status ? <ExtensionMenu /> : ''}
    </div>
  );
};

export default SerialsList;

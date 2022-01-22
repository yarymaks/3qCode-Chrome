import React from 'react';
import { useState } from 'react';
import ExtensionToggle from '../ExtensionToggle';

const SerialsList = () => {
  const [status, setStatus] = useState(false);
  const switchStatus = () => {
    setStatus(!status);
  };

  return (
    <div>
      <img src="./logo.png" alt="logo" width="300px" />
      <ExtensionToggle switchStatus={switchStatus} />
      {status ? <p>WOW</p> : ''}
    </div>
  );
};

export default SerialsList;

import React from 'react';

const ExtensionToggle = ({ switchStatus }) => {
  return (
    <div className="toolbar">
      <div className="switch-extension">
        <div className="switch-extension__control">
          <input
            id="switch-extension-toggle"
            className="switch-extension__toggle"
            type="checkbox"
            name="theme"
            aria-label="switch"
            onChange={switchStatus}
          />
          <label
            aria-hidden="true"
            className="switch-extension__track"
            htmlFor="switch-extension-toggle"
          ></label>
          <div aria-hidden="true" className="switch-extension__marker"></div>
        </div>
      </div>
      <span>Off / On</span>
    </div>
  );
};

export default ExtensionToggle;

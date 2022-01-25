import React from 'react';
import PropTypes from 'prop-types';

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
      <span>On / Off</span>
    </div>
  );
};

ExtensionToggle.propTypes = {
  switchStatus: PropTypes.func.isRequired,
};

export default ExtensionToggle;

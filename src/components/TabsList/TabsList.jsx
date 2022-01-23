import React from 'react';
const TabsList = ({ changeTabs }) => {
  return (
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
  );
};
export default TabsList;

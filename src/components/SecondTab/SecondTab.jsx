import React from 'react';
import { useState, useEffect } from 'react';

const SecondTab = ({ serialsData }) => {
  const [premied, setPremied] = useState(0);
  const premiedSerials = () => {
    serialsData.map(({ _embedded }) => {
      console.log(_embedded.show.premiered);
      console.log(typeof _embedded.show.premiered);
      //   setPremied(_embedded.show.premiered);
    });
  };
  // for (let i = 0; i < serialsData.length; i++) {
  //   setPremied(serialsData._embedded.show.premiered);
  // }

  useEffect(() => {
    premiedSerials();
  }, []);
  return <div>{premied}</div>;
};
export default SecondTab;

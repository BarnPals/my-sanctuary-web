import React from 'react';
import filterInvalidDOMProps from 'filter-invalid-dom-props';

export default function Arrow(props) {
  return (
    <svg
      fill="#ffffff"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 100 100"
      style={{ enableBackground: 'new 0 0 100 100' }}
      xmlSpace="preserve"
      {...filterInvalidDOMProps(props)}
    >
      <path d="M2.5,31.3c0-2.6,1-5.1,2.9-7.1c3.9-3.9,10.3-3.9,14.2,0L50,54.5l30.4-30.4c3.9-3.9,10.3-3.9,14.2,0    c3.9,3.9,3.9,10.3,0,14.2L57.1,75.8c-1.9,1.9-4.4,2.9-7.1,2.9s-5.2-1.1-7.1-2.9L5.4,38.4C3.5,36.4,2.5,33.8,2.5,31.3z" />
    </svg>
  );
}

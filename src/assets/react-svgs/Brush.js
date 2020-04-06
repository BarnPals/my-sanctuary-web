import React from 'react';
import filterInvalidDOMProps from 'filter-invalid-dom-props';

export default function Brush(props) {
  return (
    <svg
      height="100px"
      width="100px"
      fill="#ffffff"
      xmlns="http://www.w3.org/2000/svg"
      data-name="Layer 1"
      viewBox="0 0 100 100"
      x="0px"
      y="0px"
      {...filterInvalidDOMProps(props)}
    >
      <path d="M31.19,57.59c-5.26,4.34-3,9.15-6.84,13.15-3.47,3.61-8.35,4.42-5.48,6.43,5.48,3.83,20.69,2.66,26.3-1.51A11.37,11.37,0,0,0,46.79,59C43.4,55.45,36.66,53.08,31.19,57.59Z" />
      <path d="M80.51,21.69a4.57,4.57,0,0,0-6.33.17L43.07,53.5a22.37,22.37,0,0,1,9.14,8.35L80.92,28A4.58,4.58,0,0,0,80.51,21.69Z" />
    </svg>
  );
}

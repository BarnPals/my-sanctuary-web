import React from 'react';
import filterInvalidDOMProps from 'filter-invalid-dom-props';

export default function Grid(props) {
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
      <g data-name="Group">
        <path
          data-name="Compound Path"
          d="M41.5,15.8H21.3a5.5,5.5,0,0,0-5.5,5.5V41.5A5.5,5.5,0,0,0,21.3,47H41.5A5.4,5.4,0,0,0,47,41.5V21.3A5.5,5.5,0,0,0,41.5,15.8ZM40,40H22.8V22.8H40Z"
        />
        <path
          data-name="Compound Path"
          d="M78.7,15.8H58.5A5.5,5.5,0,0,0,53,21.3V41.5A5.4,5.4,0,0,0,58.5,47H78.7a5.5,5.5,0,0,0,5.5-5.5V21.3A5.5,5.5,0,0,0,78.7,15.8ZM77.2,40H60V22.8H77.2Z"
        />
        <path
          data-name="Compound Path"
          d="M41.5,53H21.3a5.5,5.5,0,0,0-5.5,5.5V78.7a5.5,5.5,0,0,0,5.5,5.5H41.5A5.5,5.5,0,0,0,47,78.7V58.5A5.4,5.4,0,0,0,41.5,53ZM40,77.2H22.8V60H40Z"
        />
        <path
          data-name="Compound Path"
          d="M78.7,53H58.5A5.4,5.4,0,0,0,53,58.5V78.7a5.5,5.5,0,0,0,5.5,5.5H78.7a5.5,5.5,0,0,0,5.5-5.5V58.5A5.5,5.5,0,0,0,78.7,53ZM77.2,77.2H60V60H77.2Z"
        />
      </g>
    </svg>
  );
}

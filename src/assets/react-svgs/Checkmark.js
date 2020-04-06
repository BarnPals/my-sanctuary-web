// Dependencies
import React from 'react';
import filterInvalidDOMProps from 'filter-invalid-dom-props';

export default function Checkmark(props) {
  return (
    <svg
      fill="#ffffff"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 100 100"
      enableBackground="new 0 0 100 100"
      xmlSpace="preserve"
      {...filterInvalidDOMProps(props)}
    >
      <g>
        <path
          fill="#ffffff"
          d="M42.605,72.63c-1.238,0-2.43-0.498-3.302-1.389L26.979,58.647c-1.785-1.824-1.753-4.75,0.071-6.535   c1.823-1.786,4.749-1.752,6.535,0.07l8.563,8.751l23.879-31.721c1.535-2.038,4.43-2.45,6.472-0.913   c2.039,1.535,2.447,4.432,0.913,6.471L46.297,70.788c-0.81,1.076-2.049,1.745-3.394,1.832C42.804,72.627,42.705,72.63,42.605,72.63   z"
        />
      </g>
    </svg>
  );
}

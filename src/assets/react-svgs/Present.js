import React from 'react';
import filterInvalidDOMProps from 'filter-invalid-dom-props';

export default function Present(props) {
  return (
    <svg
      height="100px"
      width="100px"
      fill="#ffffff"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 70 70"
      enableBackground="new 0 0 70 70"
      xmlSpace="preserve"
      {...filterInvalidDOMProps(props)}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M33.5,38.8c0,9.5,0,18.7,0,28.4c-6.8,0-13.5,0.2-20.1-0.2C10.5,67,10,65.1,10,63.1  c-0.1-8,0-16,0-24.3C18,38.8,25.6,38.8,33.5,38.8z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M37.4,67.4c0-9.7,0-19,0-28.6c7.7,0,15.3,0,23.4,0c0,8.2,0,16.2,0,24.4  c0,2.9-2.3,4.2-5,4.2C49.9,67.4,43.9,67.4,37.4,67.4z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M35.4,13.4c2.2-2.7,4-5.3,6.2-7.7c3.1-3.4,7.1-4,10.6-2c3.3,1.9,5.1,5.8,4.2,9.4  c-1.1,4.1-4,6.4-8.7,6.5c-8.3,0.1-16.6,0.1-24.9,0c-4.6-0.1-7.4-2.4-8.4-6.7c-0.8-3.5,0.8-7.2,4-9.1c3.5-2.1,7.2-1.7,10.4,1.5  C31.1,7.8,33.1,10.6,35.4,13.4z M32.8,16.1c-2.6-3.3-4.2-6.1-6.6-8.1c-1.4-1.1-4.2-1.7-5.8-1c-1.4,0.6-3.1,2.6-2.6,5.1  c0.3,1.7,2.7,3.3,4.4,3.7C25.3,16.6,28.5,16.1,32.8,16.1z M38,16.2c4.4,0.2,7.6,0.4,10.5-0.3c3.1-0.7,4.2-2.7,4.5-4.5  c0.2-1.3-0.8-3.7-2.5-4.4c-1.6-0.7-4.4-0.2-5.7,0.9C42.3,9.8,39.9,13.8,38,16.2z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M33.5,23.4c0,4,0,7.5,0,11.5c-4.2,0-8.3,0-12.4,0c-2.2,0-4.4,0-6.6,0  c-6.2,0-8,0.7-8-6.5c0-2.1,0.4-4.9,4.2-5C18.1,23.2,25.5,23.4,33.5,23.4z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M37.4,34.9c0-4.3,0-7.7,0-11.5c8,0,15.8-0.1,23.6,0.1c3,0.2,2.6,4,2.6,4.2  c0,8.1-0.9,7.3-7.8,7.2C49.7,34.9,43.6,34.9,37.4,34.9z"
      />
    </svg>
  );
}

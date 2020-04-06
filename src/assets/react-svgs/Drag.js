import React from 'react';

export default function Drag(props) {
  return (
    <svg
      fill="#ffffff"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 512 512"
      version="1.1"
      x="0px"
      y="0px"
      {...props}
    >
      <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
        <g transform="translate(96.000000, 28.000000)" fill="#ffffff">
          <circle cx={45} cy={45} r={45} />
          <circle cx={274} cy={45} r={45} />
          <circle cx={45} cy={228} r={45} />
          <circle cx={274} cy={228} r={45} />
          <circle cx={45} cy={411} r={45} />
          <circle cx={274} cy={411} r={45} />
        </g>
      </g>
    </svg>
  );
}

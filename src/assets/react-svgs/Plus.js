// Dependencies
import React from 'react';
import filterInvalidDOMProps from 'filter-invalid-dom-props';

export default function Plus(props) {
  return (
    <svg
      fill="#ffffff"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlSpace="preserve"
      version="1.1"
      style={{
        shapeRendering: 'geometricPrecision',
        textRendering: 'geometricPrecision',
        imageRendering: 'optimizeQuality',
      }}
      viewBox="0 0 694 694"
      x="0px"
      y="0px"
      fillRule="evenodd"
      clipRule="evenodd"
      {...filterInvalidDOMProps(props)}
    >
      <defs>
        <style type="text/css" dangerouslySetInnerHTML={{ __html: '\n   \n    .fil0 {fill:#ffffff}\n   \n  ' }} />
      </defs>
      <g>
        <path
          className="fil0"
          d="M347 0c31,0 56,25 56,55l0 237 236 0c30,0 55,25 55,55 0,31 -25,56 -55,56l-236 0 0 236c0,30 -25,55 -56,55 -30,0 -55,-25 -55,-55l0 -236 -237 0c-30,0 -55,-25 -55,-56 0,-30 25,-55 55,-55l237 0 0 -237c0,-30 25,-55 55,-55z"
        />
      </g>
    </svg>
  );
}

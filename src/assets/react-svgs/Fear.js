import React from 'react';
import filterInvalidDOMProps from 'filter-invalid-dom-props';

export default function Fear(props) {
  return (
    <svg
      fill="#ffffff"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      viewBox="0 0 96 96"
      x="0px"
      y="0px"
      {...filterInvalidDOMProps(props)}
    >
      <path d=" M 91.7 72.8 L 71.7 40.8 C 71.3 40.2 70.7 39.9 70 39.9 C 69.3 39.9 68.7 40.3 68.3 40.8 L 62.4 50.2 L 75 70.6 C 76.1 72.2 76.3 74.2 75.6 76 L 89.8 76 C 90.6 76 91.3 75.6 91.7 74.9 C 92.1 74.2 92.1 73.4 91.7 72.8 L 91.7 72.8 Z" />
      <path d=" M 43.1 43.1 L 38 47.7 L 32.9 43.2 L 23.3 49 L 38 25 L 52.7 49 L 43.1 43.1 Z M 71.6 72.8 L 39.7 20.9 C 39.3 20.4 38.7 20 38 20 C 37.3 20 36.7 20.3 36.3 20.9 L 4.4 72.8 C 3.9 73.4 3.9 74.3 4.2 75 C 4.6 75.6 5.3 76 6.1 76 L 69.9 76 C 70.7 76 71.4 75.6 71.8 74.9 C 72.1 74.2 72.1 73.4 71.6 72.8 Z" />
    </svg>
  );
}

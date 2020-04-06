import React from 'react';
import filterInvalidDOMProps from 'filter-invalid-dom-props';

export default function Motivation(props) {
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
      viewBox="0 0 100 100"
      enableBackground="new 0 0 100 100"
      xmlSpace="preserve"
      {...filterInvalidDOMProps(props)}
    >
      <path d="M85.744,49.641c-0.118-0.539-0.649-0.882-1.191-0.762c-5.855,1.285-9.603,5.109-11.902,8.665  c-1.582-1.49-5.237-3.997-12.397-4.997c-10.746-1.5-20.607,11.583-24.357,19.375c0.167-14.833,11.999-19.136,11.918-20.506  c-0.751-12.66,3.837-23.699,4.686-26.473c1.706-0.195,3.434-0.342,5.126-0.603c0.387,2.388,1.552,5.678,4.414,5.976  c0.253,0.026,0.5,0.039,0.742,0.039c4.515,0,7.165-4.382,8.623-6.794c1.809-2.99,3.528-6.089,2.995-8.255  c-0.583-2.367-3.912-3.549-5.859-4.422c-3.274-1.468-6.708-2.86-10.244-3.538c-2.171-0.417-5.775-1.237-7.873-0.219  c-1.54,0.745-3.007,3-3.357,3.563c-1.175,1.889-3.642,3.57-5.188,5.176c-6.945,7.215-12.855,15.129-17.61,23.951  c-6.563,12.18-8.312,31.311-8.518,33.835c-0.387,0.591-1.451,2.304-2.193,4.358c-1.079,2.986,0.895,4.749,2.335,6.036  c0.319,0.285,0.631,0.562,0.898,0.845c1.716,1.814,6.108,2.255,7.206,2.338c1.42,0.687,12.772,4.819,30.022,4.819  s21.659-3.671,26.698-8.828C86.032,77.781,88.929,63.095,85.744,49.641z" />
    </svg>
  );
}

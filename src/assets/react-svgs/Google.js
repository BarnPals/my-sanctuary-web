import React from 'react';

export default function Google(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width={18} height={18} {...props}>
      <path
        d="M17.64,9.2a11,11,0,0,0-.16-1.84H9v3.48h4.84a4.15,4.15,0,0,1-1.79,2.72v2.26H15A8.78,8.78,0,0,0,17.64,9.2Z"
        style={{ fill: '#4285f4', fillRule: 'evenodd' }}
      />
      <path
        d="M9,18a8.62,8.62,0,0,0,6-2.18l-2.91-2.26A5.43,5.43,0,0,1,9,14.42a5.37,5.37,0,0,1-5-3.71H1V13A9,9,0,0,0,9,18Z"
        style={{ fill: '#34a853', fillRule: 'evenodd' }}
      />
      <path d="M4,10.71A5.36,5.36,0,0,1,4,7.29V5H1A9,9,0,0,0,1,13Z" style={{ fill: '#fbbc05', fillRule: 'evenodd' }} />
      <path
        d="M9,3.58a4.83,4.83,0,0,1,3.44,1.35L15,2.34A8.65,8.65,0,0,0,9,0,9,9,0,0,0,1,5L4,7.29A5.37,5.37,0,0,1,9,3.58Z"
        style={{ fill: '#ea4335', fillRule: 'evenodd' }}
      />
      <path d="M0,0H18V18H0Z" style={{ fill: 'none' }} />
    </svg>
  );
}

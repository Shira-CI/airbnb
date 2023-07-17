import React from 'react'

export function HeartIcon({ heartColor , heartOpacity}) {

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke="white"
      strokeWidth="2"
      fill={heartColor}
      opacity={heartOpacity}
    >
      <path
        d="M20.84 4.58a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.09a5.5 5.5 0 0 0-7.78 7.78l1.06 1.08L12 21.25l7.78-7.78 1.06-1.08a5.5 5.5 0 0 0 0-7.78z"
      />
    </svg>
  )
}


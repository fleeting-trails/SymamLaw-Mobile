import * as React from "react"
import Svg, { Path } from "react-native-svg"
export const HomeIcon = ({ color, size=26, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    {...props}
  >
    <Path
      stroke={color ?? "#fff"}
      d="M1 13.245c0-2.746 0-4.12.623-5.258S3.384 6.143 5.661 4.73l2.4-1.49C10.467 1.747 11.67 1 13 1c1.33 0 2.533.747 4.94 2.24l2.4 1.49c2.276 1.413 3.414 2.119 4.037 3.257C25 9.126 25 10.5 25 13.245v1.825c0 4.681 0 7.022-1.406 8.476C22.188 25 19.925 25 15.4 25h-4.8c-4.525 0-6.788 0-8.194-1.454C1 22.092 1 19.75 1 15.07v-1.825Z"
    />
  </Svg>
)

export const SearchIcon = ({ color='#FCFFFD', size=24, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    {...props}
  >
    <Path
      fill={color}
      d="M21.546 10.773C21.546 4.828 16.718 0 10.773 0 4.828 0 0 4.828 0 10.773c0 5.945 4.828 10.773 10.773 10.773 2.693 0 5.147-.997 7.023-2.613L22.863 24 24 22.863l-5.067-5.067a10.732 10.732 0 0 0 2.613-7.023ZM10.773 19.95a9.178 9.178 0 0 1-9.177-9.177 9.178 9.178 0 0 1 9.177-9.177 9.178 9.178 0 0 1 9.177 9.177 9.178 9.178 0 0 1-9.177 9.177Z"
    />
    <Path
      fill={color}
      d="m4.908 5.965 1.237 1.018a5.954 5.954 0 0 1 4.628-2.195V3.192a7.608 7.608 0 0 0-5.865 2.773ZM3.192 10.773h1.596c0-.419.04-.818.12-1.217l-1.556-.32a7.87 7.87 0 0 0-.16 1.537Z"
    />
  </Svg>
)
export const PlayIconFilled = ({ color='#FCFFFD', size=24, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    {...props}
  >
    <Path
      fill={color}
      fillRule="evenodd"
      d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Zm-1.568-7.385 5.664-3.344c.939-.554.939-1.988 0-2.542l-5.664-3.344C9.52 6.847 8.4 7.547 8.4 8.655v6.69c0 1.108 1.12 1.808 2.032 1.27Z"
      clipRule="evenodd"
    />
  </Svg>
)
export const SaveIconFilled = ({ color='#FCFFFD', size=24, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    {...props}
  >
    <Path
      fill={color}
      fillRule="evenodd"
      d="M13.5 3.75a.75.75 0 1 1 1.5 0v3a.75.75 0 1 1-1.5 0v-3ZM6.75 9h10.5a.75.75 0 0 0 .75-.75V0H6v8.25c0 .415.336.75.75.75ZM21 0h-1.5v9a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 9V0H3a3 3 0 0 0-3 3v18a3 3 0 0 0 3 3h18a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3Z"
      clipRule="evenodd"
    />
  </Svg>
)
export const AccountIconFilled = ({ color='#FCFFFD', size=24, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    {...props}
  >
    <Path
      fill={color}
      d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0Zm0 3.6c1.992 0 3.6 1.608 3.6 3.6s-1.608 3.6-3.6 3.6a3.595 3.595 0 0 1-3.6-3.6c0-1.992 1.608-3.6 3.6-3.6Zm0 17.04a8.64 8.64 0 0 1-7.2-3.864c.036-2.388 4.8-3.696 7.2-3.696 2.388 0 7.164 1.308 7.2 3.696A8.64 8.64 0 0 1 12 20.64Z"
    />
  </Svg>
)
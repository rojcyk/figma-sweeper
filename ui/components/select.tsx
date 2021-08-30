import styled from "styled-components"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import {
  FS_SMALL,
  BLACK,
  WHITE,
  SEPARATOR,
  ANIMATION_SPEED_MS
} from "@ui"

export const Select = styled.select<{
  name: string,
  id: string,
  icon: any,
  onChange: Function
}>`
  appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg fill='%2326303B' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: -2px;
  background-origin: content-box;

  width: 100%;

  cursor: pointer;
  border-radius: 6px;
  font-size: ${FS_SMALL};
  font-weight: 500;
  line-height: 20px;
  transition: all ${ANIMATION_SPEED_MS}ms ease-out;
  outline: none;
  text-decoration: none;
  padding: 7px 12px;

  background-color: #f7f8fa;
  border: 1px solid ${SEPARATOR};
  color: ${BLACK};
  fill: ${BLACK} !important;
  text-shadow: 0 1px 0 ${WHITE};
  box-shadow: inset 0 1px ${WHITE};

  &:hover {
    background-color: ${WHITE};
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.5);
    /* box-shadow: inset 0 1px 0 ${WHITE}, 0 2px 4px rgba(0, 0, 0, 0.04); */
  } 
`
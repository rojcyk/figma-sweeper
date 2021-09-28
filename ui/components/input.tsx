import styled from "styled-components"

import {
  FS_SMALL,
  BLACK,
  WHITE,
  SEPARATOR
} from "@ui"

export const Input = styled.input`
  border-radius: 6px;
  font-size: ${FS_SMALL};
  background-color: ${WHITE};
  border: 1px solid ${SEPARATOR};
  color: ${BLACK};
  fill: ${BLACK} !important;
  padding: 7px 12px;
  outline: none;
  width: 100%;
`
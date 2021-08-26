import React from "react"
import styled from "styled-components"
import io from "figmaio/ui"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { APP_LINT } from "@events"
import LinterContext from "./linterContext"
import { ButtonSecondaryStyle } from "@components/button"

import {
  FS_SMALL,
  BLACK,
  WHITE,
  BLUE,
  BACKGROUND,
  SEPARATOR,
  ANIMATION_SPEED_MS
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
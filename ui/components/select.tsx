import React from "react"
import styled from "styled-components"
import io from "figmaio/ui"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { WHITE } from '@ui'
import { APP_LINT } from "@events"
import LinterContext from "./linterContext"
import { ButtonSecondaryStyle } from "@components/button"

export const Select = styled(ButtonSecondaryStyle).attrs({
  as: 'select'
})<{
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
`
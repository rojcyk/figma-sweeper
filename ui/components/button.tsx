import React from "react"
import styled, { StyledComponent } from "styled-components"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import {
  FS_SMALL,
  BLACK,
  WHITE,
  BLUE,
  BACKGROUND,
  SEPARATOR,
  ANIMATION_SPEED_MS
} from "@ui"

// ******************************** //
// Styles
// ******************************** //

const SharedButtonStyles = styled.button<{ icon: boolean, inline?: boolean }>`
  cursor: pointer;
  border-radius: 6px;
  padding: 10px 12px;
  font-size: ${FS_SMALL};
  font-weight: 500;
  transition: all ${ANIMATION_SPEED_MS}ms ease-out;
  outline: none;
  ${props => props.inline ? 'display: inline-flex;' : 'display: flex; width: 100%;'}
  justify-content: space-between;
  align-items: center;
  text-decoration: none;

  ${props => props.icon ? 'padding-right: 8px;' : ''}
`

export const ButtonPrimaryStyle = styled(SharedButtonStyles)`
  background-color: ${BLUE};
  border: 1px solid #127ac6;
  color: ${WHITE};
  fill: ${WHITE} !important;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.16);
  box-shadow: inset 0 2px 0 #56a4ff, 0 4px 8px rgba(0, 0, 0, 0.16);

  &:hover {
    background-color: #0c71e9;
    box-shadow: inset 0 1px 0 #56a4ff, 0 2px 4px rgba(0, 0, 0, 0.24);
  }
`

export const ButtonSecondaryStyle = styled(SharedButtonStyles)`
  background-color: #f7f8fa;
  border: 1px solid ${SEPARATOR};
  color: ${BLACK};
  fill: ${BLACK} !important;
  text-shadow: 0 1px 0 ${WHITE};
  /* box-shadow: inset 0 2px ${WHITE}, 0 3px 6px rgba(0, 0, 0, 0.08); */

  &:hover {
    background-color: ${WHITE};
    /* box-shadow: inset 0 1px 0 ${WHITE}, 0 2px 4px rgba(0, 0, 0, 0.04); */
  }
`

export const ButtonDisabledStyle = styled(SharedButtonStyles)`
  user-select: none;
  cursor: default;
  background-color: ${BACKGROUND};
  border: 1px solid #dbe2ec;
  color: #8593a3;
  fill: #8593a3 !important;
  text-shadow: 0 1px 0 ${WHITE};
  box-shadow: inset 0 1px ${WHITE};
`

// ******************************** //
// Interfaces
// ******************************** //

interface DisabledButton {
  label: string
  inline?: boolean
  as?: any
  icon?: React.ReactElement
  style?: React.CSSProperties
  onClick?: Function
}

interface Button extends DisabledButton {}


// ******************************** //
// EXPORTED BUTTONS
// ******************************** //

export const ButtonPrimary = (props: Button) => {
  return <ButtonPrimaryStyle
    inline={props.inline}
    as={props.as}
    icon={props.icon ? true : false}
    onClick={props.onClick ? props.onClick : null}
    style={props.style}>
    {props.label} {props.icon}
  </ButtonPrimaryStyle>
}

export const ButtonSecondary = (props: Button) => {
  return <ButtonSecondaryStyle
    inline={props.inline}
    as={props.as}
    icon={props.icon ? true : false}
    onClick={props.onClick ? props.onClick : null}
    style={props.style}>
    {props.label} {props.icon}
  </ButtonSecondaryStyle>
}

export const ButtonDisabled = (props: DisabledButton) => {
  return <ButtonDisabledStyle
    inline={props.inline}
    as={props.as}
    icon={props.icon ? true : false}
    style={props.style}>
    {props.label} {props.icon}
  </ButtonDisabledStyle>
}

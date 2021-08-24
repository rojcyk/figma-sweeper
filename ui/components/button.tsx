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

const SharedButtonStyles = styled.button<{ icon?: boolean, inline?: boolean, small?: boolean }>`
  cursor: pointer;
  border-radius: 6px;
  font-size: ${FS_SMALL};
  font-weight: 500;
  line-height: 20px;
  transition: all ${ANIMATION_SPEED_MS}ms ease-out;
  outline: none;
  text-decoration: none;

  ${props => props.small === true ? `
    padding: 4px 10px;
  ` : `
    padding: 7px 12px;
  `}

  ${props => props.inline ? `
    display: inline-flex;
    align-items: center;
  ` : `
    display: flex; width: 100%;
    align-items: center;
  `}

  ${props => props.icon ? `
    padding-right: 8px;
    justify-content: space-between;
  ` : `
    justify-content: center;
  `}
`

export const ButtonPrimaryStyle = styled(SharedButtonStyles)`
  background-color: ${BLUE};
  border: 1px solid #127ac6;
  color: ${WHITE};
  fill: ${WHITE} !important;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.16);
  box-shadow: inset 0 1px 0 #56a4ff, 0 4px 8px rgba(0, 0, 0, 0.16);

  &:hover {
    background-color: #0c71e9;
    box-shadow: inset 0 1px 0 #56a4ff, 0 2px 4px rgba(0, 0, 0, 0.24);
  }
`

export const ButtonPrimaryOutlineStyle = styled(SharedButtonStyles)`
  background-color: #EDF5FF;
  border: 1px solid #D5E8FF;
  color: ${BLUE};
  fill: ${BLUE} !important;
  /* text-shadow: 0 1px 0 rgba(0, 0, 0, 0.16);
  box-shadow: inset 0 2px 0 #56a4ff, 0 4px 8px rgba(0, 0, 0, 0.16); */
  box-shadow: inset 0 1px 0 ${WHITE};
  text-shadow: 0 1px 0 ${WHITE};

  &:hover {
    background-color: #D5E8FF;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.4);
    /* box-shadow: inset 0 1px 0 #56a4ff, 0 2px 4px rgba(0, 0, 0, 0.24); */
  }
`

export const ButtonPrimaryNakedStyle = styled(SharedButtonStyles)`
  color: ${BLUE};
  fill: ${BLUE} !important;
  border: none;
  background-color: rgba(255,255,255,0);

  &:hover {
    background-color: #EDF5FF;
  }
`

export const ButtonSecondaryStyle = styled(SharedButtonStyles)`
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
  small?: boolean
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
    small={props.small}
    inline={props.inline}
    as={props.as}
    icon={props.icon ? true : false}
    onClick={props.onClick ? props.onClick : null}
    style={props.style}>
    {props.label} {props.icon}
  </ButtonPrimaryStyle>
}

export const ButtonPrimaryOutline = (props: Button) => {
  return <ButtonPrimaryOutlineStyle
    small={props.small}
    inline={props.inline}
    as={props.as}
    icon={props.icon ? true : false}
    onClick={props.onClick ? props.onClick : null}
    style={props.style}>
    {props.label} {props.icon}
  </ButtonPrimaryOutlineStyle>
}

export const ButtonPrimaryNaked = (props: Button) => {
  return <ButtonPrimaryNakedStyle
    small={props.small}
    inline={props.inline}
    as={props.as}
    icon={props.icon ? true : false}
    onClick={props.onClick ? props.onClick : null}
    style={props.style}>
    {props.label} {props.icon}
  </ButtonPrimaryNakedStyle>
}

export const ButtonSecondary = (props: Button) => {
  return <ButtonSecondaryStyle
    small={props.small}
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
    small={props.small}
    inline={props.inline}
    as={props.as}
    icon={props.icon ? true : false}
    style={props.style}>
    {props.label} {props.icon}
  </ButtonDisabledStyle>
}

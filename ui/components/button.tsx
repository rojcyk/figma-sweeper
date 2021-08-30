import React from "react"
import styled, { StyledComponent, css } from "styled-components"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import {
  FS_SMALL,
  BLACK,
  WHITE,
  BLUE,
  BACKGROUND,
  BACKGROUND_LIGHT,
  SEPARATOR,
  ANIMATION_SPEED_MS
} from "@ui"


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

type ButtonPresence = 'solid' | 'outline' | 'naked' | 'disabled'
type ButtonTheme = 'cta' | 'primary'
type ButtonSize = 'small' | 'medium'

interface ButtonStyle {
  presence?: ButtonPresence
  theme?: ButtonTheme
  size?: ButtonSize
  disabled?: boolean
  label?: string
  inline?: boolean
  iconLeft?: React.ReactElement
  iconRight?: React.ReactElement
}

interface Buttonis extends ButtonStyle {
  style?: React.CSSProperties
  onClick?: Function
}

const BasicButton = styled.button<ButtonStyle>`
  cursor: pointer;
  border-radius: 6px;
  font-size: ${FS_SMALL};
  font-weight: 500;
  line-height: 20px;
  transition: all ${ANIMATION_SPEED_MS}ms ease-out;
  outline: none;
  text-decoration: none;

  ${({ size }) => {
    switch(size) {
      case 'small':
        return `
          padding: 4px 10px;
        `
      case 'medium':
        return `
          padding: 7px 12px;
        `
    }
  }}

  ${({ inline }) => {
    switch(inline) {
      case true:
        return `
          display: inline-flex;
          align-items: center;
        `
      case false:
        return `
        width: 100%;
        // display: flex;
        // align-items: center;
        `
    }
  }}

  ${({ theme, presence }) => {
    switch(theme) {
      case 'cta':
        switch (presence) {
          case 'solid':
            return `
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
          case 'outline':
            return `
              background-color: #EDF5FF;
              border: 1px solid #D5E8FF;
              color: ${BLUE};
              fill: ${BLUE} !important;
              box-shadow: inset 0 1px 0 ${WHITE};
              text-shadow: 0 1px 0 ${WHITE};

              &:hover {
                background-color: #D5E8FF;
                box-shadow: inset 0 1px 0 rgba(255,255,255,0.4);
                /* box-shadow: inset 0 1px 0 #56a4ff, 0 2px 4px rgba(0, 0, 0, 0.24); */
              }
            `
          case 'naked':
            return `
              color: ${BLUE};
              fill: ${BLUE} !important;
              border: none;
              background-color: rgba(255,255,255,0);

              &:hover {
                background-color: #EDF5FF;
              }
            `
        }
      case 'primary':
        switch (presence) {
          case 'solid':
            return `
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
          case 'outline':
            return `
              color: ${BLACK};
              fill: ${BLACK} !important;
              border: 1px solid ${BLACK};
              background-color: rgba(0,0,0,0);

              &:hover {
                background-color: ${BACKGROUND_LIGHT}
              }
            `
          case 'naked':
            return `
              color: ${BLACK};
              fill: ${BLACK} !important;
              border: none;
              background-color: rgba(0,0,0,0);

              &:hover {
                background-color: ${BACKGROUND_LIGHT}
              }
            `
          case 'disabled':
            return `  
              user-select: none;
              cursor: default;
              background-color: ${BACKGROUND};
              border: 1px solid #dbe2ec;
              color: #8593a3;
              fill: #8593a3 !important;
              text-shadow: 0 1px 0 ${WHITE};
              box-shadow: inset 0 1px ${WHITE};
            `
        }
    }
  }}
`

export const Button = (props: Buttonis) => {
  const { disabled, label, inline, iconLeft, iconRight, style, onClick } = props
  const size = props.size ? props.size : 'medium'
  const presence = props.presence ? props.presence : 'solid'
  const theme = props.theme ? props.theme : 'cta'
  // const css = generateCss(props)

  return (
    <BasicButton
      presence={presence}
      theme={theme}
      size={size}
      disabled={disabled}
      inline={inline}
      onClick={(e) => { if (onClick) onClick(e) }}
      style={style}
    >
      {iconLeft}{label}{iconRight}
    </BasicButton>
  )
}
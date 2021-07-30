import React from "react"
import styled from "styled-components"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { BLACK, WHITE, BLUE, BACKGROUND, SEPARATOR } from "../../constants/ui"

// ******************************** //
// Styles
// ******************************** //

const SharedButtonStyles = styled.button`
  cursor: pointer;
  width: 100%;
  border-radius: 6px;
  padding: 10px 12px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease-out;
  outline: none;
`

export const ButtonPripmaryStyle = styled(SharedButtonStyles)`
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
  box-shadow: inset 0 2px ${WHITE}, 0 3px 6px rgba(0, 0, 0, 0.12);

  &:hover {
    background-color: ${WHITE};
    box-shadow: inset 0 1px 0 ${WHITE}, 0 2px 4px rgba(0, 0, 0, 0.08);
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

interface Button {
  label: string
  icon?: any
  onClick: Function
}

interface ButtonGenerator extends Button {
  Wrapper: any
}

// ******************************** //
// Button Generator
// ******************************** //

export const generateButton = ({ label, icon, onClick, Wrapper }: ButtonGenerator) => {
  let style: React.CSSProperties = {}

  if (icon) {
    Object.assign(style, {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    })
  }

  return (
    <ButtonPripmaryStyle onClick={() => onClick()}>
      <div style={style}>
        {label} {icon}
      </div>
    </ButtonPripmaryStyle>
  )
}

// ******************************** //
// EXPORTED BUTTONS
// ******************************** //

export const ButtonPrimary = (props: Button) => {
  return generateButton({
    ...props,
    Wrapper: ButtonPripmaryStyle
  })
}

export const ButtonSecondary = (props: Button) => {
  return generateButton({
    ...props,
    Wrapper: ButtonSecondaryStyle
  })
}

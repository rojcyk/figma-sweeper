import React from "react"
import styled from "styled-components"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import {
  BLACK,
  WHITE,
  GRAY,
  SEPARATOR,
  BLUE,
  BLUE_DARK,
  FS_SMALL,
  BACKGROUND,
  BORDER_RADIUS_S,
  BORDER_RADIUS_M
} from "@ui"

// ******************** //
// TOP LVL STYLING
// ******************** //

export const Check = styled.div<{
  checked: boolean
}>`
  display: inline-block;
  position: relative;
  width: 18px;
  height: 18px;
  border-radius: ${BORDER_RADIUS_S}px;
  margin-right: 6px;
  flex-shrink: 0;

  ${({ checked }) =>
    checked
      ? `
      background-color: ${BLUE};
      border: 1px solid ${BLUE_DARK};
      text-shadow: 0 1px 0 rgba(0, 0, 0, 0.16);
      box-shadow: inset 0 2px 0 #56a4ff;
      color: ${WHITE};

      &:after {
        top: 0;
        left: 0;
        padding-top: 1px;
        content: '✓';
        position: absolute;
        width: 100%;
        height: 100%;
        text-align: center;
      }
    `
      : `
      background-color: #F7F8FA;
      border: 1px solid ${SEPARATOR};
      text-shadow: 0 1px 0 ${WHITE};
    `}
`

const CheckboxWrapper = styled.div`
  display: flex;
  margin-bottom: 4px;
  padding: 4px;
  padding-right: 8px;
  border-radius: ${BORDER_RADIUS_M}px;
  cursor: pointer;
  transition: all 160ms ease-out;

  &:hover {
    transition: all 160ms ease-out;
    background-color: ${BACKGROUND};
  }
`

const CheckboxLabel = styled.span<{
  checked: boolean
}>`
  font-size: ${FS_SMALL};
  line-height: 130%;
  color: ${({ checked }) => (checked ? BLACK : GRAY )};
  font-weight: 500;
  padding-top: 1px;
`

// ******************** //
// COMPONENT
// ******************** //

export const Checkbox = ({
  checked,
  children,
  onCheckboxChange
}: {
  checked: boolean
  children: any
  onCheckboxChange: Function
}) => {
  return (
    <CheckboxWrapper onClick={() => onCheckboxChange()}>
      <Check checked={checked} />
      <CheckboxLabel checked={checked} style={{ display: "inline-block" }}>
        {children}
      </CheckboxLabel>
    </CheckboxWrapper>
  )
}

// ******************** //
// EXPORT
// ******************** //

export default Checkbox

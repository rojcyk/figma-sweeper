import React from "react"
import styled from "styled-components"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { Check } from "../components/check"
import { WHITE, GRAY } from "../../constants/ui"

// ******************** //
// TOP LVL STYLING
// ******************** //

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${WHITE};
  transition: all 160ms ease-out;

  &:hover {
    transition: all 160ms ease-out;
    background-color: #f2f4f7;
  }
`

const CheckboxLabel = styled.span<{
  checked: boolean
}>`
  font-size: 13px;
  color: ${({ checked }) => (checked ? "#000000" : GRAY )};
  font-weight: 500;
`

// ******************** //
// COMPONENT
// ******************** //

const Checkbox = ({
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

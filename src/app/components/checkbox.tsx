import React from "react"
import { Check } from "../components/check"
import styled from "styled-components"

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #f2f4f7;
  }
`

const CheckboxLabel = styled.span<{
  checked: boolean
}>`
  font-size: 13px;
  color: ${({ checked }) => (checked ? "#000000" : "#6F737D")};
  font-weight: 500;
`

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

export default Checkbox

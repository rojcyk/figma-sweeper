import React from "react"
import styled from "styled-components"

import { WHITE, SEPARATOR, BLUE } from "../constants/ui"

// ******************************** //
// Interface
// ******************************** //

// export interface SectionProps {
//   expanded: boolean
//   buttonHandler: Function
//   content: any
//   button: any
// }

// ******************************** //
// Styles
// ******************************** //

const ButtonWrapper = styled.button`
  cursor: pointer;
  background-color: ${BLUE};
  border: 1px solid #127ac6;
  width: 100%;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 600;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.16);
  box-shadow: inset 0 1px 0 #56a4ff, 0 4px 8px rgba(0, 0, 0, 0.16);
  color: ${WHITE};
  transition: all 0.2s ease-out;
  outline: none;

  &:hover {
    background-color: #0c71e9;
    box-shadow: inset 0 1px 0 #56a4ff, 0 2px 4px rgba(0, 0, 0, 0.24);
  }
`

// const Wrapper = styled.div<{
//   expanded: boolean
// }>`
//   transition: all 0.3s ease-out;
//   background-color: ${WHITE};
//   // padding-top: ${(props) => (props.expanded ? "3px" : "0")};
//   // padding-bottom: ${(props) => (props.expanded ? "4px" : "1px")};
//   border-top: ${(props) => (props.expanded ? `3px solid ${SEPARATOR}` : `0 solid ${SEPARATOR}`)};
//   border-bottom: ${(props) =>
//     props.expanded ? `4px solid ${SEPARATOR}` : `1px solid ${SEPARATOR}`};
// `

// ******************************** //
// Section Class
// ******************************** //

export const ButtonPrimary = ({ children }: { children: any }) => {
  return <ButtonWrapper>{children}</ButtonWrapper>
}

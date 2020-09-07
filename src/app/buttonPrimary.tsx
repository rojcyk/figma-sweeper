import React from "react"
import styled from "styled-components"

import { BLACK, WHITE, SEPARATOR, BLUE } from "../constants/ui"

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

const GeneralButton = styled.button`
  cursor: pointer;
  width: 100%;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease-out;
  outline: none;
`

export const ButtonPripmaryStyle = styled(GeneralButton)`
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

export const ButtonSecondaryStyle = styled(GeneralButton)`
  background-color: #f7f8fa;
  border: 1px solid #d1d8e2;
  color: ${BLACK};
  fill: ${BLACK} !important;
  text-shadow: 0 1px 0 ${WHITE};
  box-shadow: inset 0 2px ${WHITE}, 0 4px 8px rgba(0, 0, 0, 0.16);

  &:hover {
    background-color: ${WHITE};
    box-shadow: inset 0 1px 0 ${WHITE}, 0 2px 4px rgba(0, 0, 0, 0.14);
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

const Layout = styled.div<{
  icon?: any
}>`
  ${({ icon }) =>
    icon
      ? `
        display: flex;
        justify-content: space-between;
        align-items: center;
     `
      : ""}
`

export const ButtonPrimary = ({
  label,
  icon,
  onClick
}: {
  label: string
  icon?: any
  onClick: Function
}) => {
  return (
    <ButtonPripmaryStyle onClick={() => onClick()}>
      <Layout icon={icon}>
        {label} {icon}
      </Layout>
    </ButtonPripmaryStyle>
  )
}

// export const ButtonPrimary = ({ label, icon }: { label: string; icon?: any }) => {
//   return (
//     <ButtonPripmary>
//       <Layout icon={icon}>
//         {label} {icon}
//       </Layout>
//     </ButtonPripmary>
//   )
// }

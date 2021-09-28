import styled from "styled-components"

export const IconWrapper = styled.div<{ size?: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ size }) => size ? size : '20' }px;
  width: ${({ size }) => size ? size : '20' }px;
`

export default IconWrapper
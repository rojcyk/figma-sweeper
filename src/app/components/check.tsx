import styled from "styled-components"
import { WHITE } from "../../constants/ui"

export const Check = styled.div<{
  checked: boolean
}>`
  display: inline-block;
  position: relative;
  width: 18px;
  height: 18px;
  border-radius: 4px;
  margin-right: 12px;

  ${({ checked }) =>
    checked
      ? `
      background-color: #1E86FF;
      border: 1px solid #1071B7;
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
        text-align: center;
      }
    `
      : `
      background-color: #F7F8FA;
      border: 1px solid #D1D8E2;
      text-shadow: 0 1px 0 ${WHITE};
    `}
`

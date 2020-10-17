import React from "react"
import { NavLink } from "react-router-dom"
import styled from "styled-components"
import { BLUE, BLUE_LIGHT, WHITE, ANIMATION_SPEED_MS } from "../../constants/ui"
import { MAIN_ROUTE } from "../../constants/routes"

const BackStyle = styled(NavLink)`
  font-size: 14px;
  color: ${BLUE};
  display: inline-flex;
  text-decoration: none;
  height: 36px;
  align-items: center;
  background-color: ${WHITE};
  padding-left: 8px;
  padding-right: 8px;
  border-radius: 4px;
  margin-bottom: 8px;

  transition: all ${ANIMATION_SPEED_MS}ms ease-out;

  &:hover {
    background-color: ${BLUE_LIGHT};
  }
`

export const Back = () => {
  return (<BackStyle to={MAIN_ROUTE}>
    ← Back
  </BackStyle>)
}
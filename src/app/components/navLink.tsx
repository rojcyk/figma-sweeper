import { NavLink } from "react-router-dom"
import styled from "styled-components"
import { BLUE, WHITE, BLUE_LIGHT, ANIMATION_SPEED_MS } from "../../constants/ui"

export const Link = styled(NavLink)`
  color: ${BLUE};
  display: flex;
  text-decoration: none;
  height: 32px;
  align-items: center;
  background-color: ${WHITE};
  padding-left: 8px;
  padding-right: 8px;
  border-radius: 4px;

  transition: all ${ANIMATION_SPEED_MS}ms ease-out;

  &:hover {
    background-color: ${BLUE_LIGHT};
  }
`
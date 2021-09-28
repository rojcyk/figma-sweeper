import React from "react"
import styled from 'styled-components'
import { NavLink } from "react-router-dom"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { Arrow } from '@icons/arrow'

import {
  FS_SMALL,
  FS_TINY,
  GRAY,
  BLACK,
  WHITE,
  SEPARATOR,
  ANIMATION_SPEED_MS
} from "@ui"


const TokenWrapper = styled.div`
  cursor: pointer;
  border-radius: 6px;
  padding: 8px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all ${ANIMATION_SPEED_MS}ms ease-out;
  outline: none;
  text-decoration: none;
  padding-left: 12px;

  background-color: ${WHITE};
  color: ${BLACK};
  fill: ${BLACK} !important;
  text-shadow: 0 1px 0 ${WHITE};
  box-shadow: inset 0 1px ${WHITE};

  &:hover {
    background-color: #f7f8fa;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.5);
  }
`

const TokenContentWrapper = styled.div`
  display: inline-flex;
  align-items: center;
`

const TokenTitleWrapper = styled.div`
  padding-left: 12px;
`

const TokenTitle = styled.span`
  font-size: ${FS_SMALL};
  line-height: 130%;
`

const TokenStatus = styled.p`
  font-size: ${FS_TINY};
  line-height: 130%;
  color: ${GRAY};
  margin: 0;
  padding: 0;
  user-select: none;
`


export const TokenSection = ({ title, subtitle, icon, href }: { title: string, subtitle: string, icon: React.ReactNode, href: string }) => {
  return (
    <NavLink to={href} style={{ textDecoration: 'none' }}>
      <TokenWrapper>
        <TokenContentWrapper>
          {icon}

          <TokenTitleWrapper>
            <TokenTitle>{title}</TokenTitle>
            <TokenStatus>{subtitle}</TokenStatus>
          </TokenTitleWrapper>
        </TokenContentWrapper>

        <Arrow />
      </TokenWrapper>
    </NavLink>
  )
}

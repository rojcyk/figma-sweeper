import React, { useState } from "react"
import styled from "styled-components"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { ButtonPrimary, ButtonSecondary, ButtonDisabled } from "@components/button"
import { H1, H2, H3, P } from "@components/typography"
import { WHITE, SEPARATOR } from '@ui'

const NavigationWrapper = styled.div`
  position: relative;
  background-color: ${WHITE};
  border-bottom: 1px solid ${SEPARATOR};
  height: 96px;
`

interface NavigationBarProps {
  title: string
}

const Title = styled(H1)`
  position: absolute;
  bottom: 16px;
  left: 16px;
`

export const NavigationBar = (props: NavigationBarProps) => {
  return(
    <NavigationWrapper>
      <Title>{props.title}</Title>
    </NavigationWrapper>
  )
}
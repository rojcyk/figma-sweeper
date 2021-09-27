import React, { useState } from "react"
import styled from "styled-components"
import { Route, NavLink, HashRouter, useHistory } from "react-router-dom"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { Button } from "@components/button"
import { H1, H2, H3, P } from "@components/typography"
import { WHITE, SEPARATOR, BACKGROUND } from '@ui'

const NavigationWrapper = styled.div`
  position: relative;
  background-color: ${WHITE};
  /* border-bottom: 1px solid ${SEPARATOR}; */
  height: 88px;
`

interface NavigationBarProps {
  title: string
  action?: React.ReactElement
  back?: boolean
  pill?: string
}

const Title = styled(H1)`
  position: absolute;
  bottom: 16px;
  left: 16px;
`

const ButtonWrapper = styled.div`
  position: absolute;
  right: 8px;
  bottom: 8px;
`

const BackWrapper = styled.div`
  position: absolute;
  left: 8px;
  top: 6px;
`

const LintedWrapper = styled.div`
  position: absolute;
  left: 8px;
  top: 20px;
`

const LintedPill = styled.div`
  background-color: ${BACKGROUND};
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-block;
`

export const NavigationBar = (props: NavigationBarProps) => {
  const history = useHistory()

  return(
    <NavigationWrapper>
      {props.back &&
        <BackWrapper>
          <Button
            theme={'primary'}
            presence={'naked'}
            inline={true}
            label={'‹ Back'}
            onClick={() => history.goBack()}
          />
        </BackWrapper>
      }

      {props.pill !== '' && props.back === undefined && 
        <LintedWrapper>
          <LintedPill>{props.pill}</LintedPill>
        </LintedWrapper>
      }

      <Title>{props.title}</Title>
      <ButtonWrapper>
        {props.action}
        {/* <ButtonPrimary label='test' /> */}
      </ButtonWrapper>
    </NavigationWrapper>
  )
}
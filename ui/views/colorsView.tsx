import React, { useState, useContext, useEffect } from "react"
import styled from 'styled-components'
import io from 'figmaio/ui'
import { Route, NavLink, HashRouter, useHistory } from "react-router-dom"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { ButtonPrimary, ButtonSecondary, ButtonPrimaryNaked } from "@components/button"
import { LinterContext } from "../components/linterContext"
import { SETTINGS_ROUTE } from '@routes'
import { SEPARATOR } from '@ui'
import { COLORS_IMPORT } from '@events'
import { P } from '@components/typography'
import { Arrow } from '@icons/arrow'
import { Eye } from '@icons/eye'
import { Folder } from '@icons/folder'
import { Style } from '@icons/style'
import { Text } from '@icons/text'
import { PixelPerfect } from '@icons/pixelPerfect'
import { NavigationBar } from '@components/navigationBar'
import LintError from '@components/error'
import { defaultValues } from '@utils/canvasErrorManager'

const Main = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0 64px 0;
  min-height: 100%;
`

export const ColorsView = () => {

  return (
    <Main>
      <NavigationBar back={true} title={'Colors'} action={
        <ButtonPrimaryNaked inline={true} label={'Import'} onClick={() => io.send(COLORS_IMPORT)} />
      } />
        
    </Main>
  )
}

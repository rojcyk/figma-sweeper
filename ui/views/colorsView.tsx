import React, { useState, useContext, useEffect } from "react"
import styled from 'styled-components'
import io from 'figmaio/ui'
import { Route, NavLink, HashRouter, useHistory } from "react-router-dom"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { Button } from "@components/button"
import { LinterContext } from "../components/linterContext"
import { SETTINGS_ROUTE } from '@routes'
import { SEPARATOR, WHITE, FS_SMALL, FS_TINY, GRAY } from '@ui'
import { COLORS_IMPORT, COLORS_DELETE, COLORS_UPDATE } from '@events'
import { P } from '@components/typography'
import { Separator } from '@components/separator'
import { Trash } from '@icons/trash'
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

const ColorsList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  background-color: ${WHITE};
  padding-top: 12px;
  padding-bottom: 12px;
`

const ColorContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ColorItemWrapper = styled.li`
  padding: 4px 12px 4px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ColorExample = styled.div<{ color: string }>`
  width: 28px;
  height: 28px;
  border-radius: 4px;
  background-color: ${({color}) => color};
  margin-right: 12px;
  border: 1px solid rgba(0,0,0,0.1);
`

const ColorInfo = styled.div`
  display: flex;
  /* align-items: center; */
  flex-direction: column;
`

const ColorTitle = styled.span`
  display: block;
  font-size: ${FS_SMALL};
  margin-right: 4px;
`

const ColorStatus = styled.span`
  font-size: ${FS_TINY};
  color: ${GRAY};
  margin: 0;
  padding: 0;
  text-transform: uppercase;
`

const ColorItem = ({ color }: { color: Plugin.ImportedColor }) => {
  console.log(color)
  return (
    <ColorItemWrapper>
      <ColorContentWrapper>
        {/* <ColorExample color={'#ffffff'} /> */}

        <ColorInfo>
          <ColorTitle>{color.name}</ColorTitle>
          {/* <ColorStatus>{color.hex}</ColorStatus> */}
        </ColorInfo>
      </ColorContentWrapper>

      <Button
        theme={'primary'}
        presence={'naked'}
        inline={true}
        label={''}
        iconRight={<Trash />}
        onClick={() => {
          console.log(`[Plugin] Deleting color ${color.name}`)
          io.send(COLORS_DELETE, color)
        }}/>
    </ColorItemWrapper>
  )
}

const generateColors = (colors: Plugin.ImportedColor[]) => {
  const colorList: React.ReactNode[] = []

  colors.forEach((color, i) => {
    colorList.push(
      <ColorItem color={color} key={i} />
    )
  })

  return colorList
}



export const ColorsView = ({ paintStyles }: { paintStyles: Plugin.ImportedColor[] }) => {
  const colorList = generateColors(paintStyles)

  return (
    <Main>
      <NavigationBar back={true} title={'Colors'} action={
        <Button presence={'naked'} inline={true} label={'Import'} onClick={() => {
          io.send(COLORS_IMPORT)
        }} />
      } />

      <Separator />

      {paintStyles.length > 0 &&
        <>
          <ColorsList>{colorList}</ColorsList>
          <Separator />
        </>
      }
        
    </Main>
  )
}

import React from "react"
import styled from 'styled-components'
import io from 'figmaio/ui'

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { Button } from "@components/button"
import { WHITE, FS_SMALL } from '@ui'
import { COLORS_IMPORT, COLORS_DELETE } from '@events'
import { Separator } from '@components/separator'
import { Trash } from '@icons/trash'
import { NavigationBar } from '@components/navigationBar'

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

const ColorInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const ColorTitle = styled.span`
  display: block;
  font-size: ${FS_SMALL};
  margin-right: 4px;
`

const ColorItem = ({ color }: { color: Plugin.ImportedColor }) => {
  console.log(color)
  return (
    <ColorItemWrapper>
      <ColorContentWrapper>

        <ColorInfo>
          <ColorTitle>{color.name}</ColorTitle>
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

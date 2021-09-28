import React from "react"
import styled from 'styled-components'
import io from 'figmaio/ui'

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { Button } from "@components/button"
import { Separator } from '@components/separator'
import { Trash } from '@icons/trash'
import { NavigationBar } from '@components/navigationBar'

import {
  WHITE,
  FS_SMALL,
  FS_TINY,
  GRAY
} from '@ui'

import {
  TEXTS_IMPORT,
  TEXTS_DELETE
 } from '@events'

const Main = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0 64px 0;
  min-height: 100%;
`

const TextsList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  background-color: ${WHITE};
  padding-top: 12px;
  padding-bottom: 12px;
`

const TextContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const TextItemWrapper = styled.li`
  padding: 4px 12px 4px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const TextTitle = styled.span`
  display: block;
  font-size: ${FS_SMALL};
  margin-right: 4px;
  letter-spacing: 0.5%;
`

const TextStatus = styled.span`
  font-size: ${FS_TINY};
  color: ${GRAY};
  margin: 0;
  padding: 0;
`

const TextItem = ({ text }: { text: Plugin.ImportedText }) => {
  return (
    <TextItemWrapper>
      <TextContentWrapper>
        <TextTitle>{text.name}</TextTitle>
        <TextStatus>{text.fontName.family} • {text.fontName.style} • {text.fontSize}</TextStatus>
      </TextContentWrapper>

      <Button
        presence={'naked'}
        theme={'primary'}
        inline={true}
        label={''}
        iconRight={<Trash />}
        onClick={() => {
          console.log(`[Plugin] Deleting text ${text.name}`)
          io.send(TEXTS_DELETE, text)
        }}/>
    </TextItemWrapper>
  )
}

const generateTypography = (texts: Plugin.ImportedText[]) => {
  const textList: React.ReactNode[] = []

  texts.forEach((text, i) => {
    textList.push(
      <TextItem key={i} text={text} />
    )
  })

  return textList
}



export const TextsView = ({ textStyles }: { textStyles: Plugin.ImportedText[] }) => {
  const textList = generateTypography(textStyles)

  return (
    <Main>
      <NavigationBar back={true} title={'Typography'} action={
        <Button presence={'naked'} inline={true} label={'Import'} onClick={() => {
          io.send(TEXTS_IMPORT)
        }} />
      } />

      <Separator />

      {textStyles.length > 0 &&
        <>
          <TextsList>{textList}</TextsList>
          <Separator />
        </>
      }
        
    </Main>
  )
}

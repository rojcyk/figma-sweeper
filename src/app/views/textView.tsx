import * as React from "react"
import styled from 'styled-components'

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { GRAY } from "../../constants/ui"
import { Headline } from "../components/headline"
import { ContentWrapper } from "../components/contentWrapper"
import { Back } from "../components/back"

// ******************** //
// MAIN THING
// ******************** //

const TextStylesList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;

  margin-top: 16px;
`

const TextStyleWrapper = styled.li`
  padding: 6px 0;
`

const TextStyleName = styled.span`
  color: ${GRAY};
  display: block;
  margin-top: 4px;
  font-size: 12px;
  opacity: 0.6;
`

const TextStylePreview = styled.div<{
  fontSize: number | PluginAPI['mixed'],
  fontStyle: string,
  fontWeight: string
}>`
  display: block;
  white-space: nowrap;
  ${({ fontSize, fontStyle, fontWeight }) => 
    `
      font-size: ${String(fontSize)}px;
      font-style: ${fontStyle};
      font-weight: ${fontWeight};
    `
  }
`


const textItem = (textStyle: Plugin.ExportedTextStyle, index: number) => {
  const styleMatcher = /([a-zA-Z]+)+\s*([a-zA-Z]+)*/
  const re = styleMatcher.exec(textStyle.fontStyle)

  let style = 'normal'
  let weight = 'regular'

  if (re) {
    weight = re[1] || 'regular'
    style = re[2] || 'normal'
  }

  return (<TextStyleWrapper key={index}>
    <TextStylePreview fontSize={textStyle.fontSize} fontStyle={style} fontWeight={weight}>
      Aa
    </TextStylePreview>
  <TextStyleName>{textStyle.name} • {textStyle.fontFamily}</TextStyleName>

  </TextStyleWrapper>)
}

const textStyles = (textStyles: Plugin.ExportedTextStyle[]) => {
  const tmpStyles: JSX.Element[] = []

  textStyles.forEach((text, i) => {
    tmpStyles.push(textItem(text, i))
  })

  return tmpStyles
}



export const TextView = ({
  syncedTextStyles
}: {
  syncedTextStyles: Plugin.ExportedTextStyle[]
}) => {
  return (
  <ContentWrapper>
    <Back />
    <Headline>Synced text styles</Headline>
  <TextStylesList>{textStyles(syncedTextStyles)}</TextStylesList>
  </ContentWrapper>)
}
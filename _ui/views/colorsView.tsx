import * as React from "react"
import styled from 'styled-components'

// ******************** //
// LOCAL INCLUDES
// ******************** //

import { GRAY } from '../../constants/ui'
import { Headline } from "../components/headline"
import { ContentWrapper } from "../components/contentWrapper"
import { Back } from "../components/back"
import previewBitmap from '../imgs/preview.png'

// ******************** //
// MAIN THING
// ******************** //

const ColorsList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  color: ${GRAY};

  margin-top: 16px;
`

const ColorWrapper = styled.li`
  display: flex;
  align-items: center;
  padding: 6px 0;
`

const ColorPreview = styled.div<{
  paint: SolidPaint | null
}>`
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 3px;
  border: 1px solid rgba(0,0,0,0.1);
  margin-right: 8px;
  
  ${props => props.paint ?
    `
      background-color: rgba(${props.paint.color.r},${props.paint.color.g},${props.paint.color.b},${props.paint.opacity});
    `  
    : `
      background-image: url(${previewBitmap});
    `
  }
`

const Warning = styled.li`
  // padding: 6px 12px;
  margin: 0;
  // border-radius: 6px;
  // color: #ba5f1c !important;
  // background-color: #fff3d6;
  // border: solid 1px #ecd2ba;

  &:first-of-type {
    margin-top: 16px;
  }

  &:not(:last-of-type) {
    margin-bottom: 4px;
  }
`

const ErrorTitle = styled.span`
  font-size: 12px;
  display: inline-block;
  opacity: 0.6;
`

const Errors = styled.ul`
  padding: 0;
  margin: 0;
  padding-left: 48px;
  font-size: 12px;
  opacity: 0.6;
`

const ErrorHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`

const colorItem = (color: Plugin.ExportedStyle, index: number) => (
  <ColorWrapper key={index}>
    <ColorPreview paint={color.paint} /> {color.name}
  </ColorWrapper>
)

const warningItem = (color: Plugin.ExportedStyle, index: number) => {
  const tmpWarnings: JSX.Element[] = []

  if (color.errors) {
    tmpWarnings.push(<li key={1}>Fill style not synced</li>)

    color.errors.forEach((err: string, index) => {
      const i = index + 1
      tmpWarnings.push(<li key={i}>{err}</li>)
    })
  }

  return (
    <Warning key={index}>
      <ErrorHeader>
        <ColorPreview paint={color.paint} />
        <ErrorTitle>{color.name}</ErrorTitle>
      </ErrorHeader>
      <Errors>{tmpWarnings}</Errors>
    </Warning>
  )
}

const colors = (colors: Plugin.ExportedStyle[]) => {
  const tmpColors: JSX.Element[] = []

  colors.forEach((color, i) => {
    if (color.errors === null)
      tmpColors.push(colorItem(color, i))
    else 
      tmpColors.push(warningItem(color, i))
  })

  return tmpColors
}



export const ColorsView = ({
  syncedColors
}: {
  syncedColors: Plugin.ExportedStyle[]
}) => {
  return (
  <ContentWrapper>
    <Back />
    <Headline>Synced colors</Headline>

  <ColorsList>{colors(syncedColors)}</ColorsList>

  </ContentWrapper>)
}
import React from "react"
import styled, { StyledComponent, css } from "styled-components"

// ******************** //
// LOCAL INCLUDES
// ******************** //

import {
  FS_DEFAULT,
  FS_LARGE,
  FS_SMALL,
  BLACK,
  BLUE,
  GRAY
} from "@ui"

export const HeadlineStyle = css`
  display: block;
  font-weight: 800;
  color: ${BLACK};
`

const H1Style = styled.h1`
  ${HeadlineStyle}
  font-size: ${FS_LARGE};
`

const H2Style = styled.h2`
  ${HeadlineStyle}
  font-size: ${FS_DEFAULT};
`

const H3Style = styled.h3`
  ${HeadlineStyle}
  font-size: ${FS_SMALL};
`

// ******************** //
// Component
// ******************** //

interface HeadlineProps {
  children: any,
  style?: React.CSSProperties
}

interface HeadlineGenerate extends HeadlineProps {
  Wrapper: StyledComponent<any,any>,
}

export const generateButton = ({ children, Wrapper, style }: HeadlineGenerate) => {
  const newStyle: React.CSSProperties = {}

  if (style) Object.assign(newStyle, style)

  return (
    <Wrapper style={newStyle}>{children}</Wrapper>
  )
}

export const H1 = (props: HeadlineProps) => {
  return generateButton({
    ...props,
    Wrapper: H1Style
  })
}

export const H2 = (props: HeadlineProps) => {
  return generateButton({
    ...props,
    Wrapper: H2Style
  })
}

export const H3 = (props: HeadlineProps) => {
  return generateButton({
    ...props,
    Wrapper: H3Style
  })
}


export interface DescriptionProps {
  children: any
  style?: React.CSSProperties
}

// ******************** //
// Styles
// ******************** //

export const ParagraphStyle = styled.p`
  font-size: ${FS_SMALL};
  line-height: 130%;
  font-weight: 500;
  color: ${GRAY};
  margin: 0;
  padding: 0;

  a {
    color: ${BLUE};
    font-weight: 500;
  }
`

// ******************** //
// Component
// ******************** //

export const P = (props: DescriptionProps) => {
  return generateButton({
    ...props,
    Wrapper: ParagraphStyle
  })
}
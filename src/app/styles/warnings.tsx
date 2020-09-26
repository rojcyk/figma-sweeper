import React from "react"
import styled from "styled-components"

// ******************** //
// STYLES
// ******************** //

const WarningList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`

const Warning = styled.li`
  padding: 6px 12px;
  margin: 0;
  border-radius: 6px;
  color: #ba5f1c !important;
  background-color: #fff3d6;
  border: solid 1px #ecd2ba;

  &:first-of-type {
    margin-top: 16px;
  }

  &:not(:last-of-type) {
    margin-bottom: 4px;
  }
`

const ErrorTitle = styled.span`
  display: block;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 4px;
  //text-transform: uppercase;
  //border-bottom: 1px solid #f0ccab;
`

const Errors = styled.ul`
  padding: 0;
  margin: 0;
  padding-left: 16px;
  font-size: 12px;
  // list-style-type: none;
`

// ******************** //
// MAIN FUNCTION
// ******************** //

export const filterStylesWithErrors = (paintStyles: Plugin.ExportedStyle[]) =>
  paintStyles.filter((style) => style.errors !== null)

const Warnings = ({ paintStyles }: { paintStyles: Plugin.ExportedStyle[] }) => {
  const warnings: JSX.Element[] = []
  const onlyWarnings = filterStylesWithErrors(paintStyles)
  let counter = 0

  onlyWarnings.forEach((style: Plugin.ExportedStyle) => {
    const tmpWarnings: JSX.Element[] = []

    style.errors?.forEach((err: string, index) => {
      tmpWarnings.push(<li key={index}>{err}</li>)
    })

    warnings.push(
      <Warning key={counter}>
        <ErrorTitle>{style.name}</ErrorTitle>
        <Errors>{tmpWarnings}</Errors>
      </Warning>
    )

    if (style.errors) counter++
  })

  return <WarningList>{warnings}</WarningList>
}

export default Warnings
